import DestinationCard from "@/components/DestinationCard";

const DestinationPage = async () => {
    const res = await fetch("http://localhost:5000/destination")
    const data = await res.json()
    console.log(data);
    return (
        <div className="max-w-430 mx-auto my-10 p-5">
            All Destination
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-15 lg:gap-20 py-10 max-w-430 mx-auto">
                {data.map((destination) => (
                    <DestinationCard key={destination._id} destination={destination} />
                ))}
            </div>
        </div>
    );
};

export default DestinationPage;