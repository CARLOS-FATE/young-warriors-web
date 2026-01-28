const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function fetchFromApi(endpoint: string, options: RequestInit = {}) {
    // Ensure endpoint starts with / if not provided
    const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    // Add Authorization header if token exists (Client-side only)
    if (typeof window !== 'undefined') {
        const tokenMatch = document.cookie.match(/admin_token=([^;]+)/);
        const token = tokenMatch ? tokenMatch[1] : null;
        if (token) {
            (headers as any)['Authorization'] = `Bearer ${token}`;
        }
    }

    const res = await fetch(`${API_URL}${path}`, {
        ...options,
        headers,
    });

    if (!res.ok) {
        const errorBody = await res.json().catch(() => ({}));
        throw new Error(errorBody.message || `API request failed: ${res.statusText}`);
    }

    // Check if response has content to parse
    const text = await res.text();
    return text ? JSON.parse(text) : null;
}
