import React from 'react';
import { View, Text } from 'react-native';
import { Activity } from '../../data/mockActivities';
import { Info } from 'lucide-react-native';

export const NotesCard = ({ activity }: { activity: Activity }) => (
  <View className="bg-blue-50 p-5 rounded-3xl mb-6 border border-blue-100">
    <View className="flex-row items-center mb-3">
      <Info size={18} color="#2563eb" />
      <Text className="text-blue-700 font-bold ml-2">Host Notes</Text>
    </View>
    <Text className="text-blue-900 leading-relaxed">
      Please arrive 10 minutes early. Bring appropriate turf shoes. We will provide the ball and bibs!
    </Text>
  </View>
);
