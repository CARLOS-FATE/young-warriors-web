export class Player {
    constructor(
        public id: number,
        public name: string,
        public position: string,
        public imageUrl?: string,
        public height?: string,
        public weight?: string,
        public ppg?: number,
        public rpg?: number,
        public apg?: number,
        public createdAt?: Date

    ) { }
}
