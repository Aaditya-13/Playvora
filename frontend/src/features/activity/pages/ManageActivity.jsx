import {
  ArrowLeft,
  UserPlus,
  ClipboardCheck,
  CheckCircle2,
  Ban,
} from "lucide-react";
import { useNavigate, useParams } from "react-router";

import ScreenContainer from "../../../components/ui/ScreenContainer";
import PageHeader from "../../../components/ui/PageHeader";

import ManageCard from "../components/manageActivityComponents/ManageCard";
import SectionHeader from "../components/manageActivityComponents/SectionHeader";

import useActivityDetails from "../hooks/useActivityDetails";

import ROUTES from "../../../constants/routes";

export default function ManageActivity() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isLoading } =
    useActivityDetails(id);

  if (isLoading) {
    return (
      <ScreenContainer className="flex items-center justify-center">
        Loading...
      </ScreenContainer>
    );
  }

  const activity = data?.data;

  const isCompleted =
    activity?.status === "completed";

  const isCancelled =
    activity?.status === "cancelled";

  return (
    <ScreenContainer className="min-h-screen bg-zinc-100 pb-24">

      <PageHeader
        title="Manage Activity"
        leftNode={
          <button
            onClick={() => navigate(-1)}
            className="rounded-full p-2 transition hover:bg-zinc-100"
          >
            <ArrowLeft size={22} />
          </button>
        }
      />

      <div className="mx-auto max-w-3xl px-4 py-6">

        <div className="rounded-[32px] border border-zinc-200 bg-white p-6 shadow-sm">

          <SectionHeader
            title="Players"
            description="Manage participants for this activity."
          />

          <div className="space-y-4">

            <ManageCard
              icon={UserPlus}
              variant="blue"
              title="Join Requests"
              description="Approve or reject player requests."
              onClick={() =>
                navigate(
                  ROUTES.JOIN_REQUESTS.replace(
                    ":id",
                    id
                  )
                )
              }
            />

            <ManageCard
              icon={ClipboardCheck}
              variant={
                isCompleted
                  ? "emerald"
                  : "amber"
              }
              title="Attendance"
              description="Mark attendance for participants."
              badge={
                isCompleted
                  ? "Available"
                  : "Locked"
              }
              disabled={!isCompleted}
              onClick={() =>
                navigate(
                  ROUTES.ATTENDANCE.replace(
                    ":id",
                    id
                  )
                )
              }
            />

          </div>

          <div className="my-8 border-t border-zinc-200" />

          <SectionHeader
            title="Activity"
            description="Manage the activity lifecycle."
          />

          <div className="space-y-4">

            {!isCompleted && !isCancelled && (
              <ManageCard
                icon={CheckCircle2}
                variant="emerald"
                title="Complete Activity"
                description="Mark this activity as completed."
                onClick={() =>
                  navigate(
                    ROUTES.COMPLETE_ACTIVITY.replace(
                      ":id",
                      id
                    )
                  )
                }
              />
            )}

            {!isCancelled && (
              <ManageCard
                icon={Ban}
                variant="red"
                title="Cancel Activity"
                description="Cancel this activity permanently."
                badge="Danger"
                onClick={() =>
                  navigate(
                    ROUTES.CANCEL_ACTIVITY.replace(
                      ":id",
                      id
                    )
                  )
                }
              />
            )}

          </div>

        </div>

      </div>

    </ScreenContainer>
  );
}