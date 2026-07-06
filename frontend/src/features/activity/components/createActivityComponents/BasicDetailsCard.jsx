export default function BasicDetailsCard({
  register,
  errors,
}) {
  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-bold">
          Game Details
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Tell players what you're organizing.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-semibold">
            Activity Title
          </label>

          <input
            {...register("title")}
            placeholder="Sunday Football Match"
            className="h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 outline-none transition focus:border-green-600 focus:bg-white"
          />

          {errors.title && (
            <p className="mt-2 text-sm text-red-500">
              {errors.title.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Description
          </label>

          <textarea
            rows={5}
            {...register("description")}
            placeholder="Describe your event briefly"
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-4 outline-none transition focus:border-green-600 focus:bg-white"
          />

          {errors.description && (
            <p className="mt-2 text-sm text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}