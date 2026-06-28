import Avatar from "../../../components/ui/Avatar.jsx";

export default function ActivityParticipantRoster({ maxPlayers, participants = [] }) {
  const isFull = participants.length >= maxPlayers;

  return (
    <div className="bg-white p-5 border border-zinc-200 rounded-2xl shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-zinc-900">Players</h3>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${
          isFull ? "bg-red-50 text-red-700 border border-red-100" : "bg-green-50 text-green-700 border border-green-100"
        }`}>
          {participants.length} / {maxPlayers} Joined
        </span>
      </div>

      {participants.length === 0 ? (
        <p className="text-sm text-zinc-500 text-center py-6 bg-zinc-50 rounded-xl border border-zinc-100 border-dashed">
          No one has joined yet. Be the first!
        </p>
      ) : (
        <div className="flex flex-col gap-4 max-h-85 overflow-y-auto pr-2 [-ms-overflow-style:none] [scrollbar-none] [&::-webkit-scrollbar]:hidden">
          {participants.map((user) => (
            <div key={user._id} className="flex items-center gap-3">
              <div className="w-10 h-10 shrink-0">
                <Avatar 
                  src={user.avatarUrl} 
                  alt={user.fullName} 
                  fallback={user.fullName?.charAt(0)} 
                />
              </div>
              <div>
                <p className="text-sm font-bold text-zinc-900">{user.fullName}</p>
                <p className="text-xs text-zinc-500">Player</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}