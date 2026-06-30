import { CalendarDays } from "lucide-react";

export default function EmptyDashboard({
  message,
}) {
  return (
    <div className="rounded-[28px] border border-dashed border-zinc-300 bg-white p-10 text-center">

      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100">

        <CalendarDays
          size={28}
          className="text-zinc-500"
        />

      </div>

      <h3 className="mt-5 text-lg font-semibold text-zinc-900">
        Nothing here yet
      </h3>

      <p className="mt-2 text-sm leading-6 text-zinc-500">
        {message}
      </p>

    </div>
  );
}