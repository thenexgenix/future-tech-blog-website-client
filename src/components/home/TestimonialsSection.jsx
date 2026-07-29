import React from 'react';
import Image from 'next/image';
import { ArrowUpRight, Star } from 'lucide-react';

export default function TestimonialsSection() {
    const testimonials = [
        {
            id: 1,
            name: 'Sarah Thompson',
            location: 'San Francisco, USA',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
            rating: 5,
            comment:
                'The ebooks on AI in education have been a game-changer for my research. They provide in-depth insights and case studies that are invaluable for staying updated.',
        },
        {
            id: 2,
            name: 'Raj Patel',
            location: 'Mumbai, India',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
            rating: 5,
            comment:
                'The whitepapers on renewable energy strategies have greatly influenced my work. They offer detailed data and analysis, helping me make informed decisions.',
        },
        {
            id: 3,
            name: 'Emily Adams',
            location: 'London, UK',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
            rating: 5,
            comment:
                'The AI in healthcare reports have been an essential resource for our hospital. They highlight the latest innovations and best practices, improving patient care.',
        },
        {
            id: 4,
            name: 'Alan Jackson',
            location: 'Houston, USA',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
            rating: 5,
            comment:
                'The reports on space mining prospects have fueled my passion for space exploration. They provide a comprehensive view of what lies beyond Earth.',
        },
        {
            id: 5,
            name: 'Jessica Miller',
            location: 'Boston, USA',
            avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
            rating: 5,
            comment:
                "The research papers on genomic breakthroughs have been a goldmine of information. They've shaped the direction of my research in genomics.",
        },
        {
            id: 6,
            name: 'Diego Lopez',
            location: 'Barcelona, Spain',
            avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
            rating: 5,
            comment:
                'The ebooks on renewable energy strategies have given me the insights I needed to pivot our startup toward sustainability.',
        },
    ];

    return (
        <section className="w-full text-white font-sans">
            {/* ================= 1. HEADER SECTION (Color 1: #141414) ================= */}
            <div className="bg-[#141414] py-12 sm:py-16 px-4 sm:px-8 lg:px-16 border-b border-[#262626]">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-3 max-w-2xl">
                        <span className="inline-block px-3.5 py-1.5 text-xs font-medium bg-[#1e1e1e] border border-[#262626] rounded-md text-zinc-400">
                            What Our Readers Say
                        </span>
                        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-tight">
                            Real Words from Real Readers
                        </h2>
                    </div>
                    <div>
                        <a
                            href="#"
                            className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-medium bg-[#1a1a1a] border border-[#262626] rounded-lg hover:bg-[#262626] transition-all text-zinc-300 group whitespace-nowrap"
                        >
                            View All Testimonials
                            <ArrowUpRight className="w-4 h-4 text-yellow-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                    </div>
                </div>
            </div>

            {/* ================= 2. READERS GRID SECTION (Color 2: Darker #0f0f0f) ================= */}
            <div className="bg-[#010000] py-12 sm:py-16 px-4 sm:px-8 lg:px-16">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {testimonials.map((item) => (
                        <div
                            key={item.id}
                            className="bg-[#141414] border border-[#262626] rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center space-y-6 hover:border-[#333333] transition-colors"
                        >
                            {/* User Info Header */}
                            <div className="flex flex-col items-center space-y-2">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#262626]">
                                    <Image
                                        src={item.avatar}
                                        alt={item.name}
                                        fill
                                        sizes="48px"
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-white">{item.name}</h3>
                                    <p className="text-xs text-zinc-500">{item.location}</p>
                                </div>
                            </div>

                            {/* Review Card Bubble */}
                            <div className="w-full bg-[#1a1a1a] border border-[#262626] rounded-xl p-5 space-y-4 flex-1 flex flex-col justify-center">
                                {/* Rating Stars */}
                                <div className="flex justify-center gap-1">
                                    {[...Array(item.rating)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="w-4 h-4 text-yellow-400 fill-yellow-400"
                                        />
                                    ))}
                                </div>

                                {/* Comment Text */}
                                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                                    &ldquo;{item.comment}&rdquo;
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}