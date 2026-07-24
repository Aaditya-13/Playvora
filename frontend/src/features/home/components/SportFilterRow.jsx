import SPORTS from "../../../constants/sports";

export default function SportFilterRow({
  selectedSport,
  onSelectSport,
}) {
  return (
    <div className="mt-6 flex gap-3 overflow-x-auto pb-2 scrollbar-none">

      <button
        onClick={() => onSelectSport("")}
        className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold transition-all ${
          selectedSport === ""
            ? "bg-[#1FAA59] text-white shadow-md shadow-[#1FAA59]/30"
            : "border border-zinc-200 bg-white text-zinc-600 hover:border-[#1FAA59]/50 hover:bg-zinc-50"
        }`}
      >
        All
      </button>

      {SPORTS.map((sport) => (
        <button
          key={sport.value}
          onClick={() => onSelectSport(sport.value)}
          className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold transition-all ${
            selectedSport === sport.value
              ? "bg-[#1FAA59] text-white shadow-md shadow-[#1FAA59]/30"
              : "border border-zinc-200 bg-white text-zinc-600 hover:border-[#1FAA59]/50 hover:bg-zinc-50"
          }`}
        >
          {sport.emoji} {sport.label}
        </button>
      ))}

    </div>
  );
}