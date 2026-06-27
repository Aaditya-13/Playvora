import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
      />

      <input
        placeholder="Search activities..."
        className="h-12 w-full rounded-xl border border-zinc-300 bg-white pl-11 pr-4 outline-none transition-all duration-150 focus:border-green-600 focus:ring-2 focus:ring-green-200"
      />
    </div>
  );
}