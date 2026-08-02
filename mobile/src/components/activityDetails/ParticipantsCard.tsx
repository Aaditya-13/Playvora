import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Activity } from '../../types/activity';
import { Image } from 'expo-image';
import { ChevronRight } from 'lucide-react-native';

export const ParticipantsCard = ({ activity }: { activity: Activity }) => (
  <View className="bg-white p-5 rounded-3xl border border-zinc-200 shadow-sm mb-6">
    <View className="flex-row items-center justify-between mb-4">
      <Text className="text-lg font-bold text-zinc-900">Players ({activity.currentPlayers}/{activity.maxPlayers})</Text>
      <TouchableOpacity className="flex-row items-center">
        <Text className="text-blue-500 font-medium mr-1">See All</Text>
        <ChevronRight size={16} color="#3b82f6" />
      </TouchableOpacity>
    </View>
    
    <View className="flex-row items-center flex-wrap gap-2">
      {[...Array(Math.min(activity.currentPlayers, 5))].map((_, i) => (
        <View key={i} className="w-12 h-12 rounded-full overflow-hidden border-2 border-white bg-zinc-200 shadow-sm">
          <Image 
            source={{ uri: `https://i.pravatar.cc/100?img=${i + 10}` }}
            style={{ width: '100%', height: '100%' }}
          />
        </View>
      ))}
      {activity.currentPlayers > 5 && (
        <View className="w-12 h-12 rounded-full border-2 border-white bg-zinc-100 items-center justify-center shadow-sm">
          <Text className="font-bold text-zinc-600">+{activity.currentPlayers - 5}</Text>
        </View>
      )}
    </View>
  </View>
);
