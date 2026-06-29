import Input from "../../../components/ui/Input";

export default function BasicInfoCard({
  register,
  errors,
}) {
  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-lg font-bold">
        Basic Information
      </h2>

      <div className="space-y-5">

        <Input
          label="Full Name"
          {...register("fullName")}
          error={errors.fullName?.message}
        />

        <Input
          label="Username"
          {...register("username")}
          error={errors.username?.message}
        />

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-700">
            Bio
          </label>

          <textarea
            rows={4}
            {...register("bio")}
            className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-green-500"
          />

          {errors.bio && (
            <p className="mt-1 text-sm text-red-500">
              {errors.bio.message}
            </p>
          )}

        </div>

      </div>

    </section>
  );
}