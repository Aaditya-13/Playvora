import {
  CalendarDays,
  Trophy,
  Users,
} from "lucide-react";

export default function DashboardStats({
  stats,
}) {
  const cards = [
    {
      title: "Hosting",
      value: stats.hosting,
      icon: Users,
    },
    {
      title: "Joined",
      value: stats.joined,
      icon: CalendarDays,
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: Trophy,
    },
  ];

  return (
    <section className="grid grid-cols-3 gap-4">

      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm"
          >

            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50">

              <Icon
                size={22}
                className="text-green-600"
              />

            </div>

            <h3 className="text-2xl font-bold">
              {card.value}
            </h3>

            <p className="mt-1 text-sm text-zinc-500">
              {card.title}
            </p>

          </div>
        );
      })}

    </section>
  );
}