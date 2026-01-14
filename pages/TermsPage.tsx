import React from 'react';
import { useNavigate } from 'react-router-dom';

const TermsPage = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen p-8 md:p-12 font-display text-slate-900 dark:text-white">
            <button onClick={() => navigate(-1)} className="mb-8 flex items-center gap-2 text-primary font-bold">
                <span className="material-symbols-outlined">arrow_back</span> Volver
            </button>
            <div className="max-w-3xl mx-auto prose dark:prose-invert">
                <h1 className="text-4xl font-black mb-8">Términos de Uso</h1>
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">Última actualización: 20 de Mayo, 2024</p>
                
                <h2 className="text-2xl font-bold mt-8 mb-4">1. Aceptación</h2>
                <p>Al usar tapuesto.ai, usted acepta estos términos. El servicio está disponible solo para mayores de 18 años residentes en Perú.</p>

                <h2 className="text-2xl font-bold mt-8 mb-4">2. Naturaleza del Servicio</h2>
                <p>Tapuesto.ai es una plataforma tecnológica que facilita acuerdos de predicción entre pares. No somos una casa de apuestas tradicional; actuamos como árbitro y custodio de los acuerdos entre usuarios.</p>

                <h2 className="text-2xl font-bold mt-8 mb-4">3. Resolución de Disputas</h2>
                <p>En caso de desacuerdo sobre el resultado de un evento, tapuesto.ai utilizará las pruebas proporcionadas (vouchers, fotos, links) y fuentes públicas para determinar el ganador. La decisión de la plataforma es final.</p>

                <h2 className="text-2xl font-bold mt-8 mb-4">4. Comisiones</h2>
                <p>La plataforma cobra una comisión del 5% sobre las ganancias netas para mantenimiento del servicio.</p>

                <h2 className="text-2xl font-bold mt-8 mb-4">5. Juego Responsable</h2>
                <p>Si siente que el uso de esta plataforma afecta negativamente su vida, le recomendamos buscar ayuda profesional. Nos reservamos el derecho de suspender cuentas con comportamiento compulsivo.</p>
            </div>
        </div>
    );
};

export default TermsPage;