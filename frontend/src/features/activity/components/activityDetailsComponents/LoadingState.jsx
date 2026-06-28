export default function LoadingState() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 animate-pulse">

      <div className="h-72 rounded-3xl bg-zinc-200" />

      <div className="grid gap-6 lg:grid-cols-2">

        <div className="h-64 rounded-3xl bg-zinc-200" />

        <div className="h-64 rounded-3xl bg-zinc-200" />

      </div>

      <div className="h-96 rounded-3xl bg-zinc-200" />

      <div className="grid gap-6 lg:grid-cols-2">

        <div className="h-56 rounded-3xl bg-zinc-200" />

        <div className="h-80 rounded-3xl bg-zinc-200" />

      </div>

      <div className="h-56 rounded-3xl bg-zinc-200" />

      <div className="h-24 rounded-3xl bg-zinc-200" />

    </div>
  );
}