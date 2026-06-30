import Button from "../../../../components/ui/Button";

export default function PublishBar({
  submit,
  isPending,
  buttonText
}) {
  return (
    <div className="mt-8 min-w-[375px] rounded-[28px] border border-zinc-200 bg-white p-5">
      <div className="flex items-center justify-between gap-5">

        <div>

          <h3 className="font-semibold text-zinc-900">
            Ready to host?
          </h3>

          <p className="mt-1 text-sm text-zinc-500">
            Your activity will become visible to nearby players.
          </p>

        </div>

        <Button
          type="button"
          onClick={submit}
          disabled={isPending}
          className="h-11 min-w-[160px]"
        >
          {isPending
            ? "Saving..."
            : buttonText ?? "Publish Activity"}
        </Button>

      </div>
    </div>
  );
}