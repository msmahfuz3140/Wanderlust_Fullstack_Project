"use client";

import {
    TextField,
    Label,
    Input,
    FieldError,
    Select,
    ListBox,
    TextArea,
    Button,
    toast,
} from "@heroui/react";

const AddDestinationPage = () => {

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const destination = Object.fromEntries(formData.entries());

        try {
            const res = await fetch("http://localhost:5000/destination", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(destination),
            });

            const data = await res.json();
            // console.log(data);

            if (!res.ok) throw new Error("Failed");

            // ✅ Success Toast
            toast.success("Destination added successfully ✈️");
            window.location.href = "/destination";

            // ✅ Reset Form
            // e.currentTarget.reset();

        } catch (error) {
            console.error(error);

            // ✅ Error Toast
            toast.danger("Something went wrong ❌");
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100 py-14 px-4">

            <div className="max-w-6xl mx-auto space-y-10">

                {/* Header */}
                <div>
                    <h1 className="text-4xl font-bold text-gray-900">
                        Add Destination
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Create and manage travel destinations professionally.
                    </p>
                </div>

                {/* Card */}
                <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-2xl p-6 md:p-12">

                    <form onSubmit={onSubmit} className="space-y-12">

                        {/* ================= BASIC INFO ================= */}
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold border-b pb-3">
                                Basic Information
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                                <div className="md:col-span-2">
                                    <TextField name="destinationName" isRequired>
                                        <Label>Destination Name</Label>
                                        <Input placeholder="Bali Paradise" className="rounded-xl h-12" />
                                        <FieldError />
                                    </TextField>
                                </div>

                                <TextField name="country" isRequired>
                                    <Label>Country</Label>
                                    <Input placeholder="Indonesia" className="rounded-xl h-12" />
                                    <FieldError />
                                </TextField>

                                {/* Category */}
                                <Select name="category" isRequired placeholder="Select category">
                                    <Label>Category</Label>

                                    <Select.Trigger className="rounded-xl h-12">
                                        <Select.Value />
                                        <Select.Indicator />
                                    </Select.Trigger>

                                    <Select.Popover>
                                        <ListBox>
                                            {[
                                                "Beach",
                                                "Mountain",
                                                "City",
                                                "Adventure",
                                                "Cultural",
                                                "Luxury",
                                            ].map((item) => (
                                                <ListBox.Item key={item} id={item} textValue={item}>
                                                    {item}
                                                    <ListBox.ItemIndicator />
                                                </ListBox.Item>
                                            ))}
                                        </ListBox>
                                    </Select.Popover>
                                </Select>

                            </div>
                        </div>

                        {/* ================= PACKAGE INFO ================= */}
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold border-b pb-3">
                                Package Details
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                                <TextField name="price" type="number" isRequired>
                                    <Label>Price (USD)</Label>
                                    <Input type="number" placeholder="1299" className="rounded-xl h-12" />
                                    <FieldError />
                                </TextField>

                                <TextField name="duration" isRequired>
                                    <Label>Duration</Label>
                                    <Input placeholder="7 Days / 6 Nights" className="rounded-xl h-12" />
                                    <FieldError />
                                </TextField>

                                <div className="md:col-span-2">
                                    <TextField name="departureDate" type="date" isRequired>
                                        <Label>Departure Date</Label>
                                        <Input type="date" className="rounded-xl h-12" />
                                        <FieldError />
                                    </TextField>
                                </div>

                            </div>
                        </div>

                        {/* ================= MEDIA ================= */}
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold border-b pb-3">
                                Media & Description
                            </h2>

                            <TextField name="imageUrl" isRequired>
                                <Label>Image URL</Label>
                                <Input
                                    type="url"
                                    placeholder="https://example.com/bali.jpg"
                                    className="rounded-xl h-12"
                                />
                                <FieldError />
                            </TextField>

                            <TextField name="description" isRequired>
                                <Label>Description</Label>
                                <TextArea
                                    placeholder="Describe the travel experience..."
                                    className="rounded-2xl min-h-40"
                                />
                                <FieldError />
                            </TextField>

                        </div>

                        {/* ================= ACTION ================= */}
                        <div className="flex justify-center md:justify-end pt-6 border-t">
                            <Button
                                type="submit"
                                className="px-10 py-6 text-lg font-semibold rounded-xl
                bg-linear-to-r from-cyan-500 to-blue-600
                hover:from-cyan-600 hover:to-blue-700
                text-white shadow-lg transition-all duration-300"
                            >
                                Add Destination
                            </Button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddDestinationPage;