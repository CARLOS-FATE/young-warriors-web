import Link from 'next/link';
import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen bg-gray-900 text-white">
            {/* Sidebar */}
            <aside className="w-64 border-r border-gray-800 bg-black/40 p-6 flex flex-col fixed h-full">
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-white tracking-widest uppercase">Admin Panel</h2>
                    <p className="text-xs text-gray-500 mt-1">Young Warriors</p>
                </div>

                <nav className="flex-1 space-y-2">
                    <Link href="/admin" className="block px-4 py-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                        Dashboard
                    </Link>
                    <div className="pt-4 pb-2">
                        <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Management</p>
                    </div>
                    <Link href="/admin/users" className="block px-4 py-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                        Users
                    </Link>
                    <Link href="/admin/players" className="block px-4 py-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">

                        Players
                    </Link>
                    <Link href="/admin/coaches" className="block px-4 py-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                        Coaches
                    </Link>
                    <Link href="/admin/posts" className="block px-4 py-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                        Blog Posts
                    </Link>
                    <Link href="/admin/marketing" className="block p-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors">
                        Marketing (Videos)
                    </Link>
                    <Link href="/admin/pricing" className="block p-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors">
                        Pricing & Promos
                    </Link>
                    <Link href="/admin/attendance" className="block p-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors">
                        Attendance
                    </Link>
                </nav>

                <div className="border-t border-gray-800 pt-6 mt-auto">
                    <Link href="/" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 transition-colors group">
                        <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> Back to Site
                    </Link>
                </div>
            </aside>

            {/* Main Content - Offset for fixed sidebar */}
            <main className="flex-1 p-8 ml-64 overflow-auto">
                <div className="max-w-5xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
