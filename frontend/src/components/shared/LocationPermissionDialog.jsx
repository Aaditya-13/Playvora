import {
  MapPin,
  Navigation,
} from "lucide-react";

import Button from "../ui/Button";

export default function LocationPermissionDialog({
  open,
  onAllow,
  onSkip,
  isLoading,
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5">

      <div className="w-full max-w-md rounded-[32px] bg-white p-7 shadow-xl">

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">

          <MapPin
            size={30}
            className="text-emerald-600"
          />

        </div>

        <h2 className="mt-6 text-center text-2xl font-bold text-zinc-900">
          Enable Location
        </h2>

        <p className="mt-3 text-center text-sm leading-7 text-zinc-500">
          PlayNear uses your location to
          discover nearby activities and
          improve search results.
        </p>

        <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">

          <div className="flex items-start gap-3">

            <Navigation
              size={18}
              className="mt-0.5 text-emerald-600"
            />

            <p className="text-sm leading-6 text-emerald-800">
              You can always update or
              manually choose your location
              later from your Profile.
            </p>

          </div>

        </div>

        <div className="mt-8 flex gap-3">

          <Button
            variant="outline"
            className="flex-1"
            onClick={onSkip}
          >
            Not Now
          </Button>

          <Button
            className="flex-1"
            onClick={onAllow}
            disabled={isLoading}
          >
            {isLoading
              ? "Getting Location..."
              : "Allow"}
          </Button>

        </div>

      </div>

    </div>
  );
}