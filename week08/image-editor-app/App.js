import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import EditorScreen from './src/screens/EditorScreen';
import GalleryScreen from './src/screens/GalleryScreen';
import HomeScreen from './src/screens/HomeScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Editor') {
              iconName = focused ? 'create' : 'create-outline';
            } else if (route.name === 'Gallery') {
              iconName = focused ? 'images' : 'images-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#6366f1',
          tabBarInactiveTintColor: 'gray',
          headerStyle: {
            backgroundColor: '#6366f1',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'Trang Chủ' }}
        />
        <Tab.Screen 
          name="Editor" 
          component={EditorScreen}
          options={{ title: 'Chỉnh Sửa' }}
        />
        <Tab.Screen 
          name="Gallery" 
          component={GalleryScreen}
          options={{ title: 'Thư Viện' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}