import { NextResponse } from "next/server";

export const runtime = "nodejs";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    const email = String(body?.email ?? "").trim();
    const estimateRange = String(body?.estimateRange ?? "").trim();
    const eventType = String(body?.eventType ?? "").trim();
    const audienceSize = String(body?.audienceSize ?? "").trim();
    const duration = String(body?.duration ?? "").trim();
    const drivers = Array.isArray(body?.drivers) ? body.drivers.map(String) : [];

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Valid email required" },
        { status: 400 }
      );
    }

    // v0 behavior: just accept + echo (we’ll wire Sheet/Resend/etc next)
    return NextResponse.json({
      ok: true,
      received: {
        email,
        estimateRange,
        eventType,
        audienceSize,
        duration,
        drivers,
      },
      notes: ["lead capture v0: accepted + echoed (no storage yet)"],
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}

