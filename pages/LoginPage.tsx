import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../services/supabaseClient';
import Header from '../components/Header';

const LoginPage = () => {
    const navigate = useNavigate();
    const { user, loading } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginLoading, setLoginLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    React.useEffect(() => {
        if (!loading && user) {
            navigate('/dashboard');
        }
    }, [user, loading, navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoginLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <div className="relative hidden lg:flex w-1/2 flex-col justify-between bg-background-dark overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/60 to-transparent z-10"></div>
                        <div className="h-full w-full bg-cover bg-center opacity-50 mix-blend-overlay" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAskeqNMu4pBebh8D-_Rw_6Z6606rCh38yqckZ0aFrHhE3K2Xq2jj3qX56aQDkzgTNeWwGkoPr1ZvYgXbEdQoekzBRb-XeGsjCQKRmfKbXU_hjaVautpcM2WDdaMpVVLojvROS9i2uMdkbp3ou1l1gYo6-sDOF24gDZiJ49t3EmqiK_u37wsPU85ySgxQE9hAUV_IPflKkq6FnU012hTbsGxzUCSLPGeqBykds1zNmE9_kRyW97qYzCSEO9I1gQvY7ImrXCzqmWrng")' }}></div>
                    </div>
                    <div className="relative z-20 px-12 py-10 cursor-pointer" onClick={() => navigate('/')}>
                        <div className="flex items-center gap-3 text-white">
                            <div className="size-8 text-primary">
                                <span className="material-symbols-outlined">analytics</span>
                            </div>
                            <span className="text-xl font-bold tracking-tight">tapuesto.ai</span>
                        </div>
                    </div>
                    <div className="relative z-20 px-12 py-16 mt-auto">
                        <div className="max-w-xl space-y-6">
                            <h1 className="text-5xl font-black leading-tight tracking-[-0.02em] text-white">Bienvenido de nuevo</h1>
                            <p className="text-lg text-slate-300 font-medium leading-relaxed">Continúa prediciendo y ganando en el mercado líder de Perú.</p>
                        </div>
                    </div>
                </div>
                <div className="flex w-full lg:w-1/2 flex-col overflow-y-auto bg-background-light dark:bg-background-dark">
                    <div className="flex flex-1 flex-col justify-center px-6 py-4 lg:px-20 xl:px-32">
                        <div className="mx-auto w-full max-w-md space-y-8">
                            <div className="text-center lg:text-left">
                                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">Iniciar Sesión</h2>
                                <p className="text-slate-500 dark:text-slate-400">Ingresa tus credenciales para acceder.</p>
                            </div>
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}
                            <form onSubmit={handleLogin} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="email">Email</label>
                                    <input
                                        className="block w-full rounded-xl border-1 py-3 px-4 text-slate-900 ring-1 ring-inset ring-slate-300 dark:bg-slate-800/50 dark:text-white dark:ring-slate-700 focus:ring-2 focus:ring-primary outline-none sm:text-sm"
                                        id="email"
                                        type="email"
                                        placeholder="tu@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="password">Contraseña</label>
                                    <div className="relative">
                                        <input
                                            className="block w-full rounded-xl border-1 py-3 px-4 pr-10 text-slate-900 ring-1 ring-inset ring-slate-300 dark:bg-slate-800/50 dark:text-white dark:ring-slate-700 focus:ring-2 focus:ring-primary outline-none sm:text-sm"
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-primary transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                                        </button>
                                    </div>
                                </div>
                                <button
                                    className="flex w-full justify-center rounded-xl bg-primary px-4 py-4 text-sm font-black text-white shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                                    type="submit"
                                    disabled={loginLoading || loading}
                                >
                                    {loginLoading ? (
                                        <div className="flex items-center gap-2">
                                            <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Iniciando sesión...
                                        </div>
                                    ) : 'Iniciar Sesión'}
                                </button>
                            </form>
                            <div className="text-center text-sm">
                                <span className="text-slate-500 dark:text-slate-400">¿No tienes cuenta? </span>
                                <Link to="/register" className="text-primary font-bold hover:underline">Regístrate</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
