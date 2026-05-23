import React from 'react';
import { Platform } from 'react-native';
import { createStaticNavigation, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import DailyQuestsScreen from '../screens/DailyQuestsScreen';
import StudyPlanScreen from '../screens/StudyPlanScreen';
import ProgressScreen from '../screens/ProgressScreen';
import ErrorNotebookScreen from '../screens/ErrorNotebookScreen';
import SettingsScreen from '../screens/SettingsScreen';

const DarkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#0a0a0f',
    card: '#0f0f1a',
    text: '#ffffff',
    border: '#1e1e30',
    primary: '#00d4ff',
  },
};

const Tabs = createBottomTabNavigator({
  screenOptions: {
    headerShown: false,
    tabBarStyle: {
      backgroundColor: '#0f0f1a',
      borderTopColor: '#1e1e30',
      borderTopWidth: 1,
      paddingTop: 5,
      // Let safe area handle bottom padding automatically
      // No fixed height — adapts to device navigation bar
    },
    tabBarHideOnKeyboard: true,
    tabBarActiveTintColor: '#00d4ff',
    tabBarInactiveTintColor: '#64748b',
    tabBarLabelStyle: {
      fontSize: 11,
      fontWeight: '600' as const,
    },
  },
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        tabBarIcon: ({ color, size }: { color: string; size: number }) => (
          <MaterialCommunityIcons name="shield-sword" size={size} color={color} />
        ),
      },
    },
    Quests: {
      screen: DailyQuestsScreen,
      options: {
        tabBarIcon: ({ color, size }: { color: string; size: number }) => (
          <MaterialCommunityIcons name="sword-cross" size={size} color={color} />
        ),
      },
    },
    Plan: {
      screen: StudyPlanScreen,
      options: {
        tabBarIcon: ({ color, size }: { color: string; size: number }) => (
          <MaterialCommunityIcons name="map-legend" size={size} color={color} />
        ),
      },
    },
    Progress: {
      screen: ProgressScreen,
      options: {
        tabBarIcon: ({ color, size }: { color: string; size: number }) => (
          <MaterialCommunityIcons name="chart-line" size={size} color={color} />
        ),
      },
    },
    Settings: {
      screen: SettingsScreen,
      options: {
        tabBarIcon: ({ color, size }: { color: string; size: number }) => (
          <MaterialCommunityIcons name="cog" size={size} color={color} />
        ),
      },
    },
  },
});

const RootStack = createNativeStackNavigator({
  screenOptions: { headerShown: false },
  screens: {
    Splash: SplashScreen,
    Main: Tabs,
    ErrorNotebook: {
      screen: ErrorNotebookScreen,
      options: {
        headerShown: true,
        headerTitle: 'Error Notebook',
        headerStyle: { backgroundColor: '#0f0f1a' },
        headerTintColor: '#00d4ff',
      },
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function AppNavigator() {
  return <Navigation theme={DarkTheme} />;
}
