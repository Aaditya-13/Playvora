import { useQuery } from '@tanstack/react-query';
import api from '../../api/client';

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      try {
        const { data } = await api.get('/user/profile');
        return data;
      } catch (error) {
        console.warn("Backend fetch failed for profile, falling back to mock data.");
        return {
          data: {
            name: "Alex Johnson",
            bio: "Weekend warrior. Always down for football or tennis. Catch me on the court!",
            location: "Mumbai, India",
            avatarUrl: "https://i.pravatar.cc/300?img=12",
            stats: {
              gamesPlayed: 42,
              organized: 5,
              rating: 4.8
            }
          }
        };
      }
    }
  });
};
