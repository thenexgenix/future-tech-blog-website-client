'use client';

import React from 'react';

export default function FeaturedSection() {
    const features = [
        {
            mainTitle: 'Future Technology Blog',
            mainDesc: 'Stay informed with our blog section dedicated to future technology.',
            icon: (
                // Abstract Petal Icon
                <div className="relative w-12 h-12 flex items-center justify-center">
                    <div className="absolute w-6 h-6 bg-[#FFD100] rounded-full"></div>
                    <div className="absolute top-0 w-4 h-6 bg-[#262626] rounded-full opacity-90"></div>
                    <div className="absolute bottom-0 w-4 h-6 bg-[#262626] rounded-full opacity-90"></div>
                    <div className="absolute left-0 w-6 h-4 bg-[#262626] rounded-full opacity-90"></div>
                    <div className="absolute right-0 w-6 h-4 bg-[#262626] rounded-full opacity-90"></div>
                </div>
            ),
            subFeatures: [
                { title: 'Quantity', desc: 'Over 1,000 articles on emerging tech trends and breakthroughs.' },
                { title: 'Variety', desc: 'Articles cover fields like AI, robotics, biotechnology, and more.' },
                { title: 'Frequency', desc: 'Fresh content added daily to keep you up to date.' },
                { title: 'Authoritative', desc: 'Written by our team of tech experts and industry professionals.' },
            ],
        },
        {
            mainTitle: 'Research Insights Blogs',
            mainDesc: 'Dive deep into future technology concepts with our research section.',
            icon: (
                // Abstract Block Icon
                <div className="relative w-12 h-12 flex items-end justify-center">
                    <div className="w-8 h-4 bg-[#FFD100] mb-2"></div>
                    <div className="absolute bottom-6 left-1 w-5 h-5 bg-[#262626] rotate-45 transform origin-bottom-left"></div>
                    <div className="absolute bottom-6 right-1 w-5 h-5 bg-[#262626] -rotate-45 transform origin-bottom-right"></div>
                    <div className="absolute bottom-8 w-5 h-5 bg-[#333333] rotate-45"></div>
                </div>
            ),
            subFeatures: [
                { title: 'Depth', desc: '500+ research articles for in-depth understanding.' },
                { title: 'Graphics', desc: 'Visual aids and infographics to enhance comprehension.' },
                { title: 'Trends', desc: 'Explore emerging trends in future technology research.' },
                { title: 'Contributors', desc: 'Contributions from tech researchers and academics.' },
            ],
        },
    ];

    return (
        <section className="w-full bg-[#010000] text-white">
            {/* Features Grid Layout */}
            <div className="max-w-350 mx-auto">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-1 lg:grid-cols-12 border-b border-[#262626] last:border-b-0"
                    >

                        {/* Left Column: Title & Description */}
                        <div className="lg:col-span-4 p-8 sm:p-12 lg:p-10 border-b lg:border-b-0 lg:border-r border-[#262626] flex flex-col justify-start">
                            <div className="mb-8">
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-semibold mb-4 text-white">
                                {feature.mainTitle}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                                {feature.mainDesc}
                            </p>
                        </div>

                        {/* Right Column: Mini Cards Grid */}
                        <div className="lg:col-span-8 p-8 sm:p-12 lg:p-10 bg-[#010000]">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                                {feature.subFeatures.map((sub, i) => (
                                    <div
                                        key={i}
                                        className="bg-[#1A1A1A] border border-[#262626] p-8 rounded-xl hover:bg-[#202020] transition-colors duration-200"
                                    >
                                        <h4 className="text-lg font-medium text-white mb-3">
                                            {sub.title}
                                        </h4>
                                        <p className="text-sm text-gray-400 leading-relaxed">
                                            {sub.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </section>
    );
}