import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function Landing() {
  return (
    <View className="flex-1 justify-center items-center bg-black p-4">
      <Text className="text-4xl font-bold text-white mb-8">Playvora</Text>
      
      <Link href="/(auth)/login" asChild>
        <TouchableOpacity className="w-full bg-blue-600 p-4 rounded-xl mb-4">
          <Text className="text-white text-center font-bold text-lg">Login</Text>
        </TouchableOpacity>
      </Link>
      
      <Link href="/(auth)/register" asChild>
        <TouchableOpacity className="w-full bg-zinc-800 p-4 rounded-xl">
          <Text className="text-white text-center font-bold text-lg">Create Account</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
