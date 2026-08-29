import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/client';
import { Activity } from '../../types/activity';
import { useFilterStore } from '../../store/filterStore';

interface NearbyResponse {
  data: {
    activities: Activity[];
  }
}

export const useActivities = () => {
  const { selectedSport, page } = useFilterStore();

  return useQuery({
    queryKey: ['activities', 'nearby', selectedSport, page],
    queryFn: async () => {
      // Default to near College Road, Nashik if not provided
      const lat = 20.0076;
      const lng = 73.7601;
      
      let url = `/activities/nearby?lat=${lat}&lng=${lng}&radius=50000&page=${page}`;
      if (selectedSport && selectedSport !== 'All') {
        url += `&sport=${selectedSport}`;
      }
      
      const { data } = await api.get<NearbyResponse>(url);
      return data.data.activities;
    }
  });
};

export const useCreateActivity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: any) => {
      const { data } = await api.post('/activities', payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    }
  });
};
