import {
  User,
  Mail,
  FileText,
} from "lucide-react";

import ProfileInfoRow from "./ProfileInfoRow";

export default function PersonalInformation({
  user,
}) {
  return (
    <section className="rounded-[30px] border border-zinc-200 bg-white p-6 shadow-sm">

      <h2 className="text-xl font-bold text-zinc-900">
        Personal Information
      </h2>

      <div className="mt-5 divide-y divide-zinc-100">

        <ProfileInfoRow
          icon={User}
          label="Username"
          value={`@${user.username}`}
        />

        <ProfileInfoRow
          icon={Mail}
          label="Email"
          value={user.email}
        />

        <ProfileInfoRow
          icon={FileText}
          label="Bio"
          value={
            user.bio ||
            "No bio added yet."
          }
        />

      </div>

    </section>
  );
}