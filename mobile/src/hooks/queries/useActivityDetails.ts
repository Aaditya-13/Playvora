import { useQuery } from '@tanstack/react-query';
import api from '../../api/client';
import { mockActivities } from '../../data/mockActivities';

export const useActivityDetails = (id: string) => {
  return useQuery({
    queryKey: ['activity', id],
    queryFn: async () => {
      try {
        // Attempt to fetch from real backend
        const { data } = await api.get(`/activities/${id}`);
        return data;
      } catch (error) {
        console.warn(`Backend fetch failed for activity ${id}, falling back to mock data.`);
        // Fallback for UI building phase
        const mockData = mockActivities.find(a => a._id === id);
        if (mockData) {
          // Wrap in 'data' to match standard axios response shape if that's what frontend uses
          return { data: mockData }; 
        }
        throw new Error("Activity not found");
      }
    },
    enabled: !!id,
  });
};
