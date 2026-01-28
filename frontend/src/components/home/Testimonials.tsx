export default function Testimonials() {
    return (
        <section className="py-24 bg-black">
            <div className="container mx-auto px-4 text-center">
                <span className="text-gray-500 font-bold tracking-widest uppercase text-sm">Community</span>
                <h2 className="text-3xl md:text-4xl font-black text-white mt-2 mb-16 uppercase">Warrior Stories</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            quote: "This academy changed my son's life. The discipline he learned here improved his grades and his game.",
                            author: "Sarah J.",
                            role: "Parent"
                        },
                        {
                            quote: "The coaches truly care. They pushed me to my limits and helped me secure a D1 scholarship.",
                            author: "Michael T.",
                            role: "Alumni '23"
                        },
                        {
                            quote: "Professionalism at its finest. The best basketball development program in the city, hands down.",
                            author: "David R.",
                            role: "Local Scout"
                        }
                    ].map((t, idx) => (
                        <div key={idx} className="bg-gray-900/30 border border-gray-800 p-8 rounded-2xl text-left hover:bg-gray-900 transition-colors">
                            <div className="text-[var(--brand)] text-4xl font-serif mb-4">"</div>
                            <p className="text-gray-300 mb-6 leading-relaxed italic">{t.quote}</p>
                            <div>
                                <h5 className="text-white font-bold">{t.author}</h5>
                                <span className="text-gray-600 text-xs uppercase tracking-wider">{t.role}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
