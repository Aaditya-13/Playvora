import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Controller } from 'react-hook-form';

export const PricingCard = ({ control, errors }: any) => (
  <View className="mb-6 bg-white p-5 rounded-3xl border border-zinc-200 shadow-sm">
    <Text className="text-lg font-bold mb-1">Pricing</Text>
    <Text className="text-sm text-zinc-500 mb-4">Set the cost per player.</Text>

    <View className="flex-row gap-4">
      <Controller
        control={control}
        name="cost.amount"
        render={({ field: { onChange, value } }) => (
          <View className="flex-1">
            <Text className="text-sm font-semibold mb-2">Amount (₹)</Text>
            <TextInput
              placeholder="0"
              value={value === 0 ? '' : value.toString()}
              onChangeText={(text) => onChange(Number(text.replace(/[^0-9]/g, '')))}
              keyboardType="number-pad"
              className="bg-zinc-50 px-4 py-3 rounded-xl border border-zinc-200 text-base"
              placeholderTextColor="#9ca3af"
            />
            {errors.cost?.amount && <Text className="text-red-500 text-xs mt-1 ml-1">{errors.cost.amount.message}</Text>}
          </View>
        )}
      />

      <Controller
        control={control}
        name="cost.description"
        render={({ field: { onChange, value } }) => (
          <View className="flex-[2]">
            <Text className="text-sm font-semibold mb-2">Cost Description</Text>
            <TextInput
              placeholder="e.g. Per player"
              value={value}
              onChangeText={onChange}
              className="bg-zinc-50 px-4 py-3 rounded-xl border border-zinc-200 text-base"
              placeholderTextColor="#9ca3af"
            />
            {errors.cost?.description && <Text className="text-red-500 text-xs mt-1 ml-1">{errors.cost.description.message}</Text>}
          </View>
        )}
      />
    </View>
  </View>
);
