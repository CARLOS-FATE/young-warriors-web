import { Request, Response } from 'express';
import { IAttendanceRepository } from '../../core/repositories/IAttendanceRepository';

export class AttendanceController {
    constructor(private attendanceRepo: IAttendanceRepository) { }

    async getByDate(req: Request, res: Response) {
        try {
            const date = req.query.date as string;
            if (!date) {
                return res.status(400).json({ error: 'Date query parameter is required (YYYY-MM-DD)' });
            }
            const records = await this.attendanceRepo.getByDate(date);
            res.json(records);
        } catch (error) {
            console.error('Error fetching attendance:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async upsert(req: Request, res: Response) {
        try {
            const { playerId, coachId, date, status, notes } = req.body;

            if (!date || !status) {
                return res.status(400).json({ error: 'Date and status are required' });
            }
            if (!playerId && !coachId) {
                return res.status(400).json({ error: 'PlayerId or CoachId is required' });
            }

            await this.attendanceRepo.upsert({
                playerId: playerId || null,

                coachId: coachId || null,
                date: new Date(date),
                status,
                notes: notes || null
            });


            res.json({ message: 'Attendance marked successfully' });
        } catch (error) {
            console.error('Error marking attendance:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
