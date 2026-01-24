import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import { supabase } from '../services/supabaseClient';
import { BetHistoryItem, DashboardStats } from '../types';

const DashboardPage = () => {
    const navigate = useNavigate();
    const { user, loading: authLoading, signOut } = useAuth();
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) {
            navigate('/register');
        }
    }, [user, authLoading, navigate]);

    // Mock data for betting metrics
    const [stats] = useState<DashboardStats>({
        won: 15,
        lost: 8,
        moneyLost: "S/ 120.00",
        moneyPaid: "S/ 450.00",
        payable: "S/ 50.00",
        receivable: "S/ 210.00",
        percentile: 88,
        riskScore: 65
    });

    const [betHistory] = useState<BetHistoryItem[]>([
        { id: '1', event: '¿Crecimiento PBI Perú > 3%?', counterparty: 'Juan Perez', amount: 'S/ 50.00', status: 'winner', date: '2024-03-15' },
        { id: '2', event: '¿Clasifica Perú al Mundial?', counterparty: 'Maria Garcia', amount: 'S/ 100.00', status: 'pending', date: '2024-03-14' },
        { id: '3', event: '¿Renuncia Ministro de Economía?', counterparty: 'Carlos R.', amount: 'S/ 30.00', status: 'loser', date: '2024-03-10' },
    ]);

    useEffect(() => {
        if (user) {
            fetchProfile();
        } else {
            setLoading(false);
        }
    }, [user]);

    const fetchProfile = async () => {
        try {
            const { data } = await supabase.from('profiles').select('*').eq('id', user?.id).single();
            setProfile(data);
        } catch (error) {
            console.error('Error fetching profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-[#0d151a]">
            {/* Header */}
            <Header />

            <main className="flex-1 px-4 py-8 md:px-10 lg:px-20 max-w-[1400px] mx-auto w-full">
                <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-0.5 rounded bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">Inversor Pro</span>
                        </div>
                        <h1 className="text-white text-3xl md:text-4xl font-black">
                            ¡Hola, {profile?.nickname || 'Usuario'}! 💸
                        </h1>
                        <p className="text-[#92b7c9] mt-2">Aquí tienes el resumen de tu rendimiento en el mercado.</p>
                    </div>

                    <div className="flex gap-3">
                        <button onClick={() => navigate('/create')} className="flex-1 md:flex-none h-11 px-6 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-[20px]">add_circle</span>
                            Nueva Apuesta
                        </button>
                    </div>
                </header>

                {/* Primary Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <StatCard
                        title="Ratio de Victorias"
                        value={`${stats.won}W - ${stats.lost}L`}
                        subtitle={`${Math.round((stats.won / (stats.won + stats.lost)) * 100)}% de efectividad`}
                        icon="trending_up"
                        color="text-success"
                    />
                    <StatCard
                        title="Total Pagado"
                        value={stats.moneyPaid}
                        subtitle="En apuestas ganadas"
                        icon="payments"
                        color="text-blue-400"
                    />
                    <StatCard
                        title="Total Perdido"
                        value={stats.moneyLost}
                        subtitle="En apuestas resueltas"
                        icon="trending_down"
                        color="text-red-400"
                    />
                    <StatCard
                        title="Percentil Global"
                        value={`Top ${100 - stats.percentile}%`}
                        subtitle={`Mejor que el ${stats.percentile}%`}
                        icon="military_tech"
                        color="text-yellow-400"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left & Middle: Detailed Breakdown & History */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Balance Breakdown Section */}
                        <section className="bg-[#111c22] border border-[#233c48] rounded-2xl p-6 shadow-xl">
                            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">account_balance</span>
                                Desglose de Saldos
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl bg-[#0d151a] border border-[#233c48] flex flex-col gap-1">
                                    <span className="text-[11px] text-[#92b7c9] font-bold uppercase tracking-widest">Por Cobrar (Receivable)</span>
                                    <span className="text-xl font-black text-green-400">{stats.receivable}</span>
                                    <p className="text-[10px] text-[#92b7c9]">Dinero que amigos te deben</p>
                                </div>
                                <div className="p-4 rounded-xl bg-[#0d151a] border border-[#233c48] flex flex-col gap-1">
                                    <span className="text-[11px] text-[#92b7c9] font-bold uppercase tracking-widest">Por Pagar (Payable)</span>
                                    <span className="text-xl font-black text-red-400">{stats.payable}</span>
                                    <p className="text-[10px] text-[#92b7c9]">Dinero que debes cancelar</p>
                                </div>
                            </div>
                        </section>

                        {/* Recent History Table */}
                        <section className="bg-[#111c22] border border-[#233c48] rounded-2xl overflow-hidden shadow-xl">
                            <div className="p-6 border-b border-[#233c48] flex justify-between items-center">
                                <h3 className="text-white font-bold">Historial de Apuestas</h3>
                                <button className="text-xs text-primary font-bold hover:underline">Ver Todo</button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-[#0d151a] text-[#92b7c9] text-[10px] uppercase tracking-widest font-black">
                                            <th className="px-6 py-4">Evento / Mercado</th>
                                            <th className="px-6 py-4">Contraparte</th>
                                            <th className="px-6 py-4">Monto</th>
                                            <th className="px-6 py-4">Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#233c48]">
                                        {betHistory.map(bet => (
                                            <tr key={bet.id} className="hover:bg-[#1a282f] transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col">
                                                        <span className="text-white font-bold text-sm">{bet.event}</span>
                                                        <span className="text-[10px] text-[#92b7c9]">{bet.date}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-[#92b7c9] text-sm">{bet.counterparty}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-white font-bold text-sm">{bet.amount}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <StatusBadge status={bet.status} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </div>

                    {/* Right: Risk & Comparison */}
                    <div className="space-y-8">
                        {/* Risk Score Component */}
                        <section className="bg-[#111c22] border border-[#233c48] rounded-2xl p-6 shadow-xl flex flex-col items-center text-center">
                            <h3 className="text-white font-bold mb-6 self-start flex items-center gap-2">
                                <span className="material-symbols-outlined text-red-500">warning</span>
                                Perfil de Riesgo
                            </h3>
                            <div className="relative size-40 flex items-center justify-center">
                                <svg className="size-full" viewBox="0 0 100 100">
                                    <circle className="text-[#233c48] stroke-current" strokeWidth="8" fill="transparent" r="40" cx="50" cy="50" />
                                    <circle className="text-orange-500 stroke-current" strokeWidth="8" strokeLinecap="round" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * stats.riskScore) / 100} fill="transparent" r="40" cx="50" cy="50" transform="rotate(-90 50 50)" />
                                </svg>
                                <div className="absolute flex flex-col items-center">
                                    <span className="text-3xl font-black text-white">{stats.riskScore}</span>
                                    <span className="text-[9px] text-[#92b7c9] font-bold uppercase tracking-widest">Moderado</span>
                                </div>
                            </div>
                            <p className="text-[#92b7c9] text-xs mt-6 leading-relaxed">
                                Tu patrón de apuestas indica un riesgo moderado. Tienes un buen balance entre seguridad y ganancias.
                            </p>
                        </section>

                        {/* Social Comparison */}
                        <section className="bg-gradient-to-br from-primary/20 to-[#111c22] border border-primary/20 rounded-2xl p-6 shadow-xl">
                            <h3 className="text-white font-bold mb-4">Vs. Comunidad</h3>
                            <ul className="space-y-4">
                                <ComparisonRow label="Racha de Ganadas" userValue="5" avgValue="2" />
                                <ComparisonRow label="Apuesta Promedio" userValue="S/ 65" avgValue="S/ 42" />
                                <ComparisonRow label="Velocidad Cobro" userValue="Rápida" avgValue="Media" />
                            </ul>
                            <button className="w-full mt-6 py-2 rounded-lg border border-primary/30 text-primary text-xs font-bold hover:bg-primary/10 transition-colors">
                                Ver Clasificación Completa
                            </button>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
};

// Sub-components for cleaner code
const StatCard = ({ title, value, subtitle, icon, color }: any) => (
    <div className="bg-[#111c22] border border-[#233c48] rounded-2xl p-6 shadow-lg hover:border-primary/30 transition-all group">
        <div className="flex justify-between items-start mb-4">
            <span className={`material-symbols-outlined ${color} group-hover:scale-110 transition-transform`}>{icon}</span>
            <span className="material-symbols-outlined text-[#233c48] text-xs">info</span>
        </div>
        <p className="text-[#92b7c9] text-xs font-bold uppercase tracking-widest mb-1">{title}</p>
        <p className="text-white text-2xl font-black mb-1">{value}</p>
        <p className="text-[#92b7c9] text-[10px]">{subtitle}</p>
    </div>
);

const StatusBadge = ({ status }: { status: string }) => {
    const styles = {
        winner: 'bg-green-500/20 text-green-400 border-green-500/30',
        loser: 'bg-red-500/20 text-red-400 border-red-500/30',
        pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    }[status as keyof typeof styles] || '';

    const labels = { winner: 'Ganada', loser: 'Perdida', pending: 'Pendiente' }[status as keyof typeof labels] || status;

    return (
        <span className={`px-2 py-1 rounded-md text-[10px] font-black border uppercase tracking-widest ${styles}`}>
            {labels}
        </span>
    );
};

const ComparisonRow = ({ label, userValue, avgValue }: any) => (
    <div className="flex flex-col gap-1">
        <div className="flex justify-between text-[11px] font-bold">
            <span className="text-[#92b7c9]">{label}</span>
            <span className="text-white">{userValue} <span className="text-[#92b7c9] font-normal">/ {avgValue}</span></span>
        </div>
        <div className="h-1 bg-[#0d151a] rounded-full overflow-hidden">
            <div className="h-full bg-primary w-[70%]"></div>
        </div>
    </div>
);

export default DashboardPage;