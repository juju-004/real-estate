import React from "react";
import Container from "../Container";

function About() {
  return (
    <Container id="about">
      <h3 className="text-midnightblue text-4xl lg:text-55xl font-semibold mb-5 sm:mb-0">
        About us
      </h3>
      <div className="lg:text-xl mt-14">
        At Rent-It, we make property rental simple, secure, and stress-free.
        Whether you’re a landlord looking to showcase your property or a tenant
        searching for a new place to call home, Rent-It bridges the gap with
        trust and convenience.
      </div>
      <div className="lg:text-xl mt-6">
        Our mission is to create a reliable platform where property owners and
        renters connect easily, backed by transparency and excellent support.
      </div>
    </Container>
  );
}

export default About;
