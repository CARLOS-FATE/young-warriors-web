'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchFromApi } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export default function AdminLogin() {
    const { login, logout } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetchFromApi('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
            });

            if (res.token) {
                setLoading(false);
                setVerifying(true); // Trigger verifying animation

                // Backend now returns { token, user: { ... } }
                const user = res.user;

                // Update Auth Context
                login(res.token, user);

                // Determine redirect path based on role
                let redirectPath = '/admin';

                if (user?.role === 'coach') redirectPath = '/dashboard/coach';
                if (user?.role === 'player') redirectPath = '/dashboard/player';

                // Delay redirect to show animation
                setTimeout(() => {
                    console.log('Redirecting to:', redirectPath);
                    router.push(redirectPath);
                }, 2000);
            } else {
                setError('Invalid credentials');
                setLoading(false);
            }
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Login failed');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-black">
            {/* Background Image & Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center opacity-40 transform scale-105"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2690&auto=format&fit=crop")' }}
            ></div>
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/80 to-transparent"></div>

            {/* Login Card */}
            <div className="relative z-20 w-full max-w-md p-1">
                {/* Glowing Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand)] to-orange-900 rounded-2xl blur opacity-30 animate-pulse"></div>

                <div className="relative bg-black/80 backdrop-blur-xl border border-white/10 p-10 rounded-2xl shadow-2xl">

                    {verifying ? (
                        <div className="text-center py-12">
                            <div className="relative w-20 h-20 mx-auto mb-6">
                                <div className="absolute inset-0 border-4 border-gray-800 rounded-full"></div>
                                <div className="absolute inset-0 border-4 border-[var(--brand)] rounded-full border-t-transparent animate-spin"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-2xl">🏀</span>
                                </div>
                            </div>
                            <h2 className="text-2xl font-black text-white uppercase tracking-widest animate-pulse">
                                Verifying Role...
                            </h2>
                            <p className="text-[var(--brand)] font-mono text-sm mt-2">Access Granted</p>
                        </div>
                    ) : (
                        <>
                            <div className="text-center mb-10">
                                <div className="inline-block p-3 rounded-full bg-[var(--brand)]/10 text-4xl mb-4 border border-[var(--brand)]/20 shadow-[0_0_15px_rgba(249,167,33,0.3)]">
                                    🏀
                                </div>
                                <h1 className="text-4xl font-black text-white uppercase tracking-tighter leading-none mb-2">
                                    Court <span className="text-[var(--brand)]">Side</span>
                                </h1>
                                <p className="text-gray-400 text-xs font-bold tracking-[0.2em] uppercase">
                                    Admin Command Center
                                </p>
                            </div>

                            <form onSubmit={handleLogin} className="space-y-6">
                                {error && (
                                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded text-xs font-bold text-center uppercase tracking-wide">
                                        {error}
                                    </div>
                                )}

                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider ml-1">Username</label>
                                    <input
                                        type="text"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white placeholder-gray-600 focus:border-[var(--brand)] focus:bg-black focus:outline-none transition-all duration-300"
                                        placeholder="ENTER USERNAME"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        disabled={loading}
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider ml-1">Password</label>
                                    <input
                                        type="password"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white placeholder-gray-600 focus:border-[var(--brand)] focus:bg-black focus:outline-none transition-all duration-300"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        disabled={loading}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-[var(--brand)] to-orange-600 text-black font-black py-4 rounded-lg hover:to-orange-500 transition-all duration-300 uppercase tracking-widest shadow-[0_4px_20px_rgba(249,167,33,0.4)] hover:shadow-[0_4px_30px_rgba(249,167,33,0.6)] transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Authenticating...' : 'Enter System'}
                                </button>

                                <a href="/" className="text-gray-500 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors">
                                    ← Return to Public Site
                                </a>


                            </form>
                        </>
                    )}
                </div>
            </div>

            {/* Ambient Particles (Simplified) */}
            <div className="absolute inset-0 pointer-events-none z-10 bg-[url('/noise.png')] opacity-5"></div>
        </div >
    );
}
