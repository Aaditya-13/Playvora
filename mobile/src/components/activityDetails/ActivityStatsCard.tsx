import React from 'react';
import { View, Text } from 'react-native';
import { Activity } from '../../data/mockActivities';
import { Calendar, Clock, MapPin, IndianRupee } from 'lucide-react-native';
import { format } from 'date-fns';

export const ActivityStatsCard = ({ activity }: { activity: Activity }) => {
  const date = new Date(activity.scheduledAt);
  return (
    <View className="bg-white p-5 rounded-3xl border border-zinc-200 shadow-sm mb-6 flex-row flex-wrap">
      <View className="w-1/2 mb-5 flex-row items-center">
        <View className="w-12 h-12 rounded-full bg-blue-50 items-center justify-center mr-3">
          <Calendar size={22} color="#3b82f6" />
        </View>
        <View>
          <Text className="text-xs text-zinc-500 font-medium">Date</Text>
          <Text className="font-bold text-zinc-900 mt-0.5">{format(date, 'MMM d, yyyy')}</Text>
        </View>
      </View>
      
      <View className="w-1/2 mb-5 flex-row items-center">
        <View className="w-12 h-12 rounded-full bg-orange-50 items-center justify-center mr-3">
          <Clock size={22} color="#f97316" />
        </View>
        <View>
          <Text className="text-xs text-zinc-500 font-medium">Time</Text>
          <Text className="font-bold text-zinc-900 mt-0.5">{format(date, 'h:mm a')}</Text>
        </View>
      </View>
      
      <View className="w-1/2 flex-row items-center pr-2">
        <View className="w-12 h-12 rounded-full bg-emerald-50 items-center justify-center mr-3">
          <MapPin size={22} color="#10b981" />
        </View>
        <View className="flex-1">
          <Text className="text-xs text-zinc-500 font-medium">Venue</Text>
          <Text className="font-bold text-zinc-900 mt-0.5" numberOfLines={1}>{activity.groundName}</Text>
        </View>
      </View>
      
      <View className="w-1/2 flex-row items-center">
        <View className="w-12 h-12 rounded-full bg-purple-50 items-center justify-center mr-3">
          <IndianRupee size={22} color="#a855f7" />
        </View>
        <View>
          <Text className="text-xs text-zinc-500 font-medium">Cost</Text>
          <Text className="font-bold text-zinc-900 mt-0.5">{activity.cost.amount === 0 ? 'Free' : `₹${activity.cost.amount}`}</Text>
        </View>
      </View>
    </View>
  );
};
