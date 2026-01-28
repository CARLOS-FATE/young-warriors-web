'use client';

export default function StatsTicker() {
    const stats = [
        { label: 'Active Players', value: '300+' },
        { label: 'Championships', value: '12' },
        { label: 'College Scholarships', value: '45' },
        { label: 'Years of Excellence', value: '15' },
    ];

    return (
        <section className="bg-[var(--brand)] text-black py-12 border-y border-orange-600 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-black/10">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                            <span className="text-4xl md:text-5xl font-black tracking-tighter mb-1">{stat.value}</span>
                            <span className="text-xs md:text-sm font-bold uppercase tracking-widest opacity-80">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
