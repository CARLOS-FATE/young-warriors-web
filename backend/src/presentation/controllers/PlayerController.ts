import { Request, Response } from 'express';
import { GetAllPlayers } from '../../use-cases/GetAllPlayers';
import { CreatePlayer } from '../../use-cases/CreatePlayer';
import { IPlayerRepository } from '../../core/repositories/IPlayerRepository';
import { Player } from '../../core/entities/Player';
import { UpdatePlayer } from '../../use-cases/UpdatePlayer';
import { DeletePlayer } from '../../use-cases/DeletePlayer';

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

    async update(req: Request, res: Response) {
        const useCase = new UpdatePlayer(this.playerRepository);
        try {
            const id = Number(req.params.id);
            const updatedPlayer = await useCase.execute(id, req.body);
            if (!updatedPlayer) {
                return res.status(404).json({ error: 'Player not found' });
            }
            res.json(updatedPlayer);
        } catch (error) {
            console.error('Error updating player:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async delete(req: Request, res: Response) {
        const useCase = new DeletePlayer(this.playerRepository);
        try {
            const id = Number(req.params.id);
            const success = await useCase.execute(id);
            if (!success) {
                return res.status(404).json({ error: 'Player not found' });
            }
            res.status(204).send();
        } catch (error) {
            console.error('Error deleting player:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
