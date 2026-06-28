import { IndianRupee } from "lucide-react";

export default function PricingCard({
  register,
  errors,
}) {
  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="text-lg font-bold">
          Pricing
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Keep it free or split the ground charges.
        </p>
      </div>

      <div className="space-y-5">

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Cost Per Player
          </label>

          <div className="relative">

            <IndianRupee
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input
              type="number"
              min={0}
              {...register("cost.amount")}
              placeholder="0"
              className="h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 pl-11 pr-4 outline-none transition focus:border-green-600 focus:bg-white"
            />

          </div>

          <p className="mt-2 text-xs text-zinc-500">
            Enter 0 if this activity is free.
          </p>

          {errors.cost?.amount && (
            <p className="mt-2 text-sm text-red-500">
              {errors.cost.amount.message}
            </p>
          )}
        </div>

      </div>

    </section>
  );
}