import {
  Trophy,
  Building2,
  Users,
  RadioTower,
  CircleDot,
} from "lucide-react";

export default function GameDetailsCard({ activity }) {
  const rows = [
    {
      label: "Skill Level",
      value:
        activity.skillLevel.charAt(0).toUpperCase() +
        activity.skillLevel.slice(1),
      icon: Trophy,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
    },

    {
      label: "Venue",
      value:
        activity.venueType.charAt(0).toUpperCase() +
        activity.venueType.slice(1),
      icon: Building2,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },

    {
      label: "Participants",
      value:
        activity.genderPreference === "any"
          ? "Anyone"
          : activity.genderPreference.charAt(0).toUpperCase() +
            activity.genderPreference.slice(1),
      icon: Users,
      color: "text-pink-600",
      bg: "bg-pink-50",
    },

    {
      label: "Discovery Radius",
      value: `${activity.visibilityRadius / 1000} km`,
      icon: RadioTower,
      color: "text-green-600",
      bg: "bg-green-50",
    },

    {
      label: "Status",
      value:
        activity.status.charAt(0).toUpperCase() +
        activity.status.slice(1),
      icon: CircleDot,
      color:
        activity.status === "open"
          ? "text-green-600"
          : activity.status === "full"
          ? "text-orange-600"
          : activity.status === "completed"
          ? "text-blue-600"
          : "text-red-600",
      bg:
        activity.status === "open"
          ? "bg-green-50"
          : activity.status === "full"
          ? "bg-orange-50"
          : activity.status === "completed"
          ? "bg-blue-50"
          : "bg-red-50",
    },
  ];

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">

      <div className="mb-6">

        <h2 className="text-lg font-bold text-zinc-900">
          Game Details
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Important information participants should know before joining.
        </p>

      </div>

      <div className="divide-y divide-zinc-100">

        {rows.map((row) => {
          const Icon = row.icon;

          return (
            <div
              key={row.label}
              className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
            >

              <div className="flex items-center gap-4">

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${row.bg}`}
                >
                  <Icon
                    size={20}
                    className={row.color}
                  />
                </div>

                <div>

                  <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    {row.label}
                  </p>

                  <p className="mt-1 text-base font-semibold text-zinc-900">
                    {row.value}
                  </p>

                </div>

              </div>

            </div>
          );
        })}

      </div>

    </section>
  );
}