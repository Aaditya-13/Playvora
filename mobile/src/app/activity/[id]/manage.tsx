import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, Check, X } from 'lucide-react-native';

import { useActivityDetails } from '../../../hooks/queries/useActivityDetails';
import { useReceivedRequests, useApproveRequest, useRejectRequest } from '../../../hooks/queries/useJoinRequests';

export default function ManageActivityScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { data: activityData, isLoading: isLoadingActivity } = useActivityDetails(id);
  const { data: requestsData, isLoading: isLoadingRequests } = useReceivedRequests();

  const { mutate: approve, isPending: isApproving } = useApproveRequest();
  const { mutate: reject, isPending: isRejecting } = useRejectRequest();

  if (isLoadingActivity || isLoadingRequests) {
    return (
      <View className="flex-1 bg-zinc-50 items-center justify-center">
        <ActivityIndicator size="large" color="#10b981" />
      </View>
    );
  }

  const activity = activityData?.data;
  // Requests data is an array of requests
  const pendingRequests = (requestsData || []).filter((req: any) => req.activity._id === id);

  return (
    <View className="flex-1 bg-zinc-50">
      <View 
        className="flex-row items-center px-4 pb-4 bg-zinc-50/90 border-b border-zinc-200" 
        style={{ paddingTop: insets.top + 10 }}
      >
        <TouchableOpacity 
          onPress={() => router.back()}
          className="w-11 h-11 items-center justify-center rounded-full bg-white border border-zinc-200 shadow-sm mr-3"
        >
          <ChevronLeft size={24} color="#18181b" />
        </TouchableOpacity>
        <View>
          <Text className="text-xl font-bold text-zinc-900">Manage Activity</Text>
          <Text className="text-zinc-500 text-sm truncate max-w-[250px]">{activity?.title}</Text>
        </View>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
        
        <View className="bg-white rounded-3xl p-5 border border-zinc-200 shadow-sm mb-6">
          <Text className="text-lg font-bold text-zinc-900 mb-4">Actions</Text>
          <TouchableOpacity 
            onPress={() => router.push(`/activity/${id}/edit` as any)}
            className="bg-zinc-100 py-3.5 rounded-xl items-center border border-zinc-200 mb-3"
          >
            <Text className="text-zinc-900 font-bold">Edit Details</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => router.push(`/activity/${id}/attendance` as any)}
            className="bg-emerald-50 py-3.5 rounded-xl items-center border border-emerald-200"
          >
            <Text className="text-emerald-700 font-bold">Take Attendance</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-lg font-bold text-zinc-900 mb-4 ml-1">Pending Requests ({pendingRequests.length})</Text>
        
        {pendingRequests.length === 0 ? (
          <View className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm items-center">
            <Text className="text-zinc-500 text-center font-medium">No pending requests right now.</Text>
          </View>
        ) : (
          pendingRequests.map((request: any) => (
            <View key={request._id} className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm mb-3 flex-row items-center justify-between">
              <View className="flex-row items-center flex-1 mr-3">
                <Image 
                  source={{ uri: request.user.avatar || 'https://i.pravatar.cc/150' }} 
                  className="w-12 h-12 rounded-full bg-zinc-100"
                />
                <View className="ml-3 flex-1">
                  <Text className="text-base font-bold text-zinc-900">{request.user.fullName || request.user.username}</Text>
                  <Text className="text-xs text-zinc-500 font-medium">Reliability: {request.user.reliabilityScore.toFixed(1)}</Text>
                  {request.message && (
                    <Text className="text-sm text-zinc-600 mt-1 italic" numberOfLines={2}>"{request.message}"</Text>
                  )}
                </View>
              </View>
              
              <View className="flex-row gap-2">
                <TouchableOpacity 
                  onPress={() => reject(request._id)}
                  disabled={isRejecting || isApproving}
                  className="w-10 h-10 rounded-full bg-red-100 items-center justify-center border border-red-200"
                >
                  <X size={20} color="#ef4444" />
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => approve(request._id)}
                  disabled={isRejecting || isApproving}
                  className="w-10 h-10 rounded-full bg-emerald-100 items-center justify-center border border-emerald-200"
                >
                  <Check size={20} color="#10b981" />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
