'use client';

import { useState, useEffect } from 'react';
import { AdVideo } from '@/features/marketing/types';
import { getAdVideos } from '@/features/marketing/service';

export default function VideoCarousel() {
    const [videos, setVideos] = useState<AdVideo[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        getAdVideos().then(setVideos).catch(err => console.error(err));
    }, []);

    useEffect(() => {
        if (videos.length <= 1) return;

        const interval = setInterval(() => {
            setActiveIndex(current => (current + 1) % videos.length);
        }, 5000); // Change every 5 seconds

        return () => clearInterval(interval);
    }, [videos]);

    if (videos.length === 0) {
        // Fallback placeholder if no videos are uploaded
        return (
            <div className="w-full aspect-video bg-gray-900 rounded-2xl flex items-center justify-center border border-gray-800">
                <p className="text-gray-500 text-sm">No active campaigns</p>
            </div>
        );
    }

    return (
        <div className="relative w-full aspect-[9/16] md:aspect-video rounded-3xl overflow-hidden shadow-2xl border border-gray-800 bg-black group">
            {videos.map((video, index) => (
                <div
                    key={video.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                >
                    {video.videoUrl.includes('youtube') || video.videoUrl.includes('youtu.be') ? (
                        <div className="w-full h-full flex items-center justify-center bg-black">
                            <iframe
                                src={video.videoUrl.replace('watch?v=', 'embed/')}
                                className="w-full h-full pointer-events-none"
                                title={video.title}
                                allow="autoplay; encrypted-media"
                            />
                            {/* Overlay to prevent interaction if purely decorative */}
                            <div className="absolute inset-0 bg-transparent"></div>
                        </div>
                    ) : (
                        <video
                            src={video.videoUrl}
                            className="w-full h-full object-cover"
                            autoPlay
                            muted
                            loop
                            playsInline
                        />
                    )}

                    {/* Caption Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-6 pt-20">
                        <h3 className="text-white font-bold text-lg">{video.title}</h3>
                    </div>
                </div>
            ))}

            {/* Indicators */}
            <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
                {videos.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${idx === activeIndex ? 'bg-[var(--brand)] w-6' : 'bg-white/50 hover:bg-white'}`}
                    />
                ))}
            </div>
        </div>
    );
}
