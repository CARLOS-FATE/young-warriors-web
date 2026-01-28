export default function RegisterPage() {
    return (
        <div className="bg-black text-white p-4 py-20 min-h-[80vh] flex items-center">
            <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-5xl md:text-8xl font-black mb-6 uppercase tracking-tighter text-white">
                    Join The <span className="text-[var(--brand)]">Squad</span>
                </h1>

                <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                    We are currently accepting expressions of interest for the upcoming 2026 season for all age groups.
                </p>

                <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl text-left">
                    <h3 className="text-2xl font-bold text-white mb-6 uppercase">Interest Form</h3>

                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-[var(--brand)] text-xs font-bold uppercase mb-2">Player Name</label>
                                <input type="text" className="w-full bg-black border border-gray-700 p-4 rounded text-white focus:border-[var(--brand)] outline-none transition-colors" placeholder="Full Name" />
                            </div>
                            <div>
                                <label className="block text-[var(--brand)] text-xs font-bold uppercase mb-2">Date of Birth</label>
                                <input type="date" className="w-full bg-black border border-gray-700 p-4 rounded text-white focus:border-[var(--brand)] outline-none transition-colors" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[var(--brand)] text-xs font-bold uppercase mb-2">Parent/Guardian Email</label>
                            <input type="email" className="w-full bg-black border border-gray-700 p-4 rounded text-white focus:border-[var(--brand)] outline-none transition-colors" placeholder="email@example.com" />
                        </div>

                        <div>
                            <label className="block text-[var(--brand)] text-xs font-bold uppercase mb-2">Message (Experience, Position, etc.)</label>
                            <textarea className="w-full bg-black border border-gray-700 p-4 rounded text-white focus:border-[var(--brand)] outline-none h-32 transition-colors" placeholder="Tell us about the player..."></textarea>
                        </div>

                        <button type="button" className="w-full bg-[var(--brand)] text-black font-black uppercase text-lg py-4 rounded hover:opacity-90 transition-opacity">
                            Submit Interest
                        </button>
                    </form>

                    <p className="text-xs text-gray-600 mt-6 text-center">
                        *This form is for demonstration purposes. In a real deployment, it would connect to an email service or CRM.
                    </p>
                </div>
            </div>
        </div>
    );
}
