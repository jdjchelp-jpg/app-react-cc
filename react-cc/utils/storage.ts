import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  SELECTED_YEAR: 'selectedYear',
  CURRENT_THEME: 'currentTheme',
  SNOW_INTENSITY: 'snowIntensity',
  MUSIC_VOLUME: 'musicVolume',
  CUSTOM_MUSIC_URL: 'customMusicUrl',
  NOTIFICATIONS_ENABLED: 'notificationsEnabled',
  NOTIFICATION_ONE_WEEK: 'notificationOneWeek',
  NOTIFICATION_THREE_DAYS: 'notificationThreeDays',
  NOTIFICATION_ONE_DAY: 'notificationOneDay',
  LANGUAGE: 'language',
  NOTIFICATION_SENT: 'notificationSent',
};

export interface AppSettings {
  selectedYear: number;
  currentTheme: string;
  snowIntensity: number;
  musicVolume: number;
  customMusicUrl: string;
  notificationsEnabled: boolean;
  notificationOneWeek: string;
  notificationThreeDays: string;
  notificationOneDay: string;
  language: string;
}

const DEFAULT_SETTINGS: AppSettings = {
  selectedYear: 2025,
  currentTheme: 'classic',
  snowIntensity: 50,
  musicVolume: 50,
  customMusicUrl: '',
  notificationsEnabled: false,
  notificationOneWeek: '🎄 Only 1 week until Christmas!',
  notificationThreeDays: '🎅 Just 3 days left until Christmas!',
  notificationOneDay: '🎁 Christmas is tomorrow!',
  language: 'en',
};

export const loadSettings = async (): Promise<AppSettings> => {
  try {
    const year = await AsyncStorage.getItem(STORAGE_KEYS.SELECTED_YEAR);
    const theme = await AsyncStorage.getItem(STORAGE_KEYS.CURRENT_THEME);
    const snow = await AsyncStorage.getItem(STORAGE_KEYS.SNOW_INTENSITY);
    const volume = await AsyncStorage.getItem(STORAGE_KEYS.MUSIC_VOLUME);
    const musicUrl = await AsyncStorage.getItem(STORAGE_KEYS.CUSTOM_MUSIC_URL);
    const notifications = await AsyncStorage.getItem(STORAGE_KEYS.NOTIFICATIONS_ENABLED);
    const oneWeek = await AsyncStorage.getItem(STORAGE_KEYS.NOTIFICATION_ONE_WEEK);
    const threeDays = await AsyncStorage.getItem(STORAGE_KEYS.NOTIFICATION_THREE_DAYS);
    const oneDay = await AsyncStorage.getItem(STORAGE_KEYS.NOTIFICATION_ONE_DAY);
    const language = await AsyncStorage.getItem(STORAGE_KEYS.LANGUAGE);
    
    return {
      selectedYear: year ? parseInt(year, 10) : DEFAULT_SETTINGS.selectedYear,
      currentTheme: theme || DEFAULT_SETTINGS.currentTheme,
      snowIntensity: snow ? parseInt(snow, 10) : DEFAULT_SETTINGS.snowIntensity,
      musicVolume: volume ? parseInt(volume, 10) : DEFAULT_SETTINGS.musicVolume,
      customMusicUrl: musicUrl || DEFAULT_SETTINGS.customMusicUrl,
      notificationsEnabled: notifications === 'true',
      notificationOneWeek: oneWeek || DEFAULT_SETTINGS.notificationOneWeek,
      notificationThreeDays: threeDays || DEFAULT_SETTINGS.notificationThreeDays,
      notificationOneDay: oneDay || DEFAULT_SETTINGS.notificationOneDay,
      language: language || DEFAULT_SETTINGS.language,
    };
  } catch (error) {
    console.error('Error loading settings:', error);
    return DEFAULT_SETTINGS;
  }
};

export const saveSettings = async (settings: Partial<AppSettings>): Promise<void> => {
  try {
    if (settings.selectedYear !== undefined) {
      await AsyncStorage.setItem(STORAGE_KEYS.SELECTED_YEAR, settings.selectedYear.toString());
    }
    if (settings.currentTheme !== undefined) {
      await AsyncStorage.setItem(STORAGE_KEYS.CURRENT_THEME, settings.currentTheme);
    }
    if (settings.snowIntensity !== undefined) {
      await AsyncStorage.setItem(STORAGE_KEYS.SNOW_INTENSITY, settings.snowIntensity.toString());
    }
    if (settings.musicVolume !== undefined) {
      await AsyncStorage.setItem(STORAGE_KEYS.MUSIC_VOLUME, settings.musicVolume.toString());
    }
    if (settings.customMusicUrl !== undefined) {
      await AsyncStorage.setItem(STORAGE_KEYS.CUSTOM_MUSIC_URL, settings.customMusicUrl);
    }
    if (settings.notificationsEnabled !== undefined) {
      await AsyncStorage.setItem(STORAGE_KEYS.NOTIFICATIONS_ENABLED, settings.notificationsEnabled.toString());
    }
    if (settings.notificationOneWeek !== undefined) {
      await AsyncStorage.setItem(STORAGE_KEYS.NOTIFICATION_ONE_WEEK, settings.notificationOneWeek);
    }
    if (settings.notificationThreeDays !== undefined) {
      await AsyncStorage.setItem(STORAGE_KEYS.NOTIFICATION_THREE_DAYS, settings.notificationThreeDays);
    }
    if (settings.notificationOneDay !== undefined) {
      await AsyncStorage.setItem(STORAGE_KEYS.NOTIFICATION_ONE_DAY, settings.notificationOneDay);
    }
    if (settings.language !== undefined) {
      await AsyncStorage.setItem(STORAGE_KEYS.LANGUAGE, settings.language);
    }
  } catch (error) {
    console.error('Error saving settings:', error);
  }
};

export const hasNotificationBeenSent = async (year: number, type: 'oneWeek' | 'threeDays' | 'oneDay'): Promise<boolean> => {
  try {
    const key = `${STORAGE_KEYS.NOTIFICATION_SENT}-${year}-${type}`;
    const sent = await AsyncStorage.getItem(key);
    return sent === 'true';
  } catch (error) {
    return false;
  }
};

export const markNotificationAsSent = async (year: number, type: 'oneWeek' | 'threeDays' | 'oneDay'): Promise<void> => {
  try {
    const key = `${STORAGE_KEYS.NOTIFICATION_SENT}-${year}-${type}`;
    await AsyncStorage.setItem(key, 'true');
  } catch (error) {
    console.error('Error marking notification as sent:', error);
  }
};

export const resetNotificationFlags = async (year: number): Promise<void> => {
  try {
    await AsyncStorage.removeItem(`${STORAGE_KEYS.NOTIFICATION_SENT}-${year}-oneWeek`);
    await AsyncStorage.removeItem(`${STORAGE_KEYS.NOTIFICATION_SENT}-${year}-threeDays`);
    await AsyncStorage.removeItem(`${STORAGE_KEYS.NOTIFICATION_SENT}-${year}-oneDay`);
  } catch (error) {
    console.error('Error resetting notification flags:', error);
  }
};

