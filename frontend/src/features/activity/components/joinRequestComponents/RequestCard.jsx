import { Check, X, ShieldCheck } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import Avatar from "../../../../components/ui/Avatar";
import Button from "../../../../components/ui/Button";

import useApproveRequest from "../../hooks/useApproveRequest";
import useRejectRequest from "../../hooks/useRejectRequest";

export default function RequestCard({ request }) {
  const approveMutation = useApproveRequest();
  const rejectMutation = useRejectRequest();

  const isPending =
    approveMutation.isPending ||
    rejectMutation.isPending;

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">

      <div className="flex items-start gap-4">

        <Avatar
          src={request.user.avatar.url}
          alt={request.user.fullName}
          size={56}
        />

        <div className="flex-1">

          <h3 className="font-semibold text-zinc-900">
            {request.user.fullName}
          </h3>

          <p className="text-sm text-zinc-500">
            @{request.user.username}
          </p>

          <div className="mt-3 flex items-center gap-2 text-sm text-zinc-600">

            <ShieldCheck
              size={16}
              className="text-emerald-600"
            />

            Reliability

            <span className="font-semibold">
              {request.user.reliabilityScore}
            </span>

          </div>

          <p className="mt-2 text-xs text-zinc-400">
            Requested{" "}
            {formatDistanceToNow(
              new Date(request.createdAt),
              {
                addSuffix: true,
              }
            )}
          </p>

        </div>

      </div>

      <div className="mt-5 flex gap-3">

        <Button
          variant="outline"
          className="flex-1"
          disabled={isPending}
          onClick={() =>
            rejectMutation.mutate(request._id)
          }
        >
          <X size={16} />

          Reject
        </Button>

        <Button
          className="flex-1"
          disabled={isPending}
          onClick={() =>
            approveMutation.mutate(request._id)
          }
        >
          <Check size={16} />

          Approve
        </Button>

      </div>

    </div>
  );
}