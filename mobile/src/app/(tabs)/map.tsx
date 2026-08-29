import React, { useRef, useMemo, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import BottomSheet from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useActivities } from '../../hooks/queries/useActivities';
import { Activity } from '../../types/activity';
import { ActivityCard } from '../../components/activity/ActivityCard';
import { useFilterStore } from '../../store/filterStore';
import { Filter } from 'lucide-react-native';

import { SPORTS as CONSTANT_SPORTS } from '../../components/createActivity/constants';

const FILTER_SPORTS = [{ value: 'All', label: 'All', emoji: '🔍' }, ...CONSTANT_SPORTS];
export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const webViewRef = useRef<WebView>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['15%', '50%'], []);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const { selectedSport, setSelectedSport } = useFilterStore();
  const { data: activities } = useActivities();

  const filteredActivities = (activities || []).filter(
    (a) => selectedSport === 'All' || a.sport === selectedSport
  );

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
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
          70% { box-shadow: 0 0 0 15px rgba(59, 130, 246, 0); }
          100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
        }
        .user-location-marker {
          background-color: #3b82f6;
          border: 3px solid white;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        const map = L.map('map', { zoomControl: false }).setView([20.0076, 73.7601], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '© OpenStreetMap'
        }).addTo(map);

        // Current Location Pin
        const userIcon = L.divIcon({
          className: 'user-location-marker',
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        });
        L.marker([20.0076, 73.7601], { icon: userIcon, interactive: false }).addTo(map);

        const markers = [];

        function updateMarkers(activities) {
          markers.forEach(m => map.removeLayer(m));
          markers.length = 0;

          const getIcon = (sportValue) => {
            const sportObj = ${JSON.stringify(CONSTANT_SPORTS)}.find(s => s.value === sportValue);
            return sportObj ? sportObj.emoji : '📍';
          };

          activities.forEach(act => {
            const icon = L.divIcon({
              className: 'custom-marker',
              html: '<div style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100%; font-size: 16px;">' + getIcon(act.sport) + '</div>',
              iconSize: [32, 32],
              iconAnchor: [16, 16]
            });
            const marker = L.marker([act.location.coordinates[1], act.location.coordinates[0]], { icon }).addTo(map);
            marker.on('click', () => {
              window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'MARKER_CLICK', id: act._id }));
              map.setView([act.location.coordinates[1] - 0.005, act.location.coordinates[0]], 14, { animate: true });
            });
            markers.push(marker);
          });
        }

        setTimeout(() => {
          updateMarkers(${JSON.stringify(filteredActivities)});
        }, 500);
      </script>
    </body>
    </html>
  `;

  useEffect(() => {
    // Send updated activities to the webview whenever the filter changes
    webViewRef.current?.injectJavaScript(`
      try {
        if (typeof updateMarkers === 'function') {
          updateMarkers(${JSON.stringify(filteredActivities)});
        }
      } catch(e) {}
      true;
    `);
  }, [filteredActivities]);

  const handleMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'MARKER_CLICK') {
        const activity = (activities || []).find(a => a._id === data.id);
        if (activity) {
          setSelectedActivity(activity);
          bottomSheetRef.current?.expand();
        }
      }
    } catch (e) {}
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ html: htmlContent }}
        style={StyleSheet.absoluteFill}
        onMessage={handleMessage}
        scrollEnabled={false}
        bounces={false}
      />

      {/* Top Filter Bar */}
      <View style={{ position: 'absolute', top: insets.top + 10, left: 0, right: 0 }}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 10 }}
        >
          {FILTER_SPORTS.map(sport => {
            const isSelected = sport.value === selectedSport;
            return (
              <TouchableOpacity
                key={sport.value}
                onPress={() => setSelectedSport(sport.value)}
                className={`px-4 py-2 rounded-full flex-row items-center border ${
                  isSelected ? 'bg-emerald-500 border-emerald-500' : 'bg-white/95 border-zinc-200'
                }`}
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.15,
                  shadowRadius: 6,
                  elevation: 4,
                }}
              >
                <Text className={`font-bold ${isSelected ? 'text-white' : 'text-zinc-700'}`}>
                  {sport.emoji} {sport.label}
                </Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        backgroundStyle={{ backgroundColor: '#ffffff' }}
        handleIndicatorStyle={{ backgroundColor: '#e4e4e7' }}
      >
        <View className="flex-1 pt-2">
          {selectedActivity ? (
            <ActivityCard activity={selectedActivity} />
          ) : (
            <View className="flex-1 justify-center items-center px-4">
              <Text className="text-zinc-500 font-medium text-center">
                Tap any marker on the map to view the activity details here.
              </Text>
            </View>
          )}
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
