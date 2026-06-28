import { LayoutDashboard } from "lucide-react";
import useAuthStore from "../../../store/authStore";

export default function DashboardHero() {
  const { user } = useAuthStore();

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">

      <div className="flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50">

          <LayoutDashboard
            size={28}
            className="text-green-600"
          />

        </div>

        <div>

          <h1 className="text-2xl font-bold text-zinc-900">
            Welcome back,
            {" "}
            {user?.fullName?.split(" ")[0]} 👋
          </h1>

          <p className="mt-1 text-sm text-zinc-500">
            Manage your hosted and joined activities.
          </p>

        </div>

      </div>

    </section>
  );
}