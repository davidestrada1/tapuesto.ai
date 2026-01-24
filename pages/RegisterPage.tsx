import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../services/supabaseClient';
import Header from '../components/Header';

const countries = [
    { code: '+51', name: 'Perú', flag: '🇵🇪' },
    { code: '+54', name: 'Argentina', flag: '🇦🇷' },
    { code: '+56', name: 'Chile', flag: '🇨🇱' },
    { code: '+57', name: 'Colombia', flag: '🇨🇴' },
    { code: '+52', name: 'México', flag: '🇲🇽' },
    { code: '+1', name: 'USA', flag: '🇺🇸' },
    { code: '+34', name: 'España', flag: '🇪🇸' },
];

const RegisterPage = () => {
    const navigate = useNavigate();
    const { user, loading: authLoading } = useAuth();

    // Form fields
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [countryCode, setCountryCode] = useState('+51');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // States
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    // Validation states
    const [nicknameStatus, setNicknameStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');
    const [emailStatus, setEmailStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');

    useEffect(() => {
        if (!authLoading && user) {
            navigate('/dashboard');
        }
    }, [user, authLoading, navigate]);

    // real-time nickname check
    useEffect(() => {
        if (nickname.length < 3) {
            setNicknameStatus('idle');
            return;
        }

        const timer = setTimeout(async () => {
            setNicknameStatus('checking');
            const { data, error } = await supabase
                .from('profiles')
                .select('nickname')
                .eq('nickname', nickname)
                .maybeSingle();

            if (data) setNicknameStatus('taken');
            else setNicknameStatus('available');
        }, 500);

        return () => clearTimeout(timer);
    }, [nickname]);

    // real-time email check
    useEffect(() => {
        if (!email.includes('@')) {
            setEmailStatus('idle');
            return;
        }

        const timer = setTimeout(async () => {
            setEmailStatus('checking');
            // Check if email exists in auth (indirectly via profile if email stored there, but here we can't check auth.users directly)
            // For now, we'll just check if it's already in the profiles if we had it there, 
            // but ideally we check during signUp. 
            // In Supabase, signUp will throw an error if email exists.
            setEmailStatus('idle');
        }, 500);

        return () => clearTimeout(timer);
    }, [email]);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (nicknameStatus === 'taken') {
            setError('Este apodo ya está en uso.');
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            setLoading(false);
            return;
        }

        const fullPhone = `${countryCode}${phone}`;

        try {
            // Check for duplicate phone in profiles (optional but good practice)
            const { data: phoneCheck } = await supabase
                .from('profiles')
                .select('id')
                .eq('phone', fullPhone)
                .maybeSingle();

            if (phoneCheck) {
                throw new Error('Este número de teléfono ya está registrado.');
            }

            const { data: authData, error: authError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        nickname: nickname,
                        phone: fullPhone
                    }
                }
            });

            if (authError) throw authError;

            if (authData.user) {
                const { error: profileError } = await supabase
                    .from('profiles')
                    .insert([
                        {
                            id: authData.user.id,
                            nickname: nickname,
                            phone: fullPhone,
                            updated_at: new Date().toISOString(),
                        },
                    ]);

                if (profileError) throw profileError;

                // If everything is ok, redirect or show "Check email"
                navigate('/dashboard');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
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
                    <div className="relative z-20 px-12 py-16 mt-auto">
                        <div className="max-w-xl space-y-6">
                            <h1 className="text-5xl font-black leading-tight tracking-[-0.02em] text-white">Sé partre de la élite de predicción</h1>
                            <p className="text-lg text-slate-300 font-medium leading-relaxed">Únete a miles de peruanos que ya están ganando reputación y premios por su conocimiento.</p>
                        </div>
                    </div>
                </div>

                <div className="flex w-full lg:w-1/2 flex-col overflow-y-auto bg-background-light dark:bg-background-dark">
                    <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-20 xl:px-32">
                        <div className="mx-auto w-full max-w-md space-y-8">
                            <div>
                                <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-2">Crear Cuenta</h2>
                                <p className="text-slate-500 dark:text-slate-400">Ingresa tus datos para conectar tu billetera y empezar.</p>
                            </div>

                            {error && (
                                <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">error</span>
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleRegister} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="nickname">Apodo Único</label>
                                    <div className="relative">
                                        <input
                                            className={`block w-full rounded-xl border-1 py-3 px-4 text-slate-900 ring-1 ring-inset transition-all sm:text-sm dark:bg-slate-800/50 dark:text-white ${nicknameStatus === 'taken' ? 'ring-red-500' :
                                                    nicknameStatus === 'available' ? 'ring-green-500' : 'ring-slate-300 dark:ring-slate-700'
                                                } focus:ring-2 focus:ring-primary outline-none`}
                                            id="nickname"
                                            type="text"
                                            placeholder="ej: predictor_master"
                                            value={nickname}
                                            onChange={(e) => setNickname(e.target.value.toLowerCase().replace(/\s/g, ''))}
                                            required
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            {nicknameStatus === 'checking' && <div className="size-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>}
                                            {nicknameStatus === 'available' && <span className="material-symbols-outlined text-green-500 text-[18px]">check_circle</span>}
                                            {nicknameStatus === 'taken' && <span className="material-symbols-outlined text-red-500 text-[18px]">cancel</span>}
                                        </div>
                                    </div>
                                    {nicknameStatus === 'taken' && <p className="mt-1 text-[11px] text-red-500 font-medium">Este apodo ya está siendo usado por otro predictor.</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="phone">Número de Celular</label>
                                    <div className="flex gap-2">
                                        <select
                                            value={countryCode}
                                            onChange={(e) => setCountryCode(e.target.value)}
                                            className="block w-[90px] rounded-xl border-1 py-3 px-3 text-slate-900 ring-1 ring-inset ring-slate-300 dark:bg-slate-800/50 dark:text-white dark:ring-slate-700 outline-none text-sm"
                                        >
                                            {countries.map(c => (
                                                <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                                            ))}
                                        </select>
                                        <input
                                            className="block flex-1 rounded-xl border-1 py-3 px-4 text-slate-900 ring-1 ring-inset ring-slate-300 dark:bg-slate-800/50 dark:text-white dark:ring-slate-700 focus:ring-2 focus:ring-primary outline-none sm:text-sm"
                                            id="phone"
                                            type="tel"
                                            placeholder="999 999 999"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                                            required
                                        />
                                    </div>
                                </div>

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

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="relative">
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
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="confirmPassword">Confirmar</label>
                                        <input
                                            className="block w-full rounded-xl border-1 py-3 px-4 text-slate-900 ring-1 ring-inset ring-slate-300 dark:bg-slate-800/50 dark:text-white dark:ring-slate-700 focus:ring-2 focus:ring-primary outline-none sm:text-sm"
                                            id="confirmPassword"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="••••••••"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <button
                                    className="flex w-full justify-center rounded-xl bg-primary px-4 py-4 text-sm font-black text-white shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                                    type="submit"
                                    disabled={loading || authLoading || nicknameStatus === 'taken'}
                                >
                                    {loading ? (
                                        <div className="flex items-center gap-2">
                                            <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Creando cuenta...
                                        </div>
                                    ) : 'Registrarse y Conectar'}
                                </button>
                            </form>

                            <div className="text-center text-sm">
                                <span className="text-slate-500 dark:text-slate-400">¿Ya tienes cuenta? </span>
                                <Link to="/login" className="text-primary font-bold hover:underline">Inicia Sesión</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;