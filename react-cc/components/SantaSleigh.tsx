import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

interface SantaSleighProps {
  visible: boolean;
}

export const SantaSleigh: React.FC<SantaSleighProps> = ({ visible }) => {
  const translateX = useRef(new Animated.Value(-200)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Reset position
      translateX.setValue(-200);
      opacity.setValue(0);

      // Animate in
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: width + 200,
          duration: 10000, // 10 seconds to cross screen
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Fade out at the end
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ translateX }],
            opacity,
          },
        ]}
      >
        <Text style={styles.sleigh}>🎅🛷</Text>
        <Text style={styles.reindeer}>🦌🦌</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '20%',
    alignItems: 'center',
  },
  sleigh: {
    fontSize: 40,
  },
  reindeer: {
    fontSize: 24,
    marginTop: -10,
  },
});


