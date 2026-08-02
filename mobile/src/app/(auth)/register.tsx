import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { Link, useRouter } from "expo-router";
import { useAuthStore } from "../../store/authStore";
import { useRegister, useLogin } from "../../hooks/queries/useAuth";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ChevronLeft } from 'lucide-react-native';

const registerSchema = z.object({
  fullName: z.string().min(1, "Name is required").max(50),
  username: z.string().min(3, "Username must be at least 3 characters").max(30),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function Register() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const { mutateAsync: registerUser, isPending: isRegistering } = useRegister();
  const { mutateAsync: loginUser } = useLogin();
  const [apiError, setApiError] = useState("");

  const { control, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: '', username: '', email: '', password: '', confirmPassword: '' }
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      setApiError("");
      await registerUser({ 
        fullName: data.fullName, 
        username: data.username,
        email: data.email, 
        password: data.password 
      });
      // Backend returns 201 on success. Auto login immediately.
      const loginResponse = await loginUser({ email: data.email, password: data.password });
      setUser(loginResponse.data.user);
    } catch (error: any) {
      setApiError(error.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView className="flex-1 bg-white" contentContainerStyle={{ padding: 24, paddingTop: 64, paddingBottom: 40 }}>
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center rounded-full bg-zinc-100 mb-8">
          <ChevronLeft size={24} color="#18181b" />
        </TouchableOpacity>

        <Text className="text-3xl font-black text-zinc-900 mb-2">Create Account</Text>
        <Text className="text-zinc-500 mb-8 text-base">Join Playvora and find games near you</Text>

        {apiError ? <Text className="text-red-500 mb-4">{apiError}</Text> : null}

        <Controller
          control={control}
          name="fullName"
          render={({ field: { onChange, value } }) => (
            <View className="mb-4">
              <Text className="text-sm font-bold text-zinc-700 mb-2">Full Name</Text>
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder="Alex Johnson"
                className="bg-zinc-50 p-4 rounded-xl border border-zinc-200 text-base"
              />
              {errors.fullName && <Text className="text-red-500 text-xs mt-1">{errors.fullName.message}</Text>}
            </View>
          )}
        />

        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, value } }) => (
            <View className="mb-4">
              <Text className="text-sm font-bold text-zinc-700 mb-2">Username</Text>
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder="alexj"
                autoCapitalize="none"
                className="bg-zinc-50 p-4 rounded-xl border border-zinc-200 text-base"
              />
              {errors.username && <Text className="text-red-500 text-xs mt-1">{errors.username.message}</Text>}
            </View>
          )}
        />

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
            <View className="mb-4">
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

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, value } }) => (
            <View className="mb-8">
              <Text className="text-sm font-bold text-zinc-700 mb-2">Confirm Password</Text>
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder="••••••••"
                secureTextEntry
                className="bg-zinc-50 p-4 rounded-xl border border-zinc-200 text-base"
              />
              {errors.confirmPassword && <Text className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</Text>}
            </View>
          )}
        />

        <TouchableOpacity 
          onPress={handleSubmit(onSubmit)}
          disabled={isRegistering}
          className="w-full bg-zinc-900 p-4 rounded-xl flex-row justify-center items-center h-14"
        >
          {isRegistering ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-lg">Create Account</Text>
          )}
        </TouchableOpacity>

        <View className="flex-row justify-center mt-6">
          <Text className="text-zinc-500">Already have an account? </Text>
          <Link href="/(auth)/login">
            <Text className="text-blue-600 font-bold">Sign In</Text>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
