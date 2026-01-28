export class Admin {
    constructor(
        public id: number,
        public username: string,
        public passwordHash: string,
        public createdAt: Date
    ) { }
}
