import { CalendarX2 } from "lucide-react";

export default function EmptyDashboard({
  message,
}) {
  return (
    <div className="rounded-3xl border border-dashed border-zinc-200 bg-zinc-50 p-10 text-center">

      <CalendarX2
        size={42}
        className="mx-auto text-zinc-400"
      />

      <p className="mt-4 font-semibold text-zinc-700">
        Nothing here yet
      </p>

      <p className="mt-2 text-sm text-zinc-500">
        {message}
      </p>

    </div>
  );
}