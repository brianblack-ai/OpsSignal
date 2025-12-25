"use client";
import { useState } from "react";

export default function EstimatePage() {
  const [range, setRange] = useState<string | null>(null);

const [eventType, setEventType] = useState("Conference");
const [audienceSize, setAudienceSize] = useState("101–300");
const [duration, setDuration] = useState("Full day");
const [drivers, setDrivers] = useState<string[]>([]);


  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">AV Budget Estimator</h1>
      <p className="mt-2 text-gray-600">
        Answer a few questions to get a realistic budget range.
      </p>

      <form className="mt-8 space-y-4 max-w-xl">
        <div>
          <label className="block text-sm font-medium">Event type</label>
          <select
  className="mt-1 w-full border rounded p-2"
  value={eventType}
  onChange={(e) => setEventType(e.target.value)}
>
  <option>Conference</option>
  <option>Gala</option>
  <option>Corporate Meeting</option>
  <option>Not sure</option>
</select>

        </div>

        <div>
          <label className="block text-sm font-medium">Audience size</label>
          <select
  className="mt-1 w-full border rounded p-2"
  value={audienceSize}
  onChange={(e) => setAudienceSize(e.target.value)}
>
  <option>0–100</option>
  <option>101–300</option>
  <option>301–800</option>
  <option>800+</option>
</select>

        </div>

        <div>
          <label className="block text-sm font-medium">Event duration</label>
         <select
  className="mt-1 w-full border rounded p-2"
  value={duration}
  onChange={(e) => setDuration(e.target.value)}
>
  <option>Half-day</option>
  <option>Full day</option>
  <option>2 days</option>
  <option>3+ days</option>
</select>

        </div>

       <button
          type="button"
          className="mt-4 inline-flex items-center rounded bg-black text-white px-4 py-2"
          onClick={async () => {
            setRange("Calculating...");
            const res = await fetch("/api/estimate", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ eventType, audienceSize, duration }),
            });

            const data = await res.json();
setDrivers(data.drivers ?? []);

            setRange(
              `$${data.rangeLow.toLocaleString()} – $${data.rangeHigh.toLocaleString()}`
            );
          }}
        >
          Calculate range
        </button>
      </form>

      <section className="mt-10 max-w-xl">
        <h2 className="text-xl font-semibold">Estimated range</h2>
        {range && <p className="mt-2 font-semibold text-lg">{range}</p>}
      </section>
{drivers.length > 0 && (
  <div className="mt-4">
    <h3 className="font-semibold">What&#39;s driving the cost</h3>
    <ul className="list-disc pl-5 text-gray-700">
      {drivers.map((d) => (
        <li key={d}>{d}</li>
      ))}
    </ul>
  </div>
)}

    </main>
  );
}

