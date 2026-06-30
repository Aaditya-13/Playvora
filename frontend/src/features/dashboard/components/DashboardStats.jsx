import {
  CalendarClock,
  Trophy,
  Users,
} from "lucide-react";

const STAT_ITEMS = [
  {
    key: "matchesHosted",
    label: "Hosted",
    icon: Trophy,
    color: "emerald",
  },
  {
    key: "matchesJoined",
    label: "Joined",
    icon: Users,
    color: "blue",
  },
  {
    key: "matchesAttended",
    label: "Attended",
    icon: CalendarClock,
    color: "amber",
  },
];

const COLOR_STYLES = {
  emerald: {
    bg: "bg-emerald-100",
    icon: "text-emerald-600",
  },
  blue: {
    bg: "bg-blue-100",
    icon: "text-blue-600",
  },
  amber: {
    bg: "bg-amber-100",
    icon: "text-amber-600",
  },
};

export default function DashboardStats({
  stats,
}) {
  return (
    <section className="grid grid-cols-3 gap-3">

      {STAT_ITEMS.map((item) => {
        const Icon = item.icon;
        const colors =
          COLOR_STYLES[item.color];

        return (
          <div
            key={item.key}
            className="rounded-[24px] border border-zinc-200 bg-white p-4 shadow-sm"
          >

            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${colors.bg}`}
            >
              <Icon
                size={20}
                className={colors.icon}
              />
            </div>

            <p className="mt-4 text-2xl font-bold text-zinc-900">
              {stats?.[item.key] ?? 0}
            </p>

            <p className="mt-1 text-sm text-zinc-500">
              {item.label}
            </p>

          </div>
        );
      })}

    </section>
  );
}