import Avatar from "../../../components/ui/Avatar";

export default function DashboardHero({
  user,
}) {
  return (
    <section className="rounded-[32px] bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 text-white shadow-lg">

      <div className="flex items-center gap-4">

        <Avatar
          src={user?.avatar?.url}
          alt={user?.fullName}
          size={64}
        />

        <div className="min-w-0 flex-1">

          <h1 className="mt-1 truncate text-2xl font-bold">
            {user?.fullName}
          </h1>

          <p className="mt-2 text-sm leading-6 text-emerald-100">
            Manage your hosted and joined
            activities from one place.
          </p>

        </div>

      </div>

    </section>
  );
}