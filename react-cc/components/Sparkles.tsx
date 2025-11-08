import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

interface SparklesProps {
  color: string;
}

export const Sparkles: React.FC<SparklesProps> = ({ color }) => {
  const sparkles = useRef<Animated.Value[]>([]);
  const numSparkles = 30;

  useEffect(() => {
    sparkles.current = Array.from({ length: numSparkles }, () => new Animated.Value(0));
    
    const animations = sparkles.current.map((anim, index) => {
      const startX = Math.random() * width;
      const startY = Math.random() * height;
      const duration = 2000 + Math.random() * 3000;
      const delay = Math.random() * 2000;
      
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.parallel([
            Animated.timing(anim, {
              toValue: 1,
              duration: duration / 2,
              useNativeDriver: true,
            }),
            Animated.timing(anim, {
              toValue: 0,
              duration: duration / 2,
              delay: duration / 2,
              useNativeDriver: true,
            }),
          ]),
        ])
      );
    });
    
    animations.forEach(anim => anim.start());
    
    return () => {
      animations.forEach(anim => anim.stop());
    };
  }, []);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {sparkles.current.map((anim, index) => {
        const startX = Math.random() * width;
        const startY = Math.random() * height;
        const size = 3 + Math.random() * 5;
        
        return (
          <Animated.View
            key={index}
            style={[
              styles.sparkle,
              {
                left: startX,
                top: startY,
                width: size,
                height: size,
                backgroundColor: color,
                opacity: anim,
              },
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  sparkle: {
    position: 'absolute',
    borderRadius: 50,
  },
});

