import DestinationDetailsCard from "@/components/DestinationDetailsCard";

export default async function DestinationDetailsPage({ params }) {

    const { id } = await params;

    const res = await fetch(
        `http://localhost:5000/destination/${id}`,
        {
            cache: "no-store",
        }
    );

    const destination = await res.json();

    return (
        <DestinationDetailsCard
            destination={destination}
            id={id}
        />
    );
}