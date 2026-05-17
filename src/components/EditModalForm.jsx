"use client";

import { Envelope } from "@gravity-ui/icons";
import { Button, Select, FieldError, Input, Label, ListBox, Modal, Surface, TextArea, TextField, toast } from "@heroui/react";
import { Pencil } from "lucide-react";

export function EditModalForm({ isOpen,
    onOpenChange,
    destination,
    id, }) {
    const {
        destinationName,
        country,
        departureDate,
        duration,
        price,
        imageUrl,
        description,
        category,
    } = destination;
    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const destination = Object.fromEntries(formData.entries());
        // console.log(destination);

        try {
            const res = await fetch(`http://localhost:5000/destination/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(destination),
            });

            const data = await res.json();
            console.log(data);

            if (!res.ok) throw new Error("Failed");

            // ✅ Success Toast
            toast.success("Destination Edited successfully ✈️");
            window.location.href = `/destination/${id}`;

            // ✅ Reset Form
            // e.currentTarget.reset();

        } catch (error) {
            console.error(error);

            // ✅ Error Toast
            toast.danger("Something went wrong ❌");
        }
        
    };
    
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <button
                className="flex items-center gap-2 px-4 py-2 rounded-xl border hover:bg-gray-100 transition"
            >
                <Pencil size={16} />
                Edit
            </button>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-2xl">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                                <Envelope className="size-5" />
                            </Modal.Icon>
                            <Modal.Heading>Edit Destination</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body className="p-6">
                            <Surface variant="default">
                                <form onSubmit={onSubmit} className="space-y-10">

                                    {/* ================= BASIC INFO ================= */}
                                    <div className="space-y-6">
                                        <h2 className="text-lg font-semibold border-b pb-3">
                                            Basic Information
                                        </h2>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                                            <div className="md:col-span-2">
                                                <TextField defaultValue={destinationName} name="destinationName" isRequired>
                                                    <Label>Destination Name</Label>
                                                    <Input placeholder="Bali Paradise" className="rounded-xl h-12" />
                                                    <FieldError />
                                                </TextField>
                                            </div>

                                            <TextField defaultValue={country} name="country" isRequired>
                                                <Label>Country</Label>
                                                <Input placeholder="Indonesia" className="rounded-xl h-12" />
                                                <FieldError />
                                            </TextField>

                                            {/* Category */}
                                            <Select defaultValue={category} name="category" isRequired placeholder="Select category">
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

                                            <TextField defaultValue={price} name="price" type="number" isRequired>
                                                <Label>Price (USD)</Label>
                                                <Input type="number" placeholder="1299" className="rounded-xl h-12" />
                                                <FieldError />
                                            </TextField>

                                            <TextField defaultValue={duration} name="duration" isRequired>
                                                <Label>Duration</Label>
                                                <Input placeholder="7 Days / 6 Nights" className="rounded-xl h-12" />
                                                <FieldError />
                                            </TextField>

                                            <div className="md:col-span-2">
                                                <TextField defaultValue={departureDate} name="departureDate" type="date" isRequired>
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

                                        <TextField defaultValue={imageUrl} name="imageUrl" isRequired>
                                            <Label>Image URL</Label>
                                            <Input
                                                type="url"
                                                placeholder="https://example.com/bali.jpg"
                                                className="rounded-xl h-12"
                                            />
                                            <FieldError />
                                        </TextField>

                                        <TextField defaultValue={description} name="description" isRequired>
                                            <Label>Description</Label>
                                            <TextArea
                                                placeholder="Describe the travel experience..."
                                                className="rounded-2xl min-h-40"
                                            />
                                            <FieldError />
                                        </TextField>

                                    </div>

                                    {/* ================= ACTION ================= */}
                                    <div className="flex justify-center pt-6 border-t">
                                        <Button
                                            type="submit"
                                            className="px-10 py-6 flex justify-center text-lg font-semibold rounded-xl
                                                bg-linear-to-r from-cyan-500 to-blue-600
                                                hover:from-cyan-600 hover:to-blue-700
                                                text-white shadow-lg transition-all duration-300"
                                        >
                                            Edit Destination
                                        </Button>
                                    </div>

                                </form>
                            </Surface>
                        </Modal.Body>

                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}