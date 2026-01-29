'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function Navbar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { t, locale, setLocale } = useLanguage();

    const isActive = (path: string) => pathname === path;

    const navLinks = [
        { label: t('nav.home'), href: '/' },
        { label: t('nav.players'), href: '/players' },
        { label: t('nav.coaches'), href: '/coaches' },
        { label: t('nav.news'), href: '/news' },
    ];

    const toggleLanguage = () => {
        setLocale(locale === 'en' ? 'es' : 'en');
    };

    if (pathname?.includes('/login')) return null;

    return (
        <nav className="border-b border-gray-800 bg-black/80 backdrop-blur-md sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="font-black text-2xl tracking-tighter text-white uppercase flex items-center gap-2">
                        <span className="text-[var(--brand)]">YOUNG</span> WARRIORS
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-sm font-bold uppercase tracking-wider transition-colors ${isActive(link.href)
                                    ? 'text-[var(--brand)]'
                                    : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* CTA Button & Mobile Toggle */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleLanguage}
                            className="text-xs font-bold uppercase text-gray-400 hover:text-white border border-gray-700 rounded px-2 py-1 transition-colors"
                        >
                            {locale === 'en' ? 'ES' : 'EN'}
                        </button>

                        <Link
                            href="/register"
                            className="hidden md:block bg-[var(--brand)] text-black text-xs font-bold uppercase px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
                        >
                            {t('nav.register')}
                        </Link>

                        <button
                            className="md:hidden text-white p-2"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? '✕' : '☰'}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-800 space-y-4">
                        {navLinks.map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`block text-sm font-bold uppercase tracking-wider ${isActive(link.href) ? 'text-[var(--brand)]' : 'text-gray-400'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/register"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block text-center bg-[var(--brand)] text-black text-xs font-bold uppercase px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
                        >
                            {t('nav.register')}
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
