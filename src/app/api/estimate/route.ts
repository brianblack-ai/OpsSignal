import { NextResponse } from "next/server";

function audienceMultiplier(audienceSize: string) {
  switch (audienceSize) {
    case "0–100":
      return 0.8;
    case "101–300":
      return 1.0;
    case "301–800":
      return 1.35;
    case "800+":
      return 1.8;
    default:
      return 1.0;
  }
}

function durationMultiplier(duration: string) {
  switch (duration) {
    case "Half-day":
      return 0.75;
    case "Full day":
      return 1.0;
    case "2 days":
      return 1.7;
    case "3+ days":
      return 2.4;
    default:
      return 1.0;
  }
}

function eventTypeMultiplier(eventType: string) {
  switch (eventType) {
    case "Corporate Meeting":
      return 0.9;
    case "Conference":
      return 1.0;
    case "Gala":
      return 1.2;
    case "Not sure":
      return 1.0;
    default:
      return 1.0;
  }
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));

  const eventType = String(body?.eventType ?? "Not sure");
  const audienceSize = String(body?.audienceSize ?? "101–300");
  const duration = String(body?.duration ?? "Full day");

  // Base range (v0)
  const baseLow = 12000;
  const baseHigh = 18000;

  const mult =
    eventTypeMultiplier(eventType) *
    audienceMultiplier(audienceSize) *
    durationMultiplier(duration);

  const rangeLow = Math.round((baseLow * mult) / 100) * 100;
  const rangeHigh = Math.round((baseHigh * mult) / 100) * 100;

  return NextResponse.json({
    ok: true,
    rangeLow,
    rangeHigh,
    currency: "USD",
    inputs: { eventType, audienceSize, duration },
    mult,
    notes: ["v0 dynamic estimate: input-aware stub"],
  });
}
