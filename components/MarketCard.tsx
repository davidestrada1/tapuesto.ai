import React from 'react';
import { Link } from 'react-router-dom';
import { Market } from '../types';

interface MarketCardProps {
    market: Market;
}

const MarketCard: React.FC<MarketCardProps> = ({ market }) => {
    return (
        <div className="flex flex-col rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all group">
            <div className="h-40 bg-cover bg-center relative" style={{ backgroundImage: `url("${market.img}")` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent"></div>
                <div className="absolute bottom-3 left-4">
                    <span className={`bg-${market.tagColor}-500/20 text-${market.tagColor}-300 text-xs font-bold px-2 py-1 rounded backdrop-blur-sm border border-${market.tagColor}-500/30`}>{market.tag}</span>
                </div>
            </div>
            <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                    {market.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6">
                    <span className="material-symbols-outlined text-[16px]">schedule</span> Vence: {market.expiry}
                    <span className="mx-1">•</span>
                    <span className="material-symbols-outlined text-[16px]">bar_chart</span> Vol: {market.volume}
                </div>
                <div className="mt-auto space-y-3">
                    <div className="flex justify-between text-sm font-medium">
                        <span className="text-green-500">Sí {market.yes}%</span>
                        <span className="text-red-500">No {market.no}%</span>
                    </div>
                    <div className="flex h-2 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                        <div className="bg-green-500" style={{ width: `${market.yes}%` }}></div>
                        <div className="bg-red-500" style={{ width: `${market.no}%` }}></div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-2">
                        <Link to="/challenge" className="flex items-center justify-center py-2 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 font-bold text-sm hover:bg-green-500/20 transition-colors">Comprar Sí</Link>
                        <Link to="/challenge" className="flex items-center justify-center py-2 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 font-bold text-sm hover:bg-red-500/20 transition-colors">Comprar No</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketCard;