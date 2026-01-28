import Link from 'next/link';

export default function ProgramsGrid() {
    const programs = [
        {
            title: "Rookies",
            age: "Ages 5-8",
            desc: "Fundamental skills, coordination, and falling in love with the game.",
            gradient: "from-blue-600 to-blue-900"
        },
        {
            title: "Development",
            age: "Ages 9-13",
            desc: "Advanced tactical understanding, shooting mechanics, and team defense.",
            gradient: "from-orange-500 to-red-800"
        },
        {
            title: "Elite Squad",
            age: "Ages 14-18",
            desc: "High-performance training for competition, scouting, and college prep.",
            gradient: "from-gray-700 to-black"
        }
    ];

    return (
        <section className="py-24 bg-black relative">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-[var(--brand)] font-bold tracking-widest uppercase text-sm">Path to Pro</span>
                    <h2 className="text-4xl md:text-5xl font-black text-white mt-2 uppercase">Training Programs</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {programs.map((prog, idx) => (
                        <div key={idx} className={`relative group overflow-hidden rounded-2xl p-8 min-h-[400px] flex flex-col justify-end border border-gray-800 hover:border-[var(--brand)] transition-colors`}>
                            {/* Background Gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${prog.gradient} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                            <div className="relative z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <div className="bg-[var(--brand)] text-black text-xs font-bold inline-block px-3 py-1 rounded mb-4">
                                    {prog.age}
                                </div>
                                <h3 className="text-3xl font-black text-white uppercase mb-4 italic">{prog.title}</h3>
                                <p className="text-gray-300 mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                                    {prog.desc}
                                </p>
                                <Link href="/register" className="text-white border-b border-[var(--brand)] pb-1 text-sm font-bold hover:text-[var(--brand)] transition-colors">
                                    JOIN PROGRAM &rarr;
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
