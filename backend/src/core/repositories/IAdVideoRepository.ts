import { AdVideo } from "../entities/AdVideo";

export interface IAdVideoRepository {
    findAll(): Promise<AdVideo[]>;
    create(video: AdVideo): Promise<AdVideo>;
    delete(id: number): Promise<boolean>;
}
