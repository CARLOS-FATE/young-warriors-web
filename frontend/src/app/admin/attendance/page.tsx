'use client';

import { useState, useEffect } from 'react';
import { getPlayers } from '@/features/players/service';
import { Player } from '@/features/players/types';
import { getAttendanceByDate, markAttendance, AttendanceRecord } from '@/features/attendance/service';

export default function AttendancePage() {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [players, setPlayers] = useState<Player[]>([]);
    const [attendanceMap, setAttendanceMap] = useState<Record<number, AttendanceRecord>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [saving, setSaving] = useState<number | null>(null);

    useEffect(() => {
        loadData();
    }, [date]);

    const loadData = async () => {
        setIsLoading(true);
        try {
            const [playersData, attendanceData] = await Promise.all([
                getPlayers(),
                getAttendanceByDate(date)
            ]);

            setPlayers(playersData);

            const map: Record<number, AttendanceRecord> = {};
            attendanceData.forEach(record => {
                if (record.player_id) map[record.player_id] = record;
            });
            setAttendanceMap(map);

        } catch (error) {
            console.error('Failed to load attendance data', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleStatusChange = async (playerId: number, status: 'present' | 'absent' | 'excused' | 'late') => {
        setSaving(playerId);
        try {
            await markAttendance({
                playerId,
                date,
                status,
                notes: ''
            });

            // Optimistic update or reload? Reload ensures data consistency
            // But let's verify by just reloading the map for now since we have the data
            const newRecord = {
                id: 0, // Placeholder
                player_id: playerId,
                coach_id: null,
                date,
                status,
                notes: ''
            } as AttendanceRecord;

            setAttendanceMap(prev => ({ ...prev, [playerId]: newRecord }));
        } catch (error) {
            console.error('Failed to mark attendance', error);
            alert('Failed to save status');
        } finally {
            setSaving(null);
        }
    };

    return (
        <div className="p-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-3xl font-black text-white uppercase italic">Daily Attendance</h1>
                <div>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="bg-black border border-gray-700 text-white p-3 rounded font-mono uppercase focus:border-[var(--brand)] outline-none"
                    />
                </div>
            </div>

            {isLoading ? (
                <div className="text-gray-400">Loading roster...</div>
            ) : (
                <div className="bg-[#111] rounded-xl border border-gray-800 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-[#222] text-gray-400 uppercase text-xs">
                            <tr>
                                <th className="p-4">Player</th>
                                <th className="p-4 text-center">Present</th>
                                <th className="p-4 text-center">Absent</th>
                                <th className="p-4 text-center">Late</th>
                                <th className="p-4 text-center">Excused</th>
                                <th className="p-4 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-white divide-y divide-gray-800">
                            {players.map(player => {
                                const record = attendanceMap[player.id];
                                const currentStatus = record?.status; // undefined implies not marked ('present' default in DB but here undefined means no record yet)

                                return (
                                    <tr key={player.id} className="hover:bg-gray-900 transition-colors">
                                        <td className="p-4 font-bold">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-xs overflow-hidden">
                                                    {player.imageUrl ? <img src={player.imageUrl} className="w-full h-full object-cover" /> : player.name[0]}
                                                </div>
                                                {player.name}
                                            </div>
                                        </td>
                                        <td className="p-4 text-center">
                                            <button
                                                onClick={() => handleStatusChange(player.id, 'present')}
                                                className={`w-4 h-4 rounded-full border border-green-500 ${currentStatus === 'present' ? 'bg-green-500' : 'hover:bg-green-500/50'}`}
                                            />
                                        </td>
                                        <td className="p-4 text-center">
                                            <button
                                                onClick={() => handleStatusChange(player.id, 'absent')}
                                                className={`w-4 h-4 rounded-full border border-red-500 ${currentStatus === 'absent' ? 'bg-red-500' : 'hover:bg-red-500/50'}`}
                                            />
                                        </td>
                                        <td className="p-4 text-center">
                                            <button
                                                onClick={() => handleStatusChange(player.id, 'late')}
                                                className={`w-4 h-4 rounded-full border border-yellow-500 ${currentStatus === 'late' ? 'bg-yellow-500' : 'hover:bg-yellow-500/50'}`}
                                            />
                                        </td>
                                        <td className="p-4 text-center">
                                            <button
                                                onClick={() => handleStatusChange(player.id, 'excused')}
                                                className={`w-4 h-4 rounded-full border border-blue-500 ${currentStatus === 'excused' ? 'bg-blue-500' : 'hover:bg-blue-500/50'}`}
                                            />
                                        </td>
                                        <td className="p-4 text-center">
                                            {saving === player.id ? (
                                                <span className="text-xs text-gray-500 animate-pulse">Saving...</span>
                                            ) : (
                                                <span className={`text-xs font-bold uppercase px-2 py-1 rounded
                                                    ${currentStatus === 'present' ? 'text-green-500 bg-green-900/20' :
                                                        currentStatus === 'absent' ? 'text-red-500 bg-red-900/20' :
                                                            currentStatus === 'late' ? 'text-yellow-500 bg-yellow-900/20' :
                                                                currentStatus === 'excused' ? 'text-blue-500 bg-blue-900/20' : 'text-gray-600'}`}>
                                                    {currentStatus || '-'}
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
