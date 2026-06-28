import {
  BadgeCheck,
  ChevronRight,
  ShieldCheck,
  Star,
} from "lucide-react";

import Avatar from "../../../../components/ui/Avatar";

export default function OrganizerCard({ organizer }) {
  if (!organizer) return null;

  const reliability =
    organizer.reliabilityScore ?? 0;

  const reliabilityColor =
    reliability >= 90
      ? "text-green-700 bg-green-50 border-green-100"
      : reliability >= 70
      ? "text-orange-700 bg-orange-50 border-orange-100"
      : "text-red-700 bg-red-50 border-red-100";

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">

      <div className="mb-6">

        <h2 className="text-lg font-bold text-zinc-900">
          Organizer
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Hosted by the creator of this activity.
        </p>

      </div>

      <div className="flex items-start justify-between gap-4">

        <div className="flex items-center gap-4">

          <Avatar
            src={organizer.avatar?.url}
            alt={organizer.fullName}
            fallback={organizer.fullName?.charAt(0)}
            size="md"
          />

          <div>

            <div className="flex items-center gap-2">

              <h3 className="text-lg font-bold text-zinc-900">
                {organizer.fullName}
              </h3>

              {organizer.isVerified && (
                <BadgeCheck
                  size={18}
                  className="text-blue-600"
                />
              )}

            </div>

            <p className="mt-1 text-sm text-zinc-500">
              @{organizer.username}
            </p>

          </div>

        </div>

        <button
          type="button"
          className="rounded-xl border border-zinc-200 bg-zinc-50 p-2 transition hover:bg-zinc-100"
        >
          <ChevronRight size={18} />
        </button>

      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">

        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">

          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-50">

            <Star
              size={22}
              className="text-yellow-600"
            />

          </div>

          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Reliability
          </p>

          <p className="mt-1 text-2xl font-bold text-zinc-900">
            {reliability}%
          </p>

          <div
            className={`mt-3 inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${reliabilityColor}`}
          >
            Trusted Organizer
          </div>

        </div>

        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">

          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50">

            <ShieldCheck
              size={22}
              className="text-green-600"
            />

          </div>

          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Verification
          </p>

          <p className="mt-1 text-lg font-bold text-zinc-900">

            {organizer.isVerified
              ? "Verified"
              : "Not Verified"}

          </p>

          <p className="mt-2 text-sm text-zinc-500">

            {organizer.isVerified
              ? "Identity verified."
              : "Verification pending."}

          </p>

        </div>

      </div>

    </section>
  );
}