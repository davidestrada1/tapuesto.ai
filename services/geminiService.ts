import { GoogleGenAI } from "@google/genai";
import { AIAnalysisResult, GroundingSource } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeMarketTopic = async (topic: string): Promise<AIAnalysisResult> => {
    if (!topic) {
        throw new Error("Topic is required");
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-1.5-flash",
            contents: `Analiza el siguiente tema para un mercado de predicciones en Perú: "${topic}".
            
            Tu tarea es:
            1. Buscar información reciente y relevante sobre este tema usando Google Search.
            2. Proponer una PREGUNTA binaria (Sí/No) clara y objetiva para un mercado de apuestas (ej. "¿Logrará X cosa antes de tal fecha?").
            3. Dar un breve razonamiento de por qué esta pregunta es relevante ahora, basado en las noticias encontradas.
            
            Formato de respuesta deseado (solo texto, estructurado):
            Pregunta: [Tu pregunta propuesta]
            Razonamiento: [Tu razonamiento]
            `,
            config: {
                tools: [{ googleSearch: {} }],
            },
        });

        const text = response.text || "";

        // Extract sources from grounding metadata
        const sources: GroundingSource[] = [];
        const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;

        if (groundingChunks) {
            groundingChunks.forEach((chunk: any) => {
                if (chunk.web?.uri && chunk.web?.title) {
                    sources.push({
                        title: chunk.web.title,
                        uri: chunk.web.uri
                    });
                }
            });
        }

        // Simple parsing of the text response
        let suggestion = "No se pudo generar una pregunta.";
        let reasoning = "No se encontró información suficiente.";

        const lines = text.split('\n');
        lines.forEach(line => {
            if (line.startsWith("Pregunta:") || line.startsWith("**Pregunta:**")) {
                suggestion = line.replace(/\*\*Pregunta:\*\*/g, '').replace(/Pregunta:/g, '').trim();
            }
            if (line.startsWith("Razonamiento:") || line.startsWith("**Razonamiento:**")) {
                reasoning = line.replace(/\*\*Razonamiento:\*\*/g, '').replace(/Razonamiento:/g, '').trim();
            }
        });

        // Fallback if parsing fails but text exists
        if (suggestion === "No se pudo generar una pregunta." && text.length > 10) {
            suggestion = text; // Just return the whole text if parsing fails to be safe
            reasoning = "Ver detalles arriba.";
        }

        return {
            suggestion,
            reasoning,
            sources: sources.slice(0, 3) // Limit to top 3 sources
        };

    } catch (error) {
        console.error("Error calling Gemini:", error);
        throw error;
    }
};