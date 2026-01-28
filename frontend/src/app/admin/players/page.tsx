'use client';

import { useState, useEffect } from 'react';
import { Player } from '@/features/players/types';
import { getPlayers, createPlayer, updatePlayer, deletePlayer } from '@/features/players/service';

export default function PlayersManagement() {
    const [players, setPlayers] = useState<Player[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    // Form State
    const [isEditing, setIsEditing] = useState(false);
    const [currentItem, setCurrentItem] = useState<Partial<Player>>({
        name: '',
        position: '',
        imageUrl: '',
        height: '',
        weight: '',
        ppg: 0,
        rpg: 0,
        apg: 0
    });

    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        loadPlayers();
    }, []);

    const loadPlayers = async () => {
        try {
            const data = await getPlayers();
            setPlayers(data);
        } catch (err) {
            setError('Failed to load players');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            if (isEditing && currentItem.id) {
                await updatePlayer(currentItem.id, currentItem);
            } else {
                await createPlayer(currentItem as any);
            }

            setShowForm(false);
            setCurrentItem({
                name: '',
                position: '',
                imageUrl: '',
                height: '',
                weight: '',
                ppg: 0,
                rpg: 0,
                apg: 0
            });

            setIsEditing(false);
            loadPlayers();
        } catch (err: any) {
            setError(err.message || 'Operation failed');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure in deleting this player?')) return;

        try {
            await deletePlayer(id);
            loadPlayers();
        } catch (err: any) {
            alert(err.message || 'Delete failed');
        }
    };

    const handleEdit = (player: Player) => {
        setCurrentItem(player);
        setIsEditing(true);
        setShowForm(true);
    };

    const openCreate = () => {
        setCurrentItem({
            name: '',
            position: '',
            imageUrl: '',
            height: '',
            weight: '',
            ppg: 0,
            rpg: 0,
            apg: 0
        });

        setIsEditing(false);
        setShowForm(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-black text-[var(--brand)] uppercase tracking-wide">Manage Players</h1>
                <button
                    onClick={openCreate}
                    className="bg-[var(--brand)] text-black font-bold py-2 px-4 rounded hover:opacity-90 transition-opacity"
                >
                    + Add Player
                </button>
            </div>

            {error && <div className="bg-red-500/20 text-red-500 p-4 rounded mb-6 border border-red-500/50">{error}</div>}

            {/* Form Modal (Simplified inline for now) */}
            {showForm && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl w-full max-w-lg relative">
                        <button
                            onClick={() => setShowForm(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-white"
                        >
                            ✕
                        </button>
                        <h2 className="text-2xl font-bold mb-6 text-white">{isEditing ? 'Edit Player' : 'New Player'}</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-400 text-xs font-bold uppercase mb-1">Name</label>
                                <input
                                    type="text"
                                    className="w-full bg-black border border-gray-700 p-3 rounded text-white focus:border-[var(--brand)] outline-none"
                                    value={currentItem.name}
                                    onChange={e => setCurrentItem({ ...currentItem, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-xs font-bold uppercase mb-1">Position</label>
                                <input
                                    type="text"
                                    className="w-full bg-black border border-gray-700 p-3 rounded text-white focus:border-[var(--brand)] outline-none"
                                    value={currentItem.position}
                                    onChange={e => setCurrentItem({ ...currentItem, position: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-xs font-bold uppercase mb-1">Image URL</label>
                                <input
                                    type="text"
                                    className="w-full bg-black border border-gray-700 p-3 rounded text-white focus:border-[var(--brand)] outline-none"
                                    value={currentItem.imageUrl || ''}
                                    onChange={e => setCurrentItem({ ...currentItem, imageUrl: e.target.value })}
                                    placeholder="https://..."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-400 text-xs font-bold uppercase mb-1">Height</label>
                                    <input
                                        type="text"
                                        className="w-full bg-black border border-gray-700 p-3 rounded text-white focus:border-[var(--brand)] outline-none"
                                        value={currentItem.height || ''}
                                        onChange={e => setCurrentItem({ ...currentItem, height: e.target.value })}
                                        placeholder="6'2&quot;"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-xs font-bold uppercase mb-1">Weight</label>
                                    <input
                                        type="text"
                                        className="w-full bg-black border border-gray-700 p-3 rounded text-white focus:border-[var(--brand)] outline-none"
                                        value={currentItem.weight || ''}
                                        onChange={e => setCurrentItem({ ...currentItem, weight: e.target.value })}
                                        placeholder="185 lbs"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-gray-400 text-xs font-bold uppercase mb-1">PPG</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        className="w-full bg-black border border-gray-700 p-3 rounded text-white focus:border-[var(--brand)] outline-none"
                                        value={currentItem.ppg || 0}
                                        onChange={e => setCurrentItem({ ...currentItem, ppg: parseFloat(e.target.value) })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-xs font-bold uppercase mb-1">RPG</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        className="w-full bg-black border border-gray-700 p-3 rounded text-white focus:border-[var(--brand)] outline-none"
                                        value={currentItem.rpg || 0}
                                        onChange={e => setCurrentItem({ ...currentItem, rpg: parseFloat(e.target.value) })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-xs font-bold uppercase mb-1">APG</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        className="w-full bg-black border border-gray-700 p-3 rounded text-white focus:border-[var(--brand)] outline-none"
                                        value={currentItem.apg || 0}
                                        onChange={e => setCurrentItem({ ...currentItem, apg: parseFloat(e.target.value) })}
                                    />
                                </div>
                            </div>


                            <div className="pt-4 flex gap-3">
                                <button type="submit" className="flex-1 bg-[var(--brand)] text-black font-bold py-3 rounded hover:opacity-90">
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="flex-1 bg-gray-800 text-white font-bold py-3 rounded hover:bg-gray-700"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* List */}
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {players.map(player => (
                        <div key={player.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden group">
                            <div className="h-48 bg-gray-800 relative">
                                {player.imageUrl ? (
                                    <img src={player.imageUrl} alt={player.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-600 text-4xl font-black">
                                        {player.name.charAt(0)}
                                    </div>
                                )}
                                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleEdit(player)}
                                        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-500"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(player.id)}
                                        className="bg-red-600 text-white p-2 rounded hover:bg-red-500"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="text-xl font-bold text-white">{player.name}</h3>
                                <p className="text-[var(--brand)] text-sm uppercase font-bold">{player.position}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
