import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function Register() {
  return (
    <View className="flex-1 justify-center p-6 bg-black">
      <Text className="text-3xl font-bold text-white mb-6">Create Account</Text>
      {/* Form goes here */}
      
      <Link href="/(auth)/login" asChild>
        <TouchableOpacity className="w-full bg-blue-600 p-4 rounded-xl mt-6">
          <Text className="text-white text-center font-bold text-lg">Sign Up</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
