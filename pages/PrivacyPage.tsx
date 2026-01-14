import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrivacyPage = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen p-8 md:p-12 font-display text-slate-900 dark:text-white">
            <button onClick={() => navigate(-1)} className="mb-8 flex items-center gap-2 text-primary font-bold">
                <span className="material-symbols-outlined">arrow_back</span> Volver
            </button>
            <div className="max-w-3xl mx-auto prose dark:prose-invert">
                <h1 className="text-4xl font-black mb-8">Política de Privacidad</h1>
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">Última actualización: 20 de Mayo, 2024</p>
                
                <h2 className="text-2xl font-bold mt-8 mb-4">1. Recopilación de Información</h2>
                <p>En tapuesto.ai, recopilamos información necesaria para la operación del mercado de predicciones, incluyendo datos de perfil (apodo, correo electrónico) y datos transaccionales relacionados con sus apuestas.</p>

                <h2 className="text-2xl font-bold mt-8 mb-4">2. Uso de Datos Financieros</h2>
                <p>No almacenamos directamente la información de sus tarjetas de crédito o cuentas bancarias. Utilizamos procesadores de pago seguros y regulados para gestionar las transacciones en Soles (PEN).</p>

                <h2 className="text-2xl font-bold mt-8 mb-4">3. Compartir con Terceros</h2>
                <p>No vendemos sus datos personales. La información pública de sus predicciones (historial de apuestas) es visible en la plataforma para fines de cálculo de reputación (Elo).</p>

                <h2 className="text-2xl font-bold mt-8 mb-4">4. Seguridad</h2>
                <p>Implementamos medidas de seguridad estándar de la industria para proteger sus datos. Sin embargo, ninguna transmisión por internet es 100% segura.</p>
            </div>
        </div>
    );
};

export default PrivacyPage;