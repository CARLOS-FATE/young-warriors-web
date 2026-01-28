'use client';

interface ZoneData {
    zone: 'paint' | 'mid' | 'three' | 'corner';
    value: number; // e.g. percentage or attempts
    label: string;
}

interface Props {
    data: ZoneData[];
}

export default function ShotChart({ data }: Props) {
    const getZoneColor = (value: number) => {
        if (value >= 50) return 'rgba(34, 197, 94, 0.6)'; // Green (Hot)
        if (value >= 35) return 'rgba(234, 179, 8, 0.6)'; // Yellow (Avg)
        return 'rgba(239, 68, 68, 0.6)'; // Red (Cold)
    };

    const paintData = data.find(d => d.zone === 'paint');
    const midData = data.find(d => d.zone === 'mid');
    const threeData = data.find(d => d.zone === 'three');
    const cornerData = data.find(d => d.zone === 'corner');

    return (
        <div className="relative w-full aspect-[4/3] bg-[#1a1a1a] border border-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
            {/* Simple Half Court SVG */}
            <svg viewBox="0 0 500 470" className="w-full h-full">
                {/* Court Background */}
                <rect x="0" y="0" width="500" height="470" fill="transparent" />

                {/* 3 Point Line Area (Outer) */}
                <path d="M 0 0 V 140 L 0 140 Q 250 300 500 140 V 0 H 0 Z" fill={getZoneColor(threeData?.value || 30)} stroke="white" strokeWidth="2" opacity="0.3" />
                <text x="250" y="80" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">3PT {threeData?.value}%</text>

                {/* Mid Range */}
                <path d="M 170 0 V 190 H 330 V 0 H 170 Z" fill={getZoneColor(midData?.value || 40)} stroke="white" strokeWidth="2" opacity="0.4" mask="url(#midmask)" />
                {/* Better shapes would be complex paths, using simple rects/circles for prototype */}
                <circle cx="250" cy="190" r="80" fill={getZoneColor(midData?.value || 40)} stroke="white" strokeWidth="2" opacity="0.4" />
                <text x="250" y="180" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">MID {midData?.value}%</text>

                {/* Key / Paint */}
                <rect x="190" y="280" width="120" height="190" fill={getZoneColor(paintData?.value || 60)} stroke="white" strokeWidth="2" opacity="0.5" />
                <circle cx="250" cy="280" r="60" fill="transparent" stroke="white" strokeWidth="2" />
                <text x="250" y="380" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">PAINT {paintData?.value}%</text>

                {/* Hoop */}
                <circle cx="250" cy="417" r="15" stroke="#ea580c" strokeWidth="4" fill="transparent" />
                <line x1="220" y1="430" x2="280" y2="430" stroke="white" strokeWidth="4" />
            </svg>

            <div className="absolute top-2 right-2 text-[10px] text-gray-500 font-mono">
                INTERACTIVE SHOT MAP
            </div>
        </div>
    );
}
