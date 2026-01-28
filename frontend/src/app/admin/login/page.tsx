'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchFromApi } from '@/lib/api';

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetchFromApi('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
            });

            if (res.token) {
                // Store token in cookie (simple client-side storage for now)
                document.cookie = `admin_token=${res.token}; path=/; max-age=7200; Secure; SameSite=Strict`;
                router.push('/admin');
            } else {
                setError('Invalid credentials');
            }
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--background)] p-4">
            <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-black text-[var(--brand)] mb-2 uppercase tracking-wide">
                        Young Warriors
                    </h1>
                    <p className="text-gray-400 text-sm">Admin Access</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm text-center">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-gray-400 text-xs font-bold uppercase mb-2">Username</label>
                        <input
                            type="text"
                            className="w-full bg-black border border-gray-800 rounded-lg p-3 text-[var(--foreground)] focus:border-[var(--brand)] focus:outline-none transition-colors"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-400 text-xs font-bold uppercase mb-2">Password</label>
                        <input
                            type="password"
                            className="w-full bg-black border border-gray-800 rounded-lg p-3 text-[var(--foreground)] focus:border-[var(--brand)] focus:outline-none transition-colors"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[var(--brand)] text-black font-bold py-3 rounded-lg hover:opacity-90 transition-opacity uppercase tracking-wider"
                    >
                        Sign In
                    </button>

                    <div className="text-center mt-4">
                        <a href="/" className="text-gray-600 text-xs hover:text-gray-400 transition-colors">
                            ← Back to Website
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}
