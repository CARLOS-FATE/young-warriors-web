import { Attendance } from "../entities/Attendance";

export interface IAttendanceRepository {
    getByDate(date: string): Promise<Attendance[]>; // date string in 'YYYY-MM-DD'
    getByEntity(entityType: 'player' | 'coach', entityId: number): Promise<Attendance[]>;
    upsert(attendance: Omit<Attendance, 'id' | 'createdAt'>): Promise<void>;
}
