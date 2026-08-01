import React, { useRef, useMemo, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import BottomSheet from '@gorhom/bottom-sheet';
import { mockActivities, Activity } from '../../data/mockActivities';
import { ActivityCard } from '../../components/activity/ActivityCard';

export default function SearchScreen() {
  const mapRef = useRef<MapView>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['15%', '45%'], []);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const initialRegion = {
    latitude: 19.0760,
    longitude: 72.8777,
    latitudeDelta: 0.3,
    longitudeDelta: 0.3,
  };

  const handleMarkerPress = (activity: Activity) => {
    setSelectedActivity(activity);
    bottomSheetRef.current?.expand();
    
    mapRef.current?.animateToRegion({
      latitude: activity.location.coordinates[1] - 0.01, // offset to accommodate bottom sheet
      longitude: activity.location.coordinates[0],
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <MapView 
        ref={mapRef}
        style={styles.map} 
        initialRegion={initialRegion}
        provider={PROVIDER_DEFAULT}
      >
        {mockActivities.map(activity => (
          <Marker
            key={activity._id}
            coordinate={{
              latitude: activity.location.coordinates[1],
              longitude: activity.location.coordinates[0],
            }}
            onPress={() => handleMarkerPress(activity)}
            pinColor="#10b981"
          />
        ))}
      </MapView>

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
              <Text className="text-zinc-500 font-medium text-center">Tap any marker on the map to view the activity details here.</Text>
            </View>
          )}
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: '100%', height: '100%' },
});
