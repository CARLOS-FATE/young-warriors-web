import { ICoachRepository } from "../core/repositories/ICoachRepository";
import { Coach } from "../core/entities/Coach";

export class CreateCoach {
    constructor(private coachRepository: ICoachRepository) { }

    async execute(coach: Coach) {
        return this.coachRepository.create(coach);
    }
}
