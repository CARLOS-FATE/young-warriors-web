'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { pricingService } from '@/features/pricing/service';
import { PricingItem, CreatePricingItemData } from '@/features/pricing/types';

export default function PricingManagement() {
    const router = useRouter();
    const [items, setItems] = useState<PricingItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<PricingItem | null>(null);
    const [formData, setFormData] = useState<CreatePricingItemData>({
        title: '',
        price: '',
        period: '',
        category: 'matricula',
        description: '',
        features: '',
        highlight: false
    });

    useEffect(() => {
        loadItems();
    }, []);

    const loadItems = async () => {
        try {
            const data = await pricingService.getAll();
            setItems(data);
        } catch (error) {
            console.error('Failed to load items', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/admin/login');
            return;
        }

        try {
            if (editingItem) {
                await pricingService.update(editingItem.id, { ...formData, id: editingItem.id }, token);
            } else {
                await pricingService.create(formData, token);
            }
            setIsModalOpen(false);
            setEditingItem(null);
            resetForm();
            loadItems();
        } catch (error) {
            console.error('Failed to save item', error);
            alert('Failed to save item');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this item?')) return;
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            await pricingService.delete(id, token);
            loadItems();
        } catch (error) {
            console.error('Failed to delete item', error);
        }
    };

    const openEditModal = (item: PricingItem) => {
        setEditingItem(item);
        setFormData({
            title: item.title,
            price: item.price,
            period: item.period || '',
            category: item.category,
            description: item.description || '',
            features: item.features || '',
            highlight: item.highlight
        });
        setIsModalOpen(true);
    };

    const resetForm = () => {
        setFormData({
            title: '',
            price: '',
            period: '',
            category: 'matricula',
            description: '',
            features: '',
            highlight: false
        });
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-black text-white uppercase italic">Pricing & Promos</h1>
                <button
                    onClick={() => { setEditingItem(null); resetForm(); setIsModalOpen(true); }}
                    className="bg-[var(--brand)] text-black font-bold px-6 py-3 rounded hover:bg-white hover:text-black transition-colors uppercase"
                >
                    + Add Item
                </button>
            </div>

            {isLoading ? (
                <div className="text-white">Loading...</div>
            ) : (
                <div className="bg-[#111] rounded-xl overflow-hidden border border-gray-800">
                    <table className="w-full text-left">
                        <thead className="bg-[#222] text-gray-400 uppercase text-xs">
                            <tr>
                                <th className="p-4">Title</th>
                                <th className="p-4">Price</th>
                                <th className="p-4">Category</th>
                                <th className="p-4">Highlight</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-white divide-y divide-gray-800">
                            {items.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-900 transition-colors">
                                    <td className="p-4 font-bold">{item.title}</td>
                                    <td className="p-4 text-[var(--brand)]">{item.price} {item.period && <span className="text-gray-500 text-xs">/ {item.period}</span>}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs uppercase font-bold
                                            ${item.category === 'matricula' ? 'bg-blue-900 text-blue-100' :
                                                item.category === 'mensualidad' ? 'bg-green-900 text-green-100' :
                                                    'bg-pink-900 text-pink-100'}`}>
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="p-4">{item.highlight ? '★' : ''}</td>
                                    <td className="p-4 text-right space-x-2">
                                        <button
                                            onClick={() => openEditModal(item)}
                                            className="text-sm text-gray-400 hover:text-white"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="text-sm text-red-500 hover:text-red-400"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-[#111] border border-gray-700 p-8 rounded-xl w-full max-w-lg">
                        <h2 className="text-2xl font-bold text-white mb-6">{editingItem ? 'Edit Item' : 'New Item'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-400 text-sm mb-1">Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full bg-black border border-gray-700 rounded p-2 text-white focus:border-[var(--brand)] outline-none"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-400 text-sm mb-1">Price (e.g. 50.00)</label>
                                    <input
                                        type="text"
                                        value={formData.price}
                                        onChange={e => setFormData({ ...formData, price: e.target.value })}
                                        className="w-full bg-black border border-gray-700 rounded p-2 text-white focus:border-[var(--brand)] outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-sm mb-1">Period (Optional, e.g. Monthly)</label>
                                    <input
                                        type="text"
                                        value={formData.period || ''}
                                        onChange={e => setFormData({ ...formData, period: e.target.value })}
                                        className="w-full bg-black border border-gray-700 rounded p-2 text-white focus:border-[var(--brand)] outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm mb-1">Category</label>
                                <select
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                                    className="w-full bg-black border border-gray-700 rounded p-2 text-white focus:border-[var(--brand)] outline-none"
                                >
                                    <option value="matricula">Matricula (Registration)</option>
                                    <option value="mensualidad">Mensualidad (Fee)</option>
                                    <option value="promo">Promo</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm mb-1">Description (Optional)</label>
                                <textarea
                                    value={formData.description || ''}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-black border border-gray-700 rounded p-2 text-white focus:border-[var(--brand)] outline-none"
                                    rows={2}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm mb-1">Features (Optional)</label>
                                <textarea
                                    value={formData.features || ''}
                                    onChange={e => setFormData({ ...formData, features: e.target.value })}
                                    className="w-full bg-black border border-gray-700 rounded p-2 text-white focus:border-[var(--brand)] outline-none"
                                    rows={2}
                                    placeholder="e.g. Include Jersey, 2x Training"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={formData.highlight}
                                    onChange={e => setFormData({ ...formData, highlight: e.target.checked })}
                                    className="rounded bg-black border-gray-700"
                                />
                                <label className="text-gray-400 text-sm">Highlight as "Best Value" / Top Pick</label>
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-gray-400 hover:text-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-[var(--brand)] text-black font-bold px-6 py-2 rounded hover:bg-white transition-colors"
                                >
                                    {editingItem ? 'Save Changes' : 'Create Item'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
