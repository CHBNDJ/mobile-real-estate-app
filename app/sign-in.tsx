import icons from '@/constants/icons';
import { useGlobalContext } from '@/lib/global-provider';
import { Redirect } from 'expo-router';
import React from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import images from '../constants/images';
import { login } from '../lib/appwrite';

const SignIn = () => {
  const { refetch, loading, isLoggedIn } = useGlobalContext();
  const insets = useSafeAreaInsets();

  if (!loading && isLoggedIn) return <Redirect href="/" />;
  const handleLogin = async () => {
    const result = await login();

    if (result) {
      refetch();
      console.log('Login Success');
    } else {
      Alert.alert('Login Failed');
    }
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        contentContainerClassName="h-full"
      >
        <Image
          source={images.onboarding}
          className="h-4/6 w-full"
          resizeMode="contain"
        />
        <View className="px-10">
          <Text className="text-center font-rubik text-base uppercase tracking-widest text-black-200">
            Welcome to RealEstate
          </Text>
          <Text className="mt-3 text-center font-rubikBold text-3xl capitalize text-black-300">
            lets get you closer to {'\n'}
            <Text className="text-primary-300"> your ideal home</Text>
          </Text>
          <Text className="mt-5 text-center font-rubik text-lg text-black-200">
            Login to RealEstate with Google
          </Text>
          <TouchableOpacity
            onPress={handleLogin}
            className="mt-7 w-full rounded-full bg-white py-4 shadow-md shadow-zinc-300"
          >
            <View className="flex-row items-center justify-center gap-3">
              <Image
                source={icons.google}
                className="h-5 w-5"
                resizeMode="contain"
              />
              <Text className="font-rubikMedium text-lg text-black-300">
                Sign Up with Google
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
