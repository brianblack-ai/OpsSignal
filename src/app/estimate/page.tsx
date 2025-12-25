export default function EstimatePage() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">AV Budget Estimator</h1>
      <p className="mt-2 text-gray-600">
        Answer a few questions to get a realistic budget range.
      </p>

      <form className="mt-8 space-y-4 max-w-xl">
        <div>
          <label className="block text-sm font-medium">Event type</label>
          <select className="mt-1 w-full border rounded p-2">
            <option>Conference</option>
            <option>Gala</option>
            <option>Corporate Meeting</option>
            <option>Not sure</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Audience size</label>
          <select className="mt-1 w-full border rounded p-2">
            <option>0–100</option>
            <option>101–300</option>
            <option>301–800</option>
            <option>800+</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Event duration</label>
          <select className="mt-1 w-full border rounded p-2">
            <option>Half-day</option>
            <option>Full day</option>
            <option>2 days</option>
            <option>3+ days</option>
          </select>
        </div>

        <button
          type="button"
          className="mt-4 inline-flex items-center rounded bg-black text-white px-4 py-2"
        >
          Calculate range
        </button>
      </form>

      <section className="mt-10 max-w-xl">
        <h2 className="text-xl font-semibold">Estimated range</h2>
        <p className="mt-2 text-gray-600">
          Coming next: low–high range and the top cost drivers.
        </p>
      </section>
    </main>
  );
}
