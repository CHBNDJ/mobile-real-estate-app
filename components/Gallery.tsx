import { galleryImages } from '@/lib/data';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const Gallery = () => {
  const [showAll, setShowAll] = useState(false);

  const firstThreeImages = galleryImages.slice(0, 3);
  const remainingImages = galleryImages.slice(3);

  return (
    <View className="mt-6 flex flex-col gap-5 px-6">
      <Text className="font-rubikSemiBold text-xl text-black-300">Gallery</Text>
      <View className="flex flex-row justify-between">
        {firstThreeImages.map((uri, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              if (index === 2 && remainingImages.length > 0) setShowAll(true);
            }}
          >
            <View className="relative">
              <Image source={{ uri }} className="h-28 w-28 rounded-xl" />
              {index === 2 && remainingImages.length > 0 && !showAll && (
                <View className="absolute inset-0 z-10 items-center justify-center rounded-xl bg-black/50">
                  <Text className="font-rubikBold text-xl text-white">
                    +{remainingImages.length}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
      {showAll && (
        <View className="flex-row flex-wrap justify-between gap-5">
          {remainingImages.map((uri, index) => (
            <TouchableOpacity key={index}>
              <Image
                key={index}
                source={{ uri }}
                className="h-28 w-28 rounded-xl"
              />
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default Gallery;
