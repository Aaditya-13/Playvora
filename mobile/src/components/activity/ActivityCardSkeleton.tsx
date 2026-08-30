import React from 'react';
import { View } from 'react-native';
import { Skeleton } from '../ui/Skeleton';

export const ActivityCardSkeleton = () => {
  return (
    <View 
      className="bg-white rounded-3xl p-5 mb-4 border border-zinc-100"
      style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}
    >
      {/* Header */}
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center flex-1">
          <Skeleton width={48} height={48} borderRadius={24} className="mr-3" />
          <View>
            <Skeleton width={120} height={16} className="mb-2" />
            <Skeleton width={80} height={12} />
          </View>
        </View>
        <Skeleton width={60} height={24} borderRadius={12} />
      </View>

      {/* Title */}
      <Skeleton width="80%" height={24} className="mb-4" />

      {/* Info Grid */}
      <View className="flex-row items-center gap-4 mb-4">
        <Skeleton width={80} height={16} />
        <Skeleton width={80} height={16} />
        <Skeleton width={80} height={16} />
      </View>

      {/* Footer */}
      <View className="flex-row items-center justify-between mt-2 pt-4 border-t border-zinc-50">
        <View className="flex-row items-center">
          <Skeleton width={32} height={32} borderRadius={16} />
          <Skeleton width={32} height={32} borderRadius={16} className="-ml-2 border-2 border-white" />
          <Skeleton width={32} height={32} borderRadius={16} className="-ml-2 border-2 border-white" />
          <Skeleton width={60} height={12} className="ml-3" />
        </View>
        <Skeleton width={80} height={36} borderRadius={18} />
      </View>
    </View>
  );
};
