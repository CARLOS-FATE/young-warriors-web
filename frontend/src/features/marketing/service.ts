import { fetchFromApi } from '@/lib/api';
import { AdVideo } from './types';

export const getAdVideos = async (): Promise<AdVideo[]> => {
    return fetchFromApi('/ad-videos');
};

export const createAdVideo = async (data: { title: string, videoUrl: string }): Promise<AdVideo> => {
    return fetchFromApi('/ad-videos', {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

export const deleteAdVideo = async (id: number): Promise<void> => {
    return fetchFromApi(`/ad-videos/${id}`, {
        method: 'DELETE'
    });
};
