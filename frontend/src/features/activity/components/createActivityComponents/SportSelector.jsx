export default function SportSelector({
  SPORTS,
  selectedSport,
  setValue,
  errors,
}) {
  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-zinc-900">
          Sport
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Select the activity you want to host.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {SPORTS.map((sport) => (
          <button
            key={sport.value}
            type="button"
            onClick={() => setValue("sport", sport.value)}
            className={`rounded-2xl border p-5 transition-all ${
              selectedSport === sport.value
                ? "border-green-600 bg-green-50 shadow"
                : "border-zinc-200 hover:border-green-300 hover:bg-zinc-50"
            }`}
          >
            <div className="text-4xl">
              {sport.emoji}
            </div>

            <div className="mt-3 font-semibold capitalize">
              {sport.label}
            </div>
          </button>
        ))}
      </div>

      {errors.sport && (
        <p className="mt-3 text-sm text-red-500">
          {errors.sport.message}
        </p>
      )}
    </section>
  );
}