import useFilterStore from "../../../store/filterStore.js";

const SPORTS = [
  "All",
  "Football",
  "Cricket",
  "Badminton",
  "Basketball",
  "Volleyball",
];

export default function SportChip() {
  const { selectedSport, setSelectedSport } = useFilterStore();

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-none] [&::-webkit-scrollbar]:hidden">
      {SPORTS.map((sport) => {
        const isActive = selectedSport === sport.toLowerCase();
        
        return (
          <button
            key={sport}
            onClick={() => setSelectedSport(sport.toLowerCase())}
            className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-all ${
              isActive
                ? "border-green-600 bg-green-600 text-white shadow-sm"
                : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50"
            }`}
          >
            {sport}
          </button>
        );
      })}
    </div>
  );
}