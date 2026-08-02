import { useQuery } from '@tanstack/react-query';
import api from '../../api/client';
import { DashboardData } from './useDashboard';

interface DashboardResponse {
  data: DashboardData;
}

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      // Profile needs stats, so we can reuse the dashboard endpoint which aggregates this.
      const { data } = await api.get<DashboardResponse>('/dashboard');
      return data;
    }
  });
};
