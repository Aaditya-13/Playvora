export default function ActivitySkeleton() {
  return (
    <div className="space-y-5">

      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="animate-pulse rounded-3xl border border-zinc-200 bg-white p-5"
        >

          <div className="h-6 w-40 rounded bg-zinc-200" />

          <div className="mt-4 h-5 w-28 rounded bg-zinc-100" />

          <div className="mt-6 space-y-3">

            <div className="h-4 rounded bg-zinc-100" />

            <div className="h-4 rounded bg-zinc-100" />

            <div className="h-4 w-2/3 rounded bg-zinc-100" />

          </div>

          <div className="mt-6 h-11 rounded-2xl bg-zinc-100" />

        </div>
      ))}

    </div>
  );
}