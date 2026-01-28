import Link from 'next/link';

export default function CtaBanner() {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Image Placeholder */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2090&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/80 to-transparent"></div>

            <div className="container mx-auto px-4 relative z-10 text-center">
                <h2 className="text-5xl md:text-8xl font-black text-white mb-6 uppercase italic tracking-tighter">
                    Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand)] to-yellow-500">Dominate?</span>
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
                    Spots are limited for the upcoming season. Secure your place in the Young Warriors squad today.
                </p>
                <Link
                    href="/register"
                    className="inline-block bg-[var(--brand)] text-black font-black text-xl px-12 py-5 rounded-full hover:scale-105 transition-transform shadow-[0_0_40px_-10px_rgba(249,167,33,0.6)]"
                >
                    START YOUR JOURNEY
                </Link>
            </div>
        </section>
    );
}
