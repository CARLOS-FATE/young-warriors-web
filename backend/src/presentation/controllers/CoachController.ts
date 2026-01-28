import { Request, Response } from 'express';
import { GetAllCoaches } from '../../use-cases/GetAllCoaches';
import { ICoachRepository } from '../../core/repositories/ICoachRepository';

import { Coach } from '../../core/entities/Coach';
import { CreateCoach } from '../../use-cases/CreateCoach';
import { UpdateCoach } from '../../use-cases/UpdateCoach';
import { DeleteCoach } from '../../use-cases/DeleteCoach';

export class CoachController {
    constructor(private coachRepository: ICoachRepository) { }

    async getAll(req: Request, res: Response) {
        const useCase = new GetAllCoaches(this.coachRepository);
        try {
            const coaches = await useCase.execute();
            res.json(coaches);
        } catch (error) {
            console.error('Error fetching coaches:', error);
            res.status(500).json({ error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) });
        }
    }

    async create(req: Request, res: Response) {
        const useCase = new CreateCoach(this.coachRepository);
        try {
            const { name, role, bio, imageUrl } = req.body;
            const newCoach = new Coach(0, name, role, bio || '', imageUrl);
            const created = await useCase.execute(newCoach);
            res.status(201).json(created);
        } catch (error) {
            console.error('Error creating coach:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async update(req: Request, res: Response) {
        const useCase = new UpdateCoach(this.coachRepository);
        try {
            const id = Number(req.params.id);
            const updated = await useCase.execute(id, req.body);
            if (!updated) return res.status(404).json({ error: 'Coach not found' });
            res.json(updated);
        } catch (error) {
            console.error('Error updating coach:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async delete(req: Request, res: Response) {
        const useCase = new DeleteCoach(this.coachRepository);
        try {
            const id = Number(req.params.id);
            const success = await useCase.execute(id);
            if (!success) return res.status(404).json({ error: 'Coach not found' });
            res.status(204).send();
        } catch (error) {
            console.error('Error deleting coach:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
