import {
  Trophy,
  Users,
  CalendarCheck,
} from "lucide-react";

export default function ProfileStats({ user }) {
  const stats = [
    {
      title: "Hosted",
      value: user?.matchesHosted ?? 0,
      icon: Trophy,
    },
    {
      title: "Joined",
      value: user?.matchesJoined ?? 0,
      icon: Users,
    },
    {
      title: "Attended",
      value: user?.matchesAttended ?? 0,
      icon: CalendarCheck,
    },
  ];

  return (
    <section>

      <h2 className="mb-4 text-lg font-bold">
        Statistics
      </h2>

      <div className="grid grid-cols-3 gap-4">

        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-3xl border border-zinc-200 bg-white p-6 text-center shadow-sm"
            >

              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50">

                <Icon
                  size={22}
                  className="text-green-600"
                />

              </div>

              <h3 className="text-3xl font-bold">
                {stat.value}
              </h3>

              <p className="mt-1 text-sm text-zinc-500">
                {stat.title}
              </p>

            </div>
          );
        })}

      </div>

    </section>
  );
}