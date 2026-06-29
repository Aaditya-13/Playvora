import Button from "../../../components/ui/Button";

export default function ProfileError({
  onRetry,
}) {
  return (
    <div className="rounded-3xl border border-red-200 bg-white p-10 text-center shadow-sm">

      <h2 className="text-lg font-bold text-red-600">
        Failed to load profile
      </h2>

      <p className="mt-2 text-sm text-zinc-500">
        Please try again.
      </p>

      <Button
        className="mt-6"
        onClick={onRetry}
      >
        Retry
      </Button>

    </div>
  );
}