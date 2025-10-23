// app/_layout.tsx
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { getCartCount, subscribe } from '../src/state/cartStore';

const COLORS = {
  primary: '#FF6B6B',
  secondary: '#4ECDC4',
  background: '#F7F7F7',
  white: '#FFFFFF',
  text: '#2C3E50',
  textLight: '#7F8C8D',
  border: '#E0E0E0',
  success: '#2ECC71',
  danger: '#E74C3C',
};

export default function Layout() {
  const [count, setCount] = useState<number>(getCartCount());

  useEffect(() => {
    const unsub = subscribe((n) => setCount(n));
    return unsub;
  }, []);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textLight,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
          height: Platform.OS === 'ios' ? 88 : 64,
          paddingBottom: Platform.OS === 'ios' ? 24 : 8,
          paddingTop: 8,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Sản phẩm',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? "home" : "home-outline"} 
              color={color} 
              size={size} 
            />
          ),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: 'Giỏ hàng',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? "cart" : "cart-outline"} 
              color={color} 
              size={size} 
            />
          ),
          tabBarBadge: count > 0 ? count : undefined,
          tabBarBadgeStyle: {
            backgroundColor: COLORS.primary,
            color: COLORS.white,
            fontSize: 10,
            fontWeight: 'bold',
            minWidth: 18,
            height: 18,
            borderRadius: 9,
            marginTop: 2,
          },
        }}
      />

      <Tabs.Screen
        name="invoice"
        options={{
          title: 'Hóa đơn',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? "receipt" : "receipt-outline"} 
              color={color} 
              size={size} 
            />
          ),
        }}
      />
    </Tabs>
  );
}