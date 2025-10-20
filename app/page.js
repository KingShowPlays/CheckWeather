"use client";
import React, { useState } from "react";
import Hero from "@/components/Hero";
import Weather from "@/components/Weather";

export default function HomePage() {
  const [city, setCity] = useState("Berlin");

  return (
    <main>
      <Hero onSearch={(searchedCity) => setCity(searchedCity)} />
      <Weather city={city} />
    </main>
  );
}
