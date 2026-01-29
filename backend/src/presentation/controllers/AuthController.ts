import { Request, Response } from 'express';
import { LoginUser } from '../../use-cases/LoginUser';
import { IUserRepository } from '../../core/repositories/IUserRepository';

export class AuthController {
    constructor(private userRepository: IUserRepository) { }

    async login(req: Request, res: Response) {
        const useCase = new LoginUser(this.userRepository);
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

