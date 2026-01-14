import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col">
            <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#233c48] bg-background-dark px-4 lg:px-10 py-3 shadow-md">
                <div className="flex items-center gap-4 lg:gap-8 cursor-pointer" onClick={() => navigate('/')}>
                    <div className="flex items-center gap-2 text-white">
                        <div className="size-6 text-primary"><span className="material-symbols-outlined">analytics</span></div>
                        <h2 className="text-white text-xl font-extrabold">tapuesto.ai</h2>
                    </div>
                    <nav className="hidden lg:flex items-center gap-6">
                        <Link to="/dashboard" className="text-text-secondary hover:text-white text-sm font-medium transition-colors">Mercados</Link>
                        <Link to="/leaderboard" className="text-text-secondary hover:text-white text-sm font-medium transition-colors">Clasificación</Link>
                        <span className="text-white text-sm font-bold border-b-2 border-primary pb-1">Perfil</span>
                    </nav>
                </div>
                <div className="flex flex-1 justify-end gap-4 lg:gap-8">
                    <button className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 ring-2 ring-primary/20" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA36yb8ognixKXinzTkP2ZlclGbFAtzRGwoVmYPu7TlASJ-g8j43cnE8H6pweJGy6RKs2joX3xX6GWhmaNGJbglaPr2TZ3gM5OwN0-_UI3MRXP2YrKCg87smjEOaiwFHSjFMrEQzjppLLrwdnv25Jyx6bEwnRhkMAc8VNbyXXJdVqvWA8-bQQFfuQDyavM0WVuwymAtJ1XgTiAMkL3tDdVQ-1jIZzfQZaczgpXSCulgVN99bqBphoxEGiO3SM8kdafnlVZxl8EWl_0")' }}></button>
                </div>
            </header>
            <main className="flex-grow w-full max-w-[1440px] mx-auto px-4 lg:px-10 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <aside className="lg:col-span-3 lg:sticky lg:top-24 h-fit space-y-6">
                        <div className="bg-surface-dark rounded-xl p-6 border border-[#233c48] flex flex-col items-center text-center relative overflow-hidden group">
                            <div className="absolute top-[-50px] left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/20 rounded-full blur-[60px] pointer-events-none"></div>
                            <div className="relative">
                                <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-32 w-32 border-4 border-surface-dark shadow-xl" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCDAnerHo4UEyQEgWyktbs0UUYtrGxpwrB256qEjuHE1LwTS4MAkNr8mWeQqOZC_ehCVDPXB6rwzDRoWfwsqftZ-zU4WOnjy3cRbnnwbH4jyFJ6MOjLVdwUDBD9rLw5xNd3S-zO7FfZVgk9Lt0NH0qwv9j_motcytiatNKDl5d2YBFVNz6cwg8L1Gk-6mdQasvMlo4HPkC1u1yeovBgt98iSgLEbDr3v4-TbYiRe7lZJqFrwLvQaxYbb8nDNhvCktysuq01rUI3BnE")' }}></div>
                                <div className="absolute bottom-1 right-1 bg-primary text-white rounded-full p-1 border-2 border-surface-dark"><span className="material-symbols-outlined text-[16px] block">verified</span></div>
                            </div>
                            <div className="mt-4 flex flex-col gap-1">
                                <h1 className="text-white text-2xl font-bold tracking-tight">Alejandro_PE</h1>
                                <p className="text-text-secondary text-sm">Miembro desde Marzo 2024</p>
                            </div>
                            <div className="mt-6 w-full flex flex-col gap-3">
                                <button onClick={() => navigate('/create')} className="flex items-center justify-center w-full gap-2 bg-primary hover:bg-blue-500 text-white font-bold py-2.5 px-4 rounded-lg transition-all">Crear Mercado</button>
                            </div>
                        </div>
                    </aside>
                    <div className="lg:col-span-9 flex flex-col gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-surface-dark border border-[#233c48] p-5 rounded-xl flex flex-col justify-between relative overflow-hidden">
                                <div className="absolute right-0 top-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -mr-8 -mt-8"></div>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-text-secondary font-medium text-sm">Calificación Elo</p>
                                        <div className="flex items-baseline gap-2 mt-1">
                                            <h3 className="text-3xl font-bold text-white">1450</h3>
                                            <span className="text-[#0bda57] text-sm font-semibold flex items-center bg-[#0bda57]/10 px-1.5 py-0.5 rounded">
                                                <span className="material-symbols-outlined text-[14px] mr-0.5">trending_up</span> 2.5%
                                            </span>
                                        </div>
                                    </div>
                                    <div className="bg-primary/20 p-2 rounded-lg text-primary"><span className="material-symbols-outlined text-2xl">trophy</span></div>
                                </div>
                            </div>
                            <div className="bg-surface-dark border border-[#233c48] p-5 rounded-xl flex flex-col justify-between relative overflow-hidden">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-text-secondary font-medium text-sm">Tasa de Acierto</p>
                                        <div className="flex items-baseline gap-2 mt-1">
                                            <h3 className="text-3xl font-bold text-white">65%</h3>
                                        </div>
                                    </div>
                                    <div className="bg-purple-500/20 p-2 rounded-lg text-purple-400"><span className="material-symbols-outlined text-2xl">target</span></div>
                                </div>
                                <div className="w-full bg-[#233c48] h-1.5 rounded-full mt-4 overflow-hidden">
                                    <div className="bg-purple-500 h-full rounded-full" style={{ width: "65%" }}></div>
                                </div>
                            </div>
                            <div className="bg-surface-dark border border-[#233c48] p-5 rounded-xl flex flex-col justify-between relative overflow-hidden">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-text-secondary font-medium text-sm">Ganancias Totales</p>
                                        <div className="flex items-baseline gap-2 mt-1">
                                            <h3 className="text-3xl font-bold text-white">12,400</h3>
                                        </div>
                                    </div>
                                    <div className="bg-amber-500/20 p-2 rounded-lg text-amber-400"><span className="material-symbols-outlined text-2xl">savings</span></div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-surface-dark border border-[#233c48] rounded-xl overflow-hidden flex flex-col">
                            <div className="flex border-b border-[#233c48] px-2 sm:px-6 overflow-x-auto no-scrollbar">
                                <button className="px-4 py-4 text-sm font-bold text-primary border-b-2 border-primary whitespace-nowrap">Apuestas Activas</button>
                                <button className="px-4 py-4 text-sm font-bold text-text-secondary hover:text-white border-b-2 border-transparent whitespace-nowrap">Apuestas Resueltas</button>
                            </div>
                            <div className="overflow-x-auto custom-scrollbar">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-[#1a2932] border-b border-[#233c48]">
                                            <th className="p-4 text-xs font-semibold text-text-secondary uppercase tracking-wider w-[40%]">Evento de Mercado</th>
                                            <th className="p-4 text-xs font-semibold text-text-secondary uppercase tracking-wider text-center">Predicción</th>
                                            <th className="p-4 text-xs font-semibold text-text-secondary uppercase tracking-wider text-right">Apuesta</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#233c48]">
                                        <tr className="hover:bg-[#1e2f39] transition-colors group cursor-pointer">
                                            <td className="p-4"><p className="text-white font-medium text-sm">¿Crecerá el PBI de Perú &gt;2% en el Q3?</p></td>
                                            <td className="p-4 text-center"><span className="inline-block px-2 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded uppercase border border-emerald-500/20">SÍ</span></td>
                                            <td className="p-4 text-right text-text-secondary text-sm font-mono">500 pts</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ProfilePage;