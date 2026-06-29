import { Pencil } from "lucide-react";
import { useNavigate } from "react-router";

import Avatar from "../../../components/ui/Avatar";
import Button from "../../../components/ui/Button";

export default function ProfileHero({ user }) {
  const navigate = useNavigate();

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">

      <div className="flex items-start justify-between">

        <div className="flex items-center gap-6">

          <Avatar
            src={user?.avatar?.url}
            size={96}
          />

          <div>

            <h1 className="text-2xl font-bold text-zinc-900">
              {user?.fullName}
            </h1>

            <p className="mt-1 text-zinc-500">
              @{user?.username}
            </p>

            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
              ⭐
              <span>Reliability</span>

              <span className="font-bold">
                {user?.reliabilityScore ?? 100}
              </span>
            </div>

          </div>

        </div>

        <Button
          size="sm"
          variant="none"
          onClick={() => navigate("/profile/edit")}
        >
          <Pencil size={16} />
        </Button>

      </div>

    </section>
  );
}