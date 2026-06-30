import { ShieldCheck } from "lucide-react";

import Avatar from "../../../../components/ui/Avatar";

const STATUS_OPTIONS = [
  {
    value: "present",
    label: "Present",
    active:
      "bg-emerald-500 border-emerald-500 text-white",
  },
  {
    value: "late",
    label: "Late",
    active:
      "bg-amber-500 border-amber-500 text-white",
  },
  {
    value: "absent",
    label: "Absent",
    active:
      "bg-red-500 border-red-500 text-white",
  },
];

export default function AttendanceRow({
  participant,
  value,
  onChange,
}) {
  return (
    <div className="rounded-[28px] border border-zinc-200 bg-white p-5 shadow-sm">

      <div className="flex items-center gap-4">

        <Avatar
          src={participant.avatar.url}
          alt={participant.fullName}
          size={64}
        />

        <div className="flex-1">

          <h3 className="text-lg font-bold text-zinc-900">
            {participant.fullName}
          </h3>

          <p className="text-sm text-zinc-500">
            @{participant.username}
          </p>

          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1">

            <ShieldCheck
              size={14}
              className="text-emerald-600"
            />

            <span className="text-sm text-zinc-600">
              Reliability
            </span>

            <span className="font-bold text-emerald-700">
              {participant.reliabilityScore}
            </span>

          </div>

        </div>

      </div>

      <div className="mt-6">

        <p className="mb-3 text-sm font-medium text-zinc-700">
          Attendance
        </p>

        <div className="grid grid-cols-3 gap-3">

          {STATUS_OPTIONS.map((status) => (
            <button
              key={status.value}
              type="button"
              onClick={() => onChange(status.value)}
              className={`h-11 rounded-xl border text-sm font-semibold transition ${
                value === status.value
                  ? status.active
                  : "border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50"
              }`}
            >
              {status.label}
            </button>
          ))}

        </div>

      </div>

    </div>
  );
}