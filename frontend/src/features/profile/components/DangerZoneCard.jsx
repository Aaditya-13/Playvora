import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router";

import Button from "../../../components/ui/Button";

export default function DangerZoneCard() {
  const navigate = useNavigate();

  return (
    <section className="rounded-3xl border border-red-200 bg-white p-6 shadow-sm">

      <h2 className="text-lg font-bold text-red-600">
        Danger Zone
      </h2>

      <p className="mt-2 text-sm leading-6 text-zinc-500">
        Deleting your account permanently removes your profile,
        activities and participation history.
        This action cannot be undone.
      </p>

      <Button
        variant="outline"
        className="mt-6 border-red-300 text-red-600 hover:bg-red-50"
        onClick={() => navigate("/profile/settings/delete-account")}
      >
        <Trash2 /> Delete Account
      </Button>

    </section>
  );
}