"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getPlayers } from '@/features/players/service';
import { Player } from '@/features/players/types';
import { getAttendanceByDate, saveAttendance } from '@/features/attendance/service';
import { AttendanceRecord, AttendanceStatus } from '@/features/attendance/types';
import Link from 'next/link';

export default function CoachDashboard() {
    const { user, logout } = useAuth();
    const [players, setPlayers] = useState<Player[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'dashboard' | 'roster' | 'attendance'>('dashboard');

    // Attendance State
    const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
    const [attendanceMap, setAttendanceMap] = useState<Record<number, AttendanceStatus>>({});
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState('');

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (activeTab === 'attendance') {
            loadAttendanceForDate(attendanceDate);
        }
    }, [activeTab, attendanceDate, players]);

    const loadData = async () => {
        try {
            const data = await getPlayers();
            setPlayers(data);
        } catch (err) {
            console.error('Failed to load team data', err);
        } finally {
            setLoading(false);
        }
    };

    const loadAttendanceForDate = async (date: string) => {
        try {
            const records = await getAttendanceByDate(date);
            // Create map from records
            const map: Record<number, AttendanceStatus> = {};
            // Initialize all players as present (or default) if no record,
            // BUT actually we want to see what is saved.
            // If no record exists, maybe we leave it undefined or default to 'present'?
            // Let's iterate players and check records.
            players.forEach(p => {
                const record = records.find(r => r.player_id === p.id);
                map[p.id] = record ? record.status : 'present';
            });
            setAttendanceMap(map);
        } catch (err) {
            console.error('Failed to load attendance', err);
        }
    };

    const handleAttendanceChange = (playerId: number, status: AttendanceStatus) => {
        setAttendanceMap(prev => ({
            ...prev,
            [playerId]: status
        }));
    };

    const handleSaveAttendance = async () => {
        setIsSaving(true);
        setSaveMessage('');
        try {
            const records = players.map(p => ({
                player_id: p.id,
                status: attendanceMap[p.id] || 'present'
            }));

            await saveAttendance({
                date: attendanceDate,
                records
            });
            setSaveMessage('Attendance saved successfully!');
            setTimeout(() => setSaveMessage(''), 3000);
        } catch (err) {
            console.error('Failed to save attendance', err);
            setSaveMessage('Failed to save.');
        } finally {
            setIsSaving(false);
        }
    };

    // Calculate Team Averages
    const teamStats = {
        ppg: (players.reduce((acc, p) => acc + (Number(p.ppg) || 0), 0) / (players.length || 1)).toFixed(1),
        rpg: (players.reduce((acc, p) => acc + (Number(p.rpg) || 0), 0) / (players.length || 1)).toFixed(1),
        apg: (players.reduce((acc, p) => acc + (Number(p.apg) || 0), 0) / (players.length || 1)).toFixed(1),
    };

    if (loading) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading Coach Dashboard...</div>;

    return (
        <div className="min-h-screen bg-[#050505] text-white pb-20">
            {/* Header */}
            <div className="bg-[#111] border-b border-gray-800 p-8">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-black uppercase text-white mb-1">Coach Dashboard</h1>
                        <p className="text-gray-400 text-sm">Welcome, Coach {user?.username}!</p>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={logout} className="bg-gray-800 text-white font-bold uppercase px-4 py-2 rounded hover:bg-gray-700">
                            Sign Out
                        </button>
                    </div>
                </div>
                {/* Tabs */}
                {/* ... same tabs ... */}
                <div className="max-w-7xl mx-auto mt-8 flex gap-6 border-b border-gray-800">
                    <button
                        onClick={() => setActiveTab('dashboard')}
                        className={`pb-4 text-sm font-bold uppercase tracking-wide transition-colors ${activeTab === 'dashboard' ? 'text-[var(--brand)] border-b-2 border-[var(--brand)]' : 'text-gray-500 hover:text-white'}`}
                    >
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('roster')}
                        className={`pb-4 text-sm font-bold uppercase tracking-wide transition-colors ${activeTab === 'roster' ? 'text-[var(--brand)] border-b-2 border-[var(--brand)]' : 'text-gray-500 hover:text-white'}`}
                    >
                        My Roster
                    </button>
                    <button
                        onClick={() => setActiveTab('attendance')}
                        className={`pb-4 text-sm font-bold uppercase tracking-wide transition-colors ${activeTab === 'attendance' ? 'text-[var(--brand)] border-b-2 border-[var(--brand)]' : 'text-gray-500 hover:text-white'}`}
                    >
                        Attendance
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
                {/* DASHBOARD VIEW */}
                {activeTab === 'dashboard' && (
                    <>
                        {/* Team Stats Overview */}
                        {/* ... same dashboard content ... */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="bg-[#111] p-6 rounded-xl border border-gray-800 relative overflow-hidden">
                                <h3 className="text-gray-500 text-xs font-bold uppercase mb-1">Roster Size</h3>
                                <p className="text-4xl font-black text-white">{players.length}</p>
                                <p className="text-gray-500 text-xs mt-2 font-bold">Active Players</p>
                            </div>
                            <div className="bg-[#111] p-6 rounded-xl border border-gray-800 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-16 h-16 bg-[var(--brand)]/10 rounded-bl-full -mr-4 -mt-4"></div>
                                <h3 className="text-gray-500 text-xs font-bold uppercase mb-1">Team PPG</h3>
                                <p className="text-4xl font-black text-white">{teamStats.ppg}</p>
                                <p className="text-[var(--brand)] text-xs mt-2 font-bold">Avg Points Per Game</p>
                            </div>
                            <div className="bg-[#111] p-6 rounded-xl border border-gray-800 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-bl-full -mr-4 -mt-4"></div>
                                <h3 className="text-gray-500 text-xs font-bold uppercase mb-1">Team RPG</h3>
                                <p className="text-4xl font-black text-white">{teamStats.rpg}</p>
                                <p className="text-blue-500 text-xs mt-2 font-bold">Avg Rebounds Per Game</p>
                            </div>
                            <div className="bg-[#111] p-6 rounded-xl border border-gray-800 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/10 rounded-bl-full -mr-4 -mt-4"></div>
                                <h3 className="text-gray-500 text-xs font-bold uppercase mb-1">Team APG</h3>
                                <p className="text-4xl font-black text-white">{teamStats.apg}</p>
                                <p className="text-purple-500 text-xs mt-2 font-bold">Avg Assists Per Game</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-8">
                                <div className="bg-[#111] p-6 rounded-xl border border-gray-800">
                                    <h3 className="text-xl font-bold text-white uppercase mb-4">On Deck</h3>
                                    <div className="space-y-4">
                                        <div className="p-4 bg-black/40 rounded-lg border border-gray-800 flex justify-between items-center group hover:border-[var(--brand)] transition-colors cursor-pointer">
                                            <div>
                                                <p className="text-[var(--brand)] text-xs font-bold uppercase mb-1">Today, 18:00</p>
                                                <p className="text-white font-bold">Team Practice</p>
                                                <p className="text-gray-500 text-xs">Main Court</p>
                                            </div>
                                            <div className="h-8 w-8 rounded-full bg-[var(--brand)]/10 flex items-center justify-center text-[var(--brand)]">
                                                →
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-[#111] p-6 rounded-xl border border-gray-800">
                                <h3 className="text-xl font-bold text-white uppercase mb-4 text-red-500">Alerts</h3>
                                <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                                    <p className="text-red-400 font-bold text-sm">❗ Coaching Staff Meeting</p>
                                    <p className="text-gray-400 text-xs mt-1">Friday 2PM. Review game tapes.</p>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* ROSTER VIEW */}
                {/* ... same roster view ... */}
                {activeTab === 'roster' && (
                    <div className="bg-[#111] rounded-xl border border-gray-800 overflow-hidden">
                        <div className="p-6 border-b border-gray-800">
                            <h3 className="text-xl font-bold text-white uppercase flex items-center gap-2">
                                <span className="w-2 h-6 bg-[var(--brand)] rounded-sm"></span>
                                Team Roster
                            </h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-[#0a0a0a] text-gray-400 text-xs font-bold uppercase tracking-wider">
                                    <tr>
                                        <th className="p-4 border-b border-gray-800">Player</th>
                                        <th className="p-4 border-b border-gray-800">Position</th>
                                        <th className="p-4 border-b border-gray-800 text-center">PPG</th>
                                        <th className="p-4 border-b border-gray-800 text-center">RPG</th>
                                        <th className="p-4 border-b border-gray-800 text-center">APG</th>
                                        <th className="p-4 border-b border-gray-800 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800">
                                    {players.map(player => (
                                        <tr key={player.id} className="hover:bg-white/5 transition-colors group">
                                            <td className="p-4 font-bold text-white flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gray-800 overflow-hidden border border-gray-700">
                                                    {player.imageUrl ? (
                                                        <img src={player.imageUrl} alt={player.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-500">
                                                            {player.name.charAt(0)}
                                                        </div>
                                                    )}
                                                </div>
                                                {player.name}
                                            </td>
                                            <td className="p-4 text-gray-400 text-sm uppercase">{player.position}</td>
                                            <td className="p-4 text-center font-mono font-bold text-[var(--brand)]">{player.ppg || 0}</td>
                                            <td className="p-4 text-center font-mono font-bold text-blue-400">{player.rpg || 0}</td>
                                            <td className="p-4 text-center font-mono font-bold text-purple-400">{player.apg || 0}</td>
                                            <td className="p-4 text-right">
                                                <button className="text-xs font-bold uppercase text-[var(--brand)] hover:underline">View Profile</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* ATTENDANCE VIEW */}
                {activeTab === 'attendance' && (
                    <div className="bg-[#111] rounded-xl border border-gray-800 overflow-hidden">
                        <div className="p-6 border-b border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                            <div>
                                <h3 className="text-xl font-bold text-white uppercase flex items-center gap-2">
                                    <span className="w-2 h-6 bg-[var(--brand)] rounded-sm"></span>
                                    Attendance Sheet
                                </h3>
                                <p className="text-gray-500 text-xs mt-1">Mark player presence for training sessions.</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <input
                                    type="date"
                                    value={attendanceDate}
                                    onChange={(e) => setAttendanceDate(e.target.value)}
                                    className="bg-black border border-gray-700 text-white px-4 py-2 rounded focus:border-[var(--brand)] outline-none"
                                />
                                <button
                                    onClick={handleSaveAttendance}
                                    disabled={isSaving}
                                    className="bg-[var(--brand)] text-black font-bold uppercase px-6 py-2 rounded hover:opacity-90 disabled:opacity-50"
                                >
                                    {isSaving ? 'Saving...' : 'Save Attendance'}
                                </button>
                            </div>
                        </div>

                        {saveMessage && (
                            <div className={`px-6 py-3 text-sm font-bold text-center ${saveMessage.includes('Failed') ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
                                {saveMessage}
                            </div>
                        )}

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-[#0a0a0a] text-gray-400 text-xs font-bold uppercase tracking-wider">
                                    <tr>
                                        <th className="p-4 border-b border-gray-800">Player</th>
                                        <th className="p-4 border-b border-gray-800 text-center">Present</th>
                                        <th className="p-4 border-b border-gray-800 text-center">Absent</th>
                                        <th className="p-4 border-b border-gray-800 text-center">Late</th>
                                        <th className="p-4 border-b border-gray-800 text-center">Excused</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800">
                                    {players.map(player => (
                                        <tr key={player.id} className="hover:bg-white/5 transition-colors">
                                            <td className="p-4 font-bold text-white flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gray-800 overflow-hidden border border-gray-700">
                                                    {player.imageUrl ? (
                                                        <img src={player.imageUrl} alt={player.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-500">
                                                            {player.name.charAt(0)}
                                                        </div>
                                                    )}
                                                </div>
                                                {player.name}
                                            </td>
                                            <td className="p-4 text-center">
                                                <input
                                                    type="radio"
                                                    name={`status-${player.id}`}
                                                    checked={attendanceMap[player.id] === 'present'}
                                                    onChange={() => handleAttendanceChange(player.id, 'present')}
                                                    className="w-4 h-4 accent-green-500 cursor-pointer"
                                                />
                                            </td>
                                            <td className="p-4 text-center">
                                                <input
                                                    type="radio"
                                                    name={`status-${player.id}`}
                                                    checked={attendanceMap[player.id] === 'absent'}
                                                    onChange={() => handleAttendanceChange(player.id, 'absent')}
                                                    className="w-4 h-4 accent-red-500 cursor-pointer"
                                                />
                                            </td>
                                            <td className="p-4 text-center">
                                                <input
                                                    type="radio"
                                                    name={`status-${player.id}`}
                                                    checked={attendanceMap[player.id] === 'late'}
                                                    onChange={() => handleAttendanceChange(player.id, 'late')}
                                                    className="w-4 h-4 accent-yellow-500 cursor-pointer"
                                                />
                                            </td>
                                            <td className="p-4 text-center">
                                                <input
                                                    type="radio"
                                                    name={`status-${player.id}`}
                                                    checked={attendanceMap[player.id] === 'excused'}
                                                    onChange={() => handleAttendanceChange(player.id, 'excused')}
                                                    className="w-4 h-4 accent-blue-500 cursor-pointer"
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
