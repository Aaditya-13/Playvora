import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

export const PillSelector = ({ 
  options, value, onChange, label, error 
}: { 
  options: { value: string; label: string; emoji?: string }[], 
  value: string, 
  onChange: (v: string) => void, 
  label?: string,
  error?: string 
}) => (
  <View>
    {label && <Text className="text-zinc-800 font-bold mb-2 ml-1">{label}</Text>}
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row" contentContainerStyle={{ paddingBottom: 4 }}>
      {options.map((opt) => {
        const isSelected = value === opt.value;
        return (
          <TouchableOpacity
            key={opt.value}
            onPress={() => onChange(opt.value)}
            className={`mr-3 px-5 py-2.5 rounded-full border flex-row items-center justify-center ${
              isSelected ? 'bg-emerald-500 border-emerald-500' : 'bg-white border-zinc-200'
            }`}
          >
            {opt.emoji && <Text className="mr-2 text-base">{opt.emoji}</Text>}
            <Text className={`font-bold ${isSelected ? 'text-white' : 'text-zinc-600'}`}>
              {opt.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
    {error && <Text className="text-red-500 text-xs mt-1 ml-1">{error}</Text>}
  </View>
);
