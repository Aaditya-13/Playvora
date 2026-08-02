import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Controller } from 'react-hook-form';

export const NotesCard = ({ control, errors }: any) => (
  <View className="mb-6 bg-white p-5 rounded-3xl border border-zinc-200 shadow-sm">
    <Text className="text-lg font-bold mb-1">Additional Notes</Text>
    <Text className="text-sm text-zinc-500 mb-4">Any special instructions for the players?</Text>

    <Controller
      control={control}
      name="notes"
      render={({ field: { onChange, value } }) => (
        <View>
          <TextInput
            placeholder="e.g. Bring your own turf shoes"
            value={value}
            onChangeText={onChange}
            multiline
            numberOfLines={4}
            className="bg-zinc-50 px-4 py-3 rounded-xl border border-zinc-200 text-base"
            style={{ minHeight: 100, textAlignVertical: 'top' }}
            placeholderTextColor="#9ca3af"
          />
          {errors.notes && <Text className="text-red-500 text-xs mt-1 ml-1">{errors.notes.message}</Text>}
        </View>
      )}
    />
  </View>
);
