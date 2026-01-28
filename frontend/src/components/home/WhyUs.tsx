export default function WhyUs() {
    return (
        <section className="py-24 bg-gray-900 border-y border-gray-800">
            <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                    <span className="text-[var(--brand)] font-bold tracking-widest uppercase text-sm">The Warrior Way</span>
                    <h2 className="text-4xl md:text-5xl font-black text-white mt-2 mb-6 uppercase leading-tight">
                        More Than Just <br /> A <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand)] to-orange-600">Game</span>
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed mb-8">
                        We don't just build basketball players; we build resilient leaders. Our methodology combines professional-grade technical training with character development that translates off the court.
                    </p>

                    <ul className="space-y-4">
                        {[
                            'FIBA Certified Coaches',
                            'State-of-the-Art Indoor Courts',
                            'Individual Video Analysis',
                            'Strength & Conditioning Program'
                        ].map((item, idx) => (
                            <li key={idx} className="flex items-center gap-4 text-white font-bold">
                                <span className="w-6 h-6 rounded-full bg-[var(--brand)] flex items-center justify-center text-black text-xs">✓</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 bg-[var(--brand)] blur-[100px] opacity-10"></div>
                    <div className="bg-black border border-gray-800 rounded-3xl p-8 relative z-10 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                        <div className="flex items-center gap-4 mb-6 border-b border-gray-800 pb-6">
                            <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-2xl">🏀</div>
                            <div>
                                <h4 className="text-white font-bold">Elite Training</h4>
                                <p className="text-gray-500 text-sm">Every Single Day</p>
                            </div>
                        </div>
                        <div className="space-y-4 text-gray-400 text-sm font-mono">
                            <p>"Success is no accident. It is hard work, perseverance, learning, studying, sacrifice and most of all, love of what you are doing."</p>
                            <p className="text-[var(--brand)] text-right">- Pele</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
