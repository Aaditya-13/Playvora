import { useNavigate, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";

import ScreenContainer from "../../../components/ui/ScreenContainer";
import PageHeader from "../../../components/ui/PageHeader";

import useActivityDetails from "../hooks/useActivityDetails";
import useReceivedRequests from "../hooks/useReceivedRequests";

import RequestCard from "../components/joinRequestComponents/RequestCard";

export default function JoinRequests() {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    data: activityData,
    isLoading: activityLoading,
  } = useActivityDetails(id);

  const {
    requests,
    isLoading: requestsLoading,
  } = useReceivedRequests(id);

  if (activityLoading || requestsLoading) {
    return (
      <ScreenContainer>
        Loading...
      </ScreenContainer>
    );
  }

  const activity = activityData?.data;

  return (
    <ScreenContainer className="min-h-screen bg-zinc-100 pb-28">

      <PageHeader
        title="Join Requests"
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

        <section className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">

          <h2 className="text-xl font-bold text-zinc-900">
            {activity.title}
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            {requests.length} pending request
            {requests.length !== 1 && "s"}
          </p>

        </section>

        {requests.length === 0 ? (
          <div className="w-full rounded-[28px] border border-zinc-200 bg-white p-5 shadow-sm">

            <h3 className="font-semibold text-zinc-900">
              No pending requests
            </h3>

            <p className="mt-2 text-sm text-zinc-500">
              New join requests will appear here.
            </p>

          </div>
        ) : (
          requests.map((request) => (
            <RequestCard
              key={request._id}
              request={request}
            />
          ))
        )}

      </div>

    </ScreenContainer>
  );
}