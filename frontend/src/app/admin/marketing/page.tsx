'use client';

import { useState, useEffect } from 'react';
import { AdVideo } from '@/features/marketing/types';
import { getAdVideos, createAdVideo, deleteAdVideo } from '@/features/marketing/service';

export default function MarketingManagement() {
    const [videos, setVideos] = useState<AdVideo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    // Form State
    const [newTitle, setNewTitle] = useState('');
    const [newUrl, setNewUrl] = useState('');
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        loadVideos();
    }, []);

    const loadVideos = async () => {
        try {
            const data = await getAdVideos();
            setVideos(data);
        } catch (err) {
            setError('Failed to load videos');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await createAdVideo({ title: newTitle, videoUrl: newUrl });
            setShowForm(false);
            setNewTitle('');
            setNewUrl('');
            loadVideos();
        } catch (err: any) {
            setError(err.message || 'Operation failed');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure?')) return;
        try {
            await deleteAdVideo(id);
            loadVideos();
        } catch (err: any) {
            alert(err.message || 'Delete failed');
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-black text-[var(--brand)] uppercase tracking-wide">Marketing Clips</h1>
                    <p className="text-gray-400 text-sm mt-1">Manage videos for the Home Page Carousel</p>
                </div>
                <button onClick={() => setShowForm(true)} className="bg-[var(--brand)] text-black font-bold py-2 px-4 rounded hover:opacity-90 transition-opacity">
                    + Add Video
                </button>
            </div>

            {error && <div className="bg-red-500/20 text-red-500 p-4 rounded mb-6 border border-red-500/50">{error}</div>}

            {showForm && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl w-full max-w-lg relative">
                        <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white">✕</button>
                        <h2 className="text-2xl font-bold mb-6 text-white">Add Marketing Video</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-400 text-xs font-bold uppercase mb-1">Title / Caption</label>
                                <input type="text" className="w-full bg-black border border-gray-700 p-3 rounded text-white focus:border-[var(--brand)] outline-none"
                                    value={newTitle} onChange={e => setNewTitle(e.target.value)} required placeholder="e.g. Summer Camp Highlights" />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-xs font-bold uppercase mb-1">Video URL (MP4 or YouTube)</label>
                                <input type="text" className="w-full bg-black border border-gray-700 p-3 rounded text-white focus:border-[var(--brand)] outline-none"
                                    value={newUrl} onChange={e => setNewUrl(e.target.value)} required placeholder="https://..." />
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button type="submit" className="flex-1 bg-[var(--brand)] text-black font-bold py-3 rounded hover:opacity-90">Add Video</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map(video => (
                    <div key={video.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden group">
                        <div className="h-40 bg-black flex items-center justify-center relative">
                            {/* Simple Preview based on URL type */}
                            {video.videoUrl.includes('youtube') || video.videoUrl.includes('youtu.be') ? (
                                <div className="text-red-500 font-bold">YouTube Video</div>
                            ) : (
                                <video src={video.videoUrl} className="w-full h-full object-cover opacity-50" />
                            )}

                            <button onClick={() => handleDelete(video.id)} className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded hover:bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                Delete
                            </button>
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-bold text-white truncate">{video.title}</h3>
                            <a href={video.videoUrl} target="_blank" className="text-xs text-blue-400 hover:underline truncate block mt-1">{video.videoUrl}</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
