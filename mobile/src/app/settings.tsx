import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft, Camera, User as UserIcon } from 'lucide-react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import * as ImagePicker from 'expo-image-picker';

import { useProfile, useUpdateProfile, useUpdateAvatar } from '../hooks/queries/useProfile';

const updateProfileSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required").max(50, "Full name is too long").optional().or(z.literal('')),
  bio: z.string().trim().max(300, "Bio must be under 300 characters").optional().or(z.literal('')),
});

type UpdateProfileForm = z.infer<typeof updateProfileSchema>;

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  
  const { data, isLoading: isProfileLoading } = useProfile();
  const updateProfile = useUpdateProfile();
  const updateAvatar = useUpdateAvatar();

  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  const { control, handleSubmit, formState: { errors }, reset } = useForm<UpdateProfileForm>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      fullName: '',
      bio: '',
    }
  });

  useEffect(() => {
    if (data?.data?.user) {
      const { user } = data.data;
      reset({
        fullName: user.fullName || '',
        bio: (user as any).bio || '',
      });
      
      const isValidAvatar = user.avatar && 
        typeof user.avatar === 'string' && 
        user.avatar !== 'null' && 
        user.avatar !== 'undefined' &&
        user.avatar.trim() !== '';
        
      if (isValidAvatar) {
        setAvatarUri(user.avatar as string);
      }
    }
  }, [data, reset]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setAvatarUri(result.assets[0].uri);
      
      // Immediately upload the new avatar
      const formData = new FormData();
      formData.append('avatar', {
        uri: result.assets[0].uri,
        name: 'avatar.jpg',
        type: 'image/jpeg',
      } as any);

      updateAvatar.mutate(formData);
    }
  };

  const onSubmit = (formData: UpdateProfileForm) => {
    updateProfile.mutate(formData, {
      onSuccess: () => {
        router.back();
      }
    });
  };

  const isSaving = updateProfile.isPending || updateAvatar.isPending;

  if (isProfileLoading) {
    return (
      <View className="flex-1 bg-zinc-50 items-center justify-center">
        <ActivityIndicator size="large" color="#10b981" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-zinc-50"
    >
      <View className="flex-row items-center justify-between px-4 pb-4 border-b border-zinc-200 bg-white" style={{ paddingTop: insets.top + 10 }}>
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center">
          <ChevronLeft size={24} color="#18181b" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-zinc-900">Edit Profile</Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 20 }}>
        {/* Avatar Section */}
        <View className="items-center mb-8 mt-4">
          <TouchableOpacity onPress={pickImage} className="relative" disabled={updateAvatar.isPending}>
            <View className="w-32 h-32 rounded-full border-4 border-white bg-zinc-100 items-center justify-center overflow-hidden" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 3 }}>
              {avatarUri ? (
                <Image 
                  source={{ uri: avatarUri }} 
                  style={{ width: '100%', height: '100%' }} 
                  resizeMode="cover"
                />
              ) : (
                <UserIcon size={48} color="#a1a1aa" />
              )}
            </View>
            
            <View className="absolute bottom-0 right-0 w-10 h-10 bg-emerald-500 rounded-full items-center justify-center border-4 border-zinc-50 shadow-sm">
              {updateAvatar.isPending ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Camera size={18} color="#ffffff" />
              )}
            </View>
          </TouchableOpacity>
        </View>

        {/* Form Section */}
        <View className="mb-6">
          <Text className="text-sm font-bold text-zinc-700 mb-2 ml-1">Full Name</Text>
          <Controller
            control={control}
            name="fullName"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className={`bg-white px-5 py-4 rounded-2xl border ${errors.fullName ? 'border-red-500' : 'border-zinc-200'} text-zinc-900 text-base shadow-sm`}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Enter your full name"
                placeholderTextColor="#a1a1aa"
              />
            )}
          />
          {errors.fullName && <Text className="text-red-500 text-xs mt-1.5 ml-2 font-medium">{errors.fullName.message}</Text>}
        </View>

        <View className="mb-6">
          <Text className="text-sm font-bold text-zinc-700 mb-2 ml-1">Bio</Text>
          <Controller
            control={control}
            name="bio"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className={`bg-white px-5 py-4 rounded-2xl border ${errors.bio ? 'border-red-500' : 'border-zinc-200'} text-zinc-900 text-base shadow-sm`}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Tell us a bit about yourself..."
                placeholderTextColor="#a1a1aa"
                multiline
                numberOfLines={4}
                style={{ height: 100, textAlignVertical: 'top' }}
              />
            )}
          />
          {errors.bio && <Text className="text-red-500 text-xs mt-1.5 ml-2 font-medium">{errors.bio.message}</Text>}
        </View>

      </ScrollView>

      {/* Footer */}
      <View className="bg-white border-t border-zinc-100 px-5 pt-4 pb-8" style={{ paddingBottom: Math.max(insets.bottom, 20) }}>
        <TouchableOpacity 
          className={`py-4 rounded-full items-center justify-center ${isSaving ? 'bg-emerald-400' : 'bg-emerald-500'}`}
          onPress={handleSubmit(onSubmit)}
          disabled={isSaving}
          style={{ shadowColor: '#10b981', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 }}
        >
          {updateProfile.isPending ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-lg">Save Changes</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
