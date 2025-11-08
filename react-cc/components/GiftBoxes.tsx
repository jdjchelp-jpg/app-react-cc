import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const colors = ['#dc2626', '#16a34a', '#3b82f6', '#eab308', '#a855f7'];

export const GiftBoxes: React.FC = () => {
  const animations = useRef<Animated.Value[]>(
    colors.map(() => new Animated.Value(0))
  );

  useEffect(() => {
    const anims = animations.current.map((anim, index) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(index * 200),
          Animated.timing(anim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      );
    });

    anims.forEach(anim => anim.start());

    return () => {
      anims.forEach(anim => anim.stop());
    };
  }, []);

  return (
    <View style={styles.container}>
      {colors.map((color, index) => {
        const translateY = animations.current[index].interpolate({
          inputRange: [0, 1],
          outputRange: [0, -20],
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.box,
              {
                backgroundColor: color,
                transform: [{ translateY }],
              },
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 20,
  },
  box: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
});

