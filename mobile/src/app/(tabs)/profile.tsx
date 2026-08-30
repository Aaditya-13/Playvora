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
  const [activeTab, setActiveTab] = useState<'joined' | 'organized' | 'history'>('joined');

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
  const pastActivities = [...(data.data.pastJoined || []), ...(data.data.pastCreated || [])]
    .filter((v, i, a) => a.findIndex(t => t._id === v._id) === i)
    .sort((a, b) => new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime());

  const activeActivities = 
    activeTab === 'joined' ? joinedActivities : 
    activeTab === 'organized' ? organizedActivities : 
    pastActivities;

  return (
    <View className="flex-1 bg-zinc-50">
      {/* Header */}
      <View className="bg-zinc-50 px-4 flex-row justify-between items-center pb-4" style={{ paddingTop: insets.top + 16 }}>
        <Text className="text-zinc-900 text-3xl font-black">Profile</Text>
        <View className="flex-row gap-2">
          <TouchableOpacity 
            className="w-10 h-10 items-center justify-center rounded-full bg-white border border-zinc-200"
          >
            <Settings size={20} color="#3f3f46" />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => {
              logout();
              clearUser();
            }}
            disabled={isLoggingOut}
            className="w-10 h-10 items-center justify-center rounded-full bg-red-50 border border-red-100"
          >
            {isLoggingOut ? <ActivityIndicator size="small" color="#ef4444" /> : <LogOut size={18} color="#ef4444" />}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        {/* Profile Info */}
        <View className="px-5 mb-8 mt-2 items-center">
          <View className="w-28 h-28 rounded-full border-2 border-emerald-500 bg-white overflow-hidden mb-4 p-1">
            <View className="w-full h-full rounded-full overflow-hidden bg-zinc-100">
              <Image 
                source={{ uri: avatarUri }}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
            </View>
          </View>
          <Text className="text-2xl font-extrabold text-zinc-900 text-center mb-1">
            {profile.user.fullName || profile.user.username || "Guest User"}
          </Text>
          
          <View className="flex-row items-center bg-zinc-100 px-3 py-1.5 rounded-full">
            <MapPin size={12} color="#71717a" />
            <Text className="text-zinc-600 font-medium ml-1.5 text-xs">Mumbai, India</Text>
          </View>
        </View>

        {/* Consolidated Stats */}
        <View className="px-4 mb-8">
          <View className="bg-white rounded-3xl border border-zinc-200 flex-row overflow-hidden" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 }}>
            
            <View className="flex-1 py-4 items-center justify-center border-r border-zinc-100">
              <Text className="text-2xl font-black text-zinc-900 mb-0.5">{profile.stats.activitiesJoined}</Text>
              <Text className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide">Joined</Text>
            </View>

            <View className="flex-1 py-4 items-center justify-center border-r border-zinc-100">
              <Text className="text-2xl font-black text-zinc-900 mb-0.5">{profile.stats.activitiesCreated}</Text>
              <Text className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide">Organized</Text>
            </View>

            <View className="flex-1 py-4 items-center justify-center">
              <View className="flex-row items-center gap-1 mb-0.5">
                <Text className="text-2xl font-black text-zinc-900">{reliability}</Text>
                <Star size={14} color="#f59e0b" fill="#f59e0b" />
              </View>
              <Text className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide">Reliability</Text>
            </View>

          </View>
        </View>

        {/* Segmented Control */}
        <View className="px-4 mb-6">
          <View className="flex-row bg-zinc-200/80 p-1.5 rounded-full">
            <TouchableOpacity 
              onPress={() => setActiveTab('joined')}
              className={`flex-1 py-2.5 items-center rounded-full ${activeTab === 'joined' ? 'bg-white' : ''}`}
              style={activeTab === 'joined' ? { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 } : undefined}
            >
              <Text className={`font-bold text-xs ${activeTab === 'joined' ? 'text-zinc-900' : 'text-zinc-500'}`}>
                Upcoming
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={() => setActiveTab('organized')}
              className={`flex-1 py-2.5 items-center rounded-full ${activeTab === 'organized' ? 'bg-white' : ''}`}
              style={activeTab === 'organized' ? { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 } : undefined}
            >
              <Text className={`font-bold text-xs ${activeTab === 'organized' ? 'text-zinc-900' : 'text-zinc-500'}`}>
                Organized
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => setActiveTab('history')}
              className={`flex-1 py-2.5 items-center rounded-full ${activeTab === 'history' ? 'bg-white' : ''}`}
              style={activeTab === 'history' ? { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 } : undefined}
            >
              <Text className={`font-bold text-xs ${activeTab === 'history' ? 'text-zinc-900' : 'text-zinc-500'}`}>
                History
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Activities List */}
        <View className="px-0">
          {activeActivities.length === 0 ? (
            <View className="items-center justify-center py-12 px-6 mx-4 border border-dashed border-zinc-300 rounded-3xl bg-zinc-100/50">
              <View className="w-16 h-16 bg-zinc-200 rounded-full items-center justify-center mb-4">
                <ActivityIcon size={32} color="#a1a1aa" />
              </View>
              <Text className="text-zinc-800 font-extrabold text-center text-lg mb-1.5">
                {activeTab === 'history' ? 'No past games' : `No ${activeTab} games`}
              </Text>
              <Text className="text-zinc-500 text-center text-sm font-medium leading-5">
                {activeTab === 'joined' 
                  ? "You haven't joined any games yet. Head to the Discover feed to find your next match!" 
                  : activeTab === 'organized' 
                    ? "You haven't organized any games. Tap Create to host your own match and invite players."
                    : "You don't have any past games in your history yet."}
              </Text>
            </View>
          ) : (
            activeActivities.map(activity => (
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
