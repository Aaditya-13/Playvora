import { useEffect } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useAuthStore } from "../store/authStore";
import api from "../api/client";
import { View, ActivityIndicator } from "react-native";
import "../global.css";

const queryClient = new QueryClient();

export default function RootLayout() {
  const { user, isBootstrapping, setUser, setBootstrapping } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const bootstrapAuth = async () => {
      setBootstrapping(true);
      try {
        const { data } = await api.get('/auth/me');
        setUser(data.data);
      } catch (error) {
        setUser(null);
      } finally {
        setBootstrapping(false);
      }
    };
    bootstrapAuth();
  }, []);

  useEffect(() => {
    if (isBootstrapping) return;

    const inAuthGroup = segments[0] === "(auth)";

    // Prevent routing before layout is mounted by ensuring segments exist
    if (!segments.length) return;

    if (!user && !inAuthGroup) {
      // If the user is not logged in and they are not in the auth group, redirect them to login.
      router.replace("/(auth)/landing");
    } else if (user && inAuthGroup) {
      // If the user is logged in and they try to access the auth group, redirect them to the main app.
      router.replace("/(tabs)");
    }
  }, [user, segments, isBootstrapping]);

  if (isBootstrapping) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#10b981" />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
