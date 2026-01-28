'use client';

import { useState, useEffect } from 'react';
import { Post } from '@/features/posts/types';
import { getPosts, createPost, updatePost, deletePost } from '@/features/posts/service';

export default function PostsManagement() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const [isEditing, setIsEditing] = useState(false);
    const [currentItem, setCurrentItem] = useState<Partial<Post>>({ title: '', content: '', category: '' });
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        try {
            const data = await getPosts();
            setPosts(data);
        } catch (err) {
            setError('Failed to load posts');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            if (isEditing && currentItem.id) {
                await updatePost(currentItem.id, currentItem);
            } else {
                await createPost(currentItem as any);
            }

            setShowForm(false);
            setCurrentItem({ title: '', content: '', category: '' });
            setIsEditing(false);
            loadPosts();
        } catch (err: any) {
            setError(err.message || 'Operation failed');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure in deleting this post?')) return;
        try {
            await deletePost(id);
            loadPosts();
        } catch (err: any) {
            alert(err.message || 'Delete failed');
        }
    };

    const handleEdit = (post: Post) => {
        setCurrentItem(post);
        setIsEditing(true);
        setShowForm(true);
    };

    const openCreate = () => {
        setCurrentItem({ title: '', content: '', category: '' });
        setIsEditing(false);
        setShowForm(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-black text-[var(--brand)] uppercase tracking-wide">Manage Blog</h1>
                <button onClick={openCreate} className="bg-[var(--brand)] text-black font-bold py-2 px-4 rounded hover:opacity-90 transition-opacity">
                    + Add Post
                </button>
            </div>

            {error && <div className="bg-red-500/20 text-red-500 p-4 rounded mb-6 border border-red-500/50">{error}</div>}

            {showForm && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl w-full max-w-2xl relative">
                        <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white">✕</button>
                        <h2 className="text-2xl font-bold mb-6 text-white">{isEditing ? 'Edit Post' : 'New Post'}</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-400 text-xs font-bold uppercase mb-1">Title</label>
                                <input type="text" className="w-full bg-black border border-gray-700 p-3 rounded text-white focus:border-[var(--brand)] outline-none"
                                    value={currentItem.title} onChange={e => setCurrentItem({ ...currentItem, title: e.target.value })} required />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-xs font-bold uppercase mb-1">Category</label>
                                <input type="text" className="w-full bg-black border border-gray-700 p-3 rounded text-white focus:border-[var(--brand)] outline-none"
                                    value={currentItem.category} onChange={e => setCurrentItem({ ...currentItem, category: e.target.value })} required />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-xs font-bold uppercase mb-1">Content</label>
                                <textarea className="w-full bg-black border border-gray-700 p-3 rounded text-white focus:border-[var(--brand)] outline-none h-48"
                                    value={currentItem.content} onChange={e => setCurrentItem({ ...currentItem, content: e.target.value })} required></textarea>
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
                <div className="space-y-4">
                    {posts.map(post => (
                        <div key={post.id} className="bg-gray-900 border border-gray-800 rounded-xl p-6 group hover:border-gray-700 transition-colors">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="text-[var(--brand)] text-xs font-bold uppercase tracking-wider">{post.category}</span>
                                    <h3 className="text-xl font-bold text-white mt-1">{post.title}</h3>
                                    <p className="text-gray-500 text-sm mt-2 line-clamp-2">{post.content}</p>
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleEdit(post)} className="bg-blue-600 text-white p-2 rounded hover:bg-blue-500 text-sm">Edit</button>
                                    <button onClick={() => handleDelete(post.id)} className="bg-red-600 text-white p-2 rounded hover:bg-red-500 text-sm">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
