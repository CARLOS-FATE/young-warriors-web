'use client';

import { useState, useEffect } from 'react';
import { Coach } from '@/features/coaches/types';
import { getCoaches, createCoach, updateCoach, deleteCoach } from '@/features/coaches/service';

export default function CoachesManagement() {
    const [coaches, setCoaches] = useState<Coach[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const [isEditing, setIsEditing] = useState(false);
    const [currentItem, setCurrentItem] = useState<Partial<Coach>>({ name: '', role: '', bio: '', imageUrl: '' });
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        loadCoaches();
    }, []);

    const loadCoaches = async () => {
        try {
            const data = await getCoaches();
            setCoaches(data);
        } catch (err) {
            setError('Failed to load coaches');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            if (isEditing && currentItem.id) {
                await updateCoach(currentItem.id, currentItem);
            } else {
                await createCoach(currentItem as any);
            }

            setShowForm(false);
            setCurrentItem({ name: '', role: '', bio: '', imageUrl: '' });
            setIsEditing(false);
            loadCoaches();
        } catch (err: any) {
            setError(err.message || 'Operation failed');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure in deleting this coach?')) return;
        try {
            await deleteCoach(id);
            loadCoaches();
        } catch (err: any) {
            alert(err.message || 'Delete failed');
        }
    };

    const handleEdit = (coach: Coach) => {
        setCurrentItem(coach);
        setIsEditing(true);
        setShowForm(true);
    };

    const openCreate = () => {
        setCurrentItem({ name: '', role: '', bio: '', imageUrl: '' });
        setIsEditing(false);
        setShowForm(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-black text-[var(--brand)] uppercase tracking-wide">Manage Coaches</h1>
                <button onClick={openCreate} className="bg-[var(--brand)] text-black font-bold py-2 px-4 rounded hover:opacity-90 transition-opacity">
                    + Add Coach
                </button>
            </div>

            {error && <div className="bg-red-500/20 text-red-500 p-4 rounded mb-6 border border-red-500/50">{error}</div>}

            {showForm && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl w-full max-w-lg relative">
                        <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white">✕</button>
                        <h2 className="text-2xl font-bold mb-6 text-white">{isEditing ? 'Edit Coach' : 'New Coach'}</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-400 text-xs font-bold uppercase mb-1">Name</label>
                                <input type="text" className="w-full bg-black border border-gray-700 p-3 rounded text-white focus:border-[var(--brand)] outline-none"
                                    value={currentItem.name} onChange={e => setCurrentItem({ ...currentItem, name: e.target.value })} required />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-xs font-bold uppercase mb-1">Role</label>
                                <input type="text" className="w-full bg-black border border-gray-700 p-3 rounded text-white focus:border-[var(--brand)] outline-none"
                                    value={currentItem.role} onChange={e => setCurrentItem({ ...currentItem, role: e.target.value })} required />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-xs font-bold uppercase mb-1">Bio (Optional)</label>
                                <textarea className="w-full bg-black border border-gray-700 p-3 rounded text-white focus:border-[var(--brand)] outline-none h-24"
                                    value={currentItem.bio || ''} onChange={e => setCurrentItem({ ...currentItem, bio: e.target.value })}></textarea>
                            </div>
                            <div>
                                <label className="block text-gray-400 text-xs font-bold uppercase mb-1">Image URL</label>
                                <input type="text" className="w-full bg-black border border-gray-700 p-3 rounded text-white focus:border-[var(--brand)] outline-none"
                                    value={currentItem.imageUrl || ''} onChange={e => setCurrentItem({ ...currentItem, imageUrl: e.target.value })} placeholder="https://..." />
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button type="submit" className="flex-1 bg-[var(--brand)] text-black font-bold py-3 rounded hover:opacity-90">Save</button>
                                <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-gray-800 text-white font-bold py-3 rounded hover:bg-gray-700">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isLoading ? <p>Loading...</p> : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {coaches.map(coach => (
                        <div key={coach.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden group">
                            <div className="h-48 bg-gray-800 relative">
                                {coach.imageUrl ? (
                                    <img src={coach.imageUrl} alt={coach.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-600 text-4xl font-black">{coach.name.charAt(0)}</div>
                                )}
                                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleEdit(coach)} className="bg-blue-600 text-white p-2 rounded hover:bg-blue-500">Edit</button>
                                    <button onClick={() => handleDelete(coach.id)} className="bg-red-600 text-white p-2 rounded hover:bg-red-500">Delete</button>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="text-xl font-bold text-white">{coach.name}</h3>
                                <p className="text-[var(--brand)] text-sm uppercase font-bold">{coach.role}</p>
                                <p className="text-gray-500 text-xs mt-2 line-clamp-2">{coach.bio}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
