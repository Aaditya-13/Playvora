import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Settings, MapPin, Trophy, Activity as ActivityIcon, Star, LogOut, Info } from 'lucide-react-native';
import { useProfile } from '../../hooks/queries/useProfile';
import { useLogout } from '../../hooks/queries/useAuth';
import { useAuthStore } from '../../store/authStore';
import { ActivityCard } from '../../components/activity/ActivityCard';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { data, isLoading, isError, refetch } = useProfile();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();
  const clearUser = useAuthStore(s => s.clearUser);
  const [activeTab, setActiveTab] = useState<'joined' | 'organized'>('joined');

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
  
  // Guard against "null" or "undefined" strings that crash React Native's RCTImageView
  const isValidAvatar = profile.user?.avatar && 
    typeof profile.user.avatar === 'string' && 
    profile.user.avatar !== 'null' && 
    profile.user.avatar !== 'undefined' &&
    profile.user.avatar.trim() !== '';
    
  const avatarUri = isValidAvatar ? profile.user.avatar : "https://i.pravatar.cc/300";
  const reliability = profile.stats.reliabilityScore ? profile.stats.reliabilityScore.toFixed(1) : "5.0";
  
  const joinedActivities = profile.upcomingJoined || [];
  const organizedActivities = profile.upcomingCreated || [];
  const activeActivities = activeTab === 'joined' ? joinedActivities : organizedActivities;

  return (
    <View className="flex-1 bg-zinc-50">
      {/* Header */}
      <View className="bg-emerald-500 px-5 flex-row justify-between items-center pb-12" style={{ paddingTop: insets.top + 10 }}>
        <Text className="text-white text-3xl font-black">Profile</Text>
        <View className="flex-row gap-2">
          <TouchableOpacity 
            className="w-10 h-10 items-center justify-center rounded-full bg-white/20"
          >
            <Settings size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => {
              logout();
              clearUser();
            }}
            disabled={isLoggingOut}
            className="w-10 h-10 items-center justify-center rounded-full bg-red-500/80"
          >
            {isLoggingOut ? <ActivityIndicator size="small" color="white" /> : <LogOut size={18} color="white" />}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        {/* Profile Info */}
        <View className="px-5 relative -mt-10 mb-6 items-center">
          <View className="w-28 h-28 rounded-full border-4 border-zinc-50 bg-white overflow-hidden shadow-sm mb-3">
            <Image 
              source={{ uri: avatarUri }}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
          </View>
          <Text className="text-2xl font-extrabold text-zinc-900 text-center">
            {profile.user.fullName || profile.user.username || "Guest User"}
          </Text>
          
          <View className="flex-row items-center mt-1.5 mb-4 bg-zinc-100 px-3 py-1 rounded-full">
            <MapPin size={14} color="#71717a" />
            <Text className="text-zinc-600 font-medium ml-1.5 text-xs">Mumbai, India</Text>
          </View>
        </View>

        {/* Stats */}
        <View className="px-5 mb-8 flex-row justify-between gap-3">
          <View className="bg-white p-4 rounded-3xl border border-zinc-200 shadow-sm flex-1 items-center">
            <View className="w-10 h-10 bg-blue-50 rounded-full items-center justify-center mb-2">
              <ActivityIcon size={20} color="#3b82f6" />
            </View>
            <Text className="text-xl font-black text-zinc-900">{profile.stats.activitiesJoined}</Text>
            <Text className="text-[10px] text-zinc-500 font-bold mt-1 uppercase">Joined</Text>
          </View>

          <View className="bg-white p-4 rounded-3xl border border-zinc-200 shadow-sm flex-1 items-center">
            <View className="w-10 h-10 bg-emerald-50 rounded-full items-center justify-center mb-2">
              <Trophy size={20} color="#10b981" />
            </View>
            <Text className="text-xl font-black text-zinc-900">{profile.stats.activitiesCreated}</Text>
            <Text className="text-[10px] text-zinc-500 font-bold mt-1 uppercase">Organized</Text>
          </View>

          <View className="bg-white p-4 rounded-3xl border border-zinc-200 shadow-sm flex-1 items-center">
            <View className="w-10 h-10 bg-orange-50 rounded-full items-center justify-center mb-2">
              <Star size={20} color="#f97316" />
            </View>
            <Text className="text-xl font-black text-zinc-900">{reliability}</Text>
            <Text className="text-[10px] text-zinc-500 font-bold mt-1 uppercase">Reliability</Text>
          </View>
        </View>

        {/* Segmented Control */}
        <View className="px-5 mb-6">
          <View className="flex-row bg-zinc-200/60 p-1 rounded-2xl">
            <TouchableOpacity 
              onPress={() => setActiveTab('joined')}
              className={`flex-1 py-3 items-center rounded-xl ${activeTab === 'joined' ? 'bg-white' : ''}`}
              style={activeTab === 'joined' ? { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 } : undefined}
            >
              <Text className={`font-bold ${activeTab === 'joined' ? 'text-zinc-900' : 'text-zinc-500'}`}>
                Upcoming Games ({joinedActivities.length})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setActiveTab('organized')}
              className={`flex-1 py-3 items-center rounded-xl ${activeTab === 'organized' ? 'bg-white' : ''}`}
              style={activeTab === 'organized' ? { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 } : undefined}
            >
              <Text className={`font-bold ${activeTab === 'organized' ? 'text-zinc-900' : 'text-zinc-500'}`}>
                Organized ({organizedActivities.length})
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Activities List */}
        <View className="px-1">
          {activeActivities.length === 0 ? (
            <View className="items-center justify-center py-10 px-5 mx-4 border-2 border-dashed border-zinc-200 rounded-3xl">
              <Info size={32} color="#a1a1aa" className="mb-3" />
              <Text className="text-zinc-600 font-bold text-center text-lg mb-1">
                No {activeTab === 'joined' ? 'upcoming' : 'organized'} games
              </Text>
              <Text className="text-zinc-400 text-center text-sm">
                {activeTab === 'joined' 
                  ? "You haven't joined any upcoming games yet. Head to the feed to find one!" 
                  : "You haven't organized any upcoming games yet. Hit Create to host one!"}
              </Text>
            </View>
          ) : (
            activeActivities.map(activity => (
              <ActivityCard 
                key={activity._id} 
                activity={activity} 
                onPress={() => router.push(`/activity/${activity._id}`)} 
              />
            ))
          )}
        </View>

      </ScrollView>
    </View>
  );
}
