import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Settings, MapPin, Trophy, Activity, Star } from 'lucide-react-native';
import { Image } from 'expo-image';
import { useProfile } from '../../hooks/queries/useProfile';
import { useAuthStore } from '../../store/authStore';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { data, isLoading, isError, refetch } = useProfile();
  const clearUser = useAuthStore(s => s.clearUser);

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
        <Text className="text-xl font-bold mb-4">Error loading profile</Text>
        <TouchableOpacity onPress={() => refetch()} className="bg-emerald-500 px-6 py-3 rounded-full">
          <Text className="text-white font-bold">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const profile = data.data;

  return (
    <ScrollView className="flex-1 bg-zinc-50" contentContainerStyle={{ paddingBottom: 120 }}>
      {/* Cover Photo & Header */}
      <View className="bg-emerald-500 h-44 px-5 flex-row justify-between items-start" style={{ paddingTop: insets.top + 10 }}>
        <Text className="text-white text-3xl font-black">Profile</Text>
        <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full bg-white/20">
          <Settings size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Profile Info */}
      <View className="px-5 relative -mt-12 mb-8">
        <View className="w-28 h-28 rounded-full border-4 border-zinc-50 bg-white overflow-hidden shadow-sm mb-4">
          <Image 
            source={{ uri: profile.avatarUrl }}
            style={{ flex: 1 }}
          />
        </View>
        <Text className="text-2xl font-extrabold text-zinc-900">{profile.name}</Text>
        
        <View className="flex-row items-center mt-1 mb-4">
          <MapPin size={16} color="#71717a" />
          <Text className="text-zinc-500 font-medium ml-1.5">{profile.location}</Text>
        </View>

        <Text className="text-zinc-700 leading-relaxed text-base">{profile.bio}</Text>
      </View>

      {/* Stats */}
      <View className="px-5 mb-8 flex-row justify-between">
        <View className="bg-white p-4 rounded-3xl border border-zinc-200 shadow-sm flex-1 mr-2 items-center">
          <View className="w-12 h-12 bg-blue-50 rounded-full items-center justify-center mb-3">
            <Activity size={24} color="#3b82f6" />
          </View>
          <Text className="text-2xl font-black text-zinc-900">{profile.stats.gamesPlayed}</Text>
          <Text className="text-xs text-zinc-500 font-bold mt-0.5">Games Played</Text>
        </View>

        <View className="bg-white p-4 rounded-3xl border border-zinc-200 shadow-sm flex-1 mx-2 items-center">
          <View className="w-12 h-12 bg-emerald-50 rounded-full items-center justify-center mb-3">
            <Trophy size={24} color="#10b981" />
          </View>
          <Text className="text-2xl font-black text-zinc-900">{profile.stats.organized}</Text>
          <Text className="text-xs text-zinc-500 font-bold mt-0.5">Organized</Text>
        </View>

        <View className="bg-white p-4 rounded-3xl border border-zinc-200 shadow-sm flex-1 ml-2 items-center">
          <View className="w-12 h-12 bg-orange-50 rounded-full items-center justify-center mb-3">
            <Star size={24} color="#f97316" />
          </View>
          <Text className="text-2xl font-black text-zinc-900">{profile.stats.rating}</Text>
          <Text className="text-xs text-zinc-500 font-bold mt-0.5">Avg Rating</Text>
        </View>
      </View>

      <View className="px-5 mt-4">
        <TouchableOpacity 
          onPress={() => clearUser()}
          className="bg-red-50 py-4 rounded-2xl items-center border border-red-100 shadow-sm"
        >
          <Text className="text-red-600 font-bold text-base">Sign Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
