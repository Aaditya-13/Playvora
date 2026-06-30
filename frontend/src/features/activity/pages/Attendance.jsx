import { useState } from "react";
import { ArrowLeft, Calendar, Users } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { format } from "date-fns";

import ScreenContainer from "../../../components/ui/ScreenContainer";
import PageHeader from "../../../components/ui/PageHeader";
import Button from "../../../components/ui/Button";

import useAttendance from "../hooks/useAttendance";
import useMarkAttendance from "../hooks/useMarkAttendance";

import AttendanceRow from "../components/attendanceComponents/AttendanceRow";

export default function Attendance() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isLoading } = useAttendance(id);
  const markAttendance = useMarkAttendance(id);

  const [attendanceState, setAttendanceState] =
    useState({});

  if (isLoading) {
    return (
      <ScreenContainer className="min-h-screen flex items-center justify-center">
        Loading...
      </ScreenContainer>
    );
  }

  const activity = data?.data?.activity;
  const participants =
    data?.data?.participants ?? [];

  const totalParticipants =
    data?.data?.totalParticipants ?? 0;

  const markedCount = participants.filter(
    (item) => {
      const status =
        attendanceState[item.participant._id] ??
        item.status;

      return (
        status === "present" ||
        status === "late" ||
        status === "absent"
      );
    }
  ).length;

  const allMarked =
    markedCount === totalParticipants &&
    totalParticipants > 0;

  const updateAttendance = (
    participantId,
    status
  ) => {
    setAttendanceState((prev) => ({
      ...prev,
      [participantId]: status,
    }));
  };

  const submit = () => {
    const payload = participants.map((item) => ({
      participantId: item.participant._id,
      status:
        attendanceState[item.participant._id] ??
        item.status,
    }));

    if (!allMarked) {
      toast.error(
        "Please mark attendance for every participant."
      );
      return;
    }

    markAttendance.mutate(payload);
  };

  return (
    <ScreenContainer className="min-h-screen bg-zinc-100 pb-24">

      <PageHeader
        title="Attendance"
        leftNode={
          <button
            onClick={() => navigate(-1)}
            className="rounded-full p-2 transition hover:bg-zinc-100"
          >
            <ArrowLeft size={22} />
          </button>
        }
      />

      <div className="mx-auto flex w-full max-w-md flex-col gap-5 px-4 py-5">

        <section className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm">

          <h2 className="text-xl font-bold text-zinc-900">
            {activity?.title}
          </h2>

          <div className="mt-4 space-y-3">

            <div className="flex items-center gap-2 text-sm text-zinc-600">
              <Calendar size={16} />
              {activity?.scheduledAt &&
                format(
                  new Date(activity.scheduledAt),
                  "EEE, MMM d • h:mm a"
                )}
            </div>

            <div className="flex items-center gap-2 text-sm text-zinc-600">
              <Users size={16} />
              {totalParticipants} participant
              {totalParticipants !== 1 && "s"}
            </div>

          </div>

          <div className="mt-5">

            <div className="mb-2 flex items-center justify-between text-sm">

              <span className="text-zinc-500">
                Progress
              </span>

              <span className="font-semibold text-zinc-900">
                {markedCount} / {totalParticipants}
              </span>

            </div>

            <div className="h-2 overflow-hidden rounded-full bg-zinc-200">

              <div
                className="h-full rounded-full bg-emerald-500 transition-all"
                style={{
                  width:
                    totalParticipants === 0
                      ? "0%"
                      : `${(markedCount / totalParticipants) * 100}%`,
                }}
              />

            </div>

          </div>

        </section>

        {participants.length === 0 ? (
          <section className="rounded-[28px] border border-dashed border-zinc-300 bg-white p-10 text-center">

            <h3 className="font-semibold text-zinc-900">
              No participants
            </h3>

            <p className="mt-2 text-sm text-zinc-500">
              There are no participants to mark attendance for.
            </p>

          </section>
        ) : (
          participants.map((item) => (
            <AttendanceRow
              key={item.participant._id}
              participant={item.participant}
              value={
                attendanceState[
                  item.participant._id
                ] ??
                item.status ??
                ""
              }
              onChange={(status) =>
                updateAttendance(
                  item.participant._id,
                  status
                )
              }
            />
          ))
        )}

        <Button
          className="h-12"
          onClick={submit}
          disabled={
            markAttendance.isPending ||
            !allMarked
          }
        >
          {markAttendance.isPending
            ? "Saving Attendance..."
            : "Save Attendance"}
        </Button>

      </div>

    </ScreenContainer>
  );
}