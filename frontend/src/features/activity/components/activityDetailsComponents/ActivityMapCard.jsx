import { MapContainer, Marker, TileLayer, Circle } from "react-leaflet";
import { MapPin } from "lucide-react";
import { ExternalLink} from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function ActivityMapCard({ activity }) {
  const latitude = activity.location.coordinates[1];
  const longitude = activity.location.coordinates[0];

  const position = {
    lat: latitude,
    lng: longitude,
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  return (
    <section className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">

      <div className="flex items-center justify-between border-b border-zinc-100 p-6">

        <div>

          <h2 className="text-lg font-bold text-zinc-900">
            Location
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Meet here for the activity.
          </p>

        </div>

        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-100"
        >
          <ExternalLink size={16} />
          Open Maps
        </a>

      </div>
      <div className="px-6 pb-6">
        <div className="h-80 overflow-hidden rounded-2xl border border-zinc-200">
          <MapContainer
            center={position}
            zoom={15}
            scrollWheelZoom={false}
            className="h-full w-full"
          >


            <TileLayer
              attribution="© OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Circle
              center={position}
              radius={activity.visibilityRadius}
              pathOptions={{
                color: "#16a34a",
                fillColor: "#22c55e",
                fillOpacity: 0.18,
                weight: 2,
              }}
            />

            <Marker position={position} />

          </MapContainer>

        </div>
      </div>
      <div className="flex items-start gap-3 border-t border-zinc-100 p-6">

        <div className="rounded-2xl bg-green-50 p-3 text-green-700">

          <MapPin size={20} />

        </div>

        <div>

          <p className="font-semibold text-zinc-900">
            {activity.groundName}
          </p>

          <p className="mt-1 text-sm leading-6 text-zinc-500">
            {activity.address}
          </p>

        </div>

      </div>

    </section>
  );
}