import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/client';
import { Activity } from '../../types/activity';

interface ActivityResponse {
  data: Activity;
}

export const useActivityDetails = (id: string) => {
  return useQuery({
    queryKey: ['activity', id],
    queryFn: async () => {
      const { data } = await api.get<ActivityResponse>(`/activities/${id}`);
      return data;
    },
    enabled: !!id
  });
};

export const useJoinActivity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.post(`/activities/${id}/join`);
      return data;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['activity', id] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    }
  });
};
