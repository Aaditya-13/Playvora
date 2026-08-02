import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Controller } from 'react-hook-form';

export const BasicDetailsCard = ({ control, errors }: any) => (
  <View className="mb-6 bg-white p-5 rounded-3xl border border-zinc-200 shadow-sm">
    <Text className="text-lg font-bold mb-1">Game Details</Text>
    <Text className="text-sm text-zinc-500 mb-4">Tell players what you&apos;re organizing.</Text>

    <Controller
      control={control}
      name="title"
      render={({ field: { onChange, value } }) => (
        <View className="mb-5">
          <Text className="text-sm font-semibold mb-2">Activity Title</Text>
          <TextInput
            placeholder="Sunday Football Match"
            value={value}
            onChangeText={onChange}
            className="bg-zinc-50 px-4 py-3 rounded-xl border border-zinc-200 text-base"
            placeholderTextColor="#9ca3af"
          />
          {errors.title && <Text className="text-red-500 text-xs mt-1 ml-1">{errors.title.message}</Text>}
        </View>
      )}
    />

    <Controller
      control={control}
      name="description"
      render={({ field: { onChange, value } }) => (
        <View>
          <Text className="text-sm font-semibold mb-2">Description</Text>
          <TextInput
            placeholder="Describe your event briefly"
            value={value}
            onChangeText={onChange}
            multiline
            numberOfLines={4}
            className="bg-zinc-50 px-4 py-3 rounded-xl border border-zinc-200 text-base"
            style={{ minHeight: 100, textAlignVertical: 'top' }}
            placeholderTextColor="#9ca3af"
          />
          {errors.description && <Text className="text-red-500 text-xs mt-1 ml-1">{errors.description.message}</Text>}
        </View>
      )}
    />
  </View>
);
