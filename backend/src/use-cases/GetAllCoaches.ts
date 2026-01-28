import { ICoachRepository } from "../core/repositories/ICoachRepository";

export class GetAllCoaches {
    constructor(private coachRepository: ICoachRepository) { }

    async execute() {
        return this.coachRepository.findAll();
    }
}
