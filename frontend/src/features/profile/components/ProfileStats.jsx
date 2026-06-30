import {
  Trophy,
  TrendingUp,
} from "lucide-react";

export default function ProfileStats({
  stats,
}) {
  const totalActivities =
    (stats?.matchesHosted ?? 0) +
    (stats?.matchesJoined ?? 0);

  return (
    <section className="space-y-4">

      <h2 className="text-xl font-bold text-zinc-900">
        Activity Summary
      </h2>

      <div className="grid grid-cols-2 gap-4">

        <div className="rounded-[28px] border border-zinc-200 bg-white p-5 shadow-sm">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">

            <Trophy
              size={22}
              className="text-emerald-600"
            />

          </div>

          <p className="mt-5 text-3xl font-bold text-zinc-900">
            {totalActivities}
          </p>

          <p className="mt-1 text-sm text-zinc-500">
            Total Activities
          </p>

        </div>

        <div className="rounded-[28px] border border-zinc-200 bg-white p-5 shadow-sm">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">

            <TrendingUp
              size={22}
              className="text-blue-600"
            />

          </div>

          <p className="mt-5 text-3xl font-bold text-zinc-900">
            {stats?.attendanceRate ?? 0}%
          </p>

          <p className="mt-1 text-sm text-zinc-500">
            Attendance Rate
          </p>

        </div>

      </div>

    </section>
  );
}