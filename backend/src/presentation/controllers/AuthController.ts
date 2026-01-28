import { Request, Response } from 'express';
import { LoginAdmin } from '../../use-cases/LoginAdmin';
import { IAdminRepository } from '../../core/repositories/IAdminRepository';

export class AuthController {
    constructor(private adminRepository: IAdminRepository) { }

    async login(req: Request, res: Response) {
        const useCase = new LoginAdmin(this.adminRepository);
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({ error: 'Username and password required' });
            }

            const result = await useCase.execute(username, password);

            if (!result) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            res.json(result);
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
