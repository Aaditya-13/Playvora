import Button from "../../../components/ui/Button";

export default function SaveProfileBar({
  isPending,
  onCancel,
}) {
  return (
    <div className="sticky bottom-0 z-40 border-t border-zinc-200 bg-white/95 p-4 backdrop-blur">

      <div className="mx-auto flex max-w-3xl gap-3">

        <Button
          variant="outline"
          className="flex-1"
          onClick={onCancel}
          disabled={isPending}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          form="edit-profile-form"
          className="flex-1"
          disabled={isPending}
        >
          {isPending
            ? "Saving..."
            : "Save Changes"}
        </Button>

      </div>

    </div>
  );
}