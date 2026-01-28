export interface Player {
    id: number;
    name: string;
    position: string;
    imageUrl?: string;
    height?: string;
    weight?: string;
    ppg?: number;
    rpg?: number;
    apg?: number;
    tacticalStats?: any; // JSON string or object
    createdAt?: string;


}
