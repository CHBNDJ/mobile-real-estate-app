import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

type PaginationProps = {
  length: number;
  currentIndex: number;
};

const Pagination = ({ length, currentIndex }: PaginationProps) => {
  const animatedValues = useRef(
    Array.from({ length }).map(() => new Animated.Value(8)),
  ).current;

  useEffect(() => {
    animatedValues.forEach((animValue, index) => {
      Animated.timing(animValue, {
        toValue: index === currentIndex ? 32 : 8,
        duration: 500,
        useNativeDriver: false,
      }).start();
    });
  }, [currentIndex, animatedValues]);

  return (
    <View className="absolute top-[436px] flex-row gap-1.5 self-center">
      {animatedValues.map((animValue, index) => (
        <Animated.View
          key={index}
          style={{
            marginHorizontal: 4,
            height: 8,
            borderRadius: 4,
            backgroundColor: index === currentIndex ? '#0061FF' : '#FFFFFF',
            width: animValue,
          }}
        />
      ))}
    </View>
  );
};

export default Pagination;
