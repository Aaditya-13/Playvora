import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, ImageBackground } from "react-native";
import { Link } from "expo-router";
import { useAuthStore } from "../../store/authStore";
import { useGuestLogin } from "../../hooks/queries/useAuth";
import { LinearGradient } from 'expo-linear-gradient';

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
    <ImageBackground 
      source={{ uri: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=3538&auto=format&fit=crop" }} 
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,1)']}
        style={{ flex: 1, justifyContent: 'flex-end', padding: 24, paddingBottom: 60 }}
      >
        <View className="mb-12">
          <Text className="text-6xl font-black text-white mb-2 tracking-tight">Playvora</Text>
          <Text className="text-zinc-300 text-lg font-medium leading-relaxed max-w-[280px]">
            Find your game. Meet your squad. Rule the court.
          </Text>
        </View>
        
        <Link href="/(auth)/register" asChild>
          <TouchableOpacity 
            className="w-full bg-emerald-500 py-4 px-6 rounded-full mb-4 items-center justify-center"
            style={{ shadowColor: '#10b981', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 }}
          >
            <Text className="text-white font-bold text-lg">Create Account</Text>
          </TouchableOpacity>
        </Link>
        
        <Link href="/(auth)/login" asChild>
          <TouchableOpacity 
            className="w-full bg-white/10 py-4 px-6 rounded-full mb-8 items-center justify-center border border-white/20"
          >
            <Text className="text-white font-bold text-lg">Sign In</Text>
          </TouchableOpacity>
        </Link>

        <TouchableOpacity 
          onPress={handleGuestLogin} 
          disabled={isPending}
          className="w-full py-2 flex-row justify-center items-center"
        >
          {isPending ? (
            <ActivityIndicator color="#a1a1aa" />
          ) : (
            <Text className="text-zinc-400 font-semibold text-base">Continue as Guest</Text>
          )}
        </TouchableOpacity>
      </LinearGradient>
    </ImageBackground>
  );
}
