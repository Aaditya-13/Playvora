import { useQuery } from '@tanstack/react-query';
import api from '../../api/client';
import { Activity } from '../../types/activity';

interface NearbyResponse {
  data: {
    activities: Activity[];
  }
}

export const useActivities = () => {
  return useQuery({
    queryKey: ['activities', 'nearby'],
    queryFn: async () => {
      // Using fallback coordinates (Nashik, India) as discussed
      const lat = 20.0059;
      const lng = 73.7910;
      const { data } = await api.get<NearbyResponse>(`/activities/nearby?lat=${lat}&lng=${lng}&radius=50000`);
      return data.data.activities;
    }
  });
};
