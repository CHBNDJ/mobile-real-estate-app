import Gallery from '@/components/Gallery';
import Review from '@/components/Review';
import Slider from '@/components/Slider';
import { facilities } from '@/constants/data';
import icons from '@/constants/icons';
import images from '@/constants/images';
import { getPropertyDetails } from '@/lib/appwrite';
import { galleryImages } from '@/lib/data';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const Property = () => {
  const { id } = useLocalSearchParams();
  const [property, setProperty] = useState<any>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      if (id) {
        const data = await getPropertyDetails(id as string);
        setProperty(data);
      }
    };
    fetchProperty();
  }, [id]);

  return (
    <View className="flex-1">
      <ScrollView>
        <View className="relative">
          <Slider data={galleryImages} />
          <View className="absolute left-6 right-6 top-14 mt-14 flex-row items-center justify-between">
            <TouchableOpacity onPress={() => router.back()}>
              <Image source={icons.backArrow} className="size-7" />
            </TouchableOpacity>
            <View className="flex flex-row gap-5">
              <TouchableOpacity>
                <Image
                  source={icons.heart}
                  className="size-7"
                  tintColor={'#191D31'}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={icons.send} className="size-7" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className="mt-8 flex flex-col gap-4 px-6">
          <Text className="font-rubikSemiBold text-2xl text-black-300">
            {property?.name}
          </Text>

          <View className="flex-row items-center gap-2.5">
            <View className="rounded-3xl bg-primary-300/5 px-2.5 py-1.5">
              <Text className="font-rubikMedium text-xs uppercase text-primary-300">
                {property?.type}
              </Text>
            </View>

            <View className="flex-row gap-1.5">
              <Image source={icons.star} className="size-5" />
              <Text className="font-rubikMedium text-sm text-black-200">
                {property?.rating} (1,098 reviews)
              </Text>
            </View>
          </View>
          <View className="flex-row items-center gap-6">
            <View className="flex-row items-center gap-2">
              <View className="rounded-full bg-primary-300/5 p-3">
                <Image source={icons.bed} className="size-5" />
              </View>
              <Text className="font-rubikMedium text-sm text-black-300">
                {property?.bedrooms} Beds
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              <View className="rounded-full bg-primary-300/5 p-3">
                <Image source={icons.bath} className="size-5" />
              </View>
              <Text className="font-rubikMedium text-sm text-black-300">
                {property?.bathrooms} bath
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              <View className="rounded-full bg-primary-300/5 p-3">
                <Image source={icons.area} className="size-5" />
              </View>
              <Text className="font-rubikMedium text-sm text-black-300">
                {property?.area} sqft
              </Text>
            </View>
          </View>
        </View>
        <View className="mx-5 mt-8 h-0.5 bg-primary-300/10"></View>

        <View className="mt-8 flex-col gap-4 px-6">
          <Text className="font-rubikSemiBold text-xl text-black-300">
            Agent
          </Text>
          <View className="flex-row items-center gap-3">
            <Image
              source={{ uri: property?.agent?.avatar }}
              className="h-16 w-16 rounded-full"
            />
            <View className="flex-col gap-1">
              <Text className="font-rubikSemiBold text-lg text-black-300">
                {property?.agent?.name}
              </Text>
              <Text className="font-rubikMedium text-sm text-black-200">
                Owner
              </Text>
            </View>
            <View className="ml-auto flex-row items-center gap-5">
              <TouchableOpacity>
                <Image source={icons.chat} className="size-7" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={icons.phone} className="size-7" />
              </TouchableOpacity>
            </View>
          </View>
          <View className="mt-4 flex-col gap-3">
            <Text className="font-rubikSemiBold text-xl text-black-300">
              Overview
            </Text>
            <Text className="font-rubik text-base text-black-200">
              {property?.description}
            </Text>
          </View>
          <View className="mt-5 flex-col gap-5">
            <Text className="font-rubikSemiBold text-xl text-black-300">
              Facilities
            </Text>
            <View className="flex-row flex-wrap items-center">
              {property?.facilities.map((title, index) => {
                const facility = facilities.find((f) => f.title === title);
                console.log('property.facilities:', property?.facilities);

                return (
                  <View
                    key={index}
                    className="w-1/4 flex-col items-center gap-2"
                  >
                    <View className="rounded-full bg-primary-300/5 p-4">
                      <Image source={facility?.icon} className="h-7 w-7" />
                    </View>
                    <Text
                      className="mb-5 font-rubik text-sm text-black-300"
                      numberOfLines={1}
                    >
                      {title}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
        <Gallery />
        <View className="mt-10 flex-col gap-4 px-6">
          <Text className="font-rubikSemiBold text-xl text-black-300">
            Location
          </Text>
          <View className="flex-row gap-2">
            <Image source={icons?.location} className="size-5" />
            <Text className="font-rubikMedium text-sm tracking-wide text-black-200">
              {property?.address}
            </Text>
          </View>
          <Image source={images.map} className="ml-2 h-52 w-96" />
        </View>
        <Review property={property} />
        <View className="mt-10 rounded-[36px] border border-primary-300/10 bg-white/60 px-6 pb-9 pt-6">
          <View className="flex-row items-center px-1">
            <View className="flex-col gap-1.5">
              <Text className="font-rubikMedium text-xs tracking-widest">
                PRICE
              </Text>
              <Text className="font-rubikSemiBold text-2xl text-primary-300">
                ${property?.price}
              </Text>
            </View>
            <TouchableOpacity className="ml-auto flex-row items-center gap-2 rounded-full bg-primary-300 px-14 py-3.5">
              <Text className="font-rubikSemiBold text-base text-white">
                Booking Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Property;
