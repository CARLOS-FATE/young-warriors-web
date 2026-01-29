'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { fetchFromApi } from '@/lib/api';
import { Player } from '@/features/players/types';
import PlayerRadarChart from '@/components/analytics/RadarChart';

export default function PlayerDashboard() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [player, setPlayer] = useState<Player | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;
        loadPlayerData();
    }, [user]);

    const loadPlayerData = async () => {
        try {
            // Assuming we have an endpoint to get "Me" or using the ID from user
            // If user.relatedId is available:
            if (user?.role === 'player' && user.relatedId) {
                const data = await fetchFromApi(`/players/${user.relatedId}`);
                setPlayer(data);
            }
        } catch (error) {
            console.error('Failed to load player data', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-white p-8">Loading Profile...</div>;
    if (!player) return <div className="text-white p-8">Player data not found. Contact your coach.</div>;

    const stats = typeof player.tacticalStats === 'string'
        ? JSON.parse(player.tacticalStats)
        : player.tacticalStats || {};

    const skills = stats.skills || [];

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-8">
            <header className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
                <div>
                    <h1 className="text-3xl font-black uppercase italic">
                        Welcome, <span className="text-[var(--brand)]">{user?.username}</span>
                    </h1>
                    <p className="text-gray-400 text-sm">Player Dashboard</p>
                </div>
                <button
                    onClick={() => { logout(); router.push('/admin/login'); }}
                    className="text-red-500 text-sm font-bold uppercase hover:text-red-400"
                >
                    Logout
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* ID Card */}
                <div className="bg-[#111] border border-gray-800 rounded-2xl p-6 text-center">
                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-[var(--brand)] mb-4">
                        {player.imageUrl ? (
                            <img src={player.imageUrl} alt={player.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-gray-800 flex items-center justify-center text-4xl font-bold">{player.name[0]}</div>
                        )}
                    </div>
                    <h2 className="text-2xl font-black uppercase">{player.name}</h2>
                    <p className="text-[var(--brand)] font-bold tracking-widest">{player.position}</p>

                    <div className="grid grid-cols-3 gap-2 mt-6 border-t border-gray-800 pt-6">
                        <div>
                            <div className="text-2xl font-black">{player.ppg || 0}</div>
                            <div className="text-xs text-gray-500 uppercase font-bold">PPG</div>
                        </div>
                        <div>
                            <div className="text-2xl font-black">{player.rpg || 0}</div>
                            <div className="text-xs text-gray-500 uppercase font-bold">RPG</div>
                        </div>
                        <div>
                            <div className="text-2xl font-black">{player.apg || 0}</div>
                            <div className="text-xs text-gray-500 uppercase font-bold">APG</div>
                        </div>
                    </div>
                </div>

                {/* Skill Radar */}
                <div className="lg:col-span-2 bg-[#111] border border-gray-800 rounded-2xl p-6">
                    <h3 className="text-xl font-bold uppercase mb-4 text-[var(--brand)]">My Skills Analysis</h3>
                    <div className="h-[300px] w-full">
                        {skills.length > 0 ? (
                            <PlayerRadarChart data={skills} />
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-500">
                                No skill data graded yet.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Attendance Section (Placeholder for now, assuming we implement an API for "My Attendance") */}
            <div className="mt-8 bg-[#111] border border-gray-800 rounded-2xl p-6">
                <h3 className="text-xl font-bold uppercase mb-4">Recent Attendance</h3>
                <p className="text-gray-500 italic">Attendance history coming soon...</p>
            </div>
        </div>
    );
}
