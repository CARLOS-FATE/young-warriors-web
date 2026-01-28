export interface Player {
    id: number;
    name: string;
    position: string;
    imageUrl?: string;
    createdAt?: string; // Date usually comes as string from JSON
}
