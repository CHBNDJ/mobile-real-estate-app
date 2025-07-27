import icons from '@/constants/icons';
import images from '@/constants/images';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Models } from 'react-native-appwrite';

interface Props {
  onPress?: () => void;
  item: Models.Document;
}

export const FeaturedCard = ({
  item: { image, rating, name, address, price },
  onPress,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="relative flex h-80 w-60 flex-col items-start"
    >
      <Image source={{ uri: image }} className="size-full rounded-2xl" />
      <Image
        source={images.cardGradient}
        className="absolute bottom-0 size-full rounded-2xl"
      />
      <View className="absolute right-5 top-5 flex flex-row items-center gap-1 rounded-full border border-white bg-white/90 px-3 py-1.5">
        <Image source={icons.star} className="size-3.5" />
        <Text className="font-rubikBold text-xs text-primary-300">
          {rating}
        </Text>
      </View>
      <View className="absolute inset-x-5 bottom-5 flex flex-col items-start">
        <Text
          className="font-rubikExtraBold text-xl text-white"
          numberOfLines={1}
        >
          {name}
        </Text>
        <Text className="font-rubik text-base text-white">{address}</Text>
        <View className="flex w-full flex-row items-center justify-between">
          <Text className="font-rubikExtraBold text-xl text-white">
            ${price}
          </Text>
          <Image source={icons.heart} className="size-6" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const Card = ({
  item: { image, rating, name, address, price },
  onPress,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="relative mt-4 w-full flex-1 rounded-lg bg-white px-3 py-4 shadow-lg shadow-black-100/70"
    >
      <View className="absolute right-5 top-6 z-50 flex flex-row items-center gap-0.5 rounded-full border border-white bg-white/90 p-1 px-2">
        <Image source={icons.star} className="size-2.5" />
        <Text className="font-rubikBold text-xs text-primary-300">
          {rating}
        </Text>
      </View>

      <Image source={{ uri: image }} className="h-40 w-full rounded-lg" />

      <View className="mt-2 flex flex-col">
        <Text className="font-rubikBold text-base text-black-300">{name}</Text>
        <Text className="mt-1 font-rubik text-xs text-black-200">
          {address}
        </Text>
        <View className="mt-2 flex flex-row items-center justify-between">
          <Text className="font-rubikBold text-base text-primary-300">
            ${price}
          </Text>
          <Image
            source={icons.heart}
            className="mr-2 h-5 w-5"
            tintColor={'#191D31'}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FeaturedCard;
