import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';

import { logo } from '../../constants/images';
import { useAuth } from '../../Context/AuthContext';

const Home = () => {
  const { user } = useAuth();
  console.log(user);
  console.log(user);

  return (
    <SafeAreaView>
      <View className="h-full bg-extraDark relative">
        <Image source={logo} resizeMode="contain" className="h-[60px] absolute right-[120px] top-6" />
        <Text></Text>
      </View>
    </SafeAreaView>
  );
};

export default Home;
