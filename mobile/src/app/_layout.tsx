import { useEffect } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from "../store/authStore";
import "../global.css";

const queryClient = new QueryClient();

export default function RootLayout() {
  const { user } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
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
  }, [user, segments]);

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </QueryClientProvider>
  );
}
