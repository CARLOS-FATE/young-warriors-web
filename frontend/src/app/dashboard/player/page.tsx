'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { fetchFromApi } from '@/lib/api';
import { Player } from '@/features/players/types';
import PlayerRadarChart from '@/components/analytics/RadarChart';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function PlayerDashboard() {
    const { user, logout } = useAuth();
    const [player, setPlayer] = useState<Player | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.relatedId) {
            loadPlayer(user.relatedId);
        } else if (user && !user.relatedId) {
            setLoading(false);
        }
    }, [user]);

    const loadPlayer = async (id: number) => {
        try {
            const data = await fetchFromApi(`/players/${id}`);
            setPlayer(data);
        } catch (err) {
            console.error('Failed to load player data', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading Dashboard...</div>;
    if (!player) return <div className="min-h-screen bg-black text-white flex items-center justify-center">No Player Profile Found. Please contact your coach.</div>;

    // Parse Stats (ensure they are objects/arrays)
    const tacticalStats = typeof player.tacticalStats === 'string' ? JSON.parse(player.tacticalStats) : (player.tacticalStats || {});
    const statsHistory = typeof player.statsHistory === 'string' ? JSON.parse(player.statsHistory || '[]') : (player.statsHistory || []);

    // Fallback mock history if empty for demo
    const displayHistory = statsHistory.length > 0 ? statsHistory : [
        { date: 'Week 1', ppg: 10, rpg: 5, apg: 2 },
        { date: 'Week 2', ppg: 12, rpg: 6, apg: 3 },
        { date: 'Week 3', ppg: 15, rpg: 4, apg: 5 },
        { date: 'Week 4', ppg: 14, rpg: 7, apg: 4 },
        { date: 'Week 5', ppg: 18, rpg: 8, apg: 6 },
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-white pb-20">
            {/* Header / Profile Section */}
            <div className="bg-[#111] border-b border-gray-800 p-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
                    <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-800 rounded-full overflow-hidden border-4 border-[var(--brand)] relative">
                        {player.imageUrl ? (
                            <img src={player.imageUrl} alt={player.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-gray-500">
                                {player.name.charAt(0)}
                            </div>
                        )}
                    </div>
                    <div className="text-center md:text-left flex-1">
                        <h1 className="text-4xl font-black uppercase tracking-wide text-white mb-2">{player.name}</h1>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-400 font-bold uppercase">
                            <span className="bg-gray-800 px-3 py-1 rounded">Position: {player.position}</span>
                            <span className="bg-gray-800 px-3 py-1 rounded">Height: {player.height || '-'}</span>
                            <span className="bg-gray-800 px-3 py-1 rounded">Weight: {player.weight || '-'}</span>
                            <span className="bg-gray-800 px-3 py-1 rounded">Jersey: #23</span>
                        </div>
                    </div>
                    <button onClick={logout} className="text-red-500 hover:text-red-400 font-bold uppercase text-sm mt-4 md:mt-0">
                        Sign Out
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-[#111] p-6 rounded-xl border border-gray-800 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-[var(--brand)]/10 rounded-bl-full -mr-4 -mt-4 transition-all group-hover:bg-[var(--brand)]/20"></div>
                        <h3 className="text-gray-500 text-xs font-bold uppercase mb-1">PPG</h3>
                        <p className="text-4xl font-black text-white">{player.ppg || 0}</p>
                        <p className="text-green-500 text-xs mt-2 font-bold">↑ 2.3 vs last season</p>
                    </div>
                    <div className="bg-[#111] p-6 rounded-xl border border-gray-800 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-bl-full -mr-4 -mt-4 transition-all group-hover:bg-blue-500/20"></div>
                        <h3 className="text-gray-500 text-xs font-bold uppercase mb-1">RPG</h3>
                        <p className="text-4xl font-black text-white">{player.rpg || 0}</p>
                        <p className="text-green-500 text-xs mt-2 font-bold">↑ 0.5 vs last season</p>
                    </div>
                    <div className="bg-[#111] p-6 rounded-xl border border-gray-800 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/10 rounded-bl-full -mr-4 -mt-4 transition-all group-hover:bg-purple-500/20"></div>
                        <h3 className="text-gray-500 text-xs font-bold uppercase mb-1">APG</h3>
                        <p className="text-4xl font-black text-white">{player.apg || 0}</p>
                        <p className="text-gray-500 text-xs mt-2 font-bold">- 0.0 vs last season</p>
                    </div>
                    <div className="bg-[#111] p-6 rounded-xl border border-gray-800 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-orange-500/10 rounded-bl-full -mr-4 -mt-4 transition-all group-hover:bg-orange-500/20"></div>
                        <h3 className="text-gray-500 text-xs font-bold uppercase mb-1">Games Played</h3>
                        <p className="text-4xl font-black text-white">12</p>
                        <p className="text-gray-500 text-xs mt-2 font-bold">Season 2024</p>
                    </div>
                </div>

                {/* Analysis Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Evolution Graph */}
                    <div className="bg-[#111] p-6 rounded-xl border border-gray-800">
                        <h3 className="text-xl font-bold text-white uppercase mb-6 flex items-center gap-2">
                            <span className="w-2 h-6 bg-[var(--brand)] rounded-sm"></span>
                            Performance Evolution
                        </h3>
                        <div className="h-80 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={displayHistory}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                                    <XAxis dataKey="date" stroke="#666" tick={{ fill: '#666', fontSize: 12 }} />
                                    <YAxis stroke="#666" tick={{ fill: '#666', fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#000', borderColor: '#333', color: '#fff' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Legend />
                                    <Line type="monotone" dataKey="ppg" stroke="var(--brand)" strokeWidth={3} dot={{ r: 4, fill: 'var(--brand)' }} activeDot={{ r: 8 }} />
                                    <Line type="monotone" dataKey="rpg" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6' }} />
                                    <Line type="monotone" dataKey="apg" stroke="#a855f7" strokeWidth={3} dot={{ r: 4, fill: '#a855f7' }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Skills Radar */}
                    <div className="bg-[#111] p-6 rounded-xl border border-gray-800">
                        <h3 className="text-xl font-bold text-white uppercase mb-6 flex items-center gap-2">
                            <span className="w-2 h-6 bg-[var(--brand)] rounded-sm"></span>
                            Skill Analysis
                        </h3>
                        <div className="h-80 flex items-center justify-center">
                            <PlayerRadarChart data={
                                Object.entries(tacticalStats).map(([key, value]) => ({
                                    subject: key.charAt(0).toUpperCase() + key.slice(1),
                                    A: Number(value),
                                    fullMark: 10
                                }))
                            } />
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Attendance & Feedback */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-[#111] p-6 rounded-xl border border-gray-800">
                        <h3 className="text-xl font-bold text-white uppercase mb-4">Recent Attendance</h3>
                        <div className="space-y-4">
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-gray-800">
                                    <div>
                                        <p className="text-white font-bold">Training Session</p>
                                        <p className="text-gray-500 text-xs">Jan {20 - i}, 2026 • 18:00</p>
                                    </div>
                                    <span className="px-3 py-1 bg-green-500/10 text-green-500 border border-green-500/20 rounded text-xs font-bold uppercase">Present</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#111] p-6 rounded-xl border border-gray-800">
                        <h3 className="text-xl font-bold text-white uppercase mb-4">Coach Feedback</h3>
                        <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                            <p className="text-yellow-200 text-sm italic">
                                "Great energy on defense today, Carlos. Keep working on your perimeter shooting, especially from the corner."
                            </p>
                            <div className="mt-4 flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-700 rounded-full overflow-hidden">
                                    {/* Coach Img Placeholder */}
                                </div>
                                <div>
                                    <p className="text-white text-xs font-bold uppercase">Coach Pep</p>
                                    <p className="text-gray-500 text-[10px]">Head Coach</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
