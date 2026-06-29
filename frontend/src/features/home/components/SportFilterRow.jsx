import SPORTS from "../../../constants/sports";

export default function SportFilterRow({
  selectedSport,
  onSelectSport,
}) {
  return (
    <div className="mt-6 flex gap-3 overflow-x-auto pb-2 scrollbar-none">

      <button
        onClick={() => onSelectSport("")}
        className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold transition ${
          selectedSport === ""
            ? "bg-green-600 text-white"
            : "border border-zinc-300 bg-white hover:border-green-300"
        }`}
      >
        All
      </button>

      {SPORTS.map((sport) => (
        <button
          key={sport.value}
          onClick={() => onSelectSport(sport.value)}
          className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold transition ${
            selectedSport === sport.value
              ? "bg-green-600 text-white"
              : "border border-zinc-300 bg-white hover:border-green-300"
          }`}
        >
          {sport.emoji} {sport.label}
        </button>
      ))}

    </div>
  );
}