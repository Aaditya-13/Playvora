import { Camera } from "lucide-react";

import Avatar from "../../../components/ui/Avatar";

export default function EditProfileHero({
  user,
  avatarFile,
  setAvatarFile,
}) {
  const preview = avatarFile
    ? URL.createObjectURL(avatarFile)
    : user?.avatar?.url;

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">

      <div className="flex flex-col items-center">

        <Avatar
          src={preview}
          size={100}
        />

        <input
          id="avatar-upload"
          type="file"
          accept="image/*"
          hidden
          onChange={(e) =>
            setAvatarFile(e.target.files?.[0] || null)
          }
        />

        <label
          htmlFor="avatar-upload"
          className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-5 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-100"
        >
          <Camera size={16} />
          Change Photo
        </label>

        <p className="mt-2 text-xs text-zinc-500">
          JPG, PNG • Max 5 MB
        </p>

      </div>

    </section>
  );
}