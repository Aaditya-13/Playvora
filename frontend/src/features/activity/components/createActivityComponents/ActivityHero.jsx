export default function ActivityHero() {
  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-green-600 via-green-500 to-emerald-500 p-7 text-white shadow-lg">
      <div className="max-w-lg">
        <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest">
          Host Activity
        </span>

        <h1 className="mt-4 text-3xl font-bold leading-tight">
          Bring players together.
        </h1>

        <p className="mt-3 text-sm leading-6 text-green-50">
          Create a local sports activity, invite nearby players and manage
          everything from one place.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <div className="rounded-2xl bg-white/15 px-4 py-3 backdrop-blur">
          <p className="text-xs text-green-100">Fast Setup</p>
          <p className="mt-1 font-semibold">Under 1 minute</p>
        </div>

        <div className="rounded-2xl bg-white/15 px-4 py-3 backdrop-blur">
          <p className="text-xs text-green-100">Nearby Players</p>
          <p className="mt-1 font-semibold">Auto Discover</p>
        </div>

        <div className="rounded-2xl bg-white/15 px-4 py-3 backdrop-blur">
          <p className="text-xs text-green-100">Live Requests</p>
          <p className="mt-1 font-semibold">Instant Updates</p>
        </div>
      </div>
    </section>
  );
}