import { Request, Response } from 'express';
import { GetAllCoaches } from '../../use-cases/GetAllCoaches';
import { ICoachRepository } from '../../core/repositories/ICoachRepository';

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
}
