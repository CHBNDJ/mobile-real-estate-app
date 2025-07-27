import { categories } from '@/constants/data';
import icons from '@/constants/icons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PriceRangeHistogram from './PriceHistogram';

const Selector = ({ onClose }: { onClose: () => void }) => {
  const params = useLocalSearchParams<{ filter?: string }>();
  const [selectedCategory, setSelectedCategory] = useState(params.filter || '');
  const [selectedBedroom, setSelectedBedroom] = useState(1);
  const [selectedBathroom, setSelectedBathroom] = useState(1);
  const [range, setRange] = useState([837, 3230]);
  const [priceRange, setPriceRange] = useState([0, 14]);
  const insets = useSafeAreaInsets();

  const handleCategoryPress = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory('');
      router.setParams({ filter: '' });
      return;
    }

    setSelectedCategory(category);
    router.setParams({ filter: category });
  };
  return (
    <ScrollView className="rounded-t-3xl bg-white px-6">
      <View className="mt-8">
        <View className="flex-row items-center justify-between">
          <View className="h-8 w-8 items-center justify-center rounded-full bg-primary-300/10">
            <TouchableOpacity onPress={onClose}>
              <Image source={icons.backArrow} className="size-5" />
            </TouchableOpacity>
          </View>
          <Text className="items-center font-rubikMedium text-base text-black-300">
            Filter
          </Text>
          <TouchableOpacity
            onPress={() => {
              setSelectedCategory('');
              setSelectedBedroom(1);
              setSelectedBathroom(1);
              setPriceRange([0, 14]);
              setRange([837, 3230]);
              router.setParams({}); // Réinitialise tous les filtres
            }}
          >
            <Text className="font-rubikMedium text-sm text-primary-300">
              Reset
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="mt-10">
        <Text className="font-rubikSemiBold text-base text-black-300">
          Price Range
        </Text>
        <PriceRangeHistogram range={priceRange} setRange={setPriceRange} />
      </View>

      <View className="mt-10 flex-col">
        <Text className="font-rubikSemiBold text-base text-black-300">
          Property Type
        </Text>
        <View className="mt-6 flex-row flex-wrap items-center justify-center gap-3">
          {categories
            .filter((item) => item.category !== 'All')
            .map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleCategoryPress(item.category)}
                className={`mr-4 flex flex-row items-start rounded-full px-5 py-2 ${selectedCategory === item.category ? 'bg-primary-300' : 'border border-primary-200 bg-primary-100'}`}
              >
                <Text
                  className={`text-sm ${selectedCategory === item.category ? 'mt-0.5 font-rubikBold text-white' : 'font-rubik text-black-300'}`}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
        <View className="mt-10">
          <Text className="font-rubikSemiBold text-base text-black-300">
            Home Details
          </Text>
          <View className="mt-6 flex-col gap-3.5">
            <View className="flex-row items-center">
              <Text className="font-rubikMedium text-sm text-black-200">
                Bedrooms
              </Text>
              <View className="ml-auto flex-row items-center gap-4">
                <TouchableOpacity
                  onPress={() =>
                    setSelectedBedroom((prev) => Math.max(1, prev - 1))
                  }
                  className="h-6 w-6 items-center justify-center rounded-3xl bg-primary-300/5 p-0.5"
                >
                  <Text className="text-primary-300">-</Text>
                </TouchableOpacity>

                <Text className="font-rubikBold text-xs text-black-300">
                  {selectedBedroom}
                </Text>

                <TouchableOpacity
                  onPress={() =>
                    setSelectedBedroom((prev) => Math.min(5, prev + 1))
                  }
                  className="h-6 w-6 items-center justify-center rounded-3xl bg-primary-300/5 p-0.5"
                >
                  <Text className="text-primary-300">+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View className="my-1 h-0.5 w-full bg-primary-300/5"></View>

            <View className="flex-row items-center">
              <Text className="font-rubikMedium text-sm text-black-200">
                Bathrooms
              </Text>
              <View className="ml-auto flex-row items-center gap-4">
                <TouchableOpacity
                  onPress={() =>
                    setSelectedBathroom((prev) => Math.max(1, prev - 1))
                  }
                  className="h-6 w-6 items-center justify-center rounded-3xl bg-primary-300/5 p-0.5"
                >
                  <Text className="text-primary-300">-</Text>
                </TouchableOpacity>

                <Text className="font-rubikBold text-xs text-black-300">
                  {selectedBathroom}
                </Text>

                <TouchableOpacity
                  onPress={() =>
                    setSelectedBathroom((prev) => Math.min(5, prev + 1))
                  }
                  className="h-6 w-6 items-center justify-center rounded-3xl bg-primary-300/5 p-0.5"
                >
                  <Text className="text-primary-300">+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View className="mt-12 flex-col">
          <Text className="font-rubikSemiBold text-base text-black-300">
            Building Size
          </Text>
          <View className="mt-4 w-full items-center justify-center">
            {/* Slider */}
            <MultiSlider
              values={range}
              min={837}
              max={3230}
              step={10}
              sliderLength={350}
              onValuesChange={setRange}
              unselectedStyle={{
                backgroundColor: 'rgba(0, 97, 255, 0.1)',
                height: 4,
              }}
              selectedStyle={{ backgroundColor: '#0061FF', height: 4 }}
              markerStyle={{
                backgroundColor: '#fff',
                borderColor: '#0061FF',
                borderWidth: 3,
                height: 24,
                width: 24,
              }}
            />
            <View className="w-full flex-row justify-between">
              <Text className="font-rubikBold text-primary-300">
                {range[0]}
              </Text>
              <Text className="font-rubikBold text-primary-300">
                {range[1]}
              </Text>
            </View>
          </View>
        </View>
        <View
          className="mt-8 items-center justify-center"
          style={{ paddingBottom: insets.bottom + 12 }}
        >
          <TouchableOpacity
            className="w-full items-center justify-center rounded-full bg-primary-300 p-4"
            onPress={() => {
              router.setParams({
                filter: selectedCategory,
                bedroom: selectedBedroom.toString(),
                bathroom: selectedBathroom.toString(),
                minSize: range[0].toString(),
                maxSize: range[1].toString(),
              });
              onClose();
            }}
          >
            <Text className="font-rubikSemiBold text-base text-white">
              Set Filter
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Selector;
