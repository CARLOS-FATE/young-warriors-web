import Link from 'next/link';
import VideoCarousel from './VideoCarousel';

export default function HeroSection() {
    return (
        <section className="relative min-h-[90vh] flex items-center bg-[var(--background)] overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden select-none pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[var(--brand)] rounded-full blur-[150px] opacity-10"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900 rounded-full blur-[150px] opacity-10"></div>
            </div>

            <div className="container mx-auto px-4 z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <div className="space-y-6 text-center lg:text-left pt-10 lg:pt-0">
                    <div className="inline-block px-4 py-1.5 rounded-full border border-gray-800 bg-gray-900/50 backdrop-blur text-[var(--brand)] text-xs font-bold uppercase tracking-wider mb-2">
                        Season 2026 Registration Open
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight">
                        FORGING <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand)] to-orange-600">
                            CHAMPIONS
                        </span>
                        <br /> ON & OFF THE FIELD
                    </h1>

                    <p className="text-gray-400 text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed">
                        Join the elite development program designed to transform young potential into professional excellence through discipline, strategy, and passion.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                        <Link
                            href="/register"
                            className="bg-[var(--brand)] text-black font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-all transform hover:-translate-y-1 shadow-[0_10px_20px_-10px_rgba(249,167,33,0.5)] text-center"
                        >
                            JOIN THE RANKS
                        </Link>
                        <Link
                            href="/coaches"
                            className="border border-gray-700 bg-gray-900/50 text-white font-bold px-8 py-4 rounded-xl hover:bg-gray-800 transition-all text-center backdrop-blur"
                        >
                            MEET THE COACHES
                        </Link>
                    </div>

                    <div className="pt-8 flex items-center justify-center lg:justify-start gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Fake Sponsor/Partner Logos for commercial look */}
                        <div className="h-8 w-24 bg-white/20 rounded"></div>
                        <div className="h-8 w-24 bg-white/20 rounded"></div>
                        <div className="h-8 w-24 bg-white/20 rounded"></div>
                    </div>
                </div>

                {/* Visual Content */}
                <div className="relative">
                    {/* Decorative Ring */}
                    <div className="absolute -inset-4 border border-[var(--brand)]/20 rounded-[2.5rem] rotate-3 scale-105 z-0"></div>

                    {/* Carousel Container */}
                    <div className="relative z-10">
                        <VideoCarousel />
                    </div>
                </div>
            </div>
        </section>
    );
}
