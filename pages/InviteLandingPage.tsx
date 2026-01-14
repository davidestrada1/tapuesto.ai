import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const InviteLandingPage = () => {
    const navigate = useNavigate();
    
    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col font-display">
             <header className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white cursor-pointer" onClick={() => navigate('/')}>
                    <span className="material-symbols-outlined text-primary">analytics</span>
                    <span className="font-bold">tapuesto.ai</span>
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8">
                <div className="max-w-2xl w-full space-y-8">
                    
                    {/* Hero Section */}
                    <div className="text-center space-y-4">
                        <div className="inline-block relative">
                            <img 
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA36yb8ognixKXinzTkP2ZlclGbFAtzRGwoVmYPu7TlASJ-g8j43cnE8H6pweJGy6RKs2joX3xX6GWhmaNGJbglaPr2TZ3gM5OwN0-_UI3MRXP2YrKCg87smjEOaiwFHSjFMrEQzjppLLrwdnv25Jyx6bEwnRhkMAc8VNbyXXJdVqvWA8-bQQFfuQDyavM0WVuwymAtJ1XgTiAMkL3tDdVQ-1jIZzfQZaczgpXSCulgVN99bqBphoxEGiO3SM8kdafnlVZxl8EWl_0" 
                                className="size-24 rounded-full border-4 border-primary shadow-xl mx-auto"
                                alt="Challenger"
                            />
                            <div className="absolute -bottom-2 -right-2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full border-2 border-background-dark">
                                Desafiante
                            </div>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white">
                            <span className="text-primary">Alejandro_PE</span> te ha retado.
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
                            Ha creado una apuesta y quiere saber si tienes el valor para aceptarla.
                        </p>
                    </div>

                    {/* Bet Card */}
                    <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden shadow-xl relative group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-blue-400"></div>
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-6">
                                <span className="bg-red-500/10 text-red-500 text-xs font-bold px-3 py-1 rounded-full border border-red-500/20 uppercase tracking-wide animate-pulse">
                                    🔴 En Vivo
                                </span>
                                <div className="text-right">
                                    <p className="text-xs text-slate-500 uppercase font-bold">Vence</p>
                                    <p className="text-slate-900 dark:text-white font-bold">15 Mar 2026</p>
                                </div>
                            </div>
                            
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                                "¿Quién bajará más de peso en 1 mes?"
                            </h2>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#111c22] border border-slate-200 dark:border-slate-700 text-center">
                                    <span className="material-symbols-outlined text-primary mb-1">payments</span>
                                    <p className="text-xs text-slate-500 uppercase font-bold">Apuesta Total</p>
                                    <p className="text-xl font-black text-slate-900 dark:text-white">S/ 200.00</p>
                                </div>
                                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#111c22] border border-slate-200 dark:border-slate-700 text-center">
                                    <span className="material-symbols-outlined text-green-500 mb-1">input</span>
                                    <p className="text-xs text-slate-500 uppercase font-bold">Tu Cuota Inicial</p>
                                    <p className="text-xl font-black text-green-500">S/ 20.00</p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <Link to="/register" className="w-full py-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-lg text-center shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2">
                                    Aceptar Reto y Crear Cuenta
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </Link>
                                <p className="text-center text-xs text-slate-500">
                                    🎁 <span className="text-primary font-bold">Bono:</span> Recibe S/ 10.00 de crédito gratis al registrarte hoy.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            ¿Ya tienes cuenta? <Link to="/dashboard" className="text-primary font-bold hover:underline">Inicia Sesión</Link>
                        </p>
                        <div className="mt-8 flex justify-center gap-6 text-xs text-slate-400">
                            <Link to="/terms" className="hover:text-slate-300">Términos de Uso</Link>
                            <Link to="/privacy" className="hover:text-slate-300">Privacidad</Link>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}

export default InviteLandingPage;