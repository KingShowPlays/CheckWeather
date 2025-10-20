import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon)
    return NextResponse.json({ error: "Missing coordinates" }, { status: 400 });

  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,precipitation,wind_speed_10m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`
  );

  const data = await res.json();
  return NextResponse.json(data);
}
