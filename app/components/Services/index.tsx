import React from "react";
import Container from "../Container";

export default function Services() {
  return (
    <Container id="services">
      <h3 className="text-midnightblue text-4xl lg:text-55xl font-semibold mb-5 sm:mb-0">
        Our services
      </h3>

      <div className="lg:text-xl mt-14">
        Property Listings – Browse a wide range of verified rental properties
        tailored to your needs and budget.
      </div>
      <div className="lg:text-xl mt-6">
        Tenant & Landlord Connection – We provide a safe space for communication
        and agreements between renters and property owners.
      </div>
      <div className="lg:text-xl mt-6">
        Property Management Support – Helping landlords handle listings,
        inquiries, and tenant management smoothly.
      </div>
      <div className="lg:text-xl mt-6">
        Secure Transactions – Easy and secure rent payments with full
        transparency.
      </div>
      <div className="lg:text-xl mt-6">
        24/7 Customer Support – Assistance whenever you need help with renting,
        listing, or managing your property.
      </div>
    </Container>
  );
}
