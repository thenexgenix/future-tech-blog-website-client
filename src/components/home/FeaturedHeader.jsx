'use client';

import React from 'react';

export default function FeaturedHeader() {
    return (
        <section className="w-full bg-[#141414] text-white border-b border-[#262626] py-16 sm:py-20">
            <div className="max-w-350 mx-auto px-4 sm:px-10">

                {/* Badge / Subtitle Pill */}
                <div className="inline-block mb-3">
                    <span className="bg-[#1A1A1A] text-gray-300 text-xs sm:text-sm font-medium px-3.5 py-1.5 rounded-md border border-[#262626]">
                        Unlock the Power of
                    </span>
                </div>

                {/* Main Heading */}
                <h2 className="text-2xl  sm:text-4xl font-bold tracking-tight text-white font-sans">
                    FutureTech Features
                </h2>

            </div>
        </section>
    );
}