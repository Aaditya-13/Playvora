import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

export default function SearchHeader() {
  const navigate = useNavigate();

  return (
    <header className="mb-6 flex items-center gap-4">

      <button
        onClick={() => navigate(-1)}
        className="rounded-xl border border-zinc-200 bg-white p-2 transition hover:bg-zinc-100"
      >
        <ArrowLeft size={20} />
      </button>

      <div>

        <h1 className="text-2xl font-bold">
          Search Activities
        </h1>

        <p className="text-sm text-zinc-500">
          Find activities by title, sport or ground.
        </p>

      </div>

    </header>
  );
}