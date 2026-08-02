import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { Link } from "expo-router";
import { useAuthStore } from "../../store/authStore";
import { useGuestLogin } from "../../hooks/queries/useAuth";

export default function Landing() {
  const setUser = useAuthStore((state) => state.setUser);
  const { mutateAsync: guestLogin, isPending } = useGuestLogin();

  const handleGuestLogin = async () => {
    try {
      const response = await guestLogin();
      setUser(response.data.user);
    } catch (error: any) {
      console.log(error);
      Alert.alert("Login Failed", "Could not connect to the backend.");
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-black p-4">
      <Text className="text-4xl font-bold text-white mb-8">Playvora</Text>
      
      <Link href="/(auth)/login" asChild>
        <TouchableOpacity className="w-full bg-blue-600 p-4 rounded-xl mb-4">
          <Text className="text-white text-center font-bold text-lg">Login</Text>
        </TouchableOpacity>
      </Link>
      
      <Link href="/(auth)/register" asChild>
        <TouchableOpacity className="w-full bg-zinc-800 p-4 rounded-xl mb-8">
          <Text className="text-white text-center font-bold text-lg">Create Account</Text>
        </TouchableOpacity>
      </Link>

      <TouchableOpacity 
        onPress={handleGuestLogin} 
        disabled={isPending}
        className="w-full bg-emerald-600/20 p-4 rounded-xl border border-emerald-500/50 flex-row justify-center items-center h-16"
      >
        {isPending ? (
          <ActivityIndicator color="#34d399" />
        ) : (
          <Text className="text-emerald-400 text-center font-bold text-lg">Continue as Guest</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
