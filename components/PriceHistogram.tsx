import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React from 'react';
import { Dimensions, Text, View } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const histogramData = [2, 4, 6, 8, 10, 14, 18, 20, 18, 14, 10, 8, 6, 4, 2];
const MAX_BAR_HEIGHT = 100;
const BAR_WIDTH = (screenWidth - 70) / histogramData.length - 4; // 32px padding (px-4)

export default function PriceHistogram({
  range,
  setRange,
}: {
  range: number[];
  setRange: (values: number[]) => void;
}) {
  return (
    <View className="mt-6 w-full items-center">
      {/* Histogram */}
      <View className="w-full flex-row items-end justify-between px-4">
        {histogramData.map((value, index) => {
          const heightPercent = (value / Math.max(...histogramData)) * 100;
          const isSelected = index >= range[0] && index <= range[1];

          return (
            <View
              key={index}
              className={`rounded bg-primary-300/90 ${!isSelected ? 'opacity-30' : ''}`}
              style={{
                width: BAR_WIDTH,
                height: `${(heightPercent * MAX_BAR_HEIGHT) / 100}`,
              }}
            />
          );
        })}
      </View>

      <View>
        {/* Slider */}
        <MultiSlider
          values={range}
          sliderLength={screenWidth - 70}
          onValuesChange={(values) => setRange(values)}
          min={0}
          max={histogramData.length - 1}
          step={1}
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
          containerStyle={{
            height: 0,
          }}
        />
      </View>

      {/* Price labels */}
      <View className="mt-5 w-full flex-row justify-between px-6">
        <Text className="font-rubikBold text-primary-300">
          ${range[0] * 20 + 100}
        </Text>
        <Text className="font-rubikBold text-primary-300">
          ${range[1] * 20 + 100}
        </Text>
      </View>
    </View>
  );
}
