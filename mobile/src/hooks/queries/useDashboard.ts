import { useQuery } from '@tanstack/react-query';
import api from '../../api/client';
import { Activity, User } from '../../types/activity';

export interface DashboardData {
  user: User;
  stats: {
    activitiesCreated: number;
    activitiesJoined: number;
    reliabilityScore: number;
  };
  pendingRequests: number;
  upcomingCreated: Activity[];
  upcomingJoined: Activity[];
}

interface DashboardResponse {
  data: DashboardData;
}

export const useDashboard = () => {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const { data } = await api.get<DashboardResponse>('/dashboard');
      return data;
    }
  });
};
