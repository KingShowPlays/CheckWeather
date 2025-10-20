import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const location = searchParams.get("location");

  if (!location)
    return NextResponse.json(
      { error: "Location is required" },
      { status: 400 }
    );

  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      location
    )}&limit=1`
  );
  const data = await response.json();

  if (!data.length)
    return NextResponse.json({ error: "Location not found" }, { status: 404 });

  const { lat, lon } = data[0];
  return NextResponse.json({ lat, lon });
}
