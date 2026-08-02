import { useMutation, useQuery } from '@tanstack/react-query';
import api from '../../api/client';

export const useGuestLogin = () => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await api.post('/auth/guest');
      return data;
    }
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: async (credentials: any) => {
      const { data } = await api.post('/auth/login', credentials);
      return data;
    }
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: async (payload: any) => {
      const { data } = await api.post('/auth/register', payload);
      return data;
    }
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const { data } = await api.get('/auth/me');
      return data;
    },
    retry: false,
  });
};
