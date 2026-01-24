import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const LeaderboardPage = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow flex flex-col items-center w-full">
                <div className="w-full max-w-[1200px] px-4 md:px-10 py-6 md:py-10">
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-transparent p-8 md:p-12 text-center border border-gray-200 dark:border-[#233c48]">
                        <h1 className="text-3xl md:text-5xl font-black leading-tight tracking-[-0.033em]">Ciudadanos Sabios: <span className="text-primary">Mejores Predictores</span></h1>
                        <p className="text-base md:text-lg text-slate-600 dark:text-[#92b7c9] max-w-2xl mx-auto mt-2">Midiendo la inteligencia colectiva del Perú. Sube de rango haciendo predicciones precisas.</p>
                    </div>
                </div>
                <div className="w-full max-w-[1200px] px-4 md:px-10 pb-20 flex flex-col gap-8">
                    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end mb-4">
                        {/* Leader 2 */}
                        <div className="order-2 md:order-1 flex flex-col bg-white dark:bg-surface-dark border border-gray-200 dark:border-[#233c48] rounded-xl p-6 relative overflow-hidden shadow-lg">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="relative">
                                    <div className="w-16 h-16 rounded-full bg-cover bg-center ring-4 ring-gray-300 dark:ring-slate-600" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCblme3Nn2aMhgTwl05OEFox0hHJj-wUO7AheAm4edH38DlmyNl1jQp45QAATiYo3QDBwgMI99VhrStDOzmhRq5e22wqt60B9Mob1ttdpnnMzM7Rj6K0wtbSsZMznlqHBpgKBYREIVPvblssbG04rAmxRv161uf02r1CpjpYSpMiIsC9_fgaRgr30cpjmXClDn8xUkuw_L_JhWdrHd5EpvJzCAEdTRu0I_SgNs4sDNYMLH1hhVcKFlFsOMByMckjm3qofRRq4uUqnc')" }}></div>
                                    <div className="absolute -bottom-2 -right-2 bg-gray-300 dark:bg-slate-600 text-slate-800 dark:text-white text-xs font-bold px-2 py-0.5 rounded-full">#2</div>
                                </div>
                                <div><h3 className="text-lg font-bold">LimaOracle</h3><p className="text-slate-500 dark:text-slate-400 text-sm">Nivel Plata</p></div>
                            </div>
                            <div className="flex justify-between items-end"><div className="flex flex-col"><span className="text-xs text-slate-500 font-bold uppercase">Elo</span><span className="text-2xl font-black">2,350</span></div></div>
                        </div>
                        {/* Leader 1 */}
                        <div className="order-1 md:order-2 flex flex-col bg-white dark:bg-surface-dark border-2 border-primary/50 rounded-xl p-6 relative overflow-hidden shadow-xl shadow-primary/10 z-10 scale-105">
                            <div className="flex flex-col items-center text-center mb-6 relative">
                                <div className="relative mb-3">
                                    <div className="w-24 h-24 rounded-full bg-cover bg-center ring-4 ring-yellow-400" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA05jZyOwHm1ETKfREOsunn5brbjBLbOlZvceBN2ooGWUaMSjhojqFoKdl0RFJeKbw6oNmzU0AC-_K0bQrNu7wNY0a-15iEu5bf2jO5nXUYzcIx2Bqyjn3hSeAp-WdBu799Ic5VjY77mx79hZ4BYLCN9xxyrpmGsoIYG4JDZ6-eyYeHOqGC8vPZR1AzKthQGAnFhlZuzXL6LPM6V0Hpn0LG5woHXQokPijg51W4o3CjHlc8EmvzHRtV2zLz56KBi3PCqSZ1SRMJTcI')" }}></div>
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2"><span className="material-symbols-outlined text-yellow-400 text-3xl">crown</span></div>
                                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-sm font-bold px-3 py-0.5 rounded-full">#1</div>
                                </div>
                                <h3 className="text-xl font-bold mt-2">ElSabio_PE</h3>
                                <p className="text-primary text-sm font-medium">Gran Maestro</p>
                            </div>
                            <div className="mt-auto border-t border-gray-100 dark:border-slate-700/50 pt-4">
                                <div className="flex justify-between items-end"><div className="flex flex-col"><span className="text-xs text-slate-500 font-bold uppercase">Elo</span><span className="text-4xl font-black text-primary">2,400</span></div></div>
                            </div>
                        </div>
                        {/* Leader 3 */}
                        <div className="order-3 md:order-3 flex flex-col bg-white dark:bg-surface-dark border border-gray-200 dark:border-[#233c48] rounded-xl p-6 relative overflow-hidden shadow-lg">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="relative">
                                    <div className="w-16 h-16 rounded-full bg-cover bg-center ring-4 ring-amber-700/50" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC9LU2CrB-GMKcYbVFh5SRfm8w8hiiJUsBIBleOH24AtgvmI14b3fW1cvDC9HsHvBIeSoljvPGwhXSmSRMWu9fw9OC_YmHFt2vtXinYJCkjcsXbCiWK90Fvjvg0AGDbPG8hLqg8DoFrcB9aI6tuju006wTyvq1UBqbXZXWfse7CyEDhFQH1K4pLpEOMJ7V1BcN82JDwCezD4CgQZ4PVMlMz3xIuyYljXnSv5qY2mG6NWjYa5oK_oFFOb8O384Quyi2yeCgRUNzOoDk')" }}></div>
                                    <div className="absolute -bottom-2 -right-2 bg-amber-700/80 text-white text-xs font-bold px-2 py-0.5 rounded-full">#3</div>
                                </div>
                                <div><h3 className="text-lg font-bold">CuscoData</h3><p className="text-slate-500 dark:text-slate-400 text-sm">Nivel Bronce</p></div>
                            </div>
                            <div className="flex justify-between items-end"><div className="flex flex-col"><span className="text-xs text-slate-500 font-bold uppercase">Elo</span><span className="text-2xl font-black">2,310</span></div></div>
                        </div>
                    </section>

                    <div className="bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-[#233c48] overflow-hidden shadow-sm">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-[#1c2e36] border-b border-gray-200 dark:border-[#233c48]">
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-20 text-center">Rango</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Ciudadano Sabio</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Elo</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-[#233c48]">
                                {[
                                    { rank: 4, name: "TrujilloReader", elo: "2,280", color: "indigo" },
                                    { rank: 5, name: "AndesNomad", elo: "2,150", color: "purple" },
                                    { rank: 6, name: "AmazonWatcher", elo: "2,115", color: "emerald" },
                                ].map((user, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-[#1c2e36] transition-colors">
                                        <td className="p-4 text-center font-bold text-slate-600 dark:text-slate-400">{user.rank}</td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`size-8 rounded-full bg-${user.color}-500 flex items-center justify-center text-white font-bold text-xs`}>{user.name.substring(0, 2)}</div>
                                                <span className="text-sm font-bold text-slate-900 dark:text-white">{user.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-right font-bold text-slate-900 dark:text-white">{user.elo}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default LeaderboardPage;