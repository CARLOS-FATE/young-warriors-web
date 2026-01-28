export class Attendance {
    constructor(
        public id: number | null,
        public playerId: number | null,
        public coachId: number | null,
        public date: Date,
        public status: 'present' | 'absent' | 'excused' | 'late',
        public notes: string | null,
        public createdAt: Date
    ) { }
}
