const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function fetchFromApi(endpoint: string, options: RequestInit = {}) {
    // Ensure endpoint starts with / if not provided
    const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

    const res = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });

    if (!res.ok) {
        const errorBody = await res.json().catch(() => ({}));
        throw new Error(errorBody.message || `API request failed: ${res.statusText}`);
    }

    // Check if response has content to parse
    const text = await res.text();
    return text ? JSON.parse(text) : null;
}
