'use client';

import { useState, useEffect } from 'react';
import { getUsers, createUser, deleteUser } from '@/features/users/service';
import { User } from '@/features/users/types';
import { getPlayers } from '@/features/players/service';
import { getCoaches } from '@/features/coaches/service';
import { Player } from '@/features/players/types';
import { Coach } from '@/features/coaches/types';

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [players, setPlayers] = useState<Player[]>([]);
    const [coaches, setCoaches] = useState<Coach[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        role: 'player' as 'admin' | 'coach' | 'player',
        relatedId: '',
        createProfile: false
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const [usersData, playersData, coachesData] = await Promise.all([
                getUsers(),
                getPlayers(),
                getCoaches()
            ]);
            setUsers(usersData);
            setPlayers(playersData);
            setCoaches(coachesData);
        } catch (err) {
            console.error(err);
            setError('Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this user?')) return;
        try {
            await deleteUser(id);
            setUsers(users.filter(u => u.id !== id));
        } catch (err) {
            alert('Failed to delete user');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                relatedId: formData.relatedId ? parseInt(formData.relatedId) : undefined
            };
            const newUser = await createUser(payload);
            setUsers([...users, newUser]);
            setIsCreating(false);
            setFormData({ username: '', password: '', role: 'player', relatedId: '', createProfile: false });
        } catch (err: any) {
            alert(err.message || 'Failed to create user');
        }
    };

    const getRelatedName = (user: User) => {
        if (!user.relatedId) return '-';
        if (user.role === 'player') {
            const p = players.find(p => p.id === user.relatedId);
            return p ? p.name : `Unknown Player (${user.relatedId})`;
        }
        if (user.role === 'coach') {
            const c = coaches.find(c => c.id === user.relatedId);
            return c ? c.name : `Unknown Coach (${user.relatedId})`;
        }
        return '-';
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-black uppercase text-white">User Management</h1>
                <button
                    onClick={() => setIsCreating(true)}
                    className="bg-[var(--brand)] text-black px-4 py-2 rounded font-bold uppercase text-sm hover:opacity-90"
                >
                    + New User
                </button>
            </div>

            {error && <div className="bg-red-500/20 text-red-500 p-4 rounded mb-8 border border-red-500/50">{error}</div>}

            <div className="bg-[#111] border border-gray-800 rounded-xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-[#0a0a0a] text-gray-400 text-xs font-bold uppercase tracking-wider">
                        <tr>
                            <th className="p-4 border-b border-gray-800">Username</th>
                            <th className="p-4 border-b border-gray-800">Role</th>
                            <th className="p-4 border-b border-gray-800">Linked Profile</th>
                            <th className="p-4 border-b border-gray-800 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                        {users.map(user => (
                            <tr key={user.id} className="hover:bg-white/5 transition-colors">
                                <td className="p-4 font-bold text-white">{user.username}</td>
                                <td className="p-4">
                                    <span className={`inline-block px-2 py-1 rounded text-[10px] font-bold uppercase
                                        ${user.role === 'admin' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50' :
                                            user.role === 'coach' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50' :
                                                'bg-green-500/20 text-green-400 border border-green-500/50'}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="p-4 text-gray-400 text-sm">
                                    {getRelatedName(user)}
                                </td>
                                <td className="p-4 text-right">
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="text-red-500 hover:text-red-400 text-sm font-bold uppercase"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Create Modal */}
            {isCreating && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-[#111] border border-gray-800 rounded-xl p-8 w-full max-w-md shadow-2xl">
                        <h2 className="text-2xl font-black text-white uppercase mb-6">Create User</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-500 text-xs font-bold uppercase mb-2">Username</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-black border border-gray-800 rounded p-3 text-white focus:border-[var(--brand)] outline-none"
                                    value={formData.username}
                                    onChange={e => setFormData({ ...formData, username: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-500 text-xs font-bold uppercase mb-2">Password</label>
                                <input
                                    type="password"
                                    required
                                    className="w-full bg-black border border-gray-800 rounded p-3 text-white focus:border-[var(--brand)] outline-none"
                                    value={formData.password}
                                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-500 text-xs font-bold uppercase mb-2">Role</label>
                                <select
                                    className="w-full bg-black border border-gray-800 rounded p-3 text-white focus:border-[var(--brand)] outline-none"
                                    value={formData.role}
                                    onChange={e => setFormData({ ...formData, role: e.target.value as any, relatedId: '' })}
                                >
                                    <option value="player">Player</option>
                                    <option value="coach">Coach</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                            {/* Conditional Profile Select */}
                            {formData.role === 'player' && (
                                <div>
                                    <label className="block text-gray-500 text-xs font-bold uppercase mb-2">Link to Player Profile</label>
                                    <select
                                        className="w-full bg-black border border-gray-800 rounded p-3 text-white focus:border-[var(--brand)] outline-none"
                                        value={formData.relatedId}
                                        onChange={e => setFormData({ ...formData, relatedId: e.target.value })}
                                        disabled={formData.createProfile} // Disable selection if auto-creating
                                    >
                                        <option value="">-- Select Player --</option>
                                        {players.map(p => (
                                            <option key={p.id} value={p.id}>{p.name}</option>
                                        ))}
                                    </select>

                                    <div className="mt-3 flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="createProfilePlayer"
                                            checked={formData.createProfile}
                                            onChange={e => setFormData({ ...formData, createProfile: e.target.checked, relatedId: '' })}
                                            className="w-4 h-4 accent-[var(--brand)]"
                                        />
                                        <label htmlFor="createProfilePlayer" className="text-gray-400 text-xs uppercase font-bold cursor-pointer select-none">
                                            Or Auto-Create "New Player" Profile
                                        </label>
                                    </div>
                                </div>
                            )}

                            {formData.role === 'coach' && (
                                <div>
                                    <label className="block text-gray-500 text-xs font-bold uppercase mb-2">Link to Coach Profile</label>
                                    <select
                                        className="w-full bg-black border border-gray-800 rounded p-3 text-white focus:border-[var(--brand)] outline-none"
                                        value={formData.relatedId}
                                        onChange={e => setFormData({ ...formData, relatedId: e.target.value })}
                                        disabled={formData.createProfile}
                                    >
                                        <option value="">-- Select Coach --</option>
                                        {coaches.map(c => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>

                                    <div className="mt-3 flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="createProfileCoach"
                                            checked={formData.createProfile}
                                            onChange={e => setFormData({ ...formData, createProfile: e.target.checked, relatedId: '' })}
                                            className="w-4 h-4 accent-[var(--brand)]"
                                        />
                                        <label htmlFor="createProfileCoach" className="text-gray-400 text-xs uppercase font-bold cursor-pointer select-none">
                                            Or Auto-Create "New Coach" Profile
                                        </label>
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsCreating(false)}
                                    className="flex-1 bg-gray-800 text-white font-bold py-3 rounded uppercase hover:bg-gray-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-[var(--brand)] text-black font-bold py-3 rounded uppercase hover:opacity-90"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
