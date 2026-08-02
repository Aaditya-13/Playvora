import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import { Link, useRouter } from "expo-router";
import { useAuthStore } from "../../store/authStore";
import { useLogin } from "../../hooks/queries/useAuth";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ChevronLeft } from 'lucide-react-native';

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
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View className="flex-1 bg-white p-6 pt-16">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center rounded-full bg-zinc-100 mb-8">
          <ChevronLeft size={24} color="#18181b" />
        </TouchableOpacity>

        <Text className="text-3xl font-black text-zinc-900 mb-2">Welcome Back</Text>
        <Text className="text-zinc-500 mb-8 text-base">Sign in to your account to continue</Text>

        {apiError ? <Text className="text-red-500 mb-4">{apiError}</Text> : null}

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <View className="mb-4">
              <Text className="text-sm font-bold text-zinc-700 mb-2">Email Address</Text>
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder="alex@example.com"
                autoCapitalize="none"
                keyboardType="email-address"
                className="bg-zinc-50 p-4 rounded-xl border border-zinc-200 text-base"
              />
              {errors.email && <Text className="text-red-500 text-xs mt-1">{errors.email.message}</Text>}
            </View>
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <View className="mb-8">
              <Text className="text-sm font-bold text-zinc-700 mb-2">Password</Text>
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder="••••••••"
                secureTextEntry
                className="bg-zinc-50 p-4 rounded-xl border border-zinc-200 text-base"
              />
              {errors.password && <Text className="text-red-500 text-xs mt-1">{errors.password.message}</Text>}
            </View>
          )}
        />

        <TouchableOpacity 
          onPress={handleSubmit(onSubmit)}
          disabled={isPending}
          className="w-full bg-blue-600 p-4 rounded-xl flex-row justify-center items-center h-14"
        >
          {isPending ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-lg">Sign In</Text>
          )}
        </TouchableOpacity>

        <View className="flex-row justify-center mt-6">
          <Text className="text-zinc-500">Don&apos;t have an account? </Text>
          <Link href="/(auth)/register">
            <Text className="text-blue-600 font-bold">Sign Up</Text>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
