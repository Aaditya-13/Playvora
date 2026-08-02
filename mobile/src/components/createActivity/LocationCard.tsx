import React from 'react';
import { View, Text, TextInput, Platform } from 'react-native';
import { Controller, useWatch } from 'react-hook-form';
import { WebView } from 'react-native-webview';

export const LocationCard = ({ control, setValue, errors }: any) => {
  const latitude = useWatch({ control, name: 'latitude' }) || 19.0760;
  const longitude = useWatch({ control, name: 'longitude' }) || 72.8777;
  const visibilityRadius = useWatch({ control, name: 'visibilityRadius' }) || 5000;

  const handleMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'LOCATION_SELECTED') {
        setValue('latitude', data.lat, { shouldValidate: true });
        setValue('longitude', data.lng, { shouldValidate: true });
      }
    } catch (e) {
      console.log('Error parsing WebView message', e);
    }
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
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        const map = L.map('map', { zoomControl: false }).setView([${latitude}, ${longitude}], 12);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '© OpenStreetMap'
        }).addTo(map);

        let marker = L.marker([${latitude}, ${longitude}], { draggable: true }).addTo(map);
        let circle = L.circle([${latitude}, ${longitude}], {
          radius: ${visibilityRadius},
          color: "#16a34a",
          fillColor: "#22c55e",
          fillOpacity: 0.18,
          weight: 2
        }).addTo(map);

        function updateLocation(lat, lng) {
          window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'LOCATION_SELECTED', lat, lng }));
        }

        marker.on('dragend', function(e) {
          const pos = marker.getLatLng();
          circle.setLatLng(pos);
          map.setView(pos);
          updateLocation(pos.lat, pos.lng);
        });

        map.on('click', function(e) {
          marker.setLatLng(e.latlng);
          circle.setLatLng(e.latlng);
          map.setView(e.latlng);
          updateLocation(e.latlng.lat, e.latlng.lng);
        });
      </script>
    </body>
    </html>
  `;

  return (
    <View className="mb-6 bg-white p-5 rounded-3xl border border-zinc-200 shadow-sm">
      <Text className="text-lg font-bold mb-1">Location</Text>
      <Text className="text-sm text-zinc-500 mb-4">Where is the activity happening?</Text>

      <Controller
        control={control}
        name="groundName"
        render={({ field: { onChange, value } }) => (
          <View className="mb-5">
            <Text className="text-sm font-semibold mb-2">Ground Name</Text>
            <TextInput
              placeholder="e.g. Astro Park Bandra"
              value={value}
              onChangeText={onChange}
              className="bg-zinc-50 px-4 py-3 rounded-xl border border-zinc-200 text-base"
              placeholderTextColor="#9ca3af"
            />
            {errors.groundName && <Text className="text-red-500 text-xs mt-1 ml-1">{errors.groundName.message}</Text>}
          </View>
        )}
      />

      <Controller
        control={control}
        name="address"
        render={({ field: { onChange, value } }) => (
          <View className="mb-5">
            <Text className="text-sm font-semibold mb-2">Search Location / Address</Text>
            <TextInput
              placeholder="e.g. Bandra West, Mumbai"
              value={value}
              onChangeText={onChange}
              className="bg-zinc-50 px-4 py-3 rounded-xl border border-zinc-200 text-base"
              placeholderTextColor="#9ca3af"
            />
            {errors.address && <Text className="text-red-500 text-xs mt-1 ml-1">{errors.address.message}</Text>}
          </View>
        )}
      />

      <View className="mt-2 h-64 rounded-2xl overflow-hidden border border-zinc-200">
        {Platform.OS === 'web' ? (
          <View className="flex-1 items-center justify-center bg-zinc-100">
            <Text>Map not supported on Web preview</Text>
          </View>
        ) : (
          <WebView
            source={{ html: htmlContent }}
            style={{ flex: 1 }}
            scrollEnabled={false}
            onMessage={handleMessage}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
      <Text className="text-xs text-zinc-500 mt-3 text-center">Tap or drag the marker to set precise location</Text>
    </View>
  );
};
