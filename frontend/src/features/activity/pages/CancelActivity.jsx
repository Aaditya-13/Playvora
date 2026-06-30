import { AlertTriangle, ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router";

import ScreenContainer from "../../../components/ui/ScreenContainer";
import PageHeader from "../../../components/ui/PageHeader";
import Button from "../../../components/ui/Button";

import useActivityDetails from "../hooks/useActivityDetails";
import useCancelActivity from "../hooks/useCancelActivity";

export default function CancelActivity() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isLoading } = useActivityDetails(id);

  const cancelMutation =
    useCancelActivity(id);

  if (isLoading) {
    return (
      <ScreenContainer className="flex items-center justify-center">
        Loading...
      </ScreenContainer>
    );
  }

  const activity = data?.data;

  return (
    <ScreenContainer className="min-h-screen bg-zinc-100 pb-24">

      <PageHeader
        title="Cancel Activity"
        leftNode={
          <button
            onClick={() => navigate(-1)}
            className="rounded-full p-2 transition hover:bg-zinc-100"
          >
            <ArrowLeft size={22} />
          </button>
        }
      />

      <div className="mx-auto flex w-full max-w-md flex-col gap-6 px-4 py-6">

        <div className="rounded-[28px] border border-red-200 bg-white p-8 text-center shadow-sm">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">

            <AlertTriangle
              size={40}
              className="text-red-600"
            />

          </div>

          <h2 className="mt-6 text-2xl font-bold text-zinc-900">
            Cancel Activity?
          </h2>

          <p className="mt-3 text-zinc-500">
            <span className="font-semibold text-zinc-900">
              {activity.title}
            </span>
          </p>

          <p className="mt-4 text-sm leading-6 text-zinc-500">
            This activity will be marked as cancelled.
            Players won't be able to join it anymore.
          </p>

        </div>

        <Button
          className="h-12 bg-red-600 hover:bg-red-700"
          disabled={cancelMutation.isPending}
          onClick={() =>
            cancelMutation.mutate()
          }
        >
          {cancelMutation.isPending
            ? "Cancelling..."
            : "Cancel Activity"}
        </Button>

        <Button
          variant="outline"
          className="h-12"
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>

      </div>

    </ScreenContainer>
  );
}