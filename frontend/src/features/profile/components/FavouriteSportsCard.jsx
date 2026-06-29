import SPORTS from "../../../constants/sports";

export default function FavouriteSportsCard({
  watch,
  setValue,
}) {
  const selectedSports = watch("favouriteSports");

  function toggleSport(sportValue) {
    if (selectedSports.includes(sportValue)) {
      setValue(
        "favouriteSports",
        selectedSports.filter(
          (item) => item !== sportValue
        ),
        {
          shouldValidate: true,
        }
      );
    } else {
      setValue(
        "favouriteSports",
        [...selectedSports, sportValue],
        {
          shouldValidate: true,
        }
      );
    }
  }

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-lg font-bold">
        Favourite Sports
      </h2>

      <div className="flex flex-wrap gap-3">

        {SPORTS.map((sport) => {
          const active = selectedSports.includes(sport.value);

          return (
            <button
              key={sport.value}
              type="button"
              onClick={() => toggleSport(sport.value)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${active
                  ? "border-green-600 bg-green-600 text-white"
                  : "border-zinc-300 bg-white hover:border-green-300"
                }`}
            >
              {sport.emoji} {sport.label}
            </button>
          );
        })}

      </div>

    </section>
  );
}