import React from "react";
import { View, Text, Pressable } from "react-native";
import { Calendar, MapPin, Users, IndianRupee, ChevronRight } from "lucide-react-native";
import { format } from "date-fns";
import * as Haptics from "expo-haptics";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Activity } from "../../types/activity";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ActivityCardProps {
  activity: Activity;
  onPress?: () => void;
}

export function ActivityCard({ activity, onPress }: ActivityCardProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.get() }],
  }));

  const handlePressIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    scale.set(withSpring(0.97, { damping: 15, stiffness: 200 }));
  };

  const handlePressOut = () => {
    scale.set(withSpring(1, { damping: 15, stiffness: 200 }));
  };

  const isAlmostFull = activity.currentPlayers / activity.maxPlayers >= 0.8;

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => {
        Haptics.selectionAsync();
        onPress?.();
      }}
      style={animatedStyle}
      className="bg-white rounded-3xl p-5 shadow-sm border border-zinc-100 mb-4 mx-4"
    >
      <View className="flex-row justify-between items-start">
        <View className="flex-1 mr-4">
          <Text className="text-xl font-extrabold text-zinc-900 mb-2">
            {activity.title}
          </Text>
          <View className="flex-row flex-wrap gap-2">
            <View className="bg-emerald-500 px-3 py-1 rounded-full">
              <Text className="text-xs font-bold text-white">{activity.sport}</Text>
            </View>
            <View className="bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              <Text className="text-xs font-bold text-emerald-600">
                {activity.skillLevel}
              </Text>
            </View>
          </View>
        </View>

        <View className="items-end">
          {activity.cost.amount === 0 ? (
            <Text className="text-xl font-extrabold text-emerald-500">Free</Text>
          ) : (
            <View className="flex-row items-center">
              <IndianRupee size={18} color="#10b981" strokeWidth={2.5} />
              <Text className="text-xl font-extrabold text-emerald-500">
                {activity.cost.amount}
              </Text>
            </View>
          )}
          <Text className="text-xs text-zinc-500">{activity.cost.description}</Text>
        </View>
      </View>

      <View className="mt-5 space-y-3">
        <View className="flex-row items-center gap-2">
          <MapPin size={16} color="#10b981" />
          <Text className="text-sm font-medium text-zinc-600 flex-1 truncate">
            {activity.groundName}
          </Text>
        </View>

        <View className="flex-row items-center gap-2">
          <Calendar size={16} color="#10b981" />
          <Text className="text-sm font-medium text-zinc-600">
            {format(new Date(activity.scheduledAt), "EEE, MMM d • h:mm a")}
          </Text>
        </View>

        <View className="mt-2">
          <View className="flex-row justify-between items-center mb-1.5">
            <View className="flex-row items-center gap-1.5">
              <Users size={14} color="#10b981" />
              <Text className="text-xs font-bold text-zinc-600">Players</Text>
            </View>
            <Text className="text-xs text-zinc-500">
              {activity.currentPlayers} / {activity.maxPlayers}
            </Text>
          </View>
          <View className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
            <View
              className={`h-full rounded-full ${
                isAlmostFull ? "bg-orange-500" : "bg-emerald-500"
              }`}
              style={{
                width: `${Math.min(
                  (activity.currentPlayers / activity.maxPlayers) * 100,
                  100
                )}%`,
              }}
            />
          </View>
        </View>
      </View>

      <View className="mt-5 flex-row w-full items-center justify-center gap-2 rounded-2xl border border-zinc-100 bg-zinc-50 py-3.5">
        <Text className="font-bold text-zinc-700">View Details</Text>
        <ChevronRight size={18} color="#3f3f46" strokeWidth={2.5} />
      </View>
    </AnimatedPressable>
  );
}
