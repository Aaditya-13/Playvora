import { ChevronRight } from "lucide-react";

export default function ManageCard({
  icon: Icon,
  title,
  description,
  danger = false,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-3xl border bg-white p-5 text-left shadow-sm transition hover:shadow-md ${
        danger
          ? "border-red-200 hover:border-red-300"
          : "border-zinc-200 hover:border-emerald-200"
      }`}
    >
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
              danger
                ? "bg-red-50 text-red-600"
                : "bg-emerald-50 text-emerald-600"
            }`}
          >
            <Icon size={22} />
          </div>

          <div>

            <div className="flex items-center gap-2">

              <h3
                className={`font-semibold ${
                  danger
                    ? "text-red-700"
                    : "text-zinc-900"
                }`}
              >
                {title}
              </h3>


            </div>

            <p className="mt-1 text-sm text-zinc-500">
              {description}
            </p>

          </div>

        </div>

        <ChevronRight
          size={20}
          className="text-zinc-400"
        />

      </div>
    </button>
  );
}