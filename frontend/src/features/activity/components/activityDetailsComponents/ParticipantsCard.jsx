import {
  Users,
  UserCheck,
} from "lucide-react";

import Avatar from "../../../../components/ui/Avatar";

export default function ParticipantsCard({
  activity,
}) {
  const participants =
    activity.participants || [];

  const organizerId =
    typeof activity.organizer === "object"
      ? activity.organizer._id
      : activity.organizer;

  const joined =
    participants.length;

  const remaining =
    Math.max(
      activity.maxPlayers - joined,
      0
    );

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-lg font-bold text-zinc-900">
            Participants
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            {joined} joined • {remaining} spots remaining
          </p>

        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50">

          <Users
            size={22}
            className="text-green-600"
          />

        </div>

      </div>

      {participants.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-200 bg-zinc-50 py-10 text-center">

          <UserCheck
            size={42}
            className="mx-auto mb-4 text-zinc-400"
          />

          <p className="font-semibold text-zinc-700">
            No participants yet
          </p>

          <p className="mt-2 text-sm text-zinc-500">
            Be the first one to join this activity.
          </p>

        </div>
      ) : (
        <div className="space-y-3">

          {participants.map((participant) => {
            const isOrganizer =
              participant._id === organizerId;

            return (
              <div
                key={participant._id}
                className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-zinc-50 p-4 transition hover:border-green-300 hover:bg-white"
              >

                <div className="flex items-center gap-4">

                  <Avatar
                    src={participant.avatar?.url}
                    alt={participant.fullName}
                    fallback={participant.fullName?.charAt(0)}
                    size="md"
                  />

                  <div>

                    <p className="font-semibold text-zinc-900">
                      {participant.fullName}
                    </p>

                    <p className="text-sm text-zinc-500">
                      @{participant.username}
                    </p>

                  </div>

                </div>

                {isOrganizer ? (
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">

                    Organizer

                  </span>
                ) : (
                  <span className="rounded-full bg-zinc-200 px-3 py-1 text-xs font-medium text-zinc-600">

                    Participant

                  </span>
                )}

              </div>
            );
          })}

        </div>
      )}

      {remaining > 0 && (
        <div className="mt-6 rounded-2xl border border-green-100 bg-green-50 p-4">

          <p className="text-sm font-semibold text-green-700">

            🎉 {remaining} spot{remaining > 1 ? "s" : ""} still available.

          </p>

        </div>
      )}

    </section>
  );
}