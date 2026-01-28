import { ICoachRepository } from "../core/repositories/ICoachRepository";
import { Coach } from "../core/entities/Coach";

export class UpdateCoach {
    constructor(private coachRepository: ICoachRepository) { }

    async execute(id: number, data: Partial<Coach>): Promise<Coach | null> {
        const existing = await this.coachRepository.findById(id);
        if (!existing) return null;

        const updated = new Coach(
            id,
            data.name || existing.name,
            data.role || existing.role,
            data.bio || existing.bio,
            data.imageUrl || existing.imageUrl,
            existing.createdAt
        );

        return this.coachRepository.update(updated);
    }
}
