export type AttendanceStatus = 'present' | 'absent' | 'excused' | 'late';

export interface AttendanceRecord {
    id?: number;
    player_id: number;
    coach_id?: number | null; // Optional as it might come from auth context
    date: string; // YYYY-MM-DD
    status: AttendanceStatus;
    notes?: string;
    createdAt?: string;
    // Expanded for UI join
    player_name?: string;
    player_image?: string;
}

export interface AttendanceDTO {
    date: string;
    records: {
        player_id: number;
        status: AttendanceStatus;
        notes?: string;
    }[];
}
