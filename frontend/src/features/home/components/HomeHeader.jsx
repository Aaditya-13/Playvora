export default function HomeHeader({ user }) {
  return (
    <header className="mb-6 flex items-start justify-between">

      <div>

        <h1 className="text-3xl font-black tracking-tight text-zinc-900">
          Playvora
        </h1>

        <p className="mt-2 text-sm text-zinc-500">
          Find your next game nearby.
        </p>

      </div>

      <div className="text-right">

        <p className="text-lg text-zinc-500">
          Welcome back,
        </p>

        <p className="font-semibold text-zinc-900">
          {user?.fullName}
        </p>

      </div>

    </header>
  );
}