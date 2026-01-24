import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../services/supabaseClient';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, loading, signOut } = useAuth();
    const [profile, setProfile] = React.useState<any>(null);

    React.useEffect(() => {
        if (user) {
            fetchProfile();
        } else {
            setProfile(null);
        }
    }, [user]);

    const fetchProfile = async () => {
        try {
            const { data } = await supabase.from('profiles').select('*').eq('id', user?.id).single();
            setProfile(data);
        } catch (error) {
            console.error('Error fetching profile in Header:', error);
        }
    };

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    const isDashboard = location.pathname === '/dashboard';

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
                        <div className="flex items-center justify-center size-8 rounded bg-primary/10 text-primary">
                            <span className="material-symbols-outlined">analytics</span>
                        </div>
                        <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">tapuesto.ai</h2>
                    </div>

                    <nav className="hidden md:flex flex-1 justify-center items-center gap-8">
                        <Link
                            className={`text-sm font-medium transition-colors ${location.pathname === '/mercados' ? 'text-primary' : 'text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-primary'}`}
                            to="/mercados"
                        >
                            Mercados
                        </Link>
                        <a className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-primary transition-colors" href="#">Nosotros</a>
                        <Link
                            className={`text-sm font-medium transition-colors ${location.pathname === '/leaderboard' ? 'text-primary' : 'text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-primary'}`}
                            to="/leaderboard"
                        >
                            Clasificación
                        </Link>
                        {user && (
                            <Link
                                className={`text-sm font-medium transition-colors ${isDashboard ? 'text-primary' : 'text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-primary'}`}
                                to="/dashboard"
                            >
                                Mis Apuestas
                            </Link>
                        )}
                    </nav>

                    <div className="flex items-center gap-4">
                        {loading ? (
                            <div className="hidden sm:flex h-9 w-24 items-center justify-center rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
                        ) : user ? (
                            <div className="flex items-center gap-3">
                                <div className="hidden md:flex flex-col items-end mr-1">
                                    <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">Balance</span>
                                    <span className="text-sm font-black text-slate-900 dark:text-white">S/ 210.00</span>
                                </div>
                                <button onClick={handleSignOut} className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white text-sm transition-colors font-medium">Salir</button>
                                <div
                                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-9 border-2 border-primary/20 cursor-pointer hover:border-primary/50 transition-all"
                                    onClick={() => navigate('/profile')}
                                    style={{ backgroundImage: `url(${profile?.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + user.id})` }}
                                ></div>
                            </div>
                        ) : (
                            <Link
                                to="/register"
                                className="hidden sm:flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-bold text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            >
                                Conectar Billetera
                            </Link>
                        )}
                        <button className="flex md:hidden items-center justify-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
