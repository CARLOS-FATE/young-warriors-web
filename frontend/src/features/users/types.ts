export type UserRole = 'admin' | 'coach' | 'player';

export interface User {
    id: number;
    username: string;
    role: UserRole;
    relatedId?: number | null;
    createdAt?: string;
}
