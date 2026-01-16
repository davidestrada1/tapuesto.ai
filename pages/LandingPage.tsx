import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MarketCard from '../components/MarketCard';
import { Market } from '../types';
import { useAuth } from '../contexts/AuthContext';

const LandingPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const markets: Market[] = [
        {
            id: '1',
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwhQVbm5oQwpKWmxf92c41yaNrbcIJJM7wxlGcRk4guaPHaY9yrRADuGMPThXEyzlycjHG9BTndqtSPki5Ea2WuLOpIV5LPm32ljwtncb_D5WMr0_HuPfeOdk6-uDZmUcvB3_LMgt6jSfoh8M8c6MW-EFS8bDekM_-E6tKhpHVlFa2PNY8sqWu3HWTBI0_eB0R1xTqo6Z12M4cTWUINbTik4LZYlj7xC_a-hVH7gCd9oIKBbj_P1hLG-w32_EeYlebIGg-Q0YU5-w",
            title: "¿Crecerá el PBI de Perú más del 3% en 2024?",
            tag: "Economía",
            tagColor: "blue",
            yes: 65,
            no: 35,
            volume: "$12,450",
            expiry: "31 Dic"
        },
        {
            id: '2',
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBob15UuvK_VJJIa_ELrdRfFLYVnnG6mtsEge6YGSFhMPifF0wMqPW6nYT0P0OZzm9sotjMsw7Ame-h-fckoeKdu06gmC8AHsPzThp1hsgSj7qMdg7eYB6zKv-9ICVbTmdE2kkjeYl1FncVndTORDsWV9OB7oGlUdJZqe8ahJDcWNj_WRjy1aX3TgjNZOmORS-myDbC4Gty9Tm-DKbBU2YO-A7hd0P4vuDbTkN3SwOFbZjyaTkRvRCSdmsiASRFDQXkPmi7UoYknX8",
            title: "¿Renunciará el Ministro de Economía antes de julio?",
            tag: "Política",
            tagColor: "purple",
            yes: 22,
            no: 78,
            volume: "$8,320",
            expiry: "30 Jun"
        },
        {
            id: '3',
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9o-STfMMj_3GqF8OHyL7bXIrSjCToK6I6wJNYSQ1OjuVoOjMlLJN3Hx6PZ6EHwNqTUymXmrclG8ZU8U-5XKM22rQunZv3kVBuQAMDiwhtY1cP6clcmspT4ZZ8svPBudwSTEBuQ_BfMSBIZFH4-gAdWxZQxxFCib_6p4FSJrvb-lZ2ovohm5YSsgNu7-7FBrp_P418xLVyfkkNbaHQ86MHCbl6hSv8j7bWFliOBvVrc0vFKoEz1Qfsrv_km3Y94W2hdxhYXnK6bho",
            title: "¿Clasificará Perú al Mundial 2026?",
            tag: "Deportes",
            tagColor: "orange",
            yes: 48,
            no: 52,
            volume: "$45,200",
            expiry: "Nov 2025"
        }
    ];

    return (
        <div className="flex flex-col min-h-screen">
            <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
                            <div className="flex items-center justify-center size-8 rounded bg-primary/10 text-primary">
                                <span className="material-symbols-outlined">analytics</span>
                            </div>
                            <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">tapuesto.ai</h2>
                        </div>
                        <nav className="hidden md:flex flex-1 justify-center items-center gap-8">
                            <Link className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-primary transition-colors" to="/dashboard">Mercados</Link>
                            <a className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-primary transition-colors" href="#">Nosotros</a>
                            <Link className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-primary transition-colors" to="/leaderboard">Clasificación</Link>
                        </nav>
                        <div className="flex items-center gap-4">
                            <Link to={user ? "/dashboard" : "/register"} className="hidden sm:flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-bold text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all">
                                {user ? "Ir al Panel" : "Conectar Billetera"}
                            </Link>
                            <button className="flex md:hidden items-center justify-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
                                <span className="material-symbols-outlined">menu</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            <main>
                <section className="relative pt-12 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
                    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="flex flex-col gap-6 text-center lg:text-left">
                                <div className="inline-flex items-center gap-2 self-center lg:self-start px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                                    <span className="flex size-2 rounded-full bg-primary animate-pulse"></span>
                                    <span className="text-xs font-bold text-primary uppercase tracking-wide">En vivo en Perú</span>
                                </div>
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-slate-900 dark:text-white">
                                    El Futuro de la <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Verdad en Perú</span>
                                </h1>
                                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                                    Tapuesto.ai es el principal mercado de predicciones del Perú. Únete a la inteligencia colectiva para combatir la desinformación y gana recompensas con pronósticos precisos.
                                </p>
                                <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2">
                                    <Link to="/dashboard" className="h-12 px-6 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold text-base shadow-lg shadow-primary/25 transition-all flex items-center gap-2">
                                        Empezar a Predecir
                                        <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                                    </Link>
                                    <button className="h-12 px-6 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-base transition-all">
                                        Leer Whitepaper
                                    </button>
                                </div>
                                <div className="flex items-center justify-center lg:justify-start gap-6 pt-4 text-sm text-slate-500 dark:text-slate-400 font-medium">
                                    <div className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-green-500 text-[18px]">verified_user</span>
                                        Totalmente Regulado
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-primary text-[18px]">lock</span>
                                        Activos Seguros
                                    </div>
                                </div>
                            </div>
                            <div className="relative mx-auto w-full max-w-[560px] lg:max-w-none">
                                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-slate-900 border border-slate-800 relative group">
                                    <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB2iknhJvABtOvIVpdbWZhYkn9u-rbTkvgkJPU6uJRH0Nzn4Ccp6eF5u7D5El_nVsJ8ZsomKD_f0S6wUGPw_qCyPRBZ16kOPaQLRIaPzn4qIVgHqL-zMDC8G83E7sELfsuqAVD6V5e1n8LGNOhbAeiZpxggX8-KnXlNVLMSuv8rpXQrd6rplg-bsOQQLNSU_1t4A5BTFn6OpHCHyTRJsKBbdmsND911oggk4_2Edows38PbbI8n7CwtnttSv30qN_sbMRrNqTp1AV8")' }}></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
                                    <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-3">
                                        <div className="p-4 rounded-xl bg-slate-800/90 backdrop-blur-sm border border-slate-700 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-400">Política</span>
                                                </div>
                                                <span className="text-xs text-slate-400">Vol: $452k</span>
                                            </div>
                                            <p className="font-bold text-white text-sm mb-3">¿Ganador de las Próximas Elecciones?</p>
                                            <div className="flex items-center gap-2 text-xs">
                                                <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                                                    <div className="h-full bg-green-500 w-[65%]"></div>
                                                </div>
                                                <span className="font-mono text-green-400">65% Sí</span>
                                            </div>
                                        </div>
                                        <div className="p-4 rounded-xl bg-slate-800/90 backdrop-blur-sm border border-slate-700 shadow-lg transform translate-y-2 group-hover:-translate-y-2 transition-transform duration-500 delay-75">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-orange-500/20 text-orange-400">Economía</span>
                                                </div>
                                                <span className="text-xs text-slate-400">Vol: $1.2m</span>
                                            </div>
                                            <p className="font-bold text-white text-sm mb-3">¿Crecimiento PBI Perú &gt; 3.5% en 2024?</p>
                                            <div className="flex items-center gap-2 text-xs">
                                                <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                                                    <div className="h-full bg-primary w-[42%]"></div>
                                                </div>
                                                <span className="font-mono text-primary">42% Sí</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="border-y border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
                    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-100 dark:divide-slate-800/50">
                            <div className="flex flex-col items-center text-center px-4">
                                <span className="text-3xl font-black text-slate-900 dark:text-white">$12M+</span>
                                <span className="text-sm text-slate-500 dark:text-slate-400 mt-1">Volumen Total Operado</span>
                            </div>
                            <div className="flex flex-col items-center text-center px-4">
                                <span className="text-3xl font-black text-slate-900 dark:text-white">50k+</span>
                                <span className="text-sm text-slate-500 dark:text-slate-400 mt-1">Predictores Activos</span>
                            </div>
                            <div className="flex flex-col items-center text-center px-4">
                                <span className="text-3xl font-black text-slate-900 dark:text-white">99.9%</span>
                                <span className="text-sm text-slate-500 dark:text-slate-400 mt-1">Disponibilidad</span>
                            </div>
                            <div className="flex flex-col items-center text-center px-4">
                                <span className="text-3xl font-black text-slate-900 dark:text-white">24/7</span>
                                <span className="text-sm text-slate-500 dark:text-slate-400 mt-1">Soporte</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-20 bg-background-light dark:bg-background-dark">
                    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-10 gap-4">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Mercados en Tendencia</h2>
                                <p className="text-slate-500 dark:text-slate-400">Descubre qué está prediciendo el Perú ahora mismo.</p>
                            </div>
                            <Link to="/dashboard" className="text-primary font-bold hover:text-primary/80 flex items-center gap-1 group">
                                Ver todos los mercados
                                <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {markets.map((market, idx) => (
                                <MarketCard key={idx} market={market} />
                            ))}
                        </div>
                    </div>
                </section>
                <section className="py-20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background-dark z-0"></div>
                    <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">¿Listo para ver el futuro?</h2>
                        <p className="text-xl text-slate-700 dark:text-slate-300 mb-10 max-w-2xl mx-auto">
                            Únete a miles de peruanos que están prediciendo las noticias en lugar de solo leerlas.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to={user ? "/dashboard" : "/register"} className="w-full sm:w-auto h-14 px-8 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-xl shadow-primary/20 transition-all flex items-center justify-center">
                                {user ? "Ir al Panel para Empezar" : "Conectar Billetera para Empezar"}
                            </Link>
                            <Link to="/dashboard" className="w-full sm:w-auto h-14 px-8 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center justify-center">
                                Ver Todos los Mercados
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default LandingPage;