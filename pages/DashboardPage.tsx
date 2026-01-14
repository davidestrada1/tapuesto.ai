
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../services/supabaseClient';
import { Routine, Activity, Action } from '../types';

const DashboardPage = () => {
    const navigate = useNavigate();
    const { user, signOut } = useAuth();
    const [routines, setRoutines] = useState<Routine[]>([]);
    const [loadingRoutines, setLoadingRoutines] = useState(true);
    const [newRoutineName, setNewRoutineName] = useState('');
    const [showCreateRoutine, setShowCreateRoutine] = useState(false);
    const [profile, setProfile] = useState<any>(null);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [actions, setActions] = useState<Action[]>([]);
    const [newActivityName, setNewActivityName] = useState('');
    const [showCreateActivity, setShowCreateActivity] = useState(false);

    useEffect(() => {
        if (user) {
            fetchProfile();
            fetchRoutines();
            fetchActivities();
            fetchActions();
        }
    }, [user]);

    const fetchProfile = async () => {
        const { data } = await supabase.from('profiles').select('*').eq('id', user?.id).single();
        setProfile(data);
    };

    const fetchRoutines = async () => {
        try {
            const { data, error } = await supabase.from('routines').select('*').order('created_at', { ascending: false });
            if (error) throw error;
            setRoutines(data || []);
        } catch (error) {
            console.error('Error fetching routines:', error);
        } finally {
            setLoadingRoutines(false);
        }
    };

    const fetchActivities = async () => {
        const { data } = await supabase.from('activities').select('*').order('created_at', { ascending: false });
        setActivities(data || []);
    };

    const fetchActions = async () => {
        const { data } = await supabase.from('actions')
            .select('*, activities(name)')
            .order('created_at', { ascending: false })
            .limit(10);
        setActions(data || []);
    };

    const handleCreateRoutine = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !newRoutineName.trim()) return;

        try {
            const { data, error } = await supabase.from('routines').insert([
                { user_id: user.id, name: newRoutineName, description: 'Creada desde el dashboard' }
            ]).select();

            if (error) throw error;

            if (data) {
                setRoutines([data[0], ...routines]);
                setNewRoutineName('');
                setShowCreateRoutine(false);
            }
        } catch (error) {
            console.error('Error creating routine:', error);
        }
    };

    const handleCreateActivity = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !newActivityName.trim()) return;

        const { data, error } = await supabase.from('activities').insert([
            { user_id: user.id, name: newActivityName, description: 'Actividad personalizada' }
        ]).select();

        if (data) {
            setActivities([data[0], ...activities]);
            setNewActivityName('');
            setShowCreateActivity(false);
        }
    };

    const logAction = async (activityId: string) => {
        if (!user) return;
        const { data, error } = await supabase.from('actions').insert([
            { user_id: user.id, activity_id: activityId, completed_at: new Date().toISOString() }
        ]).select('*, activities(name)');

        if (data) {
            fetchActions();
        }
    };

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
            <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#233c48] bg-[#111c22]/95 backdrop-blur-md px-10 py-3">
                <div className="flex items-center gap-8 cursor-pointer" onClick={() => navigate('/')}>
                    <div className="flex items-center gap-4 text-white">
                        <div className="size-6 text-primary"><span className="material-symbols-outlined">analytics</span></div>
                        <h2 className="text-white text-lg font-bold">tapuesto.ai</h2>
                    </div>
                </div>
                <div className="flex flex-1 justify-end gap-8 items-center">
                    <div className="hidden lg:flex items-center gap-9">
                        <Link to="/dashboard" className="text-white hover:text-primary transition-colors text-sm font-medium">Panel</Link>
                        <Link to="/leaderboard" className="text-[#92b7c9] hover:text-white transition-colors text-sm font-medium">Líderes</Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex flex-col items-end mr-2">
                            <span className="text-xs text-[#92b7c9]">Balance</span>
                            <span className="text-sm font-bold text-white">S/ 0.00</span>
                        </div>
                        <button onClick={handleSignOut} className="text-[#92b7c9] hover:text-white text-sm">Cerrar Sesión</button>
                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-[#233c48] cursor-pointer" onClick={() => navigate('/profile')} style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBId-L4vJ-o2ldU5VGdA9-u3LX5Y30qZUoMAx6ZIULjyGwJQ4V_TA4BCBRJCsX80SxQt_geUydz9KgEJVzHYRY0oaWzfVRC6S5g9qK1z7TegkbIoAZh-yf7kWukLConhgDLFjljVvjswOC-FzZ6iaopiSbp4fldcsCkyNcJOW9RM2OgHgpIxKrKUoxp_wCYYgNrN_lvUwrP4jJHZAlDgDYCFlvWpsLWMFumvm68pyERNgDFGqwjrdLbjSJek48MAWJEzWNzJAWh1Ws")' }}></div>
                    </div>
                </div>
            </header>
            <div className="flex-1 px-4 py-8 md:px-10 lg:px-20 xl:px-40 flex justify-center">
                <div className="layout-content-container flex flex-col max-w-[1280px] flex-1 gap-8">
                    <h1 className="text-white text-[28px] md:text-[32px] font-bold leading-tight text-left">
                        Bienvenido de nuevo, {profile?.nickname || user?.email || 'Usuario'}.
                    </h1>

                    {/* Routines Section */}
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-white text-[22px] font-bold">Mis Rutinas</h2>
                            <button
                                className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors"
                                onClick={() => setShowCreateRoutine(!showCreateRoutine)}
                            >
                                {showCreateRoutine ? 'Cancelar' : '+ Nueva Rutina'}
                            </button>
                        </div>

                        {showCreateRoutine && (
                            <form onSubmit={handleCreateRoutine} className="bg-[#233c48] p-4 rounded-lg border border-[#2d4a58] flex gap-2">
                                <input
                                    type="text"
                                    value={newRoutineName}
                                    onChange={(e) => setNewRoutineName(e.target.value)}
                                    placeholder="Nombre de la rutina..."
                                    className="flex-1 bg-[#1e343f] text-white border border-[#2d4a58] rounded px-3 py-2 outline-none focus:border-primary"
                                />
                                <button type="submit" className="bg-success hover:bg-success/90 text-black font-bold px-4 py-2 rounded">
                                    Guardar
                                </button>
                            </form>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {loadingRoutines ? (
                                <p className="text-[#92b7c9]">Cargando rutinas...</p>
                            ) : routines.length === 0 ? (
                                <p className="text-[#92b7c9]">No tienes rutinas creadas.</p>
                            ) : (
                                routines.map((routine) => (
                                    <div key={routine.id} className="bg-[#233c48] p-4 rounded-lg border border-white/5 shadow-sm hover:border-primary/50 transition-colors cursor-pointer group">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-white font-bold text-lg group-hover:text-primary transition-colors">{routine.name}</h3>
                                            <span className="material-symbols-outlined text-[#92b7c9]">fitness_center</span>
                                        </div>
                                        <p className="text-[#92b7c9] text-sm line-clamp-2">{routine.description || "Sin descripción"}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Activities Section */}
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-white text-[22px] font-bold">Mis Actividades</h2>
                            <button
                                className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors"
                                onClick={() => setShowCreateActivity(!showCreateActivity)}
                            >
                                {showCreateActivity ? 'Cancelar' : '+ Nueva Actividad'}
                            </button>
                        </div>
                        {showCreateActivity && (
                            <form onSubmit={handleCreateActivity} className="bg-[#233c48] p-4 rounded-lg border border-[#2d4a58] flex gap-2">
                                <input
                                    type="text"
                                    value={newActivityName}
                                    onChange={(e) => setNewActivityName(e.target.value)}
                                    placeholder="Nombre de la actividad..."
                                    className="flex-1 bg-[#1e343f] text-white border border-[#2d4a58] rounded px-3 py-2 outline-none focus:border-primary"
                                />
                                <button type="submit" className="bg-success hover:bg-success/90 text-black font-bold px-4 py-2 rounded">Guardar</button>
                            </form>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {activities.map((activity) => (
                                <div key={activity.id} className="bg-[#233c48] p-4 rounded-lg border border-white/5 shadow-sm flex justify-between items-center">
                                    <h3 className="text-white font-bold text-lg">{activity.name}</h3>
                                    <button
                                        onClick={() => logAction(activity.id)}
                                        className="bg-[#2d4a58] hover:bg-primary/50 text-white text-xs px-3 py-1 rounded transition-colors flex items-center gap-1"
                                    >
                                        <span className="material-symbols-outlined text-[14px]">add_circle</span> Registrar
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-4 flex flex-col gap-4">
                        <h3 className="text-white text-[18px] font-bold">Actividad Reciente</h3>
                        <div className="rounded-xl bg-[#233c48] p-4 border border-white/5">
                            <div className="relative pl-4 border-l border-[#2d4a58] space-y-6">
                                {actions.length === 0 ? (
                                    <p className="text-[#92b7c9] text-sm">No hay actividad reciente.</p>
                                ) : actions.map((action) => (
                                    <div key={action.id} className="relative">
                                        <div className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-[#233c48]"></div>
                                        <p className="text-sm text-[#92b7c9]">
                                            <span className="font-bold text-white">Completado:</span> {action.activities?.name || 'Actividad desconocida'}
                                        </p>
                                        <p className="text-xs text-[#92b7c9] mt-1">{new Date(action.completed_at).toLocaleString()}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="flex flex-col gap-2 rounded-lg p-6 bg-[#233c48] border border-white/5 shadow-lg">
                            <div className="flex justify-between items-start">
                                <p className="text-[#92b7c9] text-sm font-medium">Balance Total</p>
                                <span className="material-symbols-outlined text-primary text-[20px]">account_balance_wallet</span>
                            </div>
                            <p className="text-white text-2xl font-bold">S/ 0.00</p>
                            <p className="text-[#0bda57] text-sm font-medium flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">trending_up</span> +0.0%</p>
                        </div>
                        {/* Other stats preserved but reset/static for now */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;