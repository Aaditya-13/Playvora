import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { useAuthStore } from "../../store/authStore";

export default function Landing() {
  const setUser = useAuthStore((state) => state.setUser);

  const handleDevLogin = () => {
    setUser({ id: "dev-123", name: "Dev User", email: "dev@playvora.com" });
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

      <TouchableOpacity onPress={handleDevLogin} className="w-full bg-emerald-600/20 p-4 rounded-xl border border-emerald-500/50">
        <Text className="text-emerald-400 text-center font-bold text-lg">DEV: Instant Login Bypass</Text>
      </TouchableOpacity>
    </View>
  );
}
