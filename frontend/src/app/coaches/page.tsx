import { getCoaches } from '@/features/coaches/service';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function CoachesPage() {
    const coaches = await getCoaches().catch(err => {
        console.error("Failed to fetch coaches:", err);
        return [];
    });

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-7xl mx-auto">
                <Link href="/" className="text-gray-400 hover:text-white mb-8 inline-block transition-colors">&larr; Back to Home</Link>
                <h1 className="text-4xl md:text-5xl font-black mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                    Coaching Staff
                </h1>

                {coaches.length === 0 ? (
                    <div className="p-8 border border-dashed border-gray-800 rounded-xl text-center">
                        <p className="text-gray-500">No coaches found.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {coaches.map(coach => (
                            <div key={coach.id} className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-colors group">
                                <div className="aspect-[4/3] bg-gray-800 relative flex items-center justify-center overflow-hidden">
                                    {coach.imageUrl ? (
                                        <img src={coach.imageUrl} alt={coach.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                                            <span className="text-gray-700 text-6xl font-black select-none">{coach.name.charAt(0)}</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
                                </div>
                                <div className="p-6 relative">
                                    <h2 className="text-2xl font-bold mb-1 text-white group-hover:text-purple-400 transition-colors">{coach.name}</h2>
                                    <p className="text-purple-400 font-medium tracking-wide uppercase text-sm mb-2">{coach.role}</p>
                                    {coach.bio && <p className="text-gray-500 text-sm line-clamp-3">{coach.bio}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
