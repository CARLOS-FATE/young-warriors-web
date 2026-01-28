'use client';

import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';

interface SkillData {
    subject: string;
    A: number;
    fullMark: number;
}

interface Props {
    data: SkillData[];
}

export default function PlayerRadarChart({ data }: Props) {
    if (!data || data.length === 0) return <div>No data available</div>;

    return (
        <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid stroke="#333" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
                    <Radar
                        name="Skills"
                        dataKey="A"
                        stroke="var(--brand)"
                        fill="var(--brand)"
                        fillOpacity={0.4}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }}
                        itemStyle={{ color: 'var(--brand)' }}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
