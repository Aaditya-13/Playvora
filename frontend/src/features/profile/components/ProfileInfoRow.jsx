export default function ProfileInfoRow({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="flex items-start gap-4 py-5">

      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-50">
        <Icon
          size={20}
          className="text-emerald-600"
        />
      </div>

      <div className="min-w-0 flex-1">

        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
          {label}
        </p>

        <p className="mt-2 break-words text-[15px] font-medium leading-6 text-zinc-900">
          {value || "-"}
        </p>

      </div>

    </div>
  );
}