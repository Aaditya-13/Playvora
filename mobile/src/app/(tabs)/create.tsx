import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SportSelector } from '../../components/createActivity/SportSelector';
import { BasicDetailsCard } from '../../components/createActivity/BasicDetailsCard';
import { LocationCard } from '../../components/createActivity/LocationCard';
import { GameSettingsCard } from '../../components/createActivity/GameSettingsCard';
import { ScheduleCard } from '../../components/createActivity/ScheduleCard';
import { PricingCard } from '../../components/createActivity/PricingCard';
import { NotesCard } from '../../components/createActivity/NotesCard';

const createActivitySchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  sport: z.string().min(1, "Please select a sport"),
  groundName: z.string().min(3, "Ground name is required"),
  address: z.string().min(3, "Address is required"),
  dateInput: z.string().min(1, "Date is required"),
  timeInput: z.string().min(1, "Time is required"),
  latitude: z.number(),
  longitude: z.number(),
  maxPlayers: z.number().min(2, "Must have at least 2 players"),
  skillLevel: z.string().min(1, "Please select a skill level"),
  venueType: z.string().min(1, "Please select a venue type"),
  joinPolicy: z.string().min(1, "Please select a join policy"),
  genderPreference: z.string().min(1, "Please select a gender option"),
  cost: z.object({
    amount: z.number().min(0, "Cost cannot be negative"),
    currency: z.string(),
    description: z.string().optional(),
  }),
  notes: z.string().optional(),
  visibilityRadius: z.number().min(1000),
});

type CreateActivityForm = z.infer<typeof createActivitySchema>;

export default function CreateScreen() {
  const insets = useSafeAreaInsets();
  
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<CreateActivityForm>({
    resolver: zodResolver(createActivitySchema),
    defaultValues: {
      title: '',
      description: '',
      sport: 'football',
      groundName: '',
      address: '',
      dateInput: '',
      timeInput: '',
      latitude: 19.0760,
      longitude: 72.8777,
      maxPlayers: 10,
      skillLevel: 'beginner',
      venueType: 'outdoor',
      joinPolicy: 'open',
      genderPreference: 'any',
      cost: {
        amount: 0,
        currency: 'INR',
        description: 'Per player',
      },
      notes: '',
      visibilityRadius: 5000,
    }
  });

  const onSubmit = (data: CreateActivityForm) => {
    // Combine date and time to scheduledAt
    const scheduledAt = new Date(`${data.dateInput}T${data.timeInput}`);
    
    if (Number.isNaN(scheduledAt.getTime())) {
      Alert.alert("Error", "Invalid date or time format (use YYYY-MM-DD and HH:MM)");
      return;
    }

    const payload = {
      ...data,
      scheduledAt: scheduledAt.toISOString(),
    };

    console.log("Activity Payload:", JSON.stringify(payload, null, 2));
    Alert.alert("Success", "Activity created successfully! (Mock)");
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView 
        className="flex-1 bg-zinc-50"
        contentContainerStyle={{ paddingTop: insets.top + 20, paddingBottom: 120, paddingHorizontal: 16 }}
      >
        <Text className="text-3xl font-black text-zinc-900 mb-8">Host a Game</Text>

        <SportSelector control={control} errors={errors} />
        <BasicDetailsCard control={control} errors={errors} />
        <LocationCard control={control} setValue={setValue} errors={errors} />
        <GameSettingsCard control={control} setValue={setValue} errors={errors} />
        <ScheduleCard control={control} errors={errors} />
        <PricingCard control={control} errors={errors} />
        <NotesCard control={control} errors={errors} />

      </ScrollView>

      {/* Sticky Footer */}
      <View 
        className="absolute bottom-0 left-0 right-0 bg-white border-t border-zinc-100"
        style={{ paddingBottom: Math.max(insets.bottom, 20), paddingTop: 16, paddingHorizontal: 16 }}
      >
        <TouchableOpacity 
          onPress={handleSubmit(onSubmit)}
          className="bg-emerald-500 py-4 rounded-2xl items-center shadow-sm"
        >
          <Text className="text-white font-bold text-lg">Publish Activity</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
