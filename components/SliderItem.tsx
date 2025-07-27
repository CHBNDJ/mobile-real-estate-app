import React from 'react';
import { Dimensions, Image, View } from 'react-native';

const { width } = Dimensions.get('window');

const SliderItem = ({ item }: { item: string }) => {
  return (
    <View>
      <Image
        source={{ uri: item }}
        style={{ height: 460, width: width }}
        resizeMode="cover"
      />
    </View>
  );
};

export default SliderItem;
