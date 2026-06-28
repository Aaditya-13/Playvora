import Avatar from "../../../components/ui/Avatar.jsx";

export default function ActivityHostBio({ host }) {
  if (!host) return null;

  return (
    <div className="bg-white p-4 border border-zinc-200 rounded-xl shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar src={host.avatarUrl} alt={host.fullName} size="md" fallback={host.fullName?.charAt(0)} />
        <div>
          <p className="text-sm font-bold text-zinc-900">{host.fullName}</p>
          <p className="text-xs font-medium text-zinc-500">Host</p>
        </div>
      </div>
      
      <button className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
        View Profile
      </button>
    </div>
  );
}