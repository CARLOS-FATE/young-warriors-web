import { fetchFromApi } from '@/lib/api';
import { AttendanceRecord, AttendanceDTO } from './types';

export const getAttendanceByDate = async (date: string): Promise<AttendanceRecord[]> => {
    return fetchFromApi(`/attendance?date=${date}`);
};

export const saveAttendance = async (data: AttendanceDTO): Promise<any> => {
    return fetchFromApi('/attendance', {
        method: 'POST',
        body: JSON.stringify(data),
    });
};
