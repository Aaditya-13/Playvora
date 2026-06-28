import Button from "../../../../components/ui/Button";

export default function PublishBar({
  submit,
  isPending,
}) {
  return (
    <div className="sticky bottom-0 left-0 right-0 mt-6 border-t border-zinc-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">

        <div>
          <p className="text-sm font-semibold text-zinc-900">
            Ready to host?
          </p>

          <p className="text-xs text-zinc-500">
            Your activity will become visible to nearby players.
          </p>
        </div>

        <Button
          type="button"
          onClick={submit}
          disabled={isPending}
          className="min-w-[190px] h-12"
        >
          {isPending ? "Publishing..." : "Publish Activity"}
        </Button>

      </div>
    </div>
  );
}