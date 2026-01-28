export class Coach {
    constructor(
        public id: number,
        public name: string,
        public role: string,
        public bio?: string,
        public imageUrl?: string,
        public createdAt?: Date
    ) { }
}
