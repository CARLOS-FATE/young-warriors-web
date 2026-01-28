'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { dictionaries, Locale } from './dictionaries';

interface LanguageContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [locale, setLocale] = useState<Locale>('en');

    useEffect(() => {
        // Auto-detect language
        const browserLang = navigator.language.split('-')[0];
        if (browserLang === 'es') {
            setLocale('es');
        }
    }, []);

    const t = (key: string): string => {
        const keys = key.split('.');
        let value: any = dictionaries[locale];

        for (const k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                return key; // Fallback to key if not found
            }
        }

        return typeof value === 'string' ? value : key;
    };

    return (
        <LanguageContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
