import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect } from "react";
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

function ChangeView({ position }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(position, map.getZoom());
  }, [map, position]);

  return null;
}

function ClickHandler({
  onLocationSelect,
}) {
  useMapEvents({
    click(event) {
      onLocationSelect({
        lat: event.latlng.lat,
        lng: event.latlng.lng,
      });
    },
  });

  return null;
}

export default function LeafletLocation({
  latitude,
  longitude,
  onLocationSelect,
}) {
  const position = {
    lat: latitude,
    lng: longitude,
  };

  return (
    <MapContainer
      center={position}
      zoom={15}
      scrollWheelZoom
      className="h-80 w-full rounded-2xl"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker
        position={position}
        draggable
        eventHandlers={{
          dragend(event) {
            const { lat, lng } =
              event.target.getLatLng();

            onLocationSelect({
              lat,
              lng,
            });
          },
        }}
      >
        <Popup>
          <div className="text-sm">
            <p className="font-semibold">
              Saved Location
            </p>

            <p>
              Drag the marker or tap anywhere on
              the map.
            </p>
          </div>
        </Popup>
      </Marker>

      <ClickHandler
        onLocationSelect={onLocationSelect}
      />

      <ChangeView position={position} />
    </MapContainer>
  );
}