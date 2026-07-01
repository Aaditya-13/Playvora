import { useEffect, useState } from "react";
import { ArrowLeft, LocateFixed, Search } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import ScreenContainer from "../../../components/ui/ScreenContainer";
import PageHeader from "../../../components/ui/PageHeader";
import Button from "../../../components/ui/Button";

import LeafletLocation from "../components/LeafletLocation";

import ROUTES from "../../../constants/routes";

import useLocation from "../../../hooks/useLocation";

import {
  getSavedLocation,
} from "../../../utils/locationStorage";

import {
  getCoordinatesFromAddress,
  getAddressFromCoordinates,
} from "../../../utils/mapUtils";

const DEFAULT_LOCATION = {
  latitude: 20.0059,
  longitude: 73.7910,
};

export default function SavedLocation() {
  const navigate = useNavigate();

  const {
    requestBrowserLocation,
    saveManualLocation,
    isLoading,
  } = useLocation();

  const [latitude, setLatitude] = useState(
    DEFAULT_LOCATION.latitude
  );

  const [longitude, setLongitude] = useState(
    DEFAULT_LOCATION.longitude
  );

  const [address, setAddress] =
    useState("");

  useEffect(() => {
    async function loadSavedLocation() {
      const saved = getSavedLocation();

      if (!saved) {
        return;
      }

      setLatitude(saved.latitude);
      setLongitude(saved.longitude);

      const formattedAddress =
        await getAddressFromCoordinates(
          saved.latitude,
          saved.longitude
        );

      setAddress(formattedAddress);
    }

    loadSavedLocation();
  }, []);

  const handleSearch = async () => {
    if (!address.trim()) {
      toast.error("Enter an address.");
      return;
    }

    const coordinates =
      await getCoordinatesFromAddress(address);

    if (!coordinates) {
      toast.error("Location not found.");
      return;
    }

    setLatitude(coordinates.latitude);
    setLongitude(coordinates.longitude);
  };

  const handleCurrentLocation =
    async () => {
      try {
        const location =
          await requestBrowserLocation();

        setLatitude(location.latitude);
        setLongitude(location.longitude);

        const formattedAddress =
          await getAddressFromCoordinates(
            location.latitude,
            location.longitude
          );

        setAddress(formattedAddress);
      } catch {
        toast.error(
          "Unable to access your current location."
        );
      }
    };

  const handleMapSelection =
    async ({ lat, lng }) => {
      setLatitude(lat);
      setLongitude(lng);

      const formattedAddress =
        await getAddressFromCoordinates(
          lat,
          lng
        );

      setAddress(formattedAddress);
    };

  const handleSave = () => {
    saveManualLocation(
      latitude,
      longitude
    );

    toast.success(
      "Saved location updated."
    );

    navigate(ROUTES.PROFILE);
  };

  return (
    <ScreenContainer className="min-h-screen bg-zinc-100 pb-24">

      <PageHeader
        title="Saved Location"
        leftNode={
          <button
            onClick={() => navigate(-1)}
            className="rounded-full p-2 transition hover:bg-zinc-100"
          >
            <ArrowLeft size={22} />
          </button>
        }
      />

      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-5">

        <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">

          <h2 className="text-lg font-bold">
            Saved Location
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            This location is used whenever your
            browser location is unavailable.
          </p>

          <div className="mt-6 flex gap-3">

            <input
              value={address}
              onChange={(event) =>
                setAddress(event.target.value)
              }
              placeholder="Search by address"
              className="h-12 flex-1 rounded-xl border border-zinc-200 bg-zinc-50 px-4 outline-none transition focus:border-green-600 focus:bg-white"
            />

            <Button
              type="button"
              onClick={handleSearch}
              className="flex items-center gap-2"
            >
              <Search size={18} />
              Search
            </Button>

          </div>

          <Button
            type="button"
            variant="outline"
            onClick={handleCurrentLocation}
            disabled={isLoading}
            className="mt-4 flex w-full items-center justify-center gap-2"
          >
            <LocateFixed size={18} />
            Use Current Location
          </Button>

          <div className="mt-6">

            <LeafletLocation
              latitude={latitude}
              longitude={longitude}
              onLocationSelect={
                handleMapSelection
              }
            />

          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">

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

          <Button
            onClick={handleSave}
            className="mt-6 w-full"
          >
            Save Location
          </Button>

        </section>

      </div>

    </ScreenContainer>
  );
}