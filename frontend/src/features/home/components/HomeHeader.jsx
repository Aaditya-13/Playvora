import { useState, useEffect } from "react";
import { MapPin, ChevronDown, Crosshair } from "lucide-react";
import { getAddressFromCoordinates } from "../../../../utils/mapUtils";

export default function HomeHeader({ user, location, onUpdateLocation, isUpdatingLocation }) {
  const [address, setAddress] = useState("Loading...");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (location?.latitude && location?.longitude) {
      getAddressFromCoordinates(location.latitude, location.longitude)
        .then((addr) => {
           if (addr) {
             const parts = addr.split(',');
             setAddress(parts.slice(0, 2).join(',') || "Current Location");
           } else {
             setAddress("Current Location");
           }
        });
    } else {
      setAddress("Unknown Location");
    }
  }, [location]);

  return (
    <header className="mb-6 flex items-start justify-between">

      <div className="relative">

        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-1 text-zinc-900 hover:text-orange-500 transition-colors"
        >
          <MapPin className="h-6 w-6 text-orange-500" />
          <h1 className="text-2xl font-black tracking-tight truncate max-w-[180px] sm:max-w-[300px]">
            {address}
          </h1>
          <ChevronDown className="h-5 w-5 text-zinc-500" />
        </button>

        <p className="mt-1 text-sm text-zinc-500">
          Find your next game nearby.
        </p>

        {isDropdownOpen && (
          <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-zinc-100 p-2 z-20">
            <button
              onClick={() => {
                setIsDropdownOpen(false);
                if (onUpdateLocation) onUpdateLocation();
              }}
              disabled={isUpdatingLocation}
              className="w-full text-left px-3 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 rounded-md flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              <Crosshair className="h-4 w-4" />
              {isUpdatingLocation ? "Updating..." : "Update Current Location"}
            </button>
          </div>
        )}

      </div>

      <div className="text-right">

        <p className="text-sm text-zinc-500">
          Welcome back,
        </p>

        <p className="font-bold text-zinc-900">
          {user?.fullName?.split(" ")[0]}
        </p>

      </div>

    </header>
  );
}