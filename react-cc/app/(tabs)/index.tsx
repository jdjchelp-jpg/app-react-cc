import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Switch,
  Alert,
  Share,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { Snow } from '@/components/Snow';
import { Sparkles } from '@/components/Sparkles';
import { CountdownTimer } from '@/components/CountdownTimer';
import { CountdownWidget } from '@/components/CountdownWidget';
import { ProgressCircle } from '@/components/ProgressCircle';
import { GiftBoxes } from '@/components/GiftBoxes';
import { ChristmasTree } from '@/components/ChristmasTree';
import { Confetti } from '@/components/Confetti';
import { SantaSleigh } from '@/components/SantaSleigh';

import { quotes } from '@/constants/quotes';
import { themes, getThemeById, Theme } from '@/constants/themes';
import { getTranslation, Language } from '@/constants/translations';

import {
  getCountdownToChristmas,
  getYearProgress,
  getDaysRemaining,
  isChristmasDay,
  getTreeDecorationProgress,
  shouldShowTree,
  getTargetYear,
} from '@/utils/countdown';
import { loadSettings, saveSettings, AppSettings } from '@/utils/storage';
import { requestNotificationPermissions, scheduleChristmasNotifications } from '@/utils/notifications';
import {
  initializeMusic,
  playMusic,
  pauseMusic,
  setMusicVolume,
  getIsPlaying,
} from '@/utils/music';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const [settings, setSettings] = useState<AppSettings>({
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
  });
  
  const [countdown, setCountdown] = useState(getCountdownToChristmas(settings.selectedYear));
  const [currentQuote, setCurrentQuote] = useState(0);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [santaVisible, setSantaVisible] = useState(false);

  const theme = getThemeById(settings.currentTheme);
  const targetYear = getTargetYear(settings.selectedYear);
  const yearProgress = getYearProgress(targetYear);
  const daysRemaining = getDaysRemaining(targetYear);
  const isChristmas = isChristmasDay(targetYear);
  const showTree = shouldShowTree(targetYear);
  const treeProgress = getTreeDecorationProgress(targetYear);

  // Load settings on mount
  useEffect(() => {
    loadSettings().then(loadedSettings => {
      setSettings(loadedSettings);
      initializeMusic(loadedSettings.customMusicUrl || undefined).then(() => {
        setMusicVolume(loadedSettings.musicVolume);
      });
      setMusicPlaying(getIsPlaying());
      if (loadedSettings.notificationsEnabled) {
        requestNotificationPermissions().then(granted => {
          if (granted) {
            scheduleChristmasNotifications(
              loadedSettings.selectedYear,
              loadedSettings.notificationOneWeek,
              loadedSettings.notificationThreeDays,
              loadedSettings.notificationOneDay
            );
          }
        });
      }
    });
  }, []);

  // Auto-advance year on December 26th
  useEffect(() => {
    const now = new Date();
    const dayAfterChristmas = new Date(settings.selectedYear, 11, 26, 0, 0, 0, 0);
    
    if (now >= dayAfterChristmas && settings.selectedYear === targetYear - 1) {
      // Year has advanced, update settings
      handleSaveSettings({ selectedYear: targetYear });
    }
  }, [targetYear, settings.selectedYear]);

  // Update countdown every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdownToChristmas(targetYear));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetYear]);

  // Rotate quotes every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote(prev => (prev + 1) % quotes.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Santa sleigh animation every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSantaVisible(true);
      setTimeout(() => setSantaVisible(false), 10000);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleShare = async () => {
    try {
      const message = `🎄 ${getTranslation('countdown.until', settings.language as Language)} Christmas ${targetYear}! Only ${countdown.days} days, ${countdown.hours} hours, ${countdown.minutes} minutes, and ${countdown.seconds} seconds left!`;
      await Share.share({ message });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleSaveSettings = async (newSettings: Partial<AppSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    await saveSettings(newSettings);
    
    if (newSettings.musicVolume !== undefined) {
      await setMusicVolume(newSettings.musicVolume);
    }
    
    if (newSettings.customMusicUrl !== undefined && newSettings.customMusicUrl) {
      await initializeMusic(newSettings.customMusicUrl);
    }
    
    if (newSettings.notificationsEnabled !== undefined) {
      if (newSettings.notificationsEnabled) {
        const granted = await requestNotificationPermissions();
        if (granted) {
          await scheduleChristmasNotifications(
            updated.selectedYear,
            updated.notificationOneWeek,
            updated.notificationThreeDays,
            updated.notificationOneDay
          );
        } else {
          Alert.alert('Permission Denied', 'Notification permissions are required for this feature.');
        }
      }
    }
  };

  const toggleMusic = async () => {
    if (musicPlaying) {
      await pauseMusic();
    } else {
      await playMusic();
    }
    setMusicPlaying(getIsPlaying());
  };

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <StatusBar style="light" />
      <LinearGradient
        colors={[theme.startColor, theme.endColor, theme.startColor]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      <Snow intensity={settings.snowIntensity} />
      <Sparkles color={theme.sparkleColor} />
      {isChristmas && <Confetti />}
      <SantaSleigh visible={santaVisible} />
      
      <View style={styles.header}>
        <View style={styles.yearContainer}>
          <Ionicons name="calendar" size={20} color="#ffffff" style={styles.calendarIcon} />
          <Text style={styles.yearText}>
            {getTranslation('countdown.until', settings.language as Language)} Christmas {targetYear}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setSettingsVisible(true)}
        >
          <Ionicons name="menu" size={28} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {isChristmas ? (
          <View style={styles.christmasMessage}>
            <Text style={styles.christmasText}>
              {getTranslation('countdown.itsChristmas', settings.language as Language)}
            </Text>
            {showTree && (
              <ChristmasTree
                progress={treeProgress}
                language={settings.language as Language}
              />
            )}
          </View>
        ) : (
          <>
            {showTree && (
              <ChristmasTree
                progress={treeProgress}
                language={settings.language as Language}
              />
            )}
            
            <ProgressCircle
              progress={yearProgress}
              daysRemaining={daysRemaining}
              language={settings.language as Language}
              theme={theme}
            />
            
            <View style={styles.quoteContainer}>
              <Text style={styles.quoteText}>"{quotes[currentQuote]}"</Text>
            </View>
            
            <CountdownWidget
              targetYear={targetYear}
              language={settings.language as Language}
              compact={false}
            />
            
            <CountdownTimer
              time={countdown}
              language={settings.language as Language}
              theme={theme}
            />
          </>
        )}
        
        <GiftBoxes />
      </ScrollView>

      <View style={styles.musicControls}>
        <TouchableOpacity style={styles.musicButton} onPress={toggleMusic}>
          <Ionicons
            name={musicPlaying ? 'pause' : 'play'}
            size={24}
            color="#ffffff"
          />
        </TouchableOpacity>
      </View>

      <SettingsModal
        visible={settingsVisible}
        settings={settings}
        onClose={() => setSettingsVisible(false)}
        onSave={handleSaveSettings}
      />
    </SafeAreaView>
  );
}

// Settings Modal Component
interface SettingsModalProps {
  visible: boolean;
  settings: AppSettings;
  onClose: () => void;
  onSave: (settings: Partial<AppSettings>) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ visible, settings, onSave, onClose }) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 36 }, (_, i) => currentYear + i);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleSave = () => {
    onSave(localSettings);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {getTranslation('settings.title', localSettings.language as Language)}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={28} color="#ffffff" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody}>
            {/* Year Selector */}
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>
                {getTranslation('settings.year', localSettings.language as Language)}
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {years.map(year => (
                  <TouchableOpacity
                    key={year}
                    style={[
                      styles.yearButton,
                      localSettings.selectedYear === year && styles.yearButtonActive,
                    ]}
                    onPress={() => setLocalSettings({ ...localSettings, selectedYear: year })}
                  >
                    <Text
                      style={[
                        styles.yearButtonText,
                        localSettings.selectedYear === year && styles.yearButtonTextActive,
                      ]}
                    >
                      {year}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Theme Selector */}
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>
                {getTranslation('settings.colorTheme', localSettings.language as Language)}
              </Text>
              <View style={styles.themeGrid}>
                {themes.map(theme => (
                  <TouchableOpacity
                    key={theme.id}
                    style={[
                      styles.themeButton,
                      localSettings.currentTheme === theme.id && styles.themeButtonActive,
                    ]}
                    onPress={() => setLocalSettings({ ...localSettings, currentTheme: theme.id })}
                  >
                    <View
                      style={[
                        styles.themePreview,
                        { backgroundColor: theme.startColor },
                      ]}
                    />
                    <Text style={styles.themeName}>{theme.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Snow Intensity */}
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>
                {getTranslation('settings.snowIntensity', localSettings.language as Language)}: {localSettings.snowIntensity}%
              </Text>
              <View style={styles.sliderContainer}>
                <View style={[styles.sliderTrack, { width: `${localSettings.snowIntensity}%` }]} />
              </View>
              <TouchableOpacity
                style={styles.sliderButton}
                onPress={() => {
                  const newValue = Math.max(0, localSettings.snowIntensity - 10);
                  setLocalSettings({ ...localSettings, snowIntensity: newValue });
                }}
              >
                <Text style={styles.sliderButtonText}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.sliderButton}
                onPress={() => {
                  const newValue = Math.min(100, localSettings.snowIntensity + 10);
                  setLocalSettings({ ...localSettings, snowIntensity: newValue });
                }}
              >
                <Text style={styles.sliderButtonText}>+</Text>
              </TouchableOpacity>
            </View>

            {/* Music Volume */}
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>
                {getTranslation('settings.musicVolume', localSettings.language as Language)}: {localSettings.musicVolume}%
              </Text>
              <View style={styles.sliderContainer}>
                <View style={[styles.sliderTrack, { width: `${localSettings.musicVolume}%` }]} />
              </View>
              <TouchableOpacity
                style={styles.sliderButton}
                onPress={() => {
                  const newValue = Math.max(0, localSettings.musicVolume - 10);
                  setLocalSettings({ ...localSettings, musicVolume: newValue });
                }}
              >
                <Text style={styles.sliderButtonText}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.sliderButton}
                onPress={() => {
                  const newValue = Math.min(100, localSettings.musicVolume + 10);
                  setLocalSettings({ ...localSettings, musicVolume: newValue });
                }}
              >
                <Text style={styles.sliderButtonText}>+</Text>
              </TouchableOpacity>
            </View>

            {/* Custom Music URL */}
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>
                {getTranslation('settings.customMusicUrl', localSettings.language as Language)}
              </Text>
              <TextInput
                style={styles.textInput}
                value={localSettings.customMusicUrl}
                onChangeText={(text) => setLocalSettings({ ...localSettings, customMusicUrl: text })}
                placeholder="https://audio.jukehost.co.uk/..."
                placeholderTextColor="#888"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Notifications */}
            <View style={styles.settingRow}>
              <View style={styles.switchRow}>
                <Text style={styles.settingLabel}>
                  {getTranslation('settings.notificationsEnabled', localSettings.language as Language)}
                </Text>
                <Switch
                  value={localSettings.notificationsEnabled}
                  onValueChange={(value) => setLocalSettings({ ...localSettings, notificationsEnabled: value })}
                  trackColor={{ false: '#333', true: '#dc2626' }}
                  thumbColor="#ffffff"
                />
              </View>
              
              {localSettings.notificationsEnabled && (
                <>
                  <View style={styles.notificationInputRow}>
                    <Text style={styles.notificationLabel}>
                      {getTranslation('settings.notificationOneWeek', localSettings.language as Language)}
                    </Text>
                    <TextInput
                      style={styles.notificationInput}
                      value={localSettings.notificationOneWeek}
                      onChangeText={(text) => setLocalSettings({ ...localSettings, notificationOneWeek: text })}
                      placeholder={getTranslation('notifications.oneWeekDefault', localSettings.language as Language)}
                      placeholderTextColor="#888"
                    />
                  </View>
                  
                  <View style={styles.notificationInputRow}>
                    <Text style={styles.notificationLabel}>
                      {getTranslation('settings.notificationThreeDays', localSettings.language as Language)}
                    </Text>
                    <TextInput
                      style={styles.notificationInput}
                      value={localSettings.notificationThreeDays}
                      onChangeText={(text) => setLocalSettings({ ...localSettings, notificationThreeDays: text })}
                      placeholder={getTranslation('notifications.threeDaysDefault', localSettings.language as Language)}
                      placeholderTextColor="#888"
                    />
                  </View>
                  
                  <View style={styles.notificationInputRow}>
                    <Text style={styles.notificationLabel}>
                      {getTranslation('settings.notificationOneDay', localSettings.language as Language)}
                    </Text>
                    <TextInput
                      style={styles.notificationInput}
                      value={localSettings.notificationOneDay}
                      onChangeText={(text) => setLocalSettings({ ...localSettings, notificationOneDay: text })}
                      placeholder={getTranslation('notifications.oneDayDefault', localSettings.language as Language)}
                      placeholderTextColor="#888"
                    />
                  </View>
                </>
              )}
            </View>

            {/* Language */}
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>
                {getTranslation('settings.language', localSettings.language as Language)}
              </Text>
              <View style={styles.languageRow}>
                {(['en', 'es', 'fr', 'nl'] as Language[]).map(lang => (
                  <TouchableOpacity
                    key={lang}
                    style={[
                      styles.languageButton,
                      localSettings.language === lang && styles.languageButtonActive,
                    ]}
                    onPress={() => setLocalSettings({ ...localSettings, language: lang })}
                  >
                    <Text
                      style={[
                        styles.languageButtonText,
                        localSettings.language === lang && styles.languageButtonTextActive,
                      ]}
                    >
                      {lang.toUpperCase()}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Share Button */}
            <TouchableOpacity 
              style={styles.shareButton} 
              onPress={() => {
                const message = `🎄 ${getTranslation('countdown.until', localSettings.language as Language)} Christmas ${localSettings.selectedYear}!`;
                Share.share({ message });
              }}
            >
              <Ionicons name="share" size={20} color="#ffffff" />
              <Text style={styles.shareButtonText}>
                {getTranslation('settings.share', localSettings.language as Language)}
              </Text>
            </TouchableOpacity>
          </ScrollView>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  yearContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarIcon: {
    marginRight: 8,
  },
  yearText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  menuButton: {
    padding: 8,
  },
  content: {
    flexGrow: 1,
    paddingVertical: 20,
    alignItems: 'center',
    gap: 24,
  },
  christmasMessage: {
    padding: 40,
    alignItems: 'center',
  },
  christmasText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  quoteContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    maxWidth: width - 40,
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 24,
  },
  musicControls: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  musicButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1a1a1a',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: height * 0.9,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  modalBody: {
    padding: 20,
  },
  settingRow: {
    marginBottom: 24,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 12,
  },
  yearButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#333',
    marginRight: 8,
  },
  yearButtonActive: {
    backgroundColor: '#dc2626',
  },
  yearButtonText: {
    color: '#ffffff',
    fontSize: 14,
  },
  yearButtonTextActive: {
    fontWeight: 'bold',
  },
  themeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  themeButton: {
    width: (width - 80) / 3,
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#333',
  },
  themeButtonActive: {
    backgroundColor: '#dc2626',
  },
  themePreview: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 8,
  },
  themeName: {
    color: '#ffffff',
    fontSize: 12,
  },
  sliderContainer: {
    height: 8,
    backgroundColor: '#333',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  sliderTrack: {
    height: '100%',
    backgroundColor: '#dc2626',
  },
  sliderButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  sliderButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  languageRow: {
    flexDirection: 'row',
    gap: 12,
  },
  languageButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#333',
  },
  languageButtonActive: {
    backgroundColor: '#dc2626',
  },
  languageButtonText: {
    color: '#ffffff',
    fontSize: 14,
  },
  languageButtonTextActive: {
    fontWeight: 'bold',
  },
  textInput: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 12,
    color: '#ffffff',
    fontSize: 14,
    marginTop: 8,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  notificationInputRow: {
    marginTop: 12,
  },
  notificationLabel: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 8,
    opacity: 0.8,
  },
  notificationInput: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 12,
    color: '#ffffff',
    fontSize: 14,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#dc2626',
    marginTop: 8,
  },
  shareButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  saveButton: {
    padding: 20,
    backgroundColor: '#dc2626',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
