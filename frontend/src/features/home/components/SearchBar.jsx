import { Search, X } from "lucide-react";
import useFilterStore from "../../../store/filterStore.js";

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useFilterStore();

  return (
    <div className="relative">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
      />

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search activities..."
        className="h-12 w-full rounded-xl border border-zinc-200 bg-white pl-11 pr-10 text-zinc-900 placeholder:text-zinc-400 outline-none transition-all duration-200 focus:border-green-600 focus:ring-4 focus:ring-green-600/10 shadow-sm"
      />

      {searchQuery && (
        <button
          onClick={() => setSearchQuery("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}