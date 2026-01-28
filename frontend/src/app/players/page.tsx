import { getPlayers } from '@/features/players/service';
import PlayerList from '@/components/players/PlayerList';

export const dynamic = 'force-dynamic';

export default async function PlayersPage() {
    const players = await getPlayers().catch(err => {
        console.error("Failed to fetch players:", err);
        return [];
    });

    return (
        <div className="bg-black text-white p-4 py-20">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16 text-center">
                    <h1 className="text-5xl md:text-7xl font-black mb-4 uppercase tracking-tighter text-white">
                        The <span className="text-[var(--brand)]">Roster</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Meet the dedicated athletes who give everything on the field.
                    </p>
                </div>

                <PlayerList players={players} />
            </div>
        </div>
    );
}
