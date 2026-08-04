import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Heart, Send, ArrowLeft, ArrowUpRight, Calendar, User, Tag } from 'lucide-react';
import { getNewsById, getAllNews } from '@/lib/api/news';

// Pure Date Formatter Helper
const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'N/A';

    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
};

export async function generateMetadata({ params }) {
    const resolvedParams = await params;
    const newsId = resolvedParams?.id;

    try {
        const data = await getNewsById(newsId);
        const news = data?.data || data;

        if (!news) {
            return { title: 'News Not Found' };
        }

        return {
            title: `${news.title} | FutureTech News`,
            description: news.introduction || news.content?.slice(0, 150),
        };
    } catch {
        return { title: 'News Detail' };
    }
}

export default async function NewsDetailPage({ params }) {
    const resolvedParams = await params;
    const newsId = resolvedParams?.id;

    let news = null;
    let relatedNews = [];

    try {
        // Fetch news detail on server
        const data = await getNewsById(newsId);
        news = data?.data || data;

        if (!news) {
            notFound();
        }

        // Fetch related news on server
        const allNews = await getAllNews() || [];
        relatedNews = allNews.filter((item) => item._id !== newsId).slice(0, 3);

    } catch (error) {
        console.error('Error loading news detail on server:', error);
        notFound();
    }

    return (
        <div className="min-h-screen bg-[#0f0f0f] text-white py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-10">

                <div className="flex items-center justify-between">
                    <Link
                        href="/news"
                        className="inline-flex items-center gap-2 bg-[#141414] border border-[#262626] hover:border-[#333] px-4 py-2 rounded-xl text-xs font-medium text-zinc-300 hover:text-white transition"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Headlines</span>
                    </Link>

                    <span className="bg-[#1a1a1a] border border-[#2a2a2a] px-3 py-1 rounded-full text-xs text-yellow-400 font-medium">
                        {news.category || 'General'}
                    </span>
                </div>

                <div className="space-y-6">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-white">
                        {news.title}
                    </h1>

                    {/* Author & Meta Grid */}
                    <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-[#222222] text-xs text-zinc-400">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-zinc-500" />
                                <div>
                                    <span className="text-zinc-500 block text-[10px]">Author</span>
                                    <span className="text-zinc-200 font-medium">
                                        {news.author?.name || news.authorName || 'Admin'}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-zinc-500" />
                                <div>
                                    <span className="text-zinc-500 block text-[10px]">Publication Date</span>
                                    <span className="text-zinc-200 font-medium">
                                        {formatDate(news.publishedAt || news.createdAt)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Metrics Badge */}
                        <div className="flex items-center gap-3">
                            <div className="inline-flex items-center gap-1.5 bg-[#1a1a1a] border border-[#2a2a2a] px-3 py-1.5 rounded-full text-xs text-zinc-400">
                                <Heart className="w-3.5 h-3.5 text-zinc-400" />
                                <span>{news.metrics?.likes ?? 0}</span>
                            </div>

                            <div className="inline-flex items-center gap-1.5 bg-[#1a1a1a] border border-[#2a2a2a] px-3 py-1.5 rounded-full text-xs text-zinc-400">
                                <Send className="w-3.5 h-3.5 text-zinc-400" />
                                <span>{news.metrics?.shares ?? 0}</span>
                            </div>
                        </div>
                    </div>
                </div>

  
                <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-[#141414] border border-[#262626]">
                    <img
                        src={news.thumbnail || '/placeholder-news.jpg'}
                        alt={news.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="bg-[#141414] border border-[#262626] rounded-2xl p-6 sm:p-10 space-y-8">
                    {/* Introduction Highlight */}
                    {news.introduction && (
                        <p className="text-lg sm:text-xl font-medium text-zinc-200 leading-relaxed border-l-2 border-yellow-400 pl-4 italic">
                            {news.introduction}
                        </p>
                    )}

                    {/* Main Content Paragraphs */}
                    <div className="prose prose-invert max-w-none text-zinc-300 text-sm sm:text-base leading-relaxed space-y-6 whitespace-pre-line">
                        {news.content}
                    </div>

                    {/* Tags Section */}
                    {news.tags && news.tags.length > 0 && (
                        <div className="pt-6 border-t border-[#222222] flex items-center gap-2 flex-wrap">
                            <Tag className="w-3.5 h-3.5 text-zinc-500" />
                            <span className="text-xs text-zinc-500 mr-2">Tags:</span>
                            {news.tags.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="bg-[#1a1a1a] border border-[#262626] text-zinc-400 text-xs px-2.5 py-1 rounded-md"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {relatedNews.length > 0 && (
                    <div className="pt-10 border-t border-[#222222] space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-white">Similar News & Articles</h2>
                            <Link href="/news" className="text-xs text-yellow-400 hover:underline">
                                View All
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedNews.map((item) => (
                                <div
                                    key={item._id}
                                    className="bg-[#141414] border border-[#262626] rounded-2xl p-4 flex flex-col justify-between hover:border-[#333] transition group"
                                >
                                    <div className="space-y-4">
                                        <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-[#1a1a1a]">
                                            <img
                                                src={item.thumbnail || '/placeholder-news.jpg'}
                                                alt={item.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="text-sm font-semibold text-white leading-snug line-clamp-2 group-hover:text-yellow-400 transition">
                                                {item.title}
                                            </h3>
                                            <p className="text-xs text-zinc-500 font-medium">
                                                {item.category || 'General'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#222222]">
                                        <span className="text-[11px] text-zinc-500">
                                            {formatDate(item.createdAt)}
                                        </span>
                                        <Link
                                            href={`/news/${item._id}`}
                                            className="inline-flex items-center gap-1 bg-[#1a1a1a] border border-[#262626] hover:bg-[#222] text-zinc-300 text-xs font-medium px-3 py-1.5 rounded-lg transition"
                                        >
                                            <span>Read</span>
                                            <ArrowUpRight className="w-3.5 h-3.5 text-yellow-400" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}