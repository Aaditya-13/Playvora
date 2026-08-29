import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/client';
import { Alert } from 'react-native';

export const useGetAttendance = (activityId: string) => {
  return useQuery({
    queryKey: ['attendance', activityId],
    queryFn: async () => {
      const { data } = await api.get(`/attendance/${activityId}`);
      return data.data; // Expected: { participants: [{ user, status }] }
    },
    enabled: !!activityId,
  });
};

export const useMarkAttendance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ activityId, attendanceData }: { activityId: string, attendanceData: any }) => {
      const { data } = await api.post(`/attendance/${activityId}`, attendanceData);
      return data;
    },
    onSuccess: (data, { activityId }) => {
      Alert.alert("Success", "Attendance saved successfully.");
      queryClient.invalidateQueries({ queryKey: ['attendance', activityId] });
      queryClient.invalidateQueries({ queryKey: ['activity', activityId] });
    },
    onError: (error: any) => {
      Alert.alert("Error", error.response?.data?.message || "Failed to save attendance.");
    }
  });
};
