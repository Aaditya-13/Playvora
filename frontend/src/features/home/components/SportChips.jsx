const SPORTS = [
  "All",
  "Football",
  "Cricket",
  "Badminton",
  "Basketball",
  "Volleyball",
];

export default function SportChips() {
  return (
    <div className="mt-5 flex gap-3 overflow-x-auto pb-2">
      {SPORTS.map((sport) => (
        <button
          key={sport}
          className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm transition ${
            sport === "All"
              ? "bg-green-600 text-white"
              : "bg-white hover:bg-zinc-100"
          }`}
        >
          {sport}
        </button>
      ))}
    </div>
  );
}