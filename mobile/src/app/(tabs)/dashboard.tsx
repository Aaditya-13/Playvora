import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { ActivityCard } from '../../components/activity/ActivityCard';
import { Activity } from '../../data/mockActivities';
import { useDashboard } from '../../hooks/queries/useDashboard';

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { data, isLoading, isError, refetch } = useDashboard();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  if (isLoading) {
    return (
      <View className="flex-1 bg-zinc-50 items-center justify-center">
        <ActivityIndicator size="large" color="#10b981" />
      </View>
    );
  }

  if (isError || !data?.data) {
    return (
      <View className="flex-1 bg-zinc-50 items-center justify-center p-6">
        <Text className="text-xl font-bold mb-4">Error loading dashboard</Text>
        <TouchableOpacity onPress={() => refetch()} className="bg-emerald-500 px-6 py-3 rounded-full">
          <Text className="text-white font-bold">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const activities = activeTab === 'upcoming' ? data.data.upcoming : data.data.past;

  return (
    <View className="flex-1 bg-zinc-50" style={{ paddingTop: insets.top }}>
      <View className="px-4 py-4">
        <Text className="text-3xl font-extrabold text-zinc-900">My Games</Text>
        <Text className="text-zinc-500 mt-1 text-base">Track your upcoming and past activities</Text>
      </View>

      {/* Tabs */}
      <View className="flex-row px-4 mb-4">
        <TouchableOpacity 
          onPress={() => setActiveTab('upcoming')}
          className={`flex-1 items-center py-3 border-b-2 ${activeTab === 'upcoming' ? 'border-emerald-500' : 'border-zinc-200'}`}
        >
          <Text className={`font-bold ${activeTab === 'upcoming' ? 'text-emerald-500' : 'text-zinc-500'}`}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => setActiveTab('past')}
          className={`flex-1 items-center py-3 border-b-2 ${activeTab === 'past' ? 'border-emerald-500' : 'border-zinc-200'}`}
        >
          <Text className={`font-bold ${activeTab === 'past' ? 'text-emerald-500' : 'text-zinc-500'}`}>Past</Text>
        </TouchableOpacity>
      </View>

      <FlashList
        data={activities}
        renderItem={({ item }) => (
          <ActivityCard 
            activity={item as Activity} 
            onPress={() => router.push(`/activity/${(item as Activity)._id}` as any)} 
          />
        )}
        // @ts-expect-error FlashList React 19 typing
        estimatedItemSize={250}
        contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
        ListEmptyComponent={
          <View className="items-center justify-center pt-20">
            <Text className="text-zinc-500 text-lg font-medium">No {activeTab} games found.</Text>
          </View>
        }
      />
    </View>
  );
}
