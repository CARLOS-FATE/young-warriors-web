import { Coach } from "../entities/Coach";

export interface ICoachRepository {
    findAll(): Promise<Coach[]>;
    findById(id: number): Promise<Coach | null>;
    create(coach: Coach): Promise<Coach>;
    update(coach: Coach): Promise<Coach>;
    delete(id: number): Promise<boolean>;
}
