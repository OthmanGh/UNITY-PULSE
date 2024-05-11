import { View, Text, Image } from 'react-native';
import React from 'react';
import { Tabs, Redirect } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#A6F6F1',
          tabBarInactiveTintColor: 'white',
          tabBarStyle: {
            backgroundColor: '#041d29',
            borderTopWidth: 1,
            borderTopColor: '#A6F6F1',
            height: 60,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <View className="items-center justify-center gap-[2px]">
                <Entypo name="home" size={24} color={color} />
                <Text className={`${focused ? 'font-psemibold text-primary' : 'font-pregular text-white'} text-xs`}>Home</Text>
              </View>
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <View className="items-center justify-center gap-[2px]">
                <Ionicons name="person" size={24} color={color} />
                <Text className={`${focused ? 'font-psemibold text-primary' : 'font-pregular text-white'} text-xs`}>Profile</Text>
              </View>
            ),
          }}
        />

        <Tabs.Screen
          name="messages"
          options={{
            title: 'Messages',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <View className="items-center justify-center gap-[2px]">
                <AntDesign name="wechat" size={24} color={color} />
                <Text className={`${focused ? 'font-psemibold text-primary' : 'font-pregular text-white'} text-xs`}>Chat</Text>
              </View>
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
