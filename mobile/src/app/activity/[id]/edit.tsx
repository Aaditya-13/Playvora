import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { SportSelector } from '../../../components/createActivity/SportSelector';
import { BasicDetailsCard } from '../../../components/createActivity/BasicDetailsCard';
import { LocationCard } from '../../../components/createActivity/LocationCard';
import { GameSettingsCard } from '../../../components/createActivity/GameSettingsCard';
import { ScheduleCard } from '../../../components/createActivity/ScheduleCard';
import { PricingCard } from '../../../components/createActivity/PricingCard';
import { NotesCard } from '../../../components/createActivity/NotesCard';

import { useActivityDetails } from '../../../hooks/queries/useActivityDetails';
import { useUpdateActivity } from '../../../hooks/queries/useActivityActions';
import { ChevronLeft } from 'lucide-react-native';

const editActivitySchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  sport: z.string().min(1, "Please select a sport"),
  groundName: z.string().min(3, "Ground name is required"),
  address: z.string().min(3, "Address is required"),
  dateInput: z.string().min(1, "Date is required"),
  timeInput: z.string().min(1, "Time is required"),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  maxPlayers: z.number().min(2, "Must have at least 2 players"),
  skillLevel: z.string().min(1, "Please select a skill level"),
  venueType: z.string().min(1, "Please select a venue type"),
  joinPolicy: z.string().min(1, "Please select a join policy"),
  genderPreference: z.string().min(1, "Please select a gender option"),
  cost: z.object({
    amount: z.number().min(0, "Cost cannot be negative"),
    currency: z.string().optional(),
    description: z.string().optional(),
  }),
  notes: z.string().optional(),
  visibilityRadius: z.number().min(1000).max(50000),
});

type EditActivityForm = z.infer<typeof editActivitySchema>;

export default function EditActivityScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  
  const { data: activityData, isLoading: isLoadingActivity } = useActivityDetails(id);
  const { mutate: updateActivity, isPending } = useUpdateActivity();

  const { control, handleSubmit, setValue, reset, formState: { errors } } = useForm<EditActivityForm>({
    resolver: zodResolver(editActivitySchema),
  });

  useEffect(() => {
    if (activityData?.data) {
      const activity = activityData.data;
      const scheduledDate = new Date(activity.scheduledAt);
      
      reset({
        title: activity.title,
        description: activity.description || '',
        sport: activity.sport,
        groundName: activity.groundName,
        address: activity.address,
        dateInput: scheduledDate.toISOString().split('T')[0],
        timeInput: scheduledDate.toTimeString().split(' ')[0].substring(0, 5),
        latitude: activity.location.coordinates[1],
        longitude: activity.location.coordinates[0],
        maxPlayers: activity.maxPlayers,
        skillLevel: activity.skillLevel,
        venueType: activity.venueType,
        joinPolicy: activity.joinPolicy,
        genderPreference: activity.genderPreference,
        cost: {
          amount: activity.cost?.amount || 0,
          currency: activity.cost?.currency || 'INR',
          description: activity.cost?.description || 'Per player',
        },
        notes: activity.notes || '',
        visibilityRadius: activity.visibilityRadius || 5000,
      });
    }
  }, [activityData, reset]);

  const onSubmit = (data: EditActivityForm) => {
    const scheduledAt = new Date(`${data.dateInput}T${data.timeInput}`);

    if (Number.isNaN(scheduledAt.getTime())) {
      Alert.alert("Error", "Invalid date or time format (use YYYY-MM-DD and HH:MM)");
      return;
    }

    const { dateInput, timeInput, ...restData } = data;
    const payload = { ...restData, scheduledAt: scheduledAt.toISOString() };

    updateActivity({ activityId: id as string, payload }, {
      onSuccess: () => {
        router.back();
      }
    });
  };

  const onErrorForm = (errors: any) => {
    console.log("Form validation errors:", errors);
    Alert.alert("Validation Error", "Please check all fields.");
  };

  if (isLoadingActivity) {
    return (
      <View className="flex-1 bg-zinc-50 items-center justify-center">
        <ActivityIndicator size="large" color="#10b981" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View className="flex-row items-center px-4 pb-4 bg-zinc-50/90 border-b border-zinc-200" style={{ paddingTop: insets.top + 10 }}>
        <TouchableOpacity onPress={() => router.back()} className="w-11 h-11 items-center justify-center rounded-full bg-white border border-zinc-200 shadow-sm mr-3">
          <ChevronLeft size={24} color="#18181b" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-zinc-900">Edit Activity</Text>
      </View>

      <ScrollView className="flex-1 bg-zinc-50" contentContainerStyle={{ paddingBottom: 120, paddingHorizontal: 16, paddingTop: 20 }}>
        <SportSelector control={control} errors={errors} />
        <BasicDetailsCard control={control} errors={errors} />
        <LocationCard control={control} setValue={setValue} errors={errors} />
        <GameSettingsCard control={control} setValue={setValue} errors={errors} />
        <ScheduleCard control={control} errors={errors} />
        <PricingCard control={control} errors={errors} />
        <NotesCard control={control} errors={errors} />
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-zinc-100" style={{ paddingBottom: Math.max(insets.bottom, 20), paddingTop: 16, paddingHorizontal: 16 }}>
        <TouchableOpacity
          onPress={handleSubmit(onSubmit, onErrorForm)}
          disabled={isPending}
          className={`py-4 rounded-2xl items-center shadow-sm ${isPending ? 'bg-emerald-400' : 'bg-emerald-500'}`}
        >
          {isPending ? <ActivityIndicator color="white" /> : <Text className="text-white font-bold text-lg">Save Changes</Text>}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
