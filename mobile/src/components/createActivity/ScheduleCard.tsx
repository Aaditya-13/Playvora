import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Controller } from 'react-hook-form';

export const ScheduleCard = ({ control, errors }: any) => (
  <View className="mb-6 bg-white p-5 rounded-3xl border border-zinc-200 shadow-sm">
    <Text className="text-lg font-bold mb-1">Schedule</Text>
    <Text className="text-sm text-zinc-500 mb-4">Choose when your activity starts.</Text>

    <View className="flex-row gap-4">
      <Controller
        control={control}
        name="dateInput"
        render={({ field: { onChange, value } }) => (
          <View className="flex-1">
            <Text className="text-sm font-semibold mb-2">Date (YYYY-MM-DD)</Text>
            <TextInput
              placeholder="2026-08-05"
              value={value}
              onChangeText={onChange}
              className="bg-zinc-50 px-4 py-3 rounded-xl border border-zinc-200 text-base"
              placeholderTextColor="#9ca3af"
            />
            {errors.dateInput && <Text className="text-red-500 text-xs mt-1 ml-1">{errors.dateInput.message}</Text>}
          </View>
        )}
      />

      <Controller
        control={control}
        name="timeInput"
        render={({ field: { onChange, value } }) => (
          <View className="flex-1">
            <Text className="text-sm font-semibold mb-2">Time (HH:MM)</Text>
            <TextInput
              placeholder="18:30"
              value={value}
              onChangeText={onChange}
              className="bg-zinc-50 px-4 py-3 rounded-xl border border-zinc-200 text-base"
              placeholderTextColor="#9ca3af"
            />
            {errors.timeInput && <Text className="text-red-500 text-xs mt-1 ml-1">{errors.timeInput.message}</Text>}
          </View>
        )}
      />
    </View>
  </View>
);
