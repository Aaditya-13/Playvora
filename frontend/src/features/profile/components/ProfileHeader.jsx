import { ShieldCheck } from "lucide-react";

import Avatar from "../../../components/ui/Avatar";

export default function ProfileHeader({
  user,
}) {
  return (
    <section className="rounded-[30px] border border-zinc-200 bg-white p-6 shadow-sm">

      <div className="flex items-center gap-5">

        <Avatar
          src={user.avatar?.url}
          alt={user.fullName}
          size={88}
          className="rounded-full ring-4 ring-emerald-100"
        />

        <div className="min-w-0 flex-1">

          <h1 className="text-3xl font-bold leading-tight text-zinc-900">
            {user.fullName}
          </h1>

          <p className="mt-1 text-base text-zinc-500">
            @{user.username}
          </p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2">

            <ShieldCheck
              size={18}
              className="text-emerald-600"
            />

            <span className="text-sm font-medium text-zinc-700">
              Reliability
            </span>

            <span className="font-bold text-emerald-700">
              {user.reliabilityScore}
            </span>

          </div>

        </div>

      </div>

    </section>
  );
}