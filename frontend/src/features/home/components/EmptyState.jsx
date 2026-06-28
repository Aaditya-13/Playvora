import { SearchX } from "lucide-react";
import Button from "../../../components/ui/Button.jsx";
import { useNavigate } from "react-router";

export default function EmptyState() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-white border border-zinc-200 rounded-xl shadow-sm">
      <div className="w-12 h-12 bg-zinc-100 text-zinc-400 rounded-full flex items-center justify-center mb-4">
        <SearchX size={24} />
      </div>
      <h3 className="text-lg font-bold text-zinc-900 mb-1">No activities found</h3>
      <p className="text-sm text-zinc-500 mb-6 max-w-62.5">
        There are no matches happening nearby right now. Be the first to host one!
      </p>
      <Button onClick={() => navigate("/create-activity")}>
        Create Activity
      </Button>
    </div>
  );
}