import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, Share } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useActivityDetails } from '../../hooks/queries/useActivityDetails';
import { useJoinActivity, useLeaveActivity, useCancelActivity } from '../../hooks/queries/useActivityActions';
import { useSentRequests } from '../../hooks/queries/useJoinRequests';
import { useAuthStore } from '../../store/authStore';
import { ActivityHero } from '../../components/activityDetails/ActivityHero';
import { ActivityStatsCard } from '../../components/activityDetails/ActivityStatsCard';
import { ActivityMapCard } from '../../components/activityDetails/ActivityMapCard';
import { GameDetailsCard } from '../../components/activityDetails/GameDetailsCard';
import { ParticipantsCard } from '../../components/activityDetails/ParticipantsCard';
import { NotesCard } from '../../components/activityDetails/NotesCard';

export default function ActivityDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const { data, isLoading, isError, refetch } = useActivityDetails(id as string);
  const { data: sentRequests } = useSentRequests();
  
  const { mutate: join, isPending: isJoining } = useJoinActivity();
  const { mutate: leave, isPending: isLeaving } = useLeaveActivity();
  const { mutate: cancel, isPending: isCancelling } = useCancelActivity();
  const user = useAuthStore(s => s.user);

  if (isLoading) {
    return (
      <View className="flex-1 bg-zinc-50 items-center justify-center">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="mt-4 text-zinc-500 font-medium">Loading activity...</Text>
      </View>
    );
  }

  if (isError || !data?.data) {
    return (
      <View className="flex-1 bg-zinc-50 items-center justify-center p-6">
        <Text className="text-2xl font-black text-zinc-900 mb-2">Oops!</Text>
        <Text className="text-zinc-500 text-center mb-8 leading-relaxed">We couldn&apos;t load this activity. It may have been deleted or the network failed.</Text>
        <TouchableOpacity 
          onPress={() => refetch()}
          className="bg-zinc-900 px-8 py-3.5 rounded-2xl w-full items-center mb-3"
        >
          <Text className="text-white font-bold text-base">Try Again</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => router.back()}
          className="px-8 py-3.5 w-full items-center"
        >
          <Text className="text-zinc-600 font-bold text-base">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const activity = data.data;
  const userId = (user as any)?._id || user?.id;
  const isOrganizer = userId === activity.organizer._id;
  const isParticipant = activity.participants.some((p: any) => p._id === userId);
  const isFull = activity.currentPlayers >= activity.maxPlayers;
  const isCancelled = activity.status === 'cancelled';
  const isCompleted = activity.status === 'completed';
  const hasPendingRequest = sentRequests?.some((req: any) => req.activity._id === id);

  return (
    <View className="flex-1 bg-zinc-50">
      <View 
        className="flex-row items-center justify-between px-4 pb-4 bg-zinc-50/90" 
        style={{ paddingTop: insets.top + 10 }}
      >
        <TouchableOpacity 
          onPress={() => router.back()}
          className="w-11 h-11 items-center justify-center rounded-full bg-white border border-zinc-200 shadow-sm"
        >
          <ChevronLeft size={24} color="#18181b" />
        </TouchableOpacity>
        <TouchableOpacity 
          className="w-11 h-11 items-center justify-center rounded-full bg-white border border-zinc-200 shadow-sm"
        >
          <Share size={20} color="#18181b" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <ActivityHero activity={activity} />
        <ActivityStatsCard activity={activity} />
        <ActivityMapCard activity={activity} />
        <GameDetailsCard activity={activity} />
        <ParticipantsCard activity={activity} />
        <NotesCard activity={activity} />
      </ScrollView>

      {/* Sticky Bottom Action Bar */}
      <View 
        className="absolute bottom-0 left-0 right-0 bg-white border-t border-zinc-100 px-4 pt-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]"
        style={{ paddingBottom: Math.max(insets.bottom, 20) }}
      >
        {isOrganizer ? (
          <View className="flex-row gap-3">
            {!isCancelled && !isCompleted && (
              <TouchableOpacity 
                onPress={() => cancel(id as string)}
                disabled={isCancelling}
                className="flex-1 py-4 rounded-2xl items-center bg-red-100 border border-red-200"
              >
                {isCancelling ? (
                  <ActivityIndicator color="#ef4444" />
                ) : (
                  <Text className="text-red-600 font-bold text-lg">Cancel</Text>
                )}
              </TouchableOpacity>
            )}
            <TouchableOpacity 
              onPress={() => router.push(`/activity/${id}/manage` as any)}
              className="flex-1 py-4 rounded-2xl items-center bg-emerald-500"
            >
              <Text className="text-white font-bold text-lg">Manage</Text>
            </TouchableOpacity>
          </View>
        ) : isParticipant ? (
          <TouchableOpacity 
            onPress={() => leave(id as string)}
            disabled={isLeaving}
            className={`py-4 rounded-2xl items-center ${isLeaving ? 'bg-zinc-400' : 'bg-zinc-900'}`}
          >
            {isLeaving ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-bold text-lg">Joined (Leave Game)</Text>
            )}
          </TouchableOpacity>
        ) : isCancelled || isCompleted ? (
          <View className="py-4 rounded-2xl items-center bg-zinc-200">
            <Text className="text-zinc-500 font-bold text-lg uppercase">{activity.status}</Text>
          </View>
        ) : hasPendingRequest ? (
          <View className="py-4 rounded-2xl items-center bg-amber-100 border border-amber-200">
            <Text className="text-amber-700 font-bold text-lg">Request Pending</Text>
          </View>
        ) : (
          <TouchableOpacity 
            onPress={() => join(id as string)}
            disabled={isJoining || isFull}
            className={`py-4 rounded-2xl items-center ${
              isJoining || isFull ? 'bg-zinc-400' : 'bg-emerald-500'
            }`}
          >
            {isJoining ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-bold text-lg">{isFull ? "Game Full" : activity.joinPolicy === 'approval' ? "Request to Join" : "Join Game"}</Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
