import { ICoachRepository } from "../core/repositories/ICoachRepository";

export class DeleteCoach {
    constructor(private coachRepository: ICoachRepository) { }

    async execute(id: number): Promise<boolean> {
        return this.coachRepository.delete(id);
    }
}
