import { ChevronRight, Lock } from "lucide-react";
import { useNavigate } from "react-router";

export default function SecurityCard() {
  const navigate = useNavigate();

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-lg font-bold">
        Security
      </h2>

      <button
        onClick={() => navigate("/profile/settings/change-password")}
        className="group flex h-16 w-full items-center justify-between rounded-2xl border border-zinc-200 px-5 transition-all hover:border-green-200 hover:bg-green-50/40"
      >

        <div className="flex items-center gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-600">
            <Lock size={20} />
          </div>

          <div className="text-left">

            <p className="font-semibold text-zinc-900">
              Change Password
            </p>

            <p className="text-sm text-zinc-500">
              Update your account password.
            </p>

          </div>

        </div>

        <ChevronRight
          size={18}
          className="text-zinc-400 transition-transform group-hover:translate-x-1"
        />

      </button>

    </section>
  );
}