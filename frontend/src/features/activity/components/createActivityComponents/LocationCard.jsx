import { MapPin, Search, CheckCircle2, LocateFixedIcon } from "lucide-react";
import LeafletMap from "./LeafletMap";
import { getAddressFromCoordinates } from "../../../../utils/mapUtils.js";

export default function LocationCard({
  register,
  errors,
  latitude,
  longitude,
  setValue,
  searchLocation,
  visibilityRadius,
  useCurrentLocation
}) {
  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-bold">Location</h2>

        <p className="mt-1 text-sm text-zinc-500">
          Search for a location, then fine-tune it by clicking on the map.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-semibold">
            Ground Name
          </label>

          <input
            {...register("groundName")}
            placeholder="City Turf"
            className="h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 outline-none transition focus:border-green-600 focus:bg-white"
          />

          {errors.groundName && (
            <p className="mt-2 text-sm text-red-500">
              {errors.groundName.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Search Location
          </label>

          <div className="flex gap-3">
            <div className="relative flex-1">
              <MapPin
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                size={18}
              />

              <input
                {...register("address")}
                placeholder="Search by address"
                className="h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 pl-11 pr-4 outline-none transition focus:border-green-600 focus:bg-white"
              />
            </div>

            <button
              type="button"
              onClick={searchLocation}
              className="flex h-12 items-center gap-2 rounded-xl bg-green-600 px-5 text-white transition hover:bg-green-700"
            >
              <Search size={18} />
              Search
            </button>
          </div>

          {errors.address && (
            <p className="mt-2 text-sm text-red-500">
              {errors.address.message}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={useCurrentLocation}
          className="flex h-12 items-center justify-center gap-2 rounded-xl border border-green-600 bg-green-50 px-5 font-medium text-green-700 transition hover:bg-green-100"
        >
          <LocateFixedIcon />Use Current Location
        </button>

        <LeafletMap
          latitude={latitude}
          longitude={longitude}
          visibilityRadius={visibilityRadius}
          onLocationSelect={async ({ lat, lng }) => {
            setValue("latitude", lat, {
              shouldValidate: true,
              shouldDirty: true,
            });

            setValue("longitude", lng, {
              shouldValidate: true,
              shouldDirty: true,
            });

            const address = await getAddressFromCoordinates(lat, lng);

            if (address) {
              setValue("address", address, {
                shouldValidate: true,
                shouldDirty: true,
              });
            }
          }}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Latitude
            </label>

            <input
              readOnly
              value={latitude.toFixed(6)}
              className="h-12 w-full rounded-xl border border-zinc-200 bg-zinc-100 px-4"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Longitude
            </label>

            <input
              readOnly
              value={longitude.toFixed(6)}
              className="h-12 w-full rounded-xl border border-zinc-200 bg-zinc-100 px-4"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-green-50 p-4 text-sm text-green-700">
          <CheckCircle2 size={18} />

          <span>
            Click anywhere on the map to precisely position your activity.
          </span>
        </div>
      </div>
    </section>
  );
}