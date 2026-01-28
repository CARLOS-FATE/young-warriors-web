export class Player {
    constructor(
        public id: number,
        public name: string,
        public position: string,
        public imageUrl?: string,
        public createdAt?: Date
    ) { }
}
