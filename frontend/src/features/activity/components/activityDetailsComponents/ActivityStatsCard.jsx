import {
  Users,
  UserPlus,
  IndianRupee,
  ShieldCheck,
} from "lucide-react";

export default function ActivityStatsCard({ activity }) {
  const participantsJoined =
    activity.currentPlayers ??
    activity.participants?.length ??
    0;

  const spotsLeft = Math.max(
    activity.maxPlayers - participantsJoined,
    0
  );

  const stats = [
    {
      title: "Participants",
      value: participantsJoined,
      subtitle: `of ${activity.maxPlayers} joined`,
      icon: Users,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },

    {
      title: "Spots Left",
      value: spotsLeft,
      subtitle:
        spotsLeft === 0
          ? "Activity Full"
          : "Available",
      icon: UserPlus,
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
    },

    {
      title: "Cost",
      value:
        activity.cost?.amount === 0
          ? "Free"
          : `₹${activity.cost?.amount}`,
      subtitle:
        activity.cost?.description ||
        "Per participant",
      icon: IndianRupee,
      iconBg: "bg-yellow-50",
      iconColor: "text-yellow-600",
    },

    {
      title: "Join Policy",
      value:
        activity.joinPolicy === "approval"
          ? "Approval"
          : "Instant",
      subtitle:
        activity.joinPolicy === "approval"
          ? "Host Approval Required"
          : "Join Immediately",
      icon: ShieldCheck,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">

      <div className="mb-6">

        <h2 className="text-lg font-bold text-zinc-900">
          Activity Overview
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Quick summary of participation and joining information.
        </p>

      </div>

      <div className="grid grid-cols-2 gap-4">

        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 transition hover:border-green-300 hover:bg-white"
            >

              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${item.iconBg}`}
              >
                <Icon
                  size={22}
                  className={item.iconColor}
                />
              </div>

              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                {item.title}
              </p>

              <p className="mt-1 text-2xl font-bold text-zinc-900">
                {item.value}
              </p>

              <p className="mt-1 text-sm text-zinc-500">
                {item.subtitle}
              </p>

            </div>
          );
        })}

      </div>

    </section>
  );
}