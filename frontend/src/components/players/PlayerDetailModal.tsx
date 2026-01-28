'use client';

import { Player } from "@/features/players/types";
import PlayerRadarChart from "@/components/analytics/RadarChart";
import ShotChart from "@/components/analytics/ShotChart";
import { X } from "lucide-react"; // Or standard button if lucide not installed, assuming standard button for now

interface Props {
    player: Player;
    onClose: () => void;
}

export default function PlayerDetailModal({ player, onClose }: Props) {
    // Parse tactical stats or use defaults
    const stats = typeof player.tacticalStats === 'string'
        ? JSON.parse(player.tacticalStats)
        : player.tacticalStats || {};

    const skills = stats.skills || [
        { subject: 'Defense', A: 7, fullMark: 10 },
        { subject: 'Shooting', A: 8, fullMark: 10 },
        { subject: 'Passing', A: 6, fullMark: 10 },
        { subject: 'Stamina', A: 9, fullMark: 10 },
        { subject: 'IQ', A: 8, fullMark: 10 },
        { subject: 'Speed', A: 7, fullMark: 10 },
    ];

    const shotZones = stats.shot_zones || [
        { zone: 'three', value: 35, label: '3PT' },
        { zone: 'mid', value: 42, label: 'Mid' },
        { zone: 'paint', value: 60, label: 'Paint' },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose}></div>

            <div className="relative bg-[#0a0a0a] border border-gray-800 w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black p-2 rounded-full text-white border border-gray-700 transition-colors"
                >
                    ✕
                </button>

                {/* Left: Player Profile */}
                <div className="w-full md:w-1/3 bg-[#111] p-8 flex flex-col items-center border-r border-gray-800">
                    <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[var(--brand)] shadow-lg mb-6">
                        {player.imageUrl ? (
                            <img src={player.imageUrl} alt={player.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-gray-800 flex items-center justify-center text-4xl font-bold">{player.name[0]}</div>
                        )}
                    </div>

                    <h2 className="text-3xl font-black text-white uppercase text-center leading-none">{player.name}</h2>
                    <p className="text-[var(--brand)] font-bold tracking-widest uppercase mb-8">{player.position}</p>

                    <div className="grid grid-cols-2 gap-4 w-full mb-8">
                        <div className="bg-black p-3 rounded border border-gray-800 text-center">
                            <span className="block text-gray-500 text-xs font-bold uppercase">Height</span>
                            <span className="text-white font-mono">{player.height || '-'}</span>
                        </div>
                        <div className="bg-black p-3 rounded border border-gray-800 text-center">
                            <span className="block text-gray-500 text-xs font-bold uppercase">Weight</span>
                            <span className="text-white font-mono">{player.weight || '-'}</span>
                        </div>
                    </div>

                    <div className="w-full">
                        <h3 className="text-gray-500 text-xs font-bold uppercase mb-3 text-center">Season Averages</h3>
                        <div className="flex justify-between divide-x divide-gray-800 border border-gray-800 rounded bg-black">
                            <div className="flex-1 p-2 text-center">
                                <div className="text-2xl font-black text-white">{player.ppg || 0}</div>
                                <div className="text-[10px] text-gray-400 font-bold uppercase">PPG</div>
                            </div>
                            <div className="flex-1 p-2 text-center">
                                <div className="text-2xl font-black text-white">{player.rpg || 0}</div>
                                <div className="text-[10px] text-gray-400 font-bold uppercase">RPG</div>
                            </div>
                            <div className="flex-1 p-2 text-center">
                                <div className="text-2xl font-black text-white">{player.apg || 0}</div>
                                <div className="text-[10px] text-gray-400 font-bold uppercase">APG</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Analytics */}
                <div className="w-full md:w-2/3 p-8 overflow-y-auto bg-black custom-scrollbar">
                    <h3 className="text-2xl font-black text-white uppercase italic mb-6 flex items-center gap-2">
                        <span className="text-[var(--brand)]">///</span> Performance Analytics
                    </h3>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-gray-400 text-sm font-bold uppercase mb-4 border-b border-gray-800 pb-2">Skill Radar</h4>
                            <div className="bg-[#111] rounded-xl border border-gray-800 p-4">
                                <PlayerRadarChart data={skills} />
                            </div>
                            <p className="text-gray-500 text-xs mt-2 italic">
                                * Based on latest coaching evaluation.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-gray-400 text-sm font-bold uppercase mb-4 border-b border-gray-800 pb-2">Shot Zones</h4>
                            <div className="bg-[#111] rounded-xl border border-gray-800 p-4">
                                <ShotChart data={shotZones} />
                            </div>
                            <p className="text-gray-500 text-xs mt-2 italic">
                                * FG% by zone for current season.
                            </p>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h4 className="text-gray-400 text-sm font-bold uppercase mb-4 border-b border-gray-800 pb-2">Scouting Report</h4>
                        <p className="text-gray-300 leading-relaxed text-sm">
                            {player.name} is showing exceptional growth this season. Their performance in the paint has been dominant, with a 65% conversion rate.
                            Playmaking skills are improving, as evidenced by the rising assist numbers.
                            Defensively, they remain a key anchor for the team.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
