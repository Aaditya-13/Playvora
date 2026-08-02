import React from 'react';
import { View, Text } from 'react-native';
import { Activity } from '../../data/mockActivities';
import { Target, Users, Shield } from 'lucide-react-native';

export const GameDetailsCard = ({ activity }: { activity: Activity }) => (
  <View className="bg-white p-5 rounded-3xl border border-zinc-200 shadow-sm mb-6">
    <Text className="text-lg font-bold text-zinc-900 mb-5">Game Details</Text>
    
    <View className="flex-row items-center justify-between py-3 border-b border-zinc-100">
      <View className="flex-row items-center">
        <Target size={20} color="#52525b" />
        <Text className="text-zinc-600 ml-3 font-medium">Skill Level</Text>
      </View>
      <Text className="font-bold text-zinc-900">{activity.skillLevel}</Text>
    </View>

    <View className="flex-row items-center justify-between py-3 border-b border-zinc-100">
      <View className="flex-row items-center">
        <Users size={20} color="#52525b" />
        <Text className="text-zinc-600 ml-3 font-medium">Spots Remaining</Text>
      </View>
      <Text className="font-bold text-zinc-900">{activity.maxPlayers - activity.currentPlayers} / {activity.maxPlayers}</Text>
    </View>

    <View className="flex-row items-center justify-between py-3">
      <View className="flex-row items-center">
        <Shield size={20} color="#52525b" />
        <Text className="text-zinc-600 ml-3 font-medium">Join Policy</Text>
      </View>
      <Text className="font-bold text-zinc-900">Instant Join</Text>
    </View>
  </View>
);
