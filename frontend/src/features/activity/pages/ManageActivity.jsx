import {
  ClipboardCheck,
  ShieldAlert,
  UserCheck,
} from "lucide-react";

import { useNavigate, useParams } from "react-router";

import ScreenContainer from "../../../components/ui/ScreenContainer";
import PageHeader from "../../../components/ui/PageHeader";

import useActivityDetails from "../hooks/useActivityDetails";

import ManageHero from "../components/manageActivityComponents/ManageHero";
import ManageCard from "../components/manageActivityComponents/ManageCard";

import ROUTES from "../../../constants/routes";

export default function ManageActivity() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    data,
    isLoading,
    isError,
  } = useActivityDetails(id);

  if (isLoading) {
    return (
      <ScreenContainer>
        Loading...
      </ScreenContainer>
    );
  }

  if (isError) {
    return (
      <ScreenContainer>
        Failed to load activity.
      </ScreenContainer>
    );
  }

  const activity = data?.data;

  return (
    <ScreenContainer className="bg-zinc-100 pb-10">

      <PageHeader
        title="Manage Activity"
        onBack={() => navigate(-1)}
      />

      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-6">

        <ManageHero
          activity={activity}
        />

        <ManageCard
          icon={UserCheck}
          title="Join Requests"
          description="Approve or reject pending requests."
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
          title="Attendance"
          description="Mark attendance after the activity."
          onClick={() =>
            navigate(
              ROUTES.ATTENDANCE.replace(
                ":id",
                id
              )
            )
          }
        />

        <ManageCard
          icon={ShieldAlert}
          title="Cancel Activity"
          description="Cancel this activity permanently."
          danger
          onClick={() => {
            console.log("Cancel Activity");
          }}
        />

      </div>

    </ScreenContainer>
  );
}