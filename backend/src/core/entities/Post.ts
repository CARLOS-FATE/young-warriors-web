export class Post {
    constructor(
        public id: number,
        public title: string,
        public content: string,
        public category: string,
        public authorId?: number,
        public publishedAt?: Date,
        public createdAt?: Date
    ) { }
}
