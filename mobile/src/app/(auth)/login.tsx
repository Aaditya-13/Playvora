import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function Login() {
  return (
    <View className="flex-1 justify-center p-6 bg-black">
      <Text className="text-3xl font-bold text-white mb-6">Welcome Back</Text>
      {/* Form goes here */}
      
      <Link href={"/(tabs)" as any} asChild>
        <TouchableOpacity className="w-full bg-blue-600 p-4 rounded-xl mt-6">
          <Text className="text-white text-center font-bold text-lg">Sign In</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
