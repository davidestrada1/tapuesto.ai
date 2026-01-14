import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SettleBetPage = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState<File | null>(null);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col items-center p-6">
            <header className="w-full max-w-2xl flex items-center mb-8">
                <button onClick={() => navigate('/dashboard')} className="text-slate-500 hover:text-white flex items-center gap-2">
                    <span className="material-symbols-outlined">arrow_back</span>
                    Volver
                </button>
            </header>

            <div className="max-w-xl w-full bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-slate-700 p-8 shadow-xl">
                <h1 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Reportar Resultados</h1>
                <p className="text-slate-500 dark:text-slate-400 mb-8">Sube la evidencia acordada para cerrar la apuesta y liberar los fondos.</p>

                <div className="mb-6 p-4 bg-slate-50 dark:bg-[#111c22] rounded-xl border border-slate-200 dark:border-slate-700">
                    <p className="text-xs text-slate-500 font-bold uppercase mb-1">Requisito de Prueba</p>
                    <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold">
                        <span className="material-symbols-outlined text-primary">receipt_long</span>
                        Voucher de Yape / Plin / Transferencia
                    </div>
                </div>

                <div 
                    className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('fileUpload')?.click()}
                >
                    <input type="file" id="fileUpload" className="hidden" onChange={(e) => e.target.files && setFile(e.target.files[0])} />
                    
                    {file ? (
                        <>
                            <span className="material-symbols-outlined text-green-500 text-5xl mb-4">check_circle</span>
                            <p className="font-bold text-slate-900 dark:text-white">{file.name}</p>
                            <p className="text-xs text-slate-500 mt-2">Click para cambiar</p>
                        </>
                    ) : (
                        <>
                            <span className="material-symbols-outlined text-slate-400 text-5xl mb-4">cloud_upload</span>
                            <p className="font-bold text-slate-900 dark:text-white">Arrastra tu comprobante aquí</p>
                            <p className="text-xs text-slate-500 mt-2">o haz click para buscar</p>
                        </>
                    )}
                </div>

                <div className="mt-8 flex gap-4">
                    <button onClick={() => navigate('/dashboard')} className="flex-1 py-3 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">Cancelar</button>
                    <button 
                        disabled={!file}
                        className="flex-1 py-3 bg-primary disabled:bg-slate-400 text-white font-bold rounded-lg shadow-lg hover:bg-primary/90 transition-all"
                        onClick={() => { alert('Enviado a revisión'); navigate('/dashboard'); }}
                    >
                        Enviar Prueba
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettleBetPage;