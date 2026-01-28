import { Request, Response } from 'express';
import { GetAllPlayers } from '../../use-cases/GetAllPlayers';
import { CreatePlayer } from '../../use-cases/CreatePlayer';
import { IPlayerRepository } from '../../core/repositories/IPlayerRepository';
import { Player } from '../../core/entities/Player';

export class PlayerController {
    constructor(private playerRepository: IPlayerRepository) { }

    async getAll(req: Request, res: Response) {
        const useCase = new GetAllPlayers(this.playerRepository);
        try {
            const players = await useCase.execute();
            res.json(players);
        } catch (error) {
            console.error('Error fetching players:', error);
            res.status(500).json({ error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) });
        }
    }

    async create(req: Request, res: Response) {
        const useCase = new CreatePlayer(this.playerRepository);
        try {
            const { name, position, imageUrl } = req.body;
            const newPlayer = new Player(0, name, position, imageUrl);
            const createdPlayer = await useCase.execute(newPlayer);
            res.status(201).json(createdPlayer);
        } catch (error) {
            console.error('Error creating player:', error);
            res.status(500).json({ error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) });
        }
    }
}
