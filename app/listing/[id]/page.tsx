import Image from "next/image";
import { notFound } from "next/navigation";
import data from "@/app/lib/data.json";
import { MapPinIcon } from "@heroicons/react/20/solid";
import { StarIcon, TruckIcon } from "@heroicons/react/24/solid";
import { BathIcon, BedIcon, Sparkles, WavesLadder } from "lucide-react";

export default function PropertyPage({ params }: { params: { id: string } }) {
  const property = data.find((p) => p.id === params.id);

  if (!property) return notFound();

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Image Section */}
      <div className="w-full h-64 sm:h-96 relative rounded-3xl overflow-hidden  shadow-2xl">
        <Image
          src={property.image}
          alt={property.location}
          fill
          className="object-cover hover:scale-105 duration-300 "
        />
      </div>

      {/* Details */}
      <div className="mt-6 flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <h1 className="text-2xl font-bold">{property.type}</h1>
        <span className="text-2xl font-bold text-green-600">
          ₦
          <span className="text-4xl font-light to-Blueviolet">
            {property.price}
          </span>
          /yr
        </span>
      </div>

      <p className="text-gray-500 flex gap-2 mt-2">
        <MapPinIcon className="w-6 h-6 text-red" />
        {property.location}
      </p>
      <div className="flex gap-4 mt-6">
        <h3 className="text-2xl font-medium">{property.reviews}</h3>
        <div className="flex">
          <StarIcon className="h-5 w-5 text-gold" />
          <StarIcon className="h-5 w-5 text-gold" />
          <StarIcon className="h-5 w-5 text-gold" />
          <StarIcon className="h-5 w-5 text-gold" />
          <StarIcon className="h-5 w-5 text-gold" />
        </div>
      </div>

      {/* Features */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-Blueviolet/20 p-3 flex gap-2 text-Blueviolet rounded-lg text-center">
          <TruckIcon className="w-6 h-6" />
          {property.key_features.parking ? "Parking Available" : "No Parking"}
        </div>
        <div className="bg-Blueviolet/20 p-3 flex gap-2 text-Blueviolet rounded-lg text-center">
          <WavesLadder className="w-6 h-6" />
          {property.key_features.pool ? "Swimming Pool" : "No Pool"}
        </div>
        <div className="bg-Blueviolet/20 p-3 flex gap-2 text-Blueviolet rounded-lg text-center">
          <BedIcon className="w-6 h-6" />
          {property.key_features.beds} Beds
        </div>
        <div className="bg-Blueviolet/20 p-3 flex gap-2 text-Blueviolet rounded-lg text-center">
          <BathIcon className="w-6 h-6" />
          {property.key_features.bathrooms} Bathrooms
        </div>
        <div className="bg-Blueviolet/20 p-3 flex gap-2 text-Blueviolet rounded-lg text-center">
          <Sparkles className="w-6 h-6" />
          {property.key_features.furnished ? "Furnished" : "Unfurnished"}
        </div>
      </div>

      {/* Agent Info */}
      <div className="mt-8 bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-3">Agent Information</h2>
        <p className="font-medium">{property.agent.name}</p>
        <p className="text-gray-500">{property.agent.contact}</p>
      </div>
    </div>
  );
}
