import { fetchFromApi } from '@/lib/api';
import { AttendanceRecord, AttendanceDTO, AttendanceStatus } from './types';

export const getAttendanceByDate = async (date: string): Promise<AttendanceRecord[]> => {
    return fetchFromApi(`/attendance?date=${date}`);
};

export const saveAttendance = async (data: AttendanceDTO): Promise<any> => {
    return fetchFromApi('/attendance', {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

export const markAttendance = async (data: { playerId: number; date: string; status: AttendanceStatus; notes?: string }): Promise<any> => {
    return saveAttendance({
        date: data.date,
        records: [
            {
                player_id: data.playerId,
                status: data.status,
                notes: data.notes
            }
        ]
    });
};
