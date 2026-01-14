import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ChallengePage = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white min-h-screen flex flex-col font-display selection:bg-primary/30">
            <header className="sticky top-0 z-50 w-full border-b border-surface-border bg-background-dark/80 backdrop-blur-md">
                <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
                    <div className="flex items-center gap-3 text-white cursor-pointer hover:opacity-90 transition-opacity" onClick={() => navigate('/')}>
                        <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white"><span className="material-symbols-outlined text-xl">query_stats</span></div>
                        <h2 className="text-xl font-bold tracking-tight">tapuesto.ai</h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/register" className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-primary hover:bg-primary/90 transition-colors text-white text-sm font-bold shadow-[0_0_15px_-3px_rgba(19,164,236,0.4)]">Conectar Billetera</Link>
                    </div>
                </div>
            </header>
            <main className="flex-grow flex flex-col items-center justify-center px-4 py-8 md:py-12 w-full max-w-7xl mx-auto">
                <div className="flex flex-col items-center text-center mb-8 md:mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider mb-4">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                        Desafío Activo
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-3">¡Te han desafiado!</h1>
                    <p className="text-text-secondary text-lg max-w-xl">Tu oponente ha bloqueado sus fondos. Acepta la apuesta para igualar su monto y activar el contrato inteligente.</p>
                </div>
                <div className="w-full max-w-4xl bg-surface-dark border border-surface-border rounded-2xl shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] overflow-hidden relative group/card">
                    <div className="relative bg-surface-dark rounded-2xl flex flex-col md:flex-row h-full">
                        <div className="w-full md:w-2/5 relative flex flex-col h-64 md:h-auto">
                            <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB19fDC9mt3lzWLDrgzF1xXFAf2EK2nCn8vDkiu0SEAi31QtnC0JlR0vOH3e4R4IlBiTTytt71xAjyfsKNl4V7YmLM8EyHeG9_1OEvoTSPTJLbXx64D0aLp-smmWNekayr75P90ydY8jSXBS7acyL-u-FaILnkfzRua7RopvS-27jq92bC4Wd6lD16KShnxW2LazT19EQmk8e0zvdbh3exfMYWKF_XpO9UhGR3pcQqUrZTe4Y106HPlVbayhGJYsNWI0d0wz-rvFt8")' }}></div>
                            <div className="absolute inset-0 bg-gradient-to-b from-surface-dark/10 via-surface-dark/80 to-surface-dark"></div>
                            <div className="relative z-10 p-6 flex flex-col h-full justify-between">
                                <div className="bg-surface-border/80 backdrop-blur-sm p-3 rounded-xl border border-white/5 shadow-lg inline-flex items-center gap-3 self-start mb-10">
                                    <div className="relative">
                                        <img alt="Avatar" className="size-10 rounded-full bg-white/10 border border-white/20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5JVebnFI_fYFHkc7-rhS2FKSt9sGXY5qv6G0wrZV_1zGJP3x2e9UohbJKF_x6qem3FcofJYMenGzIdCbXZVaPtAi-QzStgRYaKhFz5D27FNo93XSDmehrErZ70HGjv-mWkk0f1DBsf4RSlKB6Szz2HcnADbNa0T-2PqWa1bAT84hJbHYH-c1AFWLFxZ5DlISX0hb9-rNj9YiTYGiUqCxrC98Cg1G1BV-XIzunrr0MWAd-SRSpQjG2otKEVwDC59f55_YFluj97u4" />
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-1">
                                            <span className="text-white text-sm font-bold">@CryptoInca</span>
                                        </div>
                                        <span className="text-xs text-text-secondary">Desafiante</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col border-t md:border-t-0 md:border-l border-surface-border bg-gradient-to-b from-surface-dark to-[#15232b]">
                            <div className="mb-6">
                                <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-2">¿Bajará la inflación de Perú por debajo del 3% para diciembre de 2024?</h3>
                            </div>
                            <div className="mt-auto space-y-4">
                                <button onClick={() => navigate('/dashboard')} className="w-full group relative flex items-center justify-center overflow-hidden rounded-xl h-14 bg-primary text-white font-bold text-lg shadow-[0_0_20px_rgba(19,164,236,0.3)] hover:shadow-[0_0_30px_rgba(19,164,236,0.5)] hover:scale-[1.01] transition-all duration-300">
                                    <span className="flex items-center gap-2">
                                        <span className="material-symbols-outlined">lock_open</span>
                                        Aceptar Desafío
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ChallengePage;