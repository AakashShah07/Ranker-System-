import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationBar } from 'expo-navigation-bar';
import AppNavigator from './src/navigation/AppNavigator';
import { requestPermissions, scheduleMorningReminder, scheduleEveningReminder } from './src/utils/notifications';
import { useGameStore } from './src/store/useGameStore';

export default function App() {
  const { notificationsEnabled, reminderTime } = useGameStore();

  useEffect(() => {
    if (notificationsEnabled) {
      requestPermissions().then((granted) => {
        if (granted) {
          const hour = parseInt(reminderTime.split(':')[0], 10) || 7;
          scheduleMorningReminder(hour);
          scheduleEveningReminder(21);
        }
      });
    }
  }, [notificationsEnabled, reminderTime]);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0f" translucent={false} />
      <NavigationBar style="dark" />
      <AppNavigator />
    </SafeAreaProvider>
  );
}
