"use client";
import React from "react";
import Link from "next/link";
import { StarIcon } from "@heroicons/react/24/solid";
import data from "@/lib/data.json";
import { useRouter } from "next/navigation";
import { BathIcon, BedIcon } from "lucide-react";
import Container from "../Container";

export const ReviewStars = ({ rating }: { rating: number }) => {
  const stars = Array.from({ length: 5 }, (_, i) => i < rating);

  return (
    <div className="flex">
      {stars.map((filled, idx) => (
        <StarIcon
          key={idx}
          className={`h-5 w-5 ${filled ? "text-gold" : "text-slategray"}`}
        />
      ))}
    </div>
  );
};

export default function Locations() {
  const router = useRouter();

  const navigate = (id: string) => {
    router.push(`/listing/${id}`);
  };

  return (
    <Container>
      <div className="sm:flex justify-between items-center">
        <h3 className="text-midnightblue text-4xl lg:text-55xl font-semibold mb-5 sm:mb-0">
          Popular listings.
        </h3>
        <Link
          href={"/listings"}
          className="text-Blueviolet text-lg font-medium space-links"
        >
          more listings&nbsp;&gt;&nbsp;
        </Link>
      </div>

      <div className="grid md:grid-cols-4 grid-cols-1 gap-7 my-20">
        {data.slice(0, 4).map((items, i) => (
          <div
            key={i}
            onClick={() => navigate(items.id)}
            className="bg-white md:col-span-2 col-span-1  px-3 pt-3 pb-12 hover:shadow-sm hover:scale-[0.97] cursor-pointer duration-300 shadow-courses rounded-2xl"
          >
            <div className="relative rounded-3xl ">
              <div
                style={{ backgroundImage: `url("${items.image}")` }}
                className="m-auto w-full h-72 rounded-3xl bg-cover bg-center clipPath"
              ></div>
            </div>

            <div className="px-3">
              <h4 className="text-2xl font-bold pt-6 text-black">
                {items.type}
              </h4>
              <h4 className="text-2xl font-bold pt-1 text-black">
                {items.location}
              </h4>

              <div className="flex justify-between items-center py-6">
                <div className="flex gap-4">
                  <h3 className="text-red text-22xl font-medium">
                    {items.reviews}
                  </h3>
                  <ReviewStars rating={items.reviews} />
                </div>
                <div>
                  <h3 className="text-3xl font-bold">₦{items.price}</h3>
                </div>
              </div>

              <hr style={{ color: "#C4C4C4" }} />

              <div className="flex justify-between pt-6">
                <div className="flex gap-4">
                  <BathIcon />
                  <h3 className="text-base font-medium text-black opacity-75">
                    {items.key_features.bathrooms} bathrooms
                  </h3>
                </div>
                <div className="flex gap-4">
                  <BedIcon />

                  <h3 className="text-base font-medium text-black opacity-75">
                    {items.key_features.beds} beds
                  </h3>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
