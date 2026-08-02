import React from 'react';
import { View, Text } from 'react-native';
import { Activity } from '../../data/mockActivities';
import { Image } from 'expo-image';

export const ActivityHero = ({ activity }: { activity: Activity }) => (
  <View className="mb-6">
    <View className="h-56 bg-zinc-200 rounded-3xl overflow-hidden mb-5 relative">
      <Image 
        source={{ uri: `https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=600&auto=format&fit=crop` }}
        style={{ flex: 1 }}
        contentFit="cover"
      />
      <View className="absolute bottom-4 left-4 bg-white/90 px-4 py-1.5 rounded-full">
        <Text className="font-bold text-zinc-900">{activity.sport}</Text>
      </View>
    </View>
    <Text className="text-3xl font-black text-zinc-900 tracking-tight">{activity.title}</Text>
    {/* Mock description since it's not in our mock data interface yet */}
    <Text className="text-base text-zinc-600 mt-3 leading-relaxed">
      Join this exciting activity and have fun with other players in your local community! All skill levels are welcome.
    </Text>
  </View>
);
