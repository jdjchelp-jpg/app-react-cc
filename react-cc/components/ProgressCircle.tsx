import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { getTranslation, Language } from '@/constants/translations';

const { width } = Dimensions.get('window');
const SIZE = width * 0.4;
const STROKE_WIDTH = 12;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

interface ProgressCircleProps {
  progress: number; // 0-100
  daysRemaining: number;
  language: Language;
  theme: { startColor: string; endColor: string };
}

export const ProgressCircle: React.FC<ProgressCircleProps> = ({
  progress,
  daysRemaining,
  language,
  theme,
}) => {
  const offset = CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE;

  return (
    <View style={styles.container}>
      <Svg width={SIZE} height={SIZE}>
        {/* Background circle */}
        <Circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          stroke={`${theme.startColor}33`}
          strokeWidth={STROKE_WIDTH}
          fill="transparent"
        />
        {/* Progress circle */}
        <Circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          stroke="url(#gradient)"
          strokeWidth={STROKE_WIDTH}
          fill="transparent"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={theme.startColor} />
            <stop offset="100%" stopColor={theme.endColor} />
          </linearGradient>
        </defs>
      </Svg>
      <View style={styles.textContainer}>
        <Text style={styles.daysText}>{daysRemaining}</Text>
        <Text style={styles.labelText}>
          {getTranslation('progress.daysRemaining', language)}
        </Text>
        <Text style={styles.percentText}>
          {Math.round(progress)}% {getTranslation('progress.yearComplete', language)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  daysText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  labelText: {
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.8,
    marginTop: 4,
  },
  percentText: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.9,
    marginTop: 8,
  },
});

