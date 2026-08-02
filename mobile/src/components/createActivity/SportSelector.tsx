import React from 'react';
import { View, Text } from 'react-native';
import { Controller } from 'react-hook-form';
import { PillSelector } from './PillSelector';
import { SPORTS } from './constants';

export const SportSelector = ({ control, errors }: any) => (
  <View className="mb-6 bg-white p-5 rounded-3xl border border-zinc-200 shadow-sm">
    <Text className="text-lg font-bold mb-1">Sport</Text>
    <Text className="text-sm text-zinc-500 mb-4">What sport are you organizing?</Text>
    
    <Controller
      control={control}
      name="sport"
      render={({ field: { onChange, value } }) => (
        <PillSelector options={SPORTS} value={value} onChange={onChange} error={errors.sport?.message} />
      )}
    />
  </View>
);
