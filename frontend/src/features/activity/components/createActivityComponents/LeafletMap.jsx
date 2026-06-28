import { Marker, TileLayer, MapContainer, useMapEvents, useMap, Popup, Circle, } from "react-leaflet";
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

function ClickHandler({ onLocationSelect }) {
  useMapEvents({
    click(event) {
      const nextPosition = {
        lat: event.latlng.lat,
        lng: event.latlng.lng,
      };

      onLocationSelect(nextPosition);
    },
  });

  return null;
}

export default function LeafletMap({
  latitude,
  longitude,
  visibilityRadius,
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
            const marker = event.target;
            const { lat, lng } = marker.getLatLng();

            onLocationSelect({
              lat,
              lng,
            });
          },
        }}
      >
        <Popup>
          <div className="text-sm">
            <p className="font-semibold">Selected Location</p>
            <p>Drag marker to adjust precisely.</p>
          </div>
        </Popup>
      </Marker>

      <Circle
        center={position}
        radius={visibilityRadius}
        pathOptions={{
          color: "#16a34a",
          fillColor: "#22c55e",
          fillOpacity: 0.18,
          weight: 2,
        }}
      />

      <ClickHandler
        position={position}
        onLocationSelect={onLocationSelect}
      />

      <ChangeView position={position} />
    </MapContainer>
  );
}