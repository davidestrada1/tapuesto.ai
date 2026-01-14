import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { analyzeMarketTopic } from '../services/geminiService';
import { AIAnalysisResult, CreateMarketForm } from '../types';

const CreateMarketPage = () => {
    const navigate = useNavigate();
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysis, setAnalysis] = useState<AIAnalysisResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Form State
    const [form, setForm] = useState<CreateMarketForm>({
        betType: '1v1',
        topic: '',
        stakeType: 'money',
        stakeAmount: '',
        downPayment: '',
        currency: 'PEN',
        deadline: '',
        proofType: 'link',
        dataSourceUrl: ''
    });

    const handleAnalyze = async () => {
        if (!form.topic.trim()) return;
        setIsAnalyzing(true);
        setError(null);
        setAnalysis(null);
        
        try {
            const result = await analyzeMarketTopic(form.topic);
            setAnalysis(result);
            // Auto-fill the topic if the AI suggests a better phrasing
            if(result.suggestion) {
                setForm(prev => ({ ...prev, topic: result.suggestion }));
            }
        } catch (err) {
            setError("Ocurrió un error al analizar el tema. Por favor intenta de nuevo.");
            console.error(err);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleSubmit = () => {
        // Validation logic would go here
        // Simulating ID generation and redirect
        const marketId = Math.random().toString(36).substr(2, 9);
        navigate(`/share/${marketId}`);
    };

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col pb-20">
            {/* Header */}
            <header className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-200 dark:border-[#233c48] bg-white dark:bg-[#111c22] px-6 py-4">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
                    <span className="material-symbols-outlined text-primary">arrow_back</span>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Crear Apuesta</h2>
                </div>
                <div className="text-sm font-bold text-primary">Paso 1 de 2</div>
            </header>

            <div className="max-w-3xl mx-auto w-full px-4 pt-6 space-y-8">
                
                {/* 1. Bet Type Selection */}
                <section>
                    <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">1. Tipo de Apuesta</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div 
                            onClick={() => setForm({...form, betType: '1v1'})}
                            className={`cursor-pointer rounded-xl border-2 p-4 flex flex-col items-center gap-3 transition-all ${form.betType === '1v1' ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'}`}
                        >
                            <div className={`p-3 rounded-full ${form.betType === '1v1' ? 'bg-primary text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
                                <span className="material-symbols-outlined text-2xl">swords</span>
                            </div>
                            <div className="text-center">
                                <p className="font-bold text-slate-900 dark:text-white">Duelo (1v1)</p>
                                <p className="text-xs text-slate-500">Tú vs. Otra persona</p>
                            </div>
                        </div>
                        <div 
                            onClick={() => setForm({...form, betType: 'poll'})}
                            className={`cursor-pointer rounded-xl border-2 p-4 flex flex-col items-center gap-3 transition-all ${form.betType === 'poll' ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'}`}
                        >
                            <div className={`p-3 rounded-full ${form.betType === 'poll' ? 'bg-primary text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
                                <span className="material-symbols-outlined text-2xl">groups</span>
                            </div>
                            <div className="text-center">
                                <p className="font-bold text-slate-900 dark:text-white">Grupal (Panda)</p>
                                <p className="text-xs text-slate-500">Varios participantes</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. What is being bet? */}
                <section>
                    <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">2. ¿Qué apostamos?</h3>
                    <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-700 p-1 overflow-hidden flex mb-4">
                        <button 
                            onClick={() => setForm({...form, stakeType: 'money'})}
                            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${form.stakeType === 'money' ? 'bg-primary text-white shadow-md' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
                        >
                            Dinero (Cash)
                        </button>
                        <button 
                            onClick={() => setForm({...form, stakeType: 'custom'})}
                            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${form.stakeType === 'custom' ? 'bg-primary text-white shadow-md' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
                        >
                            Especie / Otro
                        </button>
                    </div>

                    <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-700 p-6 space-y-4">
                        {form.stakeType === 'money' ? (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Monto Total a Apostar</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">S/</span>
                                        <input 
                                            type="number" 
                                            value={form.stakeAmount}
                                            onChange={(e) => setForm({...form, stakeAmount: e.target.value})}
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-input-dark-bg border border-slate-300 dark:border-input-dark-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-slate-900 dark:text-white font-bold text-lg" 
                                            placeholder="100.00"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                        Cuota Inicial (Down Payment)
                                        <span className="ml-2 text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full">Obligatorio</span>
                                    </label>
                                    <p className="text-xs text-slate-500 mb-2">Monto necesario para entrar a la apuesta.</p>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">S/</span>
                                        <input 
                                            type="number" 
                                            value={form.downPayment}
                                            onChange={(e) => setForm({...form, downPayment: e.target.value})}
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-input-dark-bg border border-slate-300 dark:border-input-dark-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-slate-900 dark:text-white font-bold" 
                                            placeholder="20.00"
                                        />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Describe la apuesta</label>
                                <textarea 
                                    value={form.stakeAmount}
                                    onChange={(e) => setForm({...form, stakeAmount: e.target.value})}
                                    className="w-full p-3 bg-slate-50 dark:bg-input-dark-bg border border-slate-300 dark:border-input-dark-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-slate-900 dark:text-white"
                                    placeholder="Ej. Una botella de Blue Label, Una cena en Maido, Lavar los platos por una semana..."
                                    rows={3}
                                ></textarea>
                            </div>
                        )}
                    </div>
                </section>

                {/* 3. The Prediction (Gemini) */}
                <section>
                    <div className="flex justify-between items-end mb-4">
                        <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">3. El Evento</h3>
                        <button 
                            onClick={handleAnalyze} 
                            disabled={isAnalyzing || !form.topic.trim()}
                            className="text-primary text-xs font-bold flex items-center gap-1 hover:underline disabled:opacity-50"
                        >
                            <span className="material-symbols-outlined text-[16px]">smart_toy</span>
                            {isAnalyzing ? 'Analizando...' : 'Mejorar con IA'}
                        </button>
                    </div>
                    
                    <div className="relative">
                        <textarea 
                            value={form.topic}
                            onChange={(e) => setForm({...form, topic: e.target.value})}
                            className="w-full p-4 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary text-lg font-bold text-slate-900 dark:text-white shadow-sm resize-none"
                            placeholder="Ej. ¿Quién bajará más de peso para el verano?"
                            rows={3}
                        ></textarea>
                        {analysis && (
                            <div className="mt-2 p-3 bg-primary/10 rounded-lg border border-primary/20 animate-fade-in">
                                <p className="text-xs text-primary font-bold mb-1">Sugerencia IA:</p>
                                <p className="text-sm text-slate-700 dark:text-white">{analysis.reasoning}</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* 4. Resolution Rules */}
                <section>
                    <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">4. Reglas del Juego</h3>
                    <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-700 p-6 space-y-6">
                        
                        {/* Deadline */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Fecha Límite (Deadline)
                            </label>
                            <input 
                                type="datetime-local" 
                                value={form.deadline}
                                onChange={(e) => setForm({...form, deadline: e.target.value})}
                                className="w-full p-3 bg-slate-50 dark:bg-input-dark-bg border border-slate-300 dark:border-input-dark-border rounded-lg focus:ring-2 focus:ring-primary text-slate-900 dark:text-white"
                            />
                            <p className="text-xs text-slate-500 mt-1">Después de esta fecha, se habilitará la opción para subir pruebas.</p>
                        </div>

                        {/* Evidence Type */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                ¿Cómo se prueba al ganador?
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {[
                                    {id: 'photo', label: 'Foto', icon: 'image'},
                                    {id: 'video', label: 'Video', icon: 'videocam'},
                                    {id: 'voucher', label: 'Voucher', icon: 'receipt_long'},
                                    {id: 'link', label: 'Link Web', icon: 'link'},
                                ].map((type) => (
                                    <div 
                                        key={type.id}
                                        onClick={() => setForm({...form, proofType: type.id as any})}
                                        className={`cursor-pointer rounded-lg border p-2 flex flex-col items-center gap-1 transition-all ${form.proofType === type.id ? 'border-primary bg-primary/10 text-primary' : 'border-slate-200 dark:border-slate-700 text-slate-500'}`}
                                    >
                                        <span className="material-symbols-outlined">{type.icon}</span>
                                        <span className="text-xs font-bold">{type.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Data Source Optional */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Fuente de Datos (Opcional)
                            </label>
                            <input 
                                type="url" 
                                placeholder="https://..."
                                value={form.dataSourceUrl}
                                onChange={(e) => setForm({...form, dataSourceUrl: e.target.value})}
                                className="w-full p-3 bg-slate-50 dark:bg-input-dark-bg border border-slate-300 dark:border-input-dark-border rounded-lg focus:ring-2 focus:ring-primary text-slate-900 dark:text-white text-sm"
                            />
                        </div>

                    </div>
                </section>

                <div className="pt-4">
                    <button 
                        onClick={handleSubmit}
                        className="w-full py-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-lg shadow-primary/30 transition-all transform active:scale-[0.98]"
                    >
                        Crear Mercado y Compartir
                    </button>
                    <p className="text-center text-xs text-slate-400 mt-4">
                        Al crear, aceptas nuestros <Link to="/terms" className="text-primary hover:underline">Términos</Link> y <Link to="/privacy" className="text-primary hover:underline">Política de Privacidad</Link>.
                    </p>
                </div>

            </div>
        </div>
    );
}

export default CreateMarketPage;