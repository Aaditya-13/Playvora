import { useQuery } from '@tanstack/react-query';
import api from '../../api/client';
import { mockActivities } from '../../data/mockActivities';

export const useDashboard = () => {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      try {
        const { data } = await api.get('/user/dashboard');
        return data;
      } catch (error) {
        console.warn("Backend fetch failed for dashboard, falling back to mock data.");
        // Simulate upcoming vs past for UI testing phase
        return {
          data: {
            upcoming: [mockActivities[0], mockActivities[1]],
            past: [mockActivities[2], mockActivities[3]]
          }
        };
      }
    }
  });
};
