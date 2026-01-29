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
        public tacticalStats?: any, // JSON
        public dni?: string,
        public phone?: string,
        public emergencyPhone?: string,
        public createdAt?: Date



    ) { }
}
