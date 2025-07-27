import { Card, FeaturedCard } from '@/components/Cards';
import Filters from '@/components/Filters';
import NoResults from '@/components/NoResults';
import Search from '@/components/search';
import Selector from '@/components/Selector';
import icons from '@/constants/icons';
import { getLatestProperties, getProperties } from '@/lib/appwrite';
import { useGlobalContext } from '@/lib/global-provider';
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

export default function Index() {
  const { user } = useGlobalContext();
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const { data: latestProperties, loading: latestPropertiesLoading } =
    useAppwrite({
      fn: getLatestProperties,
    });

  const {
    data: properties,
    loading,
    refetch,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    },
    skip: true,
  });

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 20,
    });
  }, [params.filter, params.query]);

  return (
    <SafeAreaView className="h-full bg-white">
      <FlatList
        data={properties}
        renderItem={({ item }) => (
          <Card item={item} onPress={() => handleCardPress(item.$id)} />
        )}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
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
            <View className="mt-5 flex flex-row items-center justify-between">
              <View className="flex flex-row items-center">
                <Image
                  source={{ uri: user?.avatar }}
                  className="size-12 rounded-full"
                />
                <View className="ml-2 flex flex-col items-start justify-center">
                  <Text className="font-rubik text-xs text-black-100">
                    Good Morning
                  </Text>
                  <Text className="font-rubikMedium text-base text-black-300">
                    {user?.name}
                  </Text>
                </View>
              </View>
              <Image source={icons.bell} className="size-6" />
            </View>
            <Search onOpenSelector={() => setIsSelectorOpen(true)} />
            <View className="my-7">
              <View className="flex flex-row items-center justify-between">
                <Text className="font-rubikBold text-xl text-black-300">
                  Featured
                </Text>
                <TouchableOpacity>
                  <Text className="font-rubikBold text-base text-primary-300">
                    See All
                  </Text>
                </TouchableOpacity>
              </View>
              {latestPropertiesLoading ? (
                <ActivityIndicator size="large" className="text-primary-300" />
              ) : !latestProperties || latestProperties.length === 0 ? (
                <NoResults />
              ) : (
                <FlatList
                  data={latestProperties}
                  renderItem={({ item }) => (
                    <FeaturedCard
                      item={item}
                      onPress={() => handleCardPress(item.$id)}
                    />
                  )}
                  keyExtractor={(item) => item.$id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerClassName="flex mt-5 gap-5"
                  bounces={false}
                />
              )}
            </View>

            <View className="flex flex-row items-center justify-between">
              <Text className="font-rubikBold text-xl text-black-300">
                Our Recommendation
              </Text>
              <TouchableOpacity>
                <Text className="font-rubikBold text-base text-primary-300">
                  See All
                </Text>
              </TouchableOpacity>
            </View>
            <Filters />
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
