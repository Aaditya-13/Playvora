import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../../api/client';
import * as SecureStore from 'expo-secure-store';

export const useGuestLogin = () => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await api.post('/auth/guest');
      if (data.data.accessToken) {
        await SecureStore.setItemAsync('token', data.data.accessToken);
      }
      return data;
    }
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: async (payload: any) => {
      const { data } = await api.post('/auth/login', payload);
      if (data.data.accessToken) {
        await SecureStore.setItemAsync('token', data.data.accessToken);
      }
      return data;
    }
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      await api.post('/auth/logout');
      await SecureStore.deleteItemAsync('token');
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
