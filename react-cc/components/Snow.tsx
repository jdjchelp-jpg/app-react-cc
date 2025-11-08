import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

interface SnowProps {
  intensity: number; // 0-100
}

export const Snow: React.FC<SnowProps> = ({ intensity }) => {
  const snowflakes = useRef<Animated.Value[]>([]);
  const numFlakes = Math.floor((intensity / 100) * 100); // 0-100 flakes

  useEffect(() => {
    // Initialize snowflakes
    snowflakes.current = Array.from({ length: numFlakes }, () => new Animated.Value(0));
    
    // Animate each snowflake
    const animations = snowflakes.current.map((anim, index) => {
      const startX = Math.random() * width;
      const duration = 3000 + Math.random() * 5000; // 3-8 seconds
      const delay = Math.random() * 2000;
      
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, {
            toValue: height + 50,
            duration,
            useNativeDriver: true,
          }),
        ])
      );
    });
    
    animations.forEach(anim => anim.start());
    
    return () => {
      animations.forEach(anim => anim.stop());
    };
  }, [intensity]);

  if (numFlakes === 0) return null;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {snowflakes.current.map((anim, index) => {
        const startX = Math.random() * width;
        const size = 2 + Math.random() * 4;
        
        return (
          <Animated.View
            key={index}
            style={[
              styles.snowflake,
              {
                left: startX,
                width: size,
                height: size,
                transform: [{ translateY: anim }],
                opacity: 0.7 + Math.random() * 0.3,
              },
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  snowflake: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    borderRadius: 50,
    top: -10,
  },
});

