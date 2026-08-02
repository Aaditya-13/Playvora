import React from 'react';
import { View, Text, Platform, TouchableOpacity, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import { Map, Navigation } from 'lucide-react-native';
import { Activity } from '../../types/activity';

export const ActivityMapCard = ({ activity }: { activity: Activity }) => {
  const [lng, lat] = activity.location.coordinates;
  
  const openMaps = () => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${lat},${lng}`;
    const label = activity.groundName;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });
    if (url) Linking.openURL(url);
  };

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <style>
        body { margin: 0; padding: 0; }
        #map { width: 100vw; height: 100vh; }
        .custom-marker {
          background-color: white;
          border: 2px solid #10b981;
          border-radius: 50%;
          box-shadow: 0 4px 6px rgba(0,0,0,0.3);
        }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        const map = L.map('map', { zoomControl: false, dragging: false, scrollWheelZoom: false }).setView([${lat}, ${lng}], 14);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '© OpenStreetMap'
        }).addTo(map);

        const icon = L.divIcon({
          className: 'custom-marker',
          html: '<div style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100%; font-size: 16px;">📍</div>',
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });
        
        L.marker([${lat}, ${lng}], { icon }).addTo(map);
      </script>
    </body>
    </html>
  `;

  return (
    <View className="bg-white p-5 rounded-3xl border border-zinc-200 shadow-sm mb-6">
      <View className="flex-row items-center mb-4">
        <Map size={20} color="#18181b" />
        <Text className="text-lg font-bold text-zinc-900 ml-2">Location</Text>
      </View>
      
      <View className="h-48 rounded-2xl overflow-hidden border border-zinc-200 mb-4 pointer-events-none">
        {Platform.OS === 'web' ? (
          <View className="flex-1 items-center justify-center bg-zinc-100">
            <Text>Map not supported on Web</Text>
          </View>
        ) : (
          <WebView
            source={{ html: htmlContent }}
            style={{ flex: 1 }}
            scrollEnabled={false}
          />
        )}
      </View>

      <TouchableOpacity 
        onPress={openMaps}
        className="flex-row items-center justify-center bg-zinc-100 py-3 rounded-xl"
      >
        <Navigation size={18} color="#18181b" />
        <Text className="font-bold text-zinc-900 ml-2">Get Directions</Text>
      </TouchableOpacity>
    </View>
  );
};
