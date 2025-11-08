import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { getCountdownToChristmas } from '@/utils/countdown';
import { getTranslation, Language } from '@/constants/translations';
import { Ionicons } from '@expo/vector-icons';

interface CountdownWidgetProps {
  targetYear?: number;
  language?: Language;
  compact?: boolean;
  onPress?: () => void;
}

export const CountdownWidget: React.FC<CountdownWidgetProps> = ({
  targetYear = 2025,
  language = 'en',
  compact = false,
  onPress,
}) => {
  const [countdown, setCountdown] = useState(getCountdownToChristmas(targetYear));

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdownToChristmas(targetYear));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetYear]);

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  const content = (
    <View style={[styles.container, compact && styles.compactContainer]}>
      <View style={styles.header}>
        <Ionicons name="calendar" size={compact ? 16 : 20} color="#ffffff" />
        <Text style={[styles.title, compact && styles.compactTitle]}>
          {getTranslation('countdown.until', language)} Christmas {targetYear}
        </Text>
      </View>

      <View style={styles.countdownGrid}>
        <View style={styles.timeUnit}>
          <Text style={[styles.number, compact && styles.compactNumber]}>
            {formatNumber(countdown.days)}
          </Text>
          <Text style={[styles.label, compact && styles.compactLabel]}>
            {getTranslation('countdown.days', language)}
          </Text>
        </View>

        <View style={styles.separator}>
          <Text style={[styles.separatorText, compact && styles.compactSeparator]}>:</Text>
        </View>

        <View style={styles.timeUnit}>
          <Text style={[styles.number, compact && styles.compactNumber]}>
            {formatNumber(countdown.hours)}
          </Text>
          <Text style={[styles.label, compact && styles.compactLabel]}>
            {getTranslation('countdown.hours', language)}
          </Text>
        </View>

        <View style={styles.separator}>
          <Text style={[styles.separatorText, compact && styles.compactSeparator]}>:</Text>
        </View>

        <View style={styles.timeUnit}>
          <Text style={[styles.number, compact && styles.compactNumber]}>
            {formatNumber(countdown.minutes)}
          </Text>
          <Text style={[styles.label, compact && styles.compactLabel]}>
            {getTranslation('countdown.minutes', language)}
          </Text>
        </View>

        <View style={styles.separator}>
          <Text style={[styles.separatorText, compact && styles.compactSeparator]}>:</Text>
        </View>

        <View style={styles.timeUnit}>
          <Text style={[styles.number, compact && styles.compactNumber]}>
            {formatNumber(countdown.seconds)}
          </Text>
          <Text style={[styles.label, compact && styles.compactLabel]}>
            {getTranslation('countdown.seconds', language)}
          </Text>
        </View>
      </View>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(220, 38, 38, 0.9)',
    borderRadius: 16,
    padding: 16,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  compactContainer: {
    padding: 12,
    borderRadius: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 8,
  },
  compactTitle: {
    fontSize: 14,
  },
  countdownGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  timeUnit: {
    alignItems: 'center',
    minWidth: 50,
  },
  number: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  compactNumber: {
    fontSize: 24,
  },
  label: {
    fontSize: 12,
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    opacity: 0.9,
  },
  compactLabel: {
    fontSize: 10,
  },
  separator: {
    marginHorizontal: 4,
    justifyContent: 'center',
  },
  separatorText: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  compactSeparator: {
    fontSize: 18,
  },
});

