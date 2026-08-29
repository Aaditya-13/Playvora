import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Controller, useWatch } from 'react-hook-form';
import { Minus, Plus, Users } from 'lucide-react-native';
import { PillSelector } from './PillSelector';
import { SKILL_LEVELS, VENUE_TYPES, JOIN_POLICIES, GENDER_OPTIONS } from './constants';

const VISIBILITY_RADII = [
  { value: 1000, label: '1 km' },
  { value: 3000, label: '3 km' },
  { value: 5000, label: '5 km' },
  { value: 10000, label: '10 km' },
  { value: 20000, label: '20 km' },
];

export const GameSettingsCard = ({ control, errors, setValue }: any) => {
  const maxPlayers = useWatch({ control, name: 'maxPlayers' }) || 2;

  const increasePlayers = () => setValue('maxPlayers', Math.min(50, maxPlayers + 1), { shouldValidate: true });
  const decreasePlayers = () => setValue('maxPlayers', Math.max(2, maxPlayers - 1), { shouldValidate: true });

  return (
    <View className="mb-6 bg-white p-5 rounded-3xl border border-zinc-200 shadow-sm">
      <Text className="text-lg font-bold mb-1">Game Settings</Text>
      <Text className="text-sm text-zinc-500 mb-6">Configure who can join and how the activity works.</Text>

      <View className="mb-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
        <View className="flex-row items-center justify-between">
          <View>
            <View className="flex-row items-center gap-2 mb-1">
              <Users size={18} color="#3f3f46" />
              <Text className="font-semibold text-zinc-800">Maximum Players</Text>
            </View>
            <Text className="text-sm text-zinc-500">Total participants allowed.</Text>
          </View>
          <View className="flex-row items-center gap-3">
            <TouchableOpacity onPress={decreasePlayers} className="w-10 h-10 items-center justify-center rounded-xl border border-zinc-300 bg-white">
              <Minus size={16} color="#3f3f46" />
            </TouchableOpacity>
            <Text className="w-8 text-center text-xl font-bold">{maxPlayers}</Text>
            <TouchableOpacity onPress={increasePlayers} className="w-10 h-10 items-center justify-center rounded-xl border border-zinc-300 bg-white">
              <Plus size={16} color="#3f3f46" />
            </TouchableOpacity>
          </View>
        </View>
        <Controller control={control} name="maxPlayers" render={() => <View />} />
        {errors.maxPlayers && <Text className="mt-2 text-sm text-red-500">{errors.maxPlayers.message}</Text>}
      </View>

      <Controller
        control={control}
        name="skillLevel"
        render={({ field: { onChange, value } }) => (
          <PillSelector label="Skill Level" options={SKILL_LEVELS} value={value} onChange={onChange} error={errors.skillLevel?.message} />
        )}
      />

      <Controller
        control={control}
        name="venueType"
        render={({ field: { onChange, value } }) => (
          <PillSelector label="Venue" options={VENUE_TYPES} value={value} onChange={onChange} error={errors.venueType?.message} />
        )}
      />

      <Controller
        control={control}
        name="joinPolicy"
        render={({ field: { onChange, value } }) => (
          <PillSelector label="Join Policy" options={JOIN_POLICIES} value={value} onChange={onChange} error={errors.joinPolicy?.message} />
        )}
      />

      <Controller
        control={control}
        name="genderPreference"
        render={({ field: { onChange, value } }) => (
          <PillSelector label="Gender Preference" options={GENDER_OPTIONS} value={value} onChange={onChange} error={errors.genderPreference?.message} />
        )}
      />

      <Controller
        control={control}
        name="visibilityRadius"
        render={({ field: { onChange, value } }) => (
          <View>
            <Text className="text-zinc-800 font-bold mb-1 ml-1">Visibility Radius</Text>
            <Text className="text-sm text-zinc-500 mb-3 ml-1">Only players within this distance can discover your activity.</Text>
            <PillSelector 
              label=""
              options={VISIBILITY_RADII.map(r => ({ ...r, value: String(r.value) }))} 
              value={String(value)} 
              onChange={(val) => onChange(Number(val))} 
              error={errors.visibilityRadius?.message} 
            />
          </View>
        )}
      />

    </View>
  );
};
