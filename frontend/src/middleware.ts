import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const isAdminPath = request.nextUrl.pathname.startsWith('/admin');
    const isLoginPath = request.nextUrl.pathname === '/admin/login';

    // Get token from cookies
    const token = request.cookies.get('admin_token')?.value;

    // Protect Admin Routes
    if (isAdminPath) {
        // If trying to access admin pages (except login) without token -> Redirect to Login
        if (!isLoginPath && !token) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        // If trying to access login page WITH token -> Redirect to Dashboard
        if (isLoginPath && token) {
            return NextResponse.redirect(new URL('/admin', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
};
