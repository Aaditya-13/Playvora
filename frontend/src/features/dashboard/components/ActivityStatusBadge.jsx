const STATUS_STYLES = {
  open: "bg-emerald-100 text-emerald-700",
  full: "bg-amber-100 text-amber-700",
  completed: "bg-blue-100 text-blue-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function ActivityStatusBadge({
  status,
}) {
  if (!status) {
    return null;
  }

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${STATUS_STYLES[status]}`}
    >
      {status}
    </span>
  );
}