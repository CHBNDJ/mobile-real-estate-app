import icons from '@/constants/icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const Review = ({ property }: { property: any }) => {
  return (
    <View className="mt-10 flex-col gap-6 px-6">
      <View className="flex-row items-center">
        <View className="flex-row items-center gap-3">
          <Image source={icons.star} className="size-6" />
          <Text className="font-rubikSemiBold text-xl text-black-300">
            {property?.rating} (1,098 reviews)
          </Text>
        </View>
        <TouchableOpacity className="ml-auto">
          <Text className="font-rubikSemiBold text-base text-primary-300">
            See All
          </Text>
        </TouchableOpacity>
      </View>
      {property?.reviews?.map((item: any, index: number) => (
        <View key={index} className="flex-col gap-3">
          <View className="flex-row items-center gap-2.5">
            <Image
              source={{ uri: item.avatar }}
              className="size-10 rounded-full"
            />
            <Text className="font-rubikSemiBold text-base text-black-300">
              {item.name}
            </Text>
          </View>
          <Text className="font-rubik text-base text-black-200">
            {item.review}
          </Text>
        </View>
      ))}
      <View className="flex-row items-center">
        <View className="flex-row items-center gap-1.5">
          <TouchableOpacity>
            <Image
              source={icons.heart}
              className="size-5"
              tintColor={'#0061FF'}
            />
          </TouchableOpacity>
          <Text className="font-rubikMedium text-sm text-black-300">938</Text>
        </View>
        <Text className="ml-auto font-rubik text-sm text-black-100">
          6 days ago
        </Text>
      </View>
    </View>
  );
};

export default Review;
