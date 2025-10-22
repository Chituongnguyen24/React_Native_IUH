import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Text, View } from 'react-native';
import { COLORS } from '../../constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Chỉnh sửa',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="gallery"
        options={{
          title: 'Thư viện',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="images" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

// Simple icon component
function TabBarIcon({ name, color }: { name: string; color: string }) {
  return (
    <View style={{ width: 24, height: 24, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, color }}>{name === 'home' ? '🏠' : '🖼️'}</Text>
    </View>
  );
}