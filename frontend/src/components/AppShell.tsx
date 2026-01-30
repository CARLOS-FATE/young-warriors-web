'use client';

import { usePathname } from 'next/navigation';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/admin/login';

    return (
        <>
            {!isLoginPage && <Navbar />}
            <main className="min-h-screen">
                {children}
            </main>
            {!isLoginPage && <Footer />}
        </>
    );
}
