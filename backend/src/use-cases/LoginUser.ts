import { IUserRepository } from "../core/repositories/IUserRepository";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class LoginUser {
    constructor(private userRepository: IUserRepository) { }

    async execute(username: string, password: string): Promise<{ token: string, role: string, username: string } | null> {
        const user = await this.userRepository.findByUsername(username);

        if (!user) {
            return null;
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

        if (!isPasswordValid) {
            return null;
        }

        const secret = process.env.JWT_SECRET || 'default_secret_key_change_me';
        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                role: user.role,
                relatedId: user.relatedId
            },
            secret,
            { expiresIn: '24h' }
        );

        return { token, role: user.role, username: user.username };
    }
}
