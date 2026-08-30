import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import { useAuthStore } from "../../store/authStore";
import { useLogin } from "../../hooks/queries/useAuth";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react-native';
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const { mutateAsync: login, isPending } = useLogin();
  const [apiError, setApiError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' }
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      setApiError("");
      const response = await login(data);
      setUser(response.data.user);
    } catch (error: any) {
      setApiError(error.response?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-zinc-50">
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View className="flex-1 px-6 pt-6">
          <TouchableOpacity onPress={() => router.back()} className="w-12 h-12 items-center justify-center rounded-full bg-white border border-zinc-200 mb-8 shadow-sm">
            <ChevronLeft size={24} color="#18181b" />
          </TouchableOpacity>

          <Text className="text-4xl font-black text-zinc-900 mb-2">Welcome Back</Text>
          <Text className="text-zinc-500 mb-8 text-lg font-medium">Sign in to your account to continue</Text>

          {apiError ? (
            <View className="bg-red-50 p-4 rounded-xl border border-red-100 mb-6">
              <Text className="text-red-600 font-medium">{apiError}</Text>
            </View>
          ) : null}

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value, onBlur } }) => (
              <View className="mb-5">
                <Text className="text-sm font-bold text-zinc-700 mb-2 ml-1">Email Address</Text>
                <TextInput
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  placeholder="alex@example.com"
                  placeholderTextColor="#a1a1aa"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  className={`bg-white px-5 py-4 rounded-2xl border ${errors.email ? 'border-red-500' : 'border-zinc-200'} text-zinc-900 text-base shadow-sm`}
                />
                {errors.email && <Text className="text-red-500 text-xs mt-1.5 ml-2 font-medium">{errors.email.message}</Text>}
              </View>
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value, onBlur } }) => (
              <View className="mb-10">
                <Text className="text-sm font-bold text-zinc-700 mb-2 ml-1">Password</Text>
                <View className="relative justify-center">
                  <TextInput
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    placeholder="••••••••"
                    placeholderTextColor="#a1a1aa"
                    secureTextEntry={!showPassword}
                    className={`bg-white pl-5 pr-12 py-4 rounded-2xl border ${errors.password ? 'border-red-500' : 'border-zinc-200'} text-zinc-900 text-base shadow-sm`}
                  />
                  <TouchableOpacity 
                    className="absolute right-4" 
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff size={20} color="#71717a" />
                    ) : (
                      <Eye size={20} color="#71717a" />
                    )}
                  </TouchableOpacity>
                </View>
                {errors.password && <Text className="text-red-500 text-xs mt-1.5 ml-2 font-medium">{errors.password.message}</Text>}
              </View>
            )}
          />

          <TouchableOpacity 
            onPress={handleSubmit(onSubmit)}
            disabled={isPending}
            className={`w-full py-4 rounded-full items-center justify-center ${isPending ? 'bg-emerald-400' : 'bg-emerald-500'}`}
            style={{ shadowColor: '#10b981', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 }}
          >
            {isPending ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-bold text-lg">Sign In</Text>
            )}
          </TouchableOpacity>

          <View className="flex-row justify-center mt-8">
            <Text className="text-zinc-500 font-medium text-base">Don't have an account? </Text>
            <Link href="/(auth)/register">
              <Text className="text-emerald-600 font-bold text-base">Sign Up</Text>
            </Link>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
