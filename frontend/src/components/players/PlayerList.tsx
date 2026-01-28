'use client';

import { useState } from 'react';
import { Player } from '@/features/players/types';
import PlayerDetailModal from './PlayerDetailModal';

interface Props {
    players: Player[];
}

export default function PlayerList({ players }: Props) {
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

    return (
        <>
            {players.length === 0 ? (
                <div className="p-12 border border-dashed border-gray-800 rounded-2xl text-center bg-gray-900/50">
                    <p className="text-gray-500 text-xl font-bold">No players found.</p>
                    <p className="text-sm text-gray-700 mt-2">Check back soon for our season roster.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {players.map(player => (
                        <div
                            key={player.id}
                            className="group relative cursor-pointer"
                            onClick={() => setSelectedPlayer(player)}
                        >
                            <div className="aspect-[3/4] bg-gray-900 rounded-none overflow-hidden relative">
                                {player.imageUrl ? (
                                    <img src={player.imageUrl} alt={player.name} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-900 border border-gray-800">
                                        <span className="text-gray-800 text-8xl font-black select-none opacity-20">{player.name.charAt(0)}</span>
                                    </div>
                                )}

                                {/* Overlay Gradient */}
                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[var(--brand)] via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300 mix-blend-multiply" />
                            </div>

                            <div className="pt-4 group-hover:pl-2 transition-all duration-300">
                                <h2 className="text-2xl font-black text-white uppercase leading-none mb-1">{player.name}</h2>
                                <p className="text-[var(--brand)] font-bold text-sm tracking-wider uppercase mb-3">{player.position}</p>

                                {/* Physical Stats */}
                                {(player.height || player.weight) && (
                                    <div className="flex gap-4 text-xs text-gray-500 font-mono mb-3 uppercase">
                                        {player.height && <span>H: {player.height}</span>}
                                        {player.weight && <span>W: {player.weight}</span>}
                                    </div>
                                )}

                                {/* Game Stats */}
                                <div className="grid grid-cols-3 gap-2 border-t border-gray-800 pt-3">
                                    <div className="text-center">
                                        <div className="text-[var(--brand)] font-black text-lg leading-none">{player.ppg || 0}</div>
                                        <div className="text-[10px] text-gray-500 font-bold uppercase">PPG</div>
                                    </div>
                                    <div className="text-center border-l border-gray-800">
                                        <div className="text-white font-black text-lg leading-none">{player.rpg || 0}</div>
                                        <div className="text-[10px] text-gray-500 font-bold uppercase">RPG</div>
                                    </div>
                                    <div className="text-center border-l border-gray-800">
                                        <div className="text-white font-black text-lg leading-none">{player.apg || 0}</div>
                                        <div className="text-[10px] text-gray-500 font-bold uppercase">APG</div>
                                    </div>
                                </div>

                                <div className="mt-4 text-xs text-gray-600 uppercase font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                    Click for Analytics →
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
            )}

            {selectedPlayer && (
                <PlayerDetailModal
                    player={selectedPlayer}
                    onClose={() => setSelectedPlayer(null)}
                />
            )}
        </>
    );
}
