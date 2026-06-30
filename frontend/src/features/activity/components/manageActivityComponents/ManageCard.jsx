import { ChevronRight } from "lucide-react";

const VARIANTS = {
  blue: {
    icon: "bg-blue-100 text-blue-600",
    badge: "bg-blue-100 text-blue-700",
  },

  emerald: {
    icon: "bg-emerald-100 text-emerald-600",
    badge: "bg-emerald-100 text-emerald-700",
  },

  amber: {
    icon: "bg-amber-100 text-amber-600",
    badge: "bg-amber-100 text-amber-700",
  },

  red: {
    icon: "bg-red-100 text-red-600",
    badge: "bg-red-100 text-red-700",
  },

  zinc: {
    icon: "bg-zinc-100 text-zinc-600",
    badge: "bg-zinc-100 text-zinc-700",
  },
};

export default function ManageCard({
  icon: Icon,
  title,
  description,
  badge,
  variant = "zinc",
  disabled = false,
  onClick,
}) {
  const styles = VARIANTS[variant];

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`
        w-full rounded-[28px]
        border border-zinc-200
        bg-white
        p-5
        text-left
        shadow-sm
        transition-all
        hover:-translate-y-0.5
        hover:shadow-md
        disabled:cursor-not-allowed
        disabled:opacity-70
      `}
    >
      <div className="flex items-start gap-4">

        <div
          className={`rounded-2xl p-3 ${styles.icon}`}
        >
          <Icon size={24} />
        </div>

        <div className="min-w-0 flex-1">

          <div className="flex items-start justify-between gap-3">

            <div>

              <h3 className="text-lg font-bold text-zinc-900">
                {title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                {description}
              </p>

            </div>

            <ChevronRight
              size={20}
              className="mt-1 shrink-0 text-zinc-400"
            />

          </div>

          {badge && (
            <span
              className={`mt-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles.badge}`}
            >
              {badge}
            </span>
          )}

        </div>

      </div>
    </button>
  );
}