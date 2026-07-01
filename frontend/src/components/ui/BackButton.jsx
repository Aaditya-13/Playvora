import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className="rounded-full p-2 transition hover:bg-zinc-100"
    >
      <ArrowLeft size={22} />
    </button>
  );
}