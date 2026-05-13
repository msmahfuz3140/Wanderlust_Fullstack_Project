import React from "react";
import { Separator } from "@heroui/react";

const SearchItem = ({ title, subtitle }) => {
    return (
        <div className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-200">
                {title}
            </span>
            <span className="text-sm text-white/90">{subtitle}</span>
        </div>
    );
};

const Banner = () => {
    return (
        <section
            className="
        relative 
        min-h-screen 
        bg-[url('/assets/banner.png')] 
        bg-cover 
        bg-center 
        text-white
      "
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-white/10" />

            {/* Content Wrapper */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-center items-center text-center min-h-screen gap-12">

                {/* Hero Text */}
                <div className="flex flex-col items-center gap-6 max-w-3xl">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
                        Discover Your <br /> Next Adventure
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-gray-300">
                        Explore breathtaking destinations and create unforgettable
                        memories with our curated travel experiences.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                        <button className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 transition duration-300 rounded-lg font-semibold shadow-lg">
                            Explore Now
                        </button>

                        <button className="px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md transition duration-300 rounded-lg font-semibold border border-white/20">
                            View Destination
                        </button>
                    </div>
                </div>

                {/* Search Bar */}
                <div
                    className="
    w-full
    bg-white/10
    backdrop-blur-xl
    border border-white/20
    rounded-2xl
    shadow-2xl
    px-6 py-5
  "
                >
                    <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-6">

                        <SearchItem
                            title="Location"
                            subtitle="Address, City or Zip"
                        />

                        <Separator
                            orientation="vertical"
                            className="hidden md:block h-10 bg-white/20"
                        />

                        <SearchItem
                            title="Date"
                            subtitle="Anytime / 3 Days"
                        />

                        <Separator
                            orientation="vertical"
                            className="hidden md:block h-10 bg-white/20"
                        />

                        <SearchItem
                            title="Budget"
                            subtitle="$0 - $3000"
                        />

                        <Separator
                            orientation="vertical"
                            className="hidden md:block h-10 bg-white/20"
                        />

                        <SearchItem
                            title="People"
                            subtitle="5 - 10"
                        />

                        <button className="bg-cyan-500 hover:bg-cyan-600 transition duration-300 rounded-lg px-6 py-3 font-semibold shadow-md whitespace-nowrap">
                            Search
                        </button>

                    </div>
                </div>

            </div>
        </section>
    );
};

export default Banner;