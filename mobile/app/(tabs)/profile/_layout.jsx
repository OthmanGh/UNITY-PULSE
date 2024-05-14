import React from 'react';
import { Stack, SplashScreen } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

const profileLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="editprofile"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#042d3e',
          },
          headerTintColor: 'white',
        }}
      />
    </Stack>
  );
};

export default profileLayout;
