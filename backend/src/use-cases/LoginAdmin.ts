import { IAdminRepository } from "../core/repositories/IAdminRepository";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class LoginAdmin {
    constructor(private adminRepository: IAdminRepository) { }

    async execute(username: string, password: string): Promise<{ token: string } | null> {
        const admin = await this.adminRepository.findByUsername(username);

        if (!admin) {
            return null;
        }

        const isPasswordValid = await bcrypt.compare(password, admin.passwordHash);

        if (!isPasswordValid) {
            return null;
        }

        const secret = process.env.JWT_SECRET || 'default_secret_key_change_me';
        const token = jwt.sign({ id: admin.id, username: admin.username }, secret, {
            expiresIn: '2h'
        });

        return { token };
    }
}
