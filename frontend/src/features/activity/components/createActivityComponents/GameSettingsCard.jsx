import { Minus, Plus, Users } from "lucide-react";

export default function GameSettingsCard({
  register,
  errors,
  maxPlayers,
  visibilityRadius,
  increasePlayers,
  decreasePlayers,
  SKILL_LEVELS,
  VENUE_TYPES,
  JOIN_POLICIES,
  GENDER_OPTIONS,
  setValue,
}) {
  const selectStyle =
    "h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 outline-none transition focus:border-green-600 focus:bg-white";

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-bold">Game Settings</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Configure who can join and how the activity works.
        </p>
      </div>

      <div className="space-y-6">

        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
          <div className="flex items-center justify-between">

            <div>
              <div className="flex items-center gap-2">
                <Users size={18} />
                <h3 className="font-semibold">Maximum Players</h3>
              </div>

              <p className="mt-1 text-sm text-zinc-500">
                Total participants allowed.
              </p>
            </div>

            <div className="flex items-center gap-3">

              <button
                type="button"
                onClick={decreasePlayers}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-300 bg-white"
              >
                <Minus size={16} />
              </button>

              <span className="w-8 text-center text-xl font-bold">
                {maxPlayers}
              </span>

              <button
                type="button"
                onClick={increasePlayers}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-300 bg-white"
              >
                <Plus size={16} />
              </button>

            </div>
          </div>

          {errors.maxPlayers && (
            <p className="mt-2 text-sm text-red-500">
              {errors.maxPlayers.message}
            </p>
          )}
        </div>

        <div className="grid gap-5 md:grid-cols-2">

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Skill Level
            </label>

            <select
              {...register("skillLevel")}
              className={selectStyle}
            >
              {SKILL_LEVELS.map((item) => (
                <option
                  key={item.value}
                  value={item.value}
                >
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Venue
            </label>

            <select
              {...register("venueType")}
              className={selectStyle}
            >
              {VENUE_TYPES.map((item) => (
                <option
                  key={item.value}
                  value={item.value}
                >
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Join Policy
            </label>

            <select
              {...register("joinPolicy")}
              className={selectStyle}
            >
              {JOIN_POLICIES.map((item) => (
                <option
                  key={item.value}
                  value={item.value}
                >
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Gender Preference
            </label>

            <select
              {...register("genderPreference")}
              className={selectStyle}
            >
              {GENDER_OPTIONS.map((item) => (
                <option
                  key={item.value}
                  value={item.value}
                >
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-3 block text-sm font-semibold">
              Visibility Radius
            </label>

            <p className="mb-4 text-sm text-zinc-500">
              Only players within this distance can discover your activity.
            </p>

            <input
              type="hidden"
              {...register("visibilityRadius", {
                valueAsNumber: true,
              })}
            />
            <div className="flex flex-wrap gap-2">
              {[1000, 3000, 5000, 10000, 20000, 50000].map((radius) => (
                <button
                  key={radius}
                  type="button"
                  onClick={() =>
                    setValue("visibilityRadius", radius, {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${visibilityRadius === radius
                    ? "bg-green-600 text-white"
                    : "border border-zinc-300 bg-white text-zinc-700 hover:border-green-500"
                    }`}
                >
                  {radius / 1000} km
                </button>
              ))}
            </div>

            <p className="mt-3 text-sm text-green-700">
              Current Radius: <strong>{visibilityRadius / 1000} km</strong>
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}