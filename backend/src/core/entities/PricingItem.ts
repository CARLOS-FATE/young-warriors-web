export class PricingItem {
    constructor(
        public id: number | null,
        public title: string,
        public price: string,
        public period: string | null,
        public category: 'matricula' | 'mensualidad' | 'promo',
        public description: string | null,
        public features: string | null,
        public highlight: boolean,
        public createdAt: Date
    ) { }
}
