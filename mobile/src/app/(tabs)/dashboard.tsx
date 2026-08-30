import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Bell, Calendar, Zap, CheckCircle2 } from 'lucide-react-native';

import { ActivityCard } from '../../components/activity/ActivityCard';
import { ActivityCardSkeleton } from '../../components/activity/ActivityCardSkeleton';
import { Skeleton } from '../../components/ui/Skeleton';
import { useDashboard } from '../../hooks/queries/useDashboard';

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { data, isLoading, isError, refetch, isRefetching } = useDashboard();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  if (isLoading && !data) {
    return (
      <View className="flex-1 bg-zinc-50">
        <View className="bg-zinc-50 px-5 pb-4" style={{ paddingTop: insets.top + 16 }}>
          <Text className="text-zinc-900 text-3xl font-black mb-1">Action Center</Text>
          <Text className="text-zinc-500 text-sm font-medium">Your hub for immediate attention</Text>
        </View>
        <View className="flex-1 px-1 mt-2">
          <View className="px-4 mb-6">
            <View className="bg-zinc-100 p-5 rounded-3xl h-24 justify-center">
              <View className="flex-row items-center gap-4">
                <Skeleton width={48} height={48} borderRadius={24} />
                <View>
                  <Skeleton width={150} height={20} className="mb-2" />
                  <Skeleton width={220} height={14} />
                </View>
              </View>
            </View>
          </View>
          <View className="px-4 mb-4">
            <Skeleton width={140} height={24} />
          </View>
          <ActivityCardSkeleton />
          <ActivityCardSkeleton />
        </View>
      </View>
    );
  }

  if (isError || !data?.data) {
    return (
      <View className="flex-1 bg-zinc-50 items-center justify-center p-6">
        <Text className="text-xl font-bold mb-4 text-zinc-800">Error loading dashboard</Text>
        <TouchableOpacity onPress={() => refetch()} className="bg-emerald-500 px-6 py-3 rounded-full">
          <Text className="text-white font-bold">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const { actionableRequests, upcomingCreated, upcomingJoined } = data.data;

  // Merge, deduplicate, and sort all upcoming activities by date
  const allUpcoming = [...upcomingCreated, ...upcomingJoined]
    .filter((v, i, a) => a.findIndex(t => t._id === v._id) === i)
    .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())
    .slice(0, 5); // Take top 5 soonest games

  return (
    <View className="flex-1 bg-zinc-50">
      {/* Header */}
      <View className="bg-zinc-50 px-5 pb-4" style={{ paddingTop: insets.top + 16 }}>
        <Text className="text-zinc-900 text-3xl font-black mb-1">Action Center</Text>
        <Text className="text-zinc-500 text-sm font-medium">Your hub for immediate attention</Text>
      </View>

      <ScrollView 
        className="flex-1" 
        contentContainerStyle={{ paddingBottom: 100 }} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#10b981" />
        }
      >
        
        <View className="px-5 mt-2 mb-6">
          {actionableRequests > 0 ? (
            <TouchableOpacity 
              onPress={() => router.push('/(tabs)/profile')}
              className="bg-orange-50 p-5 rounded-3xl border border-orange-200 flex-row items-center justify-between"
              style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 }}
            >
              <View className="flex-row items-center gap-4 flex-1">
                <View className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-sm">
                  <Bell size={24} color="#f97316" />
                </View>
                <View className="flex-1">
                  <Text className="text-orange-950 font-bold text-lg mb-0.5">
                    {actionableRequests} Pending {actionableRequests === 1 ? 'Request' : 'Requests'}
                  </Text>
                  <Text className="text-orange-700/80 text-sm font-medium">
                    Players are waiting for your approval to join your games.
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ) : (
            <View className="bg-emerald-50 p-5 rounded-3xl border border-emerald-100 flex-row items-center gap-4">
               <View className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-sm">
                  <CheckCircle2 size={24} color="#10b981" />
                </View>
                <View className="flex-1">
                  <Text className="text-emerald-950 font-bold text-lg mb-0.5">All caught up!</Text>
                  <Text className="text-emerald-700/80 text-sm font-medium">No pending requests to approve.</Text>
                </View>
            </View>
          )}
        </View>

        <View className="px-5 mb-4 flex-row items-center gap-2">
          <Zap size={20} color="#3f3f46" fill="#3f3f46" />
          <Text className="text-xl font-bold text-zinc-900">Happening Soon</Text>
        </View>

        <View className="px-1">
          {allUpcoming.length === 0 ? (
            <View className="items-center justify-center py-10 px-5 mx-4 border-2 border-dashed border-zinc-200 rounded-3xl">
              <Calendar size={32} color="#a1a1aa" className="mb-3" />
              <Text className="text-zinc-600 font-bold text-center text-lg mb-1">
                No upcoming games
              </Text>
              <Text className="text-zinc-400 text-center text-sm">
                You don't have any games coming up soon. 
              </Text>
            </View>
          ) : (
            allUpcoming.map(activity => (
              <ActivityCard 
                key={activity._id} 
                activity={activity} 
                onPress={() => router.push(`/activity/${activity._id}` as any)} 
              />
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}
