export type UserRole = 'admin' | 'coach' | 'player';

export class User {
    constructor(
        public id: number,
        public username: string,
        public passwordHash: string,
        public role: UserRole,
        public relatedId: number | null,
        public createdAt: Date
    ) { }
}
