import { getPlayers } from '@/features/players/service';
import { getCoaches } from '@/features/coaches/service';
import { getPosts } from '@/features/posts/service';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const players = await getPlayers().catch(() => []);
    const coaches = await getCoaches().catch(() => []);
    const posts = await getPosts().catch(() => []);

    return (
        <div>
            <header className="mb-8">
                <h1 className="text-3xl font-black text-[var(--brand)] mb-2 uppercase tracking-wide">Dashboard</h1>
                <p className="text-gray-400">Welcome back to the command center.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl relative overflow-hidden group hover:border-[var(--brand)] transition-colors">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--brand)] opacity-5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
                    <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">Total Players</h3>
                    <p className="text-5xl font-black text-white tracking-tight">{players.length}</p>
                </div>

                <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl relative overflow-hidden group hover:border-[var(--brand)] transition-colors">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--brand)] opacity-5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
                    <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">Active Coaches</h3>
                    <p className="text-5xl font-black text-white tracking-tight">{coaches.length}</p>
                </div>

                <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl relative overflow-hidden group hover:border-[var(--brand)] transition-colors">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--brand)] opacity-5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
                    <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">Blog Posts</h3>
                    <p className="text-5xl font-black text-white tracking-tight">{posts.length}</p>
                </div>
            </div>
        </div>
    )
}
