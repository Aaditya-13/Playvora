import { AlertTriangle } from "lucide-react";
import Button from "../../../../components/ui/Button";

export default function ErrorState({
  onRetry,
  onBack,
}) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">

      <div className="max-w-md rounded-3xl border border-red-100 bg-white p-10 text-center shadow-sm">

        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-50">

          <AlertTriangle
            size={40}
            className="text-red-500"
          />

        </div>

        <h2 className="text-2xl font-bold">
          Couldn't load activity
        </h2>

        <p className="mt-3 text-zinc-500">
          Something went wrong while loading this activity.
        </p>

        <div className="mt-8 flex gap-3">

          <Button
            variant="outline"
            className="flex-1"
            onClick={onBack}
          >
            Go Back
          </Button>

          <Button
            className="flex-1"
            onClick={onRetry}
          >
            Retry
          </Button>

        </div>

      </div>

    </div>
  );
}