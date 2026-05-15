"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, MapPin, Clock, ImageOff, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function DestinationCard({ destination }) {
    const {
        destinationName,
        country,
        category,
        departureDate,
        duration,
        price,
        imageUrl,
        description,
        _id
    } = destination;

    const [imgError, setImgError] = useState(false);
    const [liked, setLiked] = useState(false);

    return (
        <motion.div
            whileHover={{ y: -8 }}
            transition={{ duration: 0.25 }}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500"
        >

            {/* IMAGE */}
            <div className="relative h-60 overflow-hidden bg-gray-100">

                {!imgError && imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={destinationName}
                        onError={() => setImgError(true)}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                        width={500}
                        height={300}
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                        <ImageOff size={42} />
                        <span className="text-sm mt-2">No Image Available</span>
                    </div>
                )}

                {/* Gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent"></div>

                {/* Category */}
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-xs font-semibold rounded-full shadow">
                    {category}
                </span>

                {/* Favorite Button */}
                <button
                    onClick={() => setLiked(!liked)}
                    className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow hover:scale-110 transition"
                >
                    <Heart
                        size={18}
                        className={liked ? "fill-red-500 text-red-500" : "text-gray-600"}
                    />
                </button>

                {/* Price */}
                <div className="absolute bottom-4 right-4 bg-linear-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-xl font-bold shadow-lg">
                    ${price}
                </div>
            </div>

            {/* CONTENT */}
            <div className="p-5 space-y-3">

                {/* TITLE */}
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-cyan-600 transition">
                    {destinationName}
                </h3>

                {/* COUNTRY */}
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <MapPin size={16} />
                    {country}
                </div>

                {/* INFO */}
                <div className="flex justify-between text-sm text-gray-500">

                    <div className="flex items-center gap-1">
                        <CalendarDays size={16} />
                        {departureDate}
                    </div>

                    <div className="flex items-center gap-1">
                        <Clock size={16} />
                        {duration}
                    </div>
                </div>

                {/* DESCRIPTION */}
                <p className="text-gray-600 text-sm line-clamp-2">
                    {description}
                </p>

                {/* BUTTON */}
                <Link href={`destination/${_id}`}>
                    <button className="w-full mt-3 bg-linear-to-r from-cyan-500 to-blue-600 text-white py-2 rounded-lg font-medium hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-md">
                        Book Now
                    </button>
                </Link>
            </div>
        </motion.div>
    );
}