import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/client';
import { Alert } from 'react-native';

export const useJoinActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (activityId: string) => {
      const { data } = await api.post(`/activities/${activityId}/join`);
      return data;
    },
    onSuccess: (data, activityId) => {
      Alert.alert("Success", data.message || "Request sent successfully!");
      queryClient.invalidateQueries({ queryKey: ['activity', activityId] });
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      queryClient.invalidateQueries({ queryKey: ['joinRequests', 'sent'] });
    },
    onError: (error: any) => {
      Alert.alert("Error", error.response?.data?.message || "Failed to join activity.");
    }
  });
};

export const useLeaveActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (activityId: string) => {
      const { data } = await api.post(`/activities/${activityId}/leave`);
      return data;
    },
    onSuccess: (data, activityId) => {
      Alert.alert("Success", "You have left the activity.");
      queryClient.invalidateQueries({ queryKey: ['activity', activityId] });
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error: any) => {
      Alert.alert("Error", error.response?.data?.message || "Failed to leave activity.");
    }
  });
};

export const useCancelActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (activityId: string) => {
      const { data } = await api.patch(`/activities/${activityId}/cancel`);
      return data;
    },
    onSuccess: (data, activityId) => {
      Alert.alert("Success", "Activity has been cancelled.");
      queryClient.invalidateQueries({ queryKey: ['activity', activityId] });
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error: any) => {
      Alert.alert("Error", error.response?.data?.message || "Failed to cancel activity.");
    }
  });
};

export const useUpdateActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ activityId, payload }: { activityId: string, payload: any }) => {
      const { data } = await api.patch(`/activities/${activityId}`, payload);
      return data;
    },
    onSuccess: (data, { activityId }) => {
      Alert.alert("Success", "Activity updated successfully.");
      queryClient.invalidateQueries({ queryKey: ['activity', activityId] });
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error: any) => {
      Alert.alert("Error", error.response?.data?.message || "Failed to update activity.");
    }
  });
};
