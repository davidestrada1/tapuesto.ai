import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';

const MarketsPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-[#0d151a]">
            {/* Header */}
            <Header />

            <main className="flex-1 px-4 py-8 md:px-10 lg:px-20 max-w-[1400px] mx-auto w-full">
                <div className="mb-8">
                    <h1 className="text-white text-3xl font-black mb-2">Mercados Disponibles 🌎</h1>
                    <p className="text-[#92b7c9]">Explora apuestas públicas y únete al reto.</p>
                </div>

                {/* Mock Markets Grind */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { title: "¿Quién ganará la Champions 2025?", volume: "S/ 1,200", users: 124 },
                        { title: "¿Bitcoin llegará a 100k este mes?", volume: "S/ 5,400", users: 856 },
                        { title: "¿Lloverá en Lima mañana?", volume: "S/ 300", users: 45 },
                    ].map((market, i) => (
                        <div key={i} className="bg-[#111c22] border border-[#233c48] rounded-2xl p-6 hover:border-primary/50 transition-colors cursor-pointer group">
                            <div className="flex justify-between items-start mb-4">
                                <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">public</span>
                                <span className="bg-green-500/10 text-green-500 text-[10px] font-bold px-2 py-1 rounded">ACTIVO</span>
                            </div>
                            <h3 className="text-white font-bold text-lg mb-2 group-hover:text-primary transition-colors">{market.title}</h3>
                            <div className="flex items-center gap-4 text-xs text-[#92b7c9]">
                                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">payments</span> {market.volume}</span>
                                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">group</span> {market.users}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default MarketsPage;
