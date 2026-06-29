export default function NearbySection({
  count,
  children,
}) {
  return (
    <section className="mt-8">

      <div className="mb-5">

        <h2 className="text-xl font-bold text-zinc-900">
          Nearby Activities
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          {count} activities around you
        </p>

      </div>

      {children}

    </section>
  );
}