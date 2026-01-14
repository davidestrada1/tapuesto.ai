import React from 'react';
import { useParams, Link } from 'react-router-dom';

const ShareMarketPage = () => {
    const { id } = useParams();
    const shareUrl = `https://tapuesto.ai/#/invite/${id}`;
    const shareText = "¡Te he retado en tapuesto.ai! ¿Crees que puedes ganarme? Entra aquí:";

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareUrl);
        alert("¡Link copiado!");
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col items-center justify-center p-6 relative overflow-hidden">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
            
            <div className="relative z-10 max-w-md w-full bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-2xl text-center space-y-6">
                <div className="size-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce">
                    <span className="material-symbols-outlined text-green-500 text-5xl">check_circle</span>
                </div>
                
                <h1 className="text-2xl font-black text-slate-900 dark:text-white">¡Apuesta Creada!</h1>
                <p className="text-slate-500 dark:text-slate-400">Tu mercado está listo. Ahora comparte el link para que tus amigos acepten el reto.</p>

                <div className="bg-slate-50 dark:bg-[#111c22] border border-slate-200 dark:border-slate-700 rounded-lg p-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-slate-400">link</span>
                    <input 
                        readOnly 
                        value={shareUrl} 
                        className="bg-transparent border-none text-sm text-slate-600 dark:text-slate-300 w-full focus:ring-0"
                    />
                    <button onClick={copyToClipboard} className="text-primary font-bold text-sm hover:underline">Copiar</button>
                </div>

                <div className="grid grid-cols-3 gap-3">
                    <a 
                        href={`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`}
                        target="_blank" 
                        rel="noreferrer"
                        className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 transition-colors group"
                    >
                        <span className="text-2xl text-[#25D366] group-hover:scale-110 transition-transform">📱</span>
                        <span className="text-xs font-bold text-[#25D366]">WhatsApp</span>
                    </a>
                    <a 
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                        target="_blank" 
                        rel="noreferrer"
                        className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 transition-colors group"
                    >
                        <span className="text-2xl text-[#1DA1F2] group-hover:scale-110 transition-transform">🐦</span>
                        <span className="text-xs font-bold text-[#1DA1F2]">Twitter</span>
                    </a>
                    <a 
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                        target="_blank" 
                        rel="noreferrer"
                        className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-[#1877F2]/10 hover:bg-[#1877F2]/20 transition-colors group"
                    >
                        <span className="text-2xl text-[#1877F2] group-hover:scale-110 transition-transform">📘</span>
                        <span className="text-xs font-bold text-[#1877F2]">Facebook</span>
                    </a>
                </div>

                <Link to="/dashboard" className="block w-full py-3 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    Ir al Panel
                </Link>
            </div>
        </div>
    );
};

export default ShareMarketPage;