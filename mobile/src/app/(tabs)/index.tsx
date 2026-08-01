import React from 'react';
import { View, Text } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActivityCard } from '../../components/activity/ActivityCard';
import { mockActivities, Activity } from '../../data/mockActivities';

export default function Feed() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-zinc-50" style={{ paddingTop: insets.top }}>
      <View className="px-4 py-4 pb-2">
        <Text className="text-3xl font-extrabold text-zinc-900">Discover</Text>
        <Text className="text-zinc-500 mt-1 text-base">Find sports near you</Text>
      </View>
      <FlashList
        data={mockActivities}
        renderItem={({ item }) => <ActivityCard activity={item as Activity} />}
        // @ts-expect-error React 19 type incompatibility with FlashList
        estimatedItemSize={250}
        contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
      />
    </View>
  );
}
