import React from 'react';
import { View, Text } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActivityCard } from '../../components/activity/ActivityCard';
import { Activity } from '../../types/activity';
import { useActivities } from '../../hooks/queries/useActivities';
import { ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

export default function Feed() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { data: activities, isLoading, isError } = useActivities();

  return (
    <View className="flex-1 bg-zinc-50" style={{ paddingTop: insets.top }}>
      <View className="px-4 py-4 pb-2">
        <Text className="text-3xl font-extrabold text-zinc-900">Discover</Text>
        <Text className="text-zinc-500 mt-1 text-base">Find sports near you</Text>
      </View>
      
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#10b981" />
        </View>
      ) : isError ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-zinc-500">Failed to load activities.</Text>
        </View>
      ) : (
        <FlashList
          data={activities || []}
          renderItem={({ item }) => (
            <ActivityCard 
              activity={item as Activity} 
              onPress={() => router.push(`/activity/${(item as Activity)._id}` as any)} 
            />
          )}
          // @ts-expect-error React 19 type incompatibility with FlashList
          estimatedItemSize={250}
          contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
          ListEmptyComponent={
            <View className="items-center justify-center pt-20">
              <Text className="text-zinc-500 text-lg font-medium">No games found nearby.</Text>
            </View>
          }
        />
      )}
    </View>
  );
}
