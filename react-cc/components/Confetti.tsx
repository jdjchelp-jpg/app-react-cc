import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const NUM_CONFETTI = 150;

const colors = ['#dc2626', '#16a34a', '#3b82f6', '#eab308', '#a855f7', '#ec4899', '#ffffff'];

export const Confetti: React.FC = () => {
  const confetti = useRef<Array<{
    x: Animated.Value;
    y: Animated.Value;
    rotation: Animated.Value;
    color: string;
    size: number;
  }>>([]);

  useEffect(() => {
    confetti.current = Array.from({ length: NUM_CONFETTI }, () => ({
      x: new Animated.Value(Math.random() * width),
      y: new Animated.Value(-20),
      rotation: new Animated.Value(0),
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 8 + Math.random() * 12,
    }));

    const animations = confetti.current.map((item) => {
      const duration = 3000 + Math.random() * 2000;
      const endX = item.x._value + (Math.random() - 0.5) * 200;
      const endY = height + 50;
      const rotations = 2 + Math.random() * 4;

      return Animated.parallel([
        Animated.timing(item.y, {
          toValue: endY,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(item.x, {
          toValue: endX,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(item.rotation, {
          toValue: rotations * 360,
          duration,
          useNativeDriver: true,
        }),
      ]);
    });

    animations.forEach(anim => anim.start());
  }, []);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {confetti.current.map((item, index) => {
        const rotate = item.rotation.interpolate({
          inputRange: [0, 360],
          outputRange: ['0deg', '360deg'],
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.confetti,
              {
                left: item.x,
                top: item.y,
                width: item.size,
                height: item.size,
                backgroundColor: item.color,
                transform: [{ rotate }],
              },
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  confetti: {
    position: 'absolute',
    borderRadius: 2,
  },
});

