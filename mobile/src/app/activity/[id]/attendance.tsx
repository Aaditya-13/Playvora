import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';

import { useActivityDetails } from '../../../hooks/queries/useActivityDetails';
import { useGetAttendance, useMarkAttendance } from '../../../hooks/queries/useAttendance';

export default function AttendanceScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { data: activityData, isLoading: isLoadingActivity } = useActivityDetails(id);
  const { data: attendanceData, isLoading: isLoadingAttendance } = useGetAttendance(id);
  const { mutate: markAttendance, isPending } = useMarkAttendance();

  const [attendanceState, setAttendanceState] = useState<Record<string, 'present' | 'late' | 'absent'>>({});

  useEffect(() => {
    if (activityData?.data?.participants) {
      const initialState: Record<string, 'present' | 'late' | 'absent'> = {};
      
      // Default everyone to present
      activityData.data.participants.forEach((p: any) => {
        initialState[p._id] = 'present';
      });

      // Override with existing attendance if available
      if (attendanceData && Array.isArray(attendanceData)) {
        attendanceData.forEach((record: any) => {
          if (record.user?._id) {
            initialState[record.user._id] = record.status;
          }
        });
      }

      setAttendanceState(initialState);
    }
  }, [activityData, attendanceData]);

  const handleSave = () => {
    const payload = Object.keys(attendanceState).map((participantId) => ({
      participantId,
      status: attendanceState[participantId]
    }));

    markAttendance({ activityId: id, attendanceData: { attendance: payload } });
  };

  if (isLoadingActivity || isLoadingAttendance) {
    return (
      <View className="flex-1 bg-zinc-50 items-center justify-center">
        <ActivityIndicator size="large" color="#10b981" />
      </View>
    );
  }

  const activity = activityData?.data;
  const participants = activity?.participants || [];

  return (
    <View className="flex-1 bg-zinc-50">
      <View 
        className="flex-row items-center justify-between px-4 pb-4 bg-zinc-50/90 border-b border-zinc-200" 
        style={{ paddingTop: insets.top + 10 }}
      >
        <TouchableOpacity 
          onPress={() => router.back()}
          className="w-11 h-11 items-center justify-center rounded-full bg-white border border-zinc-200 shadow-sm mr-3"
        >
          <ChevronLeft size={24} color="#18181b" />
        </TouchableOpacity>
        <View className="flex-1 mr-4">
          <Text className="text-xl font-bold text-zinc-900">Attendance</Text>
          <Text className="text-zinc-500 text-sm truncate">{activity?.title}</Text>
        </View>
      </View>

      <ScrollView className="flex-1 p-4" contentContainerStyle={{ paddingBottom: 120 }}>
        {participants.map((participant: any) => {
          const status = attendanceState[participant._id] || 'present';

          return (
            <View key={participant._id} className="bg-white p-4 rounded-3xl border border-zinc-200 shadow-sm mb-4">
              <View className="flex-row items-center mb-4">
                <Image 
                  source={{ uri: participant.avatar || 'https://i.pravatar.cc/150' }} 
                  className="w-12 h-12 rounded-full bg-zinc-100"
                />
                <View className="ml-3">
                  <Text className="text-base font-bold text-zinc-900">{participant.fullName || participant.username}</Text>
                  {participant._id === activity?.organizer?._id && (
                    <Text className="text-xs font-bold text-emerald-600">Organizer</Text>
                  )}
                </View>
              </View>

              <View className="flex-row rounded-xl overflow-hidden border border-zinc-200">
                {(['present', 'late', 'absent'] as const).map((s) => {
                  const isSelected = status === s;
                  
                  let activeColor = 'bg-emerald-500';
                  if (s === 'late') activeColor = 'bg-amber-500';
                  if (s === 'absent') activeColor = 'bg-red-500';

                  return (
                    <TouchableOpacity
                      key={s}
                      onPress={() => setAttendanceState(prev => ({ ...prev, [participant._id]: s }))}
                      className={`flex-1 py-3 items-center justify-center ${
                        isSelected ? activeColor : 'bg-zinc-50'
                      }`}
                    >
                      <Text 
                        className={`font-bold capitalize ${
                          isSelected ? 'text-white' : 'text-zinc-500'
                        }`}
                      >
                        {s}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Sticky Bottom Action Bar */}
      <View 
        className="absolute bottom-0 left-0 right-0 bg-white border-t border-zinc-100 px-4 pt-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]"
        style={{ paddingBottom: Math.max(insets.bottom, 20) }}
      >
        <TouchableOpacity 
          onPress={handleSave}
          disabled={isPending}
          className={`py-4 rounded-2xl items-center ${
            isPending ? 'bg-emerald-400' : 'bg-emerald-500'
          }`}
        >
          {isPending ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-lg">Save Attendance</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
