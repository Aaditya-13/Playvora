import { SearchX } from "lucide-react";
import { useNavigate } from "react-router";

import Button from "../../../components/ui/Button";

import ROUTES from "../../../constants/routes.js";

export default function EmptyState() {
  const navigate = useNavigate();

  return (
    <div className="rounded-3xl border border-dashed border-zinc-300 bg-white p-10 text-center">

      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">

        <SearchX size={28} />

      </div>

      <h3 className="mt-5 text-lg font-bold">
        No nearby activities
      </h3>

      <p className="mt-2 text-sm leading-6 text-zinc-500">
        Be the first to create an activity around you.
      </p>

      <Button
        className="mt-6"
        type="button"
        onClick={() =>
          navigate(ROUTES.CREATE)
        }
      >
        Create Activity
      </Button>

    </div>
  );
}