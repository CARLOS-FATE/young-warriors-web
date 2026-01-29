import { User } from "../entities/User";

export interface IUserRepository {
    findByUsername(username: string): Promise<User | null>;
    create(user: User): Promise<User>;
    findAll(): Promise<User[]>;
    delete(id: number): Promise<void>;
}
