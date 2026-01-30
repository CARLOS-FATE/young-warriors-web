'use client';

import Link from 'next/link';
import { ReactNode, useState } from 'react';
import { usePathname } from 'next/navigation';

import { useAuth } from '@/context/AuthContext';

export default function AdminLayout({ children }: { children: ReactNode }) {
    const { logout } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;
    const isLoginPage = pathname === '/admin/login';

    if (isLoginPage) return <>{children}</>;

    const navLinks = [
        { href: '/admin', label: 'Dashboard' },
        { href: '/admin/users', label: 'Users' },
        { href: '/admin/players', label: 'Players' },
        { href: '/admin/coaches', label: 'Coaches' },
        { href: '/admin/posts', label: 'Blog Posts' },
        { href: '/admin/marketing', label: 'Marketing' },
        { href: '/admin/pricing', label: 'Pricing' },
        { href: '/admin/attendance', label: 'Attendance' },
    ];

    return (
        <div className="flex min-h-screen bg-gray-900 text-white">
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-black/90 backdrop-blur-md border-b border-gray-800 z-40 flex items-center px-4 justify-between">
                <span className="font-bold text-[var(--brand)]">ADMIN PANEL</span>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 text-white"
                >
                    {isSidebarOpen ? '✕' : '☰'}
                </button>
            </div>

            {/* Sidebar Overlay for Mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            {/* Sidebar */}
            <aside className={`
                w-64 border-r border-gray-800 bg-black/95 p-6 flex flex-col pt-24 md:pt-6
                fixed top-0 bottom-0 left-0 z-40 transition-transform duration-300
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                md:relative md:translate-x-0 md:top-auto md:bottom-auto md:h-auto md:z-0
            `}>
                <div className="mb-8 hidden md:block">
                    <h2 className="text-xl font-bold text-white tracking-widest uppercase">Admin Panel</h2>
                    <p className="text-xs text-gray-500 mt-1">Young Warriors</p>
                </div>

                {/* Mobile Close Button (Duplicate inside sidebar for clarity) */}
                <div className="md:hidden mb-6 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white uppercase">Menu</h2>
                    <button onClick={() => setIsSidebarOpen(false)} className="text-gray-400">✕</button>
                </div>

                <nav className="flex-1 space-y-2 overflow-y-auto">
                    {navLinks.map(link => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsSidebarOpen(false)}
                            className={`block px-4 py-2 rounded-lg transition-colors ${isActive(link.href)
                                ? 'bg-[var(--brand)] text-black font-bold shadow-[0_0_10px_rgba(249,167,33,0.3)]'
                                : 'text-gray-400 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="border-t border-gray-800 pt-6 mt-auto space-y-4">
                    <button
                        onClick={() => logout()}
                        className="w-full flex items-center gap-2 px-4 py-2 text-red-400 hover:text-white hover:bg-red-500/10 rounded-lg transition-colors text-sm font-bold uppercase"
                    >
                        <span>⏻</span> Sign Out
                    </button>

                    <Link href="/" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 transition-colors group px-4">
                        <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> Back to Site
                    </Link>
                </div>
            </aside>

            {/* Main Content - No offset needed for static sidebar */}
            <main className="flex-1 p-4 md:p-8 pt-20 md:pt-8 overflow-auto w-full">
                <div className="max-w-5xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
