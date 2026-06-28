import { FileText } from "lucide-react";

export default function NotesCard({ activity }) {
  const hasDescription = activity.description?.trim();
  const hasNotes = activity.notes?.trim();

  if (!hasDescription && !hasNotes) return null;

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center gap-3">

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50">

          <FileText
            size={22}
            className="text-green-600"
          />

        </div>

        <div>

          <h2 className="text-lg font-bold text-zinc-900">
            About this Activity
          </h2>

          <p className="text-sm text-zinc-500">
            Everything participants should know before joining.
          </p>

        </div>

      </div>

      {hasDescription && (
        <div className="mb-5">

          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Description
          </p>

          <p className="leading-7 text-zinc-700 whitespace-pre-wrap">
            {activity.description}
          </p>

        </div>
      )}

      {hasNotes && (
        <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5">

          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-amber-700">
            Organizer Notes
          </p>

          <p className="leading-7 text-amber-900 whitespace-pre-wrap">
            {activity.notes}
          </p>

        </div>
      )}

    </section>
  );
}