"use client";

import { useState } from "react";
import {
    MapPin,
    CalendarDays,
    Clock,
    Star,
    ImageOff,
    Check,
    ArrowLeft,
    Pencil,
    Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { EditModalForm } from "@/components/EditModalForm";
import { DeleteAlert } from "./DeleteAlert";

export default function DestinationDetailsClient({ destination, id }) {
    const [isEditOpen, setIsEditOpen] = useState(false);

    const router = useRouter();
    const [imgError, setImgError] = useState(false);

    const {
        destinationName,
        country,
        departureDate,
        duration,
        price,
        imageUrl,
        description,
    } = destination;

    const handleDelete = async () => {
        if (!confirm("Delete this destination?")) return;

        await fetch(`http://localhost:5000/destination/${id}`, {
            method: "DELETE",
        });

        router.push("/destinations");
    };

    return (
        <div className="bg-linear-to-b from-slate-50 to-white min-h-screen pb-24">

            {/* ================= NAV ACTIONS ================= */}
            <div className="max-w-7xl mx-auto px-4 pt-8 flex flex-wrap gap-4 justify-between items-center">

                <Link href="/destination">
                    <button
                        onClick={() => router.push(`/destination`)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl border hover:bg-gray-100 transition"
                    >
                        <ArrowLeft size={16} />
                        Back to Destination
                    </button>
                </Link>

                <div className="flex gap-3">

                    {/* EDIT BUTTON */}
                    <button
                        onClick={() => setIsEditOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl border hover:bg-gray-100 transition"
                    >
                        <Pencil size={16} />
                        Edit
                    </button>

                    {/* DELETE BUTTON */}
                    {/* <button
                        onClick={handleDelete}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
                    >
                        <Trash2 size={16} />
                        Delete
                    </button> */}
                     <DeleteAlert destination={destination} id={id} />

                </div>
            </div>

            {/* ================= HERO SECTION ================= */}
            <div className="max-w-7xl mx-auto px-4 mt-6">

                <div className="relative h-75 md:h-112.5 rounded-3xl overflow-hidden shadow-2xl">

                    {!imgError && imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt={destinationName}
                            fill
                            priority
                            className="object-cover transition duration-700 hover:scale-105"
                            onError={() => setImgError(true)}
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col justify-center items-center bg-gray-200 text-gray-400">
                            <ImageOff size={60} />
                            Image Not Available
                        </div>
                    )}

                    {/* overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

                    <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 text-white max-w-xl">

                        <p className="flex items-center gap-2 text-sm opacity-90">
                            <MapPin size={16} /> {country}
                        </p>

                        <h1 className="text-3xl md:text-5xl font-bold mt-2 leading-tight">
                            {destinationName}
                        </h1>

                        <div className="flex flex-wrap gap-4 mt-3 text-sm">
                            <span className="flex items-center gap-1">
                                <Star size={16} fill="white" />
                                4.9 Rating
                            </span>

                            <span className="flex items-center gap-1">
                                <Clock size={16} />
                                {duration}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ================= MAIN CONTENT ================= */}
            <div className="max-w-7xl mx-auto px-4 mt-14 grid lg:grid-cols-3 gap-12">

                {/* LEFT CONTENT */}
                <div className="lg:col-span-2 space-y-12">

                    <div>
                        <h2 className="text-2xl font-semibold mb-4">
                            Overview
                        </h2>

                        <p className="text-gray-600 leading-relaxed text-lg">
                            {description}
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-6">
                            Highlights
                        </h2>

                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                "Luxury beachfront stay",
                                "Cultural experiences",
                                "Sunset adventure",
                                "Private dinner",
                                "City exploration",
                                "Premium transport",
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3 bg-white shadow-sm border rounded-xl p-4 hover:shadow-md transition"
                                >
                                    <Check
                                        className="text-green-500"
                                        size={18}
                                    />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ================= BOOKING CARD ================= */}
                <div className="lg:sticky lg:top-24 h-fit">

                    <div className="bg-white rounded-3xl shadow-2xl p-7 border space-y-6">

                        <div>
                            <p className="text-sm text-gray-500">
                                Starting From
                            </p>

                            <h3 className="text-4xl font-bold text-cyan-600">
                                ${price}
                            </h3>

                            <p className="text-gray-500 text-sm">
                                per person
                            </p>
                        </div>

                        <div className="border rounded-xl p-4 flex items-center gap-3 text-gray-600">
                            <CalendarDays size={20} />
                            {departureDate}
                        </div>

                        <button className="w-full bg-linear-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-xl font-semibold hover:scale-[1.03] active:scale-95 transition shadow-lg">
                            Book Now →
                        </button>

                        <div className="text-sm text-gray-600 space-y-2 pt-2 border-t">
                            <p>✅ Free cancellation</p>
                            <p>✅ Travel insurance included</p>
                            <p>✅ 24/7 support</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden">
                <EditModalForm
                isOpen={isEditOpen}
                onOpenChange={setIsEditOpen}
                destination={destination}
                id={id}
            />
            </div>
           
        </div>
    );
}