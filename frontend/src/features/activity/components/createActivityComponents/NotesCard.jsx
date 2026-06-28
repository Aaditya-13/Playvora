import { FileText } from "lucide-react";

export default function NotesCard({
  register,
}) {
  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center gap-3">

        <div className="rounded-xl bg-green-100 p-2">
          <FileText
            size={18}
            className="text-green-700"
          />
        </div>

        <div>
          <h2 className="text-lg font-bold">
            Additional Notes
          </h2>

          <p className="text-sm text-zinc-500">
            Optional information for participants.
          </p>
        </div>

      </div>

      <textarea
        rows={5}
        {...register("notes")}
        placeholder="Bring football shoes, carry water, meet near Gate 2..."
        className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 p-4 outline-none transition focus:border-green-600 focus:bg-white"
      />

    </section>
  );
}