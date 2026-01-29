'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
    username: string;
    role: 'admin' | 'coach' | 'player';
    relatedId?: number;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (token: string, user: User) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            // Decode token payload to get user role (Basic decode, usually use library like jwt-decode)
            try {
                const payload = JSON.parse(atob(storedToken.split('.')[1]));
                setUser({
                    username: payload.u || payload.username,
                    role: payload.role || 'player',
                    relatedId: payload.relatedId
                });
            } catch (e) {
                console.error('Failed to decode token', e);
                localStorage.removeItem('token');
            }
        }
        setIsLoading(false);
    }, []);

    const login = (newToken: string, newUser: User) => {
        localStorage.setItem('token', newToken);
        document.cookie = `admin_token=${newToken}; path=/; max-age=7200; Secure; SameSite=Strict`;
        setToken(newToken);
        setUser(newUser);
    };

    const logout = () => {
        localStorage.removeItem('token');
        document.cookie = 'admin_token=; path=/; max-age=0;';
        setToken(null);
        setUser(null);
        router.push('/admin/login');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
