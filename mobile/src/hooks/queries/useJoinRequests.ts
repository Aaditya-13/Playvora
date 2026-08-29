import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/client';
import { Alert } from 'react-native';

export const useReceivedRequests = () => {
  return useQuery({
    queryKey: ['joinRequests', 'received'],
    queryFn: async () => {
      const { data } = await api.get('/join-requests/received');
      return data.data;
    }
  });
};

export const useSentRequests = () => {
  return useQuery({
    queryKey: ['joinRequests', 'sent'],
    queryFn: async () => {
      const { data } = await api.get('/join-requests/sent');
      return data.data;
    }
  });
};

export const useApproveRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (requestId: string) => {
      const { data } = await api.patch(`/join-requests/${requestId}/approve`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['joinRequests', 'received'] });
      queryClient.invalidateQueries({ queryKey: ['activity'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error: any) => {
      Alert.alert("Error", error.response?.data?.message || "Failed to approve request.");
    }
  });
};

export const useRejectRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (requestId: string) => {
      const { data } = await api.patch(`/join-requests/${requestId}/reject`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['joinRequests', 'received'] });
    },
    onError: (error: any) => {
      Alert.alert("Error", error.response?.data?.message || "Failed to reject request.");
    }
  });
};
