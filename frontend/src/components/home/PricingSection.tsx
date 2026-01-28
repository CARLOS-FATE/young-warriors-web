'use client';

import { useEffect, useState } from 'react';
import { pricingService } from '@/features/pricing/service';
import { PricingItem } from '@/features/pricing/types';

export default function PricingSection() {
    const [items, setItems] = useState<PricingItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        pricingService.getAll()
            .then(setItems)
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return null;
    if (items.length === 0) return null;

    const matriculas = items.filter(i => i.category === 'matricula');
    const mensualidades = items.filter(i => i.category === 'mensualidad');
    const promos = items.filter(i => i.category === 'promo');

    return (
        <section className="py-24 bg-[#050505] border-t border-gray-900">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-[var(--brand)] font-bold tracking-widest uppercase text-sm">Join the Club</span>
                    <h2 className="text-4xl md:text-5xl font-black text-white mt-2 uppercase">Membership & Pricing</h2>
                </div>

                {/* Promos Section - Highlighted */}
                {promos.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {promos.map(promo => (
                            <div key={promo.id} className="bg-gradient-to-br from-[var(--brand)] to-orange-700 p-1 rounded-2xl md:col-span-1 lg:col-span-1 transform hover:-translate-y-1 transition-transform">
                                <div className="bg-black text-white p-8 rounded-xl h-full flex flex-col items-center text-center relative overflow-hidden">
                                    <div className="absolute top-0 right-0 bg-white text-black text-xs font-bold px-3 py-1 rounded-bl-lg">LIMITED TIME</div>
                                    <h3 className="text-2xl font-black italic uppercase mb-2">{promo.title}</h3>
                                    <div className="text-4xl font-bold text-[var(--brand)] mb-4">{promo.price}</div>
                                    <p className="text-gray-300 mb-6">{promo.description}</p>
                                    <button className="mt-auto bg-[var(--brand)] text-black font-bold uppercase py-3 px-8 rounded hover:bg-white transition-colors">
                                        Claim Offer
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Registration Types */}
                    <div>
                        <h3 className="text-2xl font-black text-white uppercase mb-8 border-l-4 border-[var(--brand)] pl-4">Registration (Matricula)</h3>
                        <div className="space-y-4">
                            {matriculas.map(item => (
                                <div key={item.id} className="flex justify-between items-center bg-[#111] p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
                                    <div>
                                        <h4 className="font-bold text-white text-lg">{item.title}</h4>
                                        {item.description && <p className="text-gray-400 text-sm mt-1">{item.description}</p>}
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-[var(--brand)]">{item.price}</div>
                                        {item.period && <div className="text-xs text-gray-500 uppercase">{item.period}</div>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Monthly Fees */}
                    <div>
                        <h3 className="text-2xl font-black text-white uppercase mb-8 border-l-4 border-blue-600 pl-4">Monthly Fees (Mensualidades)</h3>
                        <div className="space-y-4">
                            {mensualidades.map(item => (
                                <div key={item.id} className="flex justify-between items-center bg-[#111] p-6 rounded-xl border border-gray-800 hover:border-blue-900/50 transition-colors group">
                                    <div>
                                        <h4 className="font-bold text-white text-lg group-hover:text-blue-400 transition-colors">{item.title}</h4>
                                        {item.description && <p className="text-gray-400 text-sm mt-1">{item.description}</p>}
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-white">{item.price}</div>
                                        {item.period && <div className="text-xs text-gray-500 uppercase">{item.period}</div>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <p className="text-gray-400 mb-6">Have questions about our programs or pricing?</p>
                    <a href="/register" className="inline-block border border-white text-white font-bold uppercase py-3 px-8 rounded hover:bg-white hover:text-black transition-colors">
                        Contact Us
                    </a>
                </div>
            </div>
        </section>
    );
}
