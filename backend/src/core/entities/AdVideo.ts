export class AdVideo {
    constructor(
        public id: number,
        public title: string,
        public videoUrl: string,
        public isActive: boolean,
        public createdAt?: Date
    ) { }
}
