import { CalendarDays, Clock3 } from "lucide-react";

export default function ScheduleCard({
  register,
  errors,
}) {
  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-bold">
          Schedule
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Choose when your activity starts.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold">
            Date
          </label>

          <div className="relative">
            <CalendarDays
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
              size={18}
            />

            <input
              type="date"
              {...register("dateInput")}
              className="h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 pl-11 pr-4 outline-none transition focus:border-green-600 focus:bg-white"
            />
          </div>

          {errors.dateInput && (
            <p className="mt-2 text-sm text-red-500">
              {errors.dateInput.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Time
          </label>

          <div className="relative">
            <Clock3
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
              size={18}
            />

            <input
              type="time"
              {...register("timeInput")}
              className="h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 pl-11 pr-4 outline-none transition focus:border-green-600 focus:bg-white"
            />
          </div>

          {errors.timeInput && (
            <p className="mt-2 text-sm text-red-500">
              {errors.timeInput.message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}