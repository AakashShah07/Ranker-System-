import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function requestPermissions(): Promise<boolean> {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') return false;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Ranker System',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
    });
  }
  return true;
}

export async function scheduleMorningReminder(hour: number = 7) {
  await Notifications.cancelAllScheduledNotificationsAsync();
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '[ SYSTEM NOTICE ]',
      body: 'Daily Quest has arrived. Begin your training, Hunter.',
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute: 0,
    },
  });
}

export async function scheduleEveningReminder(hour: number = 21) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '[ WARNING ]',
      body: 'Complete your quests before reset. Penalty Quest may activate.',
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute: 0,
    },
  });
}

export async function sendLevelUpNotification(level: number, rank: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '[ LEVEL UP ]',
      body: `You have reached Level ${level}. Current Rank: ${rank}.`,
    },
    trigger: null,
  });
}

export async function sendStreakNotification(streak: number) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '[ STREAK BONUS ]',
      body: `${streak}-day streak achieved! Bonus XP awarded.`,
    },
    trigger: null,
  });
}
