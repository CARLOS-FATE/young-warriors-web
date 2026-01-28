import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="border-t border-gray-900 bg-black py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="font-black text-2xl tracking-tighter text-white uppercase flex items-center gap-2 mb-4">
                            <span className="text-[var(--brand)]">YOUNG</span> WARRIORS
                        </Link>
                        <p className="text-gray-500 max-w-sm text-sm leading-relaxed">
                            Forging the next generation of champions through discipline, excellence, and passion on the field.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-bold uppercase tracking-wider mb-4 text-sm">Links</h4>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li><Link href="/players" className="hover:text-[var(--brand)] transition-colors">Roster</Link></li>
                            <li><Link href="/coaches" className="hover:text-[var(--brand)] transition-colors">Coaching Staff</Link></li>
                            <li><Link href="/news" className="hover:text-[var(--brand)] transition-colors">News & Blog</Link></li>
                            <li><Link href="/register" className="hover:text-[var(--brand)] transition-colors">Join Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold uppercase tracking-wider mb-4 text-sm">Admin</h4>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li><Link href="/admin/login" className="hover:text-[var(--brand)] transition-colors">Staff Portal</Link></li>
                        </ul>
                        <p className="text-xs text-gray-700 mt-4">
                            &copy; {new Date().getFullYear()} Young Warriors FC.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
