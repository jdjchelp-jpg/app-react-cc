import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { CountdownTime } from '@/utils/countdown';
import { getTranslation, Language } from '@/constants/translations';

interface CountdownTimerProps {
  time: CountdownTime;
  language: Language;
  theme: { cardColor: string };
}

interface AnimatedNumberProps {
  value: number;
  label: string;
  cardColor: string;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value, label, cardColor }) => {
  const previousValue = useRef(value);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  useEffect(() => {
    if (previousValue.current !== value) {
      // Trigger animation when value changes
      scale.value = withSpring(1.2, {
        damping: 8,
        stiffness: 100,
      }, () => {
        scale.value = withSpring(1, {
          damping: 10,
          stiffness: 150,
        });
      });
      
      opacity.value = withTiming(0.5, { duration: 100 }, () => {
        opacity.value = withTiming(1, { duration: 200 });
      });
      
      previousValue.current = value;
    }
  }, [value, scale, opacity]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  return (
    <View style={[styles.card, { backgroundColor: `${cardColor}33` }]}>
      <Animated.Text style={[styles.number, animatedStyle]}>
        {formatNumber(value)}
      </Animated.Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ time, language, theme }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <AnimatedNumber
          value={time.days}
          label={getTranslation('countdown.days', language)}
          cardColor={theme.cardColor}
        />
        <AnimatedNumber
          value={time.hours}
          label={getTranslation('countdown.hours', language)}
          cardColor={theme.cardColor}
        />
      </View>
      <View style={styles.row}>
        <AnimatedNumber
          value={time.minutes}
          label={getTranslation('countdown.minutes', language)}
          cardColor={theme.cardColor}
        />
        <AnimatedNumber
          value={time.seconds}
          label={getTranslation('countdown.seconds', language)}
          cardColor={theme.cardColor}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    minWidth: 120,
    backdropFilter: 'blur(10px)',
  },
  number: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

