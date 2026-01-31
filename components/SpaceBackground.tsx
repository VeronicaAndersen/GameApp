import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Easing } from 'react-native';

/**
 * Animated space background with twinkling stars, floating planets, and aliens.
 * Rendered behind main content using absolute positioning.
 */
export const SpaceBackground: React.FC = () => {
  const twinkleAnim = useRef(new Animated.Value(0.3)).current;
  const floatAnim1 = useRef(new Animated.Value(0)).current;
  const floatAnim2 = useRef(new Animated.Value(0)).current;
  const floatAnim3 = useRef(new Animated.Value(0)).current;
  const alienAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Twinkling stars
    const twinkle = Animated.loop(
      Animated.sequence([
        Animated.timing(twinkleAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(twinkleAnim, {
          toValue: 0.2,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    // Floating planets - gentle up/down drift
    const float1 = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim1, {
          toValue: -8,
          duration: 4000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim1, {
          toValue: 8,
          duration: 4000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    const float2 = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim2, {
          toValue: 6,
          duration: 5000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim2, {
          toValue: -6,
          duration: 5000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    const float3 = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim3, {
          toValue: -10,
          duration: 6000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim3, {
          toValue: 10,
          duration: 6000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    // Alien wobble
    const alienWobble = Animated.loop(
      Animated.sequence([
        Animated.timing(alienAnim, {
          toValue: 1,
          duration: 3000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(alienAnim, {
          toValue: 0,
          duration: 3000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    twinkle.start();
    float1.start();
    float2.start();
    float3.start();
    alienWobble.start();

    return () => {
      twinkle.stop();
      float1.stop();
      float2.stop();
      float3.stop();
      alienWobble.stop();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const alienTranslateX = alienAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 12],
  });
  const alienTranslateY = alienAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -6, 0],
  });

  return (
    <View style={styles.container} pointerEvents="none">
      {/* Stars */}
      <Animated.Text style={[styles.star, styles.star1, { opacity: twinkleAnim }]}>
        ✦
      </Animated.Text>
      <Animated.Text style={[styles.star, styles.star2, { opacity: twinkleAnim }]}>
        ✧
      </Animated.Text>
      <Animated.Text style={[styles.star, styles.star3, { opacity: twinkleAnim }]}>
        ·
      </Animated.Text>
      <Animated.Text style={[styles.star, styles.star4, { opacity: twinkleAnim }]}>
        ✦
      </Animated.Text>
      <Animated.Text style={[styles.star, styles.star5, { opacity: twinkleAnim }]}>
        ✧
      </Animated.Text>
      <Animated.Text style={[styles.star, styles.star6, { opacity: twinkleAnim }]}>
        ·
      </Animated.Text>
      <Animated.Text style={[styles.star, styles.star7, { opacity: twinkleAnim }]}>
        ✦
      </Animated.Text>
      <Animated.Text style={[styles.star, styles.star8, { opacity: twinkleAnim }]}>
        ✧
      </Animated.Text>

      {/* Planets */}
      <Animated.Text
        style={[styles.planet, styles.planet1, { transform: [{ translateY: floatAnim1 }] }]}
      >
        🪐
      </Animated.Text>
      <Animated.Text
        style={[styles.planet, styles.planet2, { transform: [{ translateY: floatAnim2 }] }]}
      >
        🌍
      </Animated.Text>
      <Animated.Text
        style={[styles.planet, styles.planet3, { transform: [{ translateY: floatAnim3 }] }]}
      >
        🌕
      </Animated.Text>

      {/* Alien */}
      <Animated.Text
        style={[
          styles.alien,
          styles.alien1,
          { transform: [{ translateX: alienTranslateX }, { translateY: alienTranslateY }] },
        ]}
      >
        👽
      </Animated.Text>

      {/* Small rocket */}
      <Animated.Text
        style={[styles.planet, styles.rocket, { transform: [{ translateY: floatAnim2 }] }]}
      >
        🚀
      </Animated.Text>

      {/* UFO */}
      <Animated.Text
        style={[
          styles.alien,
          styles.ufo,
          { transform: [{ translateX: alienTranslateX }, { translateY: alienTranslateY }] },
        ]}
      >
        🛸
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  star: {
    position: 'absolute',
    color: '#FFE4A0',
    fontWeight: 'bold',
  },
  star1: { top: '5%', left: '8%', fontSize: 10 },
  star2: { top: '12%', left: '55%', fontSize: 8 },
  star3: { top: '25%', right: '10%', fontSize: 14 },
  star4: { top: '40%', left: '3%', fontSize: 8 },
  star5: { top: '60%', right: '15%', fontSize: 10 },
  star6: { top: '75%', left: '20%', fontSize: 12 },
  star7: { top: '85%', right: '8%', fontSize: 8 },
  star8: { top: '50%', left: '45%', fontSize: 6 },
  planet: {
    position: 'absolute',
    opacity: 0.5,
  },
  planet1: {
    top: '8%',
    right: '5%',
    fontSize: 28,
  },
  planet2: {
    bottom: '15%',
    left: '3%',
    fontSize: 20,
  },
  planet3: {
    top: '45%',
    right: '3%',
    fontSize: 16,
    opacity: 0.35,
  },
  alien: {
    position: 'absolute',
    opacity: 0.45,
  },
  alien1: {
    bottom: '8%',
    right: '10%',
    fontSize: 22,
  },
  rocket: {
    top: '18%',
    left: '5%',
    fontSize: 18,
    opacity: 0.4,
  },
  ufo: {
    top: '65%',
    left: '8%',
    fontSize: 20,
  },
});
