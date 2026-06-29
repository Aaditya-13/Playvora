import { Search } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";

export default function SearchEntryCard() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/search")}
      className="group flex w-full items-center justify-between rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:border-green-300 hover:bg-green-50/30"
    >
      <div className="flex items-center gap-4">

        <div className="rounded-2xl bg-green-50 p-3 text-green-600">
          <Search size={22} />
        </div>

        <div className="text-left">

          <p className="font-semibold text-zinc-900">
            Search Activities
          </p>

          <p className="text-sm text-zinc-500">
            Title, sport, ground or location
          </p>

        </div>

      </div>

      <ChevronRight
        size={20}
        className="text-zinc-400 transition-transform group-hover:translate-x-1"
      />

    </button>
  );
}