import { galleryImages } from '@/lib/data';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
} from 'react-native';
import Pagination from './Pagination';
import SliderItem from './SliderItem';

type SliderProps = {
  data: string[];
};

const Slider = ({ data }: SliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width } = Dimensions.get('window');

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setCurrentIndex(index);
  };
  return (
    <View className="relative">
      <FlatList
        data={data}
        horizontal
        pagingEnabled
        onScroll={onScroll}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <SliderItem item={item} />}
      />
      <Pagination length={galleryImages.length} currentIndex={currentIndex} />
    </View>
  );
};

export default Slider;
