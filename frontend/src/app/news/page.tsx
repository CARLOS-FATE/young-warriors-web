import { getPosts } from '@/features/posts/service';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function NewsPage() {
    const posts = await getPosts().catch(err => []);

    // Sort posts by newest first (assuming sorting logic needed if backend doesn't sort)
    // The backend repo currently DOES sort DESC, so we are good.

    return (
        <div className="bg-black text-white p-4 py-20">
            <div className="max-w-4xl mx-auto">
                <div className="mb-16 text-center">
                    <h1 className="text-5xl md:text-7xl font-black mb-4 uppercase tracking-tighter text-white">
                        Latest <span className="text-[var(--brand)]">News</span>
                    </h1>
                </div>

                {posts.length === 0 ? (
                    <div className="p-12 border border-dashed border-gray-800 rounded-2xl text-center bg-gray-900/50">
                        <p className="text-gray-500 text-xl font-bold">No news at the moment.</p>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {posts.map(post => {
                            const date = post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric', month: 'long', day: 'numeric'
                            }) : 'Recent';

                            return (
                                <article key={post.id} className="border-b border-gray-900 pb-12 last:border-0">
                                    <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-baseline">
                                        <div className="md:w-1/4 shrink-0 text-gray-500 text-sm font-mono uppercase tracking-widest">
                                            {date} <br />
                                            <span className="text-[var(--brand)] font-bold">{post.category}</span>
                                        </div>
                                        <div className="md:w-3/4">
                                            <h2 className="text-3xl font-bold text-white mb-4 hover:text-[var(--brand)] transition-colors cursor-pointer">
                                                {post.title}
                                            </h2>
                                            <p className="text-gray-400 leading-relaxed text-lg whitespace-pre-wrap">
                                                {post.content}
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
