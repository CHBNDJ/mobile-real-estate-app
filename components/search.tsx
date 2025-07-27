import icons from '@/constants/icons';
import { router, useLocalSearchParams, usePathname } from 'expo-router';
import React, { useState } from 'react';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';
import { useDebouncedCallback } from 'use-debounce';

const Search = ({ onOpenSelector }: { onOpenSelector: () => void }) => {
  const path = usePathname();
  const params = useLocalSearchParams<{ query?: string }>();
  const [search, setSearch] = useState(params.query);

  const debouncedSearch = useDebouncedCallback(
    (text: string) => router.setParams({ query: text }),
    500,
  );

  const handleSearch = (text: string) => {
    setSearch(text);
    debouncedSearch(text);
  };

  return (
    <View className="mt-5 flex h-14 w-full flex-row items-center justify-between rounded-lg border border-primary-100 bg-accent-100 px-4 py-2">
      <View className="z-50 flex flex-1 flex-row items-center justify-start">
        <Image source={icons.search} className="size-5" />
        <TextInput
          value={search}
          onChangeText={handleSearch}
          placeholder="Search something"
          className="ml-4 flex-1 font-rubik text-sm text-black-100"
        />
      </View>
      <TouchableOpacity onPress={onOpenSelector}>
        <Image source={icons.filter} className="size-5" />
      </TouchableOpacity>
    </View>
  );
};

export default Search;
