'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { fetchFromApi } from '@/lib/api';
import { Player } from '@/features/players/types';
import PlayerRadarChart from '@/components/analytics/RadarChart';

export default function CoachDashboard() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [players, setPlayers] = useState<Player[]>([]);
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
    const [isGrading, setIsGrading] = useState(false);
    const [loading, setLoading] = useState(true);

    // Initial grading state
    const [grades, setGrades] = useState<any[]>([]);

    useEffect(() => {
        if (!user) return;
        loadRoster();
    }, [user]);

    const loadRoster = async () => {
        try {
            const data = await fetchFromApi('/players');
            setPlayers(data);
        } catch (error) {
            console.error('Failed to load roster', error);
        } finally {
            setLoading(false);
        }
    };

    const openGrading = (player: Player) => {
        setSelectedPlayer(player);
        const stats = typeof player.tacticalStats === 'string'
            ? JSON.parse(player.tacticalStats)
            : player.tacticalStats || {};

        // Default skills if empty
        const defaultSkills = [
            { subject: 'Defense', A: 5, fullMark: 10 },
            { subject: 'Shooting', A: 5, fullMark: 10 },
            { subject: 'Passing', A: 5, fullMark: 10 },
            { subject: 'Stamina', A: 5, fullMark: 10 },
            { subject: 'IQ', A: 5, fullMark: 10 },
            { subject: 'Speed', A: 5, fullMark: 10 },
        ];

        setGrades(stats.skills || defaultSkills);
        setIsGrading(true);
    };

    const handleGradeChange = (subject: string, value: number) => {
        setGrades(prev => prev.map(skill =>
            skill.subject === subject ? { ...skill, A: value } : skill
        ));
    };

    const saveGrades = async () => {
        if (!selectedPlayer) return;
        try {
            const currentStats = typeof selectedPlayer.tacticalStats === 'string'
                ? JSON.parse(selectedPlayer.tacticalStats)
                : selectedPlayer.tacticalStats || {};

            const updatedStats = {
                ...currentStats,
                skills: grades
            };

            await fetchFromApi(`/players/${selectedPlayer.id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    ...selectedPlayer,
                    tacticalStats: updatedStats
                })
            });

            alert('Grades updated successfully!');
            setIsGrading(false);
            loadRoster(); // Refresh
        } catch (error) {
            console.error('Failed to save grades', error);
            alert('Failed to save grades');
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-8">
            <header className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
                <div>
                    <h1 className="text-3xl font-black uppercase italic">
                        Coach <span className="text-[var(--brand)]">{user?.username}</span>
                    </h1>
                    <p className="text-gray-400 text-sm">Team Management Dashboard</p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => router.push('/admin/attendance')}
                        className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors"
                    >
                        Attendance Sheet
                    </button>
                    <button
                        onClick={() => { logout(); router.push('/admin/login'); }}
                        className="text-red-500 text-sm font-bold uppercase hover:text-red-400 border border-red-500/30 px-4 rounded hover:bg-red-500/10"
                    >
                        Logout
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Roster List */}
                <div className="lg:col-span-2">
                    <h2 className="text-xl font-bold uppercase mb-4 text-[var(--brand)]">My Roster</h2>
                    <div className="bg-[#111] border border-gray-800 rounded-2xl overflow-hidden">
                        {loading ? (
                            <div className="p-8 text-center text-gray-500">Loading Roster...</div>
                        ) : (
                            <table className="w-full text-left">
                                <thead className="bg-black text-gray-500 text-xs uppercase font-bold">
                                    <tr>
                                        <th className="p-4">Player</th>
                                        <th className="p-4">Position</th>
                                        <th className="p-4 text-center">Avg Grade</th>
                                        <th className="p-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800">
                                    {players.map(player => {
                                        const stats = typeof player.tacticalStats === 'string'
                                            ? JSON.parse(player.tacticalStats)
                                            : player.tacticalStats || {};
                                        const avg = stats.skills
                                            ? (stats.skills.reduce((acc: number, curr: any) => acc + curr.A, 0) / stats.skills.length).toFixed(1)
                                            : '-';

                                        return (
                                            <tr key={player.id} className="hover:bg-white/5 transition-colors group">
                                                <td className="p-4 font-bold">{player.name}</td>
                                                <td className="p-4 text-gray-400 text-sm">{player.position}</td>
                                                <td className="p-4 text-center font-mono text-[var(--brand)]">{avg}</td>
                                                <td className="p-4 text-right">
                                                    <button
                                                        onClick={() => openGrading(player)}
                                                        className="bg-[var(--brand)] text-black text-xs font-bold uppercase px-3 py-1 rounded hover:opacity-90 transition-opacity"
                                                    >
                                                        Grade
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                {/* Grading Panel (conditionally rendered or side panel) */}
                <div className="bg-[#111] border border-gray-800 rounded-2xl p-6 h-fit sticky top-8">
                    {isGrading && selectedPlayer ? (
                        <div className="animate-fadeIn">
                            <h3 className="text-xl font-bold uppercase mb-2">Grading: <span className="text-[var(--brand)]">{selectedPlayer.name}</span></h3>
                            <p className="text-gray-500 text-xs mb-6">Adjust skill levels (1-10)</p>

                            <div className="space-y-4 mb-6">
                                {grades.map((skill) => (
                                    <div key={skill.subject}>
                                        <div className="flex justify-between text-xs font-bold uppercase mb-1">
                                            <span>{skill.subject}</span>
                                            <span className="text-[var(--brand)]">{skill.A}</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="10"
                                            value={skill.A}
                                            onChange={(e) => handleGradeChange(skill.subject, parseInt(e.target.value))}
                                            className="w-full accent-[var(--brand)] bg-gray-700 h-2 rounded-lg appearance-none cursor-pointer"
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="mb-6 h-[200px]">
                                <PlayerRadarChart data={grades} />
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={saveGrades}
                                    className="flex-1 bg-[var(--brand)] text-black font-bold py-3 rounded hover:opacity-90"
                                >
                                    Save Grades
                                </button>
                                <button
                                    onClick={() => setIsGrading(false)}
                                    className="flex-1 bg-gray-800 text-white font-bold py-3 rounded hover:bg-gray-700"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            <div className="text-4xl mb-4">📋</div>
                            <p>Select a player to start grading skills.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
