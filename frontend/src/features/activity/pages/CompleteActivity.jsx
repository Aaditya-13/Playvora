import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useNavigate, useParams } from "react-router";

import ScreenContainer from "../../../components/ui/ScreenContainer";
import PageHeader from "../../../components/ui/PageHeader";
import Button from "../../../components/ui/Button";

import ROUTES from "../../../constants/routes";

import useActivityDetails from "../hooks/useActivityDetails";
import useCompleteActivity from "../hooks/useCompleteActivity";

export default function CompleteActivity() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isLoading } = useActivityDetails(id);

  const completeMutation = useCompleteActivity(id);

  if (isLoading) {
    return (
      <ScreenContainer className="flex items-center justify-center">
        Loading...
      </ScreenContainer>
    );
  }

  const activity = data?.data;

  const handleComplete = async () => {
    try {
      await completeMutation.mutateAsync();

      navigate(
        ROUTES.DASHBOARD
      );
    } catch {
      // Error toast is already handled in the hook.
    }
  };

  return (
    <ScreenContainer className="min-h-screen bg-zinc-100 pb-10">

      <PageHeader
        title="Complete Activity"
        leftNode={
          <button
            onClick={() => navigate(-1)}
            className="rounded-full p-2 transition hover:bg-zinc-100"
          >
            <ArrowLeft size={22} />
          </button>
        }
      />

      <div className="mx-auto max-w-md px-4 py-6">

        <div className="rounded-[32px] border border-zinc-200 bg-white p-8 shadow-sm">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">

            <CheckCircle2
              size={42}
              className="text-emerald-600"
            />

          </div>

          <h2 className="mt-6 text-center text-2xl font-bold text-zinc-900">
            Complete Activity?
          </h2>

          <p className="mt-4 text-center text-sm leading-7 text-zinc-500">
            This will officially mark
            <span className="font-semibold text-zinc-700">
              {" "}
              "{activity.title}"
            </span>{" "}
            as completed.
          </p>

          <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">

            <h3 className="font-semibold text-emerald-800">
              What happens next?
            </h3>

            <ul className="mt-3 space-y-2 text-sm leading-6 text-emerald-700">

              <li>
                • Activity status becomes Completed.
              </li>

              <li>
                • Attendance will be unlocked.
              </li>

              <li>
                • Participants remain associated with
                the activity.
              </li>

              <li>
                • This action cannot be undone.
              </li>

            </ul>

          </div>

          <div className="mt-8 flex gap-3">

            <Button
              variant="outline"
              className="flex-1"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>

            <Button
              className="flex-1"
              onClick={handleComplete}
              disabled={completeMutation.isPending}
            >
              {completeMutation.isPending
                ? "Completing..."
                : "Complete"}
            </Button>

          </div>

        </div>

      </div>

    </ScreenContainer>
  );
}