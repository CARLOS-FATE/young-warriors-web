import { Request, Response } from 'express';
import { IUserRepository } from '../../core/repositories/IUserRepository';
import { User } from '../../core/entities/User';
import bcrypt from 'bcryptjs';
import pool from '../../infrastructure/database/db';

export class UserController {
    constructor(private userRepository: IUserRepository) { }

    async getAll(req: Request, res: Response) {
        try {
            const users = await this.userRepository.findAll();
            // Remove password hashes from response
            const safeUsers = users.map(u => ({
                id: u.id,
                username: u.username,
                role: u.role,
                relatedId: u.relatedId,
                createdAt: u.createdAt
            }));
            res.json(safeUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 'Failed to fetch users' });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { username, password, role, relatedId, createProfile } = req.body;

            if (!username || !password) {
                return res.status(400).json({ error: 'Username and password required' });
            }

            const existingUser = await this.userRepository.findByUsername(username);
            if (existingUser) {
                return res.status(400).json({ error: 'Username already exists' });
            }

            let finalRelatedId = relatedId || null;

            // Auto-create profile logic
            if (createProfile && !finalRelatedId) {
                if (role === 'player') {
                    // Create a basic player profile
                    const [result]: any = await pool.query(
                        "INSERT INTO players (name, position, ppg, rpg, apg) VALUES (?, ?, 0, 0, 0)",
                        [username, 'New Player']
                    );
                    finalRelatedId = result.insertId;
                } else if (role === 'coach') {
                    // Create a basic coach profile
                    const [result]: any = await pool.query(
                        "INSERT INTO coaches (name, role) VALUES (?, ?)",
                        [username, 'Assistant Coach']
                    );
                    finalRelatedId = result.insertId;
                }
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User(0, username, hashedPassword, role || 'player', finalRelatedId, new Date());

            const createdUser = await this.userRepository.create(newUser);
            res.status(201).json({
                id: createdUser.id,
                username: createdUser.username,
                role: createdUser.role,
                relatedId: createdUser.relatedId
            });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Failed to create user' });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id as string);
            if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

            await this.userRepository.delete(id);

            res.json({ message: 'User deleted' });
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({ error: 'Failed to delete user' });
        }
    }
}
