import { Card } from '@/components/Cards';
import Filters from '@/components/Filters';
import NoResults from '@/components/NoResults';
import Search from '@/components/search';
import Selector from '@/components/Selector';
import icons from '@/constants/icons';
import { getProperties } from '@/lib/appwrite';
import { useAppwrite } from '@/lib/useAppwrite';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Portal } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Explore() {
  const params = useLocalSearchParams<{
    query?: string;
    filter?: string;
    bedroom?: string;
    bathroom?: string;
    minSize?: string;
    maxSize?: string;
  }>();
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  const {
    data: properties,
    loading,
    refetch,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 20,
    },
    skip: true,
  });

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      bedroom: params.bedroom ? Number(params.bedroom) : undefined,
      bathroom: params.bathroom ? Number(params.bathroom) : undefined,
      minSize: params.minSize ? Number(params.minSize) : undefined,
      maxSize: params.maxSize ? Number(params.maxSize) : undefined,
      limit: 20,
    });
  }, [params.filter, params.query]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={properties}
        renderItem={({ item }) => (
          <Card item={item} onPress={() => handleCardPress(item.$id)} />
        )}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        columnWrapperClassName="flex gap-5 px-5"
        contentContainerClassName="pb-32"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" className="mt-5 text-primary-300" />
          ) : (
            <NoResults />
          )
        }
        ListHeaderComponent={
          <View className="px-5">
            <View className="mb-2 mt-5 flex flex-row items-center justify-between">
              <TouchableOpacity
                onPress={() => router.back()}
                className="flex size-11 flex-row items-center justify-center rounded-full bg-primary-300/10"
              >
                <Image source={icons.backArrow} className="size-5" />
              </TouchableOpacity>

              <Text className="text-center font-rubikMedium text-base text-black-300">
                Search For Your Ideal Home
              </Text>
              <Image source={icons.bell} className="h-6 w-6" />
            </View>
            <Search onOpenSelector={() => setIsSelectorOpen(true)} />
            <View className="mt-5">
              <Filters />

              <Text className="mt-5 font-rubikBold text-xl text-black-300">
                Found {properties?.length} Properties
              </Text>
            </View>
          </View>
        }
      />

      {isSelectorOpen && (
        <Portal>
          <View className="absolute inset-0">
            {/* Overlay */}
            <TouchableOpacity
              onPress={() => setIsSelectorOpen(false)}
              className="absolute inset-0 h-full bg-black/40"
            />

            <View className="absolute bottom-0 h-4/5 w-full">
              <Selector onClose={() => setIsSelectorOpen(false)} />
            </View>
          </View>
        </Portal>
      )}
    </SafeAreaView>
  );
}
