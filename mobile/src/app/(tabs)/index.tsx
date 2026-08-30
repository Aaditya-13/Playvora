import React, { useState, useCallback } from 'react';
import { View, Text, ActivityIndicator, Pressable, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActivityCard } from '../../components/activity/ActivityCard';
import { ActivityCardSkeleton } from '../../components/activity/ActivityCardSkeleton';
import { Activity } from '../../types/activity';
import { useActivities } from '../../hooks/queries/useActivities';
import { useRouter } from 'expo-router';
import { useFilterStore } from '../../store/filterStore';

export default function Feed() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { page, setPage, selectedSport, setSelectedSport } = useFilterStore();
  const { data: activities, isLoading, isError, isFetching, refetch } = useActivities();
  const hasMore = (activities || []).length === 10;
  
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setPage(1);
    await refetch();
    setRefreshing(false);
  }, [refetch, setPage]);

  return (
    <View className="flex-1 bg-zinc-50" style={{ paddingTop: insets.top }}>
      <View className="px-4 py-4 pb-2">
        <Text className="text-3xl font-extrabold text-zinc-900">Discover</Text>
        <Text className="text-zinc-500 mt-1 text-base">Find sports near you</Text>
      </View>
      
      <View>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 12, paddingTop: 4, gap: 8 }}
        >
          {['All', 'football', 'basketball', 'tennis', 'cricket', 'badminton', 'volleyball'].map((sport) => (
            <Pressable
              key={sport}
              onPress={() => setSelectedSport(sport)}
              className={`px-5 py-2.5 rounded-full border ${
                selectedSport === sport 
                  ? 'bg-zinc-900 border-zinc-900' 
                  : 'bg-white border-zinc-200'
              }`}
              style={
                selectedSport !== sport
                  ? { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 }
                  : undefined
              }
            >
              <Text 
                className={`font-bold capitalize ${
                  selectedSport === sport ? 'text-white' : 'text-zinc-600'
                }`}
              >
                {sport}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      
      {isLoading && !activities ? (
        <View className="flex-1 px-1">
          <ActivityCardSkeleton />
          <ActivityCardSkeleton />
          <ActivityCardSkeleton />
        </View>
      ) : isError ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-zinc-500 font-medium">Failed to load activities.</Text>
          <TouchableOpacity onPress={() => refetch()} className="mt-4 bg-emerald-500 px-6 py-3 rounded-full">
            <Text className="text-white font-bold">Retry</Text>
          </TouchableOpacity>
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
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#10b981" />}
          ListEmptyComponent={
            <View className="items-center justify-center pt-20">
              <Text className="text-zinc-500 text-lg font-medium">No games found nearby.</Text>
            </View>
          }
          ListFooterComponent={
            <View className="flex-row justify-between items-center py-6 px-4">
              <TouchableOpacity 
                disabled={page === 1 || isFetching}
                onPress={() => setPage(page - 1)}
                className={`px-6 py-3 rounded-xl ${page === 1 ? 'bg-zinc-200' : 'bg-emerald-500'}`}
              >
                <Text className={`font-bold ${page === 1 ? 'text-zinc-400' : 'text-white'}`}>Prev</Text>
              </TouchableOpacity>
              
              <Text className="text-zinc-600 font-medium">Page {page}</Text>
              
              <TouchableOpacity 
                disabled={!hasMore || isFetching}
                onPress={() => setPage(page + 1)}
                className={`px-6 py-3 rounded-xl ${!hasMore ? 'bg-zinc-200' : 'bg-emerald-500'}`}
              >
                <Text className={`font-bold ${!hasMore ? 'text-zinc-400' : 'text-white'}`}>Next</Text>
              </TouchableOpacity>
            </View>
          }
        />
      )}
    </View>
  );
}
