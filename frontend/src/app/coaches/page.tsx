import { getCoaches } from '@/features/coaches/service';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function CoachesPage() {
    const coaches = await getCoaches().catch(err => {
        console.error("Failed to fetch coaches:", err);
        return [];
    });

    return (
        <div className="bg-black text-white p-4 py-20">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16 text-center">
                    <h1 className="text-5xl md:text-7xl font-black mb-4 uppercase tracking-tighter text-white">
                        Coaching <span className="text-[var(--brand)]">Staff</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Expertise. Strategy. Leadership.
                    </p>
                </div>

                {coaches.length === 0 ? (
                    <div className="p-12 border border-dashed border-gray-800 rounded-2xl text-center bg-gray-900/50">
                        <p className="text-gray-500 text-xl font-bold">No coaches found.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {coaches.map(coach => (
                            <div key={coach.id} className="group bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-[var(--brand)] transition-colors duration-300">
                                <div className="aspect-video bg-black relative overflow-hidden">
                                    {coach.imageUrl ? (
                                        <img src={coach.imageUrl} alt={coach.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-800">
                                            <span className="text-gray-700 text-6xl font-black select-none">{coach.name.charAt(0)}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-6">
                                    <h2 className="text-2xl font-black text-white uppercase mb-1">{coach.name}</h2>
                                    <p className="text-[var(--brand)] font-bold text-sm tracking-wider uppercase mb-3">{coach.role}</p>
                                    <p className="text-gray-400 text-sm leading-relaxed border-t border-gray-800 pt-3">
                                        {coach.bio || "Leading the team to victory with passion and dedication."}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
