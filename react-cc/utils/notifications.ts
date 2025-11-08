import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { hasNotificationBeenSent, markNotificationAsSent } from './storage';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const requestNotificationPermissions = async (): Promise<boolean> => {
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      return false;
    }
    
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'Christmas Countdown',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    
    return true;
  } catch (error) {
    console.error('Error requesting notification permissions:', error);
    return false;
  }
};

export const scheduleNotification = async (
  identifier: string,
  title: string,
  body: string,
  trigger: Date
): Promise<void> => {
  try {
    await Notifications.scheduleNotificationAsync({
      identifier,
      content: {
        title,
        body,
        sound: true,
      },
      trigger,
    });
  } catch (error) {
    console.error('Error scheduling notification:', error);
  }
};

export const scheduleChristmasNotifications = async (
  year: number,
  oneWeekMessage: string,
  threeDaysMessage: string,
  oneDayMessage: string
): Promise<void> => {
  const christmas = new Date(year, 11, 25, 0, 0, 0, 0);
  
  // 1 week before
  const oneWeekBefore = new Date(christmas);
  oneWeekBefore.setDate(oneWeekBefore.getDate() - 7);
  
  // 3 days before
  const threeDaysBefore = new Date(christmas);
  threeDaysBefore.setDate(threeDaysBefore.getDate() - 3);
  
  // 1 day before
  const oneDayBefore = new Date(christmas);
  oneDayBefore.setDate(oneDayBefore.getDate() - 1);
  
  const now = new Date();
  
  // Schedule 1 week notification
  if (oneWeekBefore > now) {
    const sent = await hasNotificationBeenSent(year, 'oneWeek');
    if (!sent) {
      await scheduleNotification(
        `christmas-${year}-oneWeek`,
        'Christmas Countdown',
        oneWeekMessage,
        oneWeekBefore
      );
      await markNotificationAsSent(year, 'oneWeek');
    }
  }
  
  // Schedule 3 days notification
  if (threeDaysBefore > now) {
    const sent = await hasNotificationBeenSent(year, 'threeDays');
    if (!sent) {
      await scheduleNotification(
        `christmas-${year}-threeDays`,
        'Christmas Countdown',
        threeDaysMessage,
        threeDaysBefore
      );
      await markNotificationAsSent(year, 'threeDays');
    }
  }
  
  // Schedule 1 day notification
  if (oneDayBefore > now) {
    const sent = await hasNotificationBeenSent(year, 'oneDay');
    if (!sent) {
      await scheduleNotification(
        `christmas-${year}-oneDay`,
        'Christmas Countdown',
        oneDayMessage,
        oneDayBefore
      );
      await markNotificationAsSent(year, 'oneDay');
    }
  }
};

export const cancelAllNotifications = async (): Promise<void> => {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch (error) {
    console.error('Error canceling notifications:', error);
  }
};

