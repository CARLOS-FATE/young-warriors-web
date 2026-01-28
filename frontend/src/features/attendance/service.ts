import { fetchFromApi } from '@/lib/api';

export interface AttendanceRecord {
    id: number;
    player_id: number | null;
    coach_id: number | null;
    date: string;
    status: 'present' | 'absent' | 'excused' | 'late';
    notes: string | null;
}

export interface MarkAttendanceData {
    playerId?: number;
    coachId?: number;
    date: string;
    status: 'present' | 'absent' | 'excused' | 'late';
    notes?: string;
}

export const getAttendanceByDate = async (date: string): Promise<AttendanceRecord[]> => {
    // date MUST be YYYY-MM-DD
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/attendance?date=${date}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!res.ok) throw new Error('Failed to fetch attendance');
    return res.json();
};

export const markAttendance = async (data: MarkAttendanceData): Promise<void> => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/attendance`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error('Failed to mark attendance');
};
