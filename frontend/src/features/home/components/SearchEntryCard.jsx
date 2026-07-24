import { Search } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";

export default function SearchEntryCard() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/search")}
      className="group flex w-full items-center justify-between rounded-3xl border border-zinc-100 bg-white p-5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all hover:border-[#1FAA59]/30 hover:shadow-[0_8px_30px_rgb(31,170,89,0.12)]"
    >
      <div className="flex items-center gap-4">

        <div className="rounded-2xl bg-[#1FAA59]/10 p-3 text-[#1FAA59]">
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