import {
  Mail,
  User,
  AlignLeft,
} from "lucide-react";

export default function ProfileInfoCard({ user }) {
  const rows = [
    {
      icon: User,
      label: "Username",
      value: `@${user?.username}`,
    },
    {
      icon: Mail,
      label: "Email",
      value: user?.email,
    },
    {
      icon: AlignLeft,
      label: "Bio",
      value: user?.bio || "No bio added yet.",
    },
  ];

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">

      <h2 className="text-lg font-bold">
        Personal Information
      </h2>

      <div className="mt-6 space-y-6">

        {rows.map((row) => {
          const Icon = row.icon;

          return (
            <div
              key={row.label}
              className="flex gap-4"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50">

                <Icon
                  size={20}
                  className="text-green-600"
                />

              </div>

              <div>

                <p className="text-xs uppercase tracking-wide text-zinc-400">
                  {row.label}
                </p>

                <p className="mt-1 font-medium text-zinc-900">
                  {row.value}
                </p>

              </div>

            </div>
          );
        })}

      </div>

    </section>
  );
}