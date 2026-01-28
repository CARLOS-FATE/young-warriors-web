import { getPlayers } from '@/features/players/service';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminPlayersPage() {
    const players = await getPlayers().catch(() => []);

    return (
        <div>
            <header className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">Players</h1>
                    <p className="text-gray-400">Manage your team roster.</p>
                </div>
                <Link href="/admin/players/new" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors">
                    + Add Player
                </Link>
            </header>

            <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-800/50 text-gray-400 border-b border-gray-800">
                        <tr>
                            <th className="px-6 py-4 font-medium uppercase text-xs tracking-wider">Name</th>
                            <th className="px-6 py-4 font-medium uppercase text-xs tracking-wider">Position</th>
                            <th className="px-6 py-4 font-medium uppercase text-xs tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                        {players.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                                    No players found.
                                </td>
                            </tr>
                        ) : (
                            players.map(player => (
                                <tr key={player.id} className="hover:bg-gray-800/30 transition-colors">
                                    <td className="px-6 py-4 font-medium text-white">{player.name}</td>
                                    <td className="px-6 py-4 text-gray-300">{player.position}</td>
                                    <td className="px-6 py-4 text-right">
                                        <Link href={`/admin/players/${player.id}`} className="text-blue-400 hover:text-blue-300 mr-4 font-medium">Edit</Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
