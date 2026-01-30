import React, { useEffect, useRef } from 'react';
import { Text, Animated, StyleSheet, Easing } from 'react-native';

interface NightOverlayProps {
  visible: boolean;
}

/**
 * Dark overlay with stars and moon shown when lights are off.
 * Covers the character display area to make it obvious the pet is sleeping.
 */
export const NightOverlay: React.FC<NightOverlayProps> = ({ visible }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const twinkleAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: visible ? 1 : 0,
      duration: 600,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  useEffect(() => {
    if (!visible) return;

    const twinkle = Animated.loop(
      Animated.sequence([
        Animated.timing(twinkleAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(twinkleAnim, {
          toValue: 0.3,
          duration: 1500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    twinkle.start();
    return () => twinkle.stop();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[styles.overlay, { opacity: fadeAnim }]}
      pointerEvents="none"
    >
      {/* Moon */}
      <Text style={styles.moon}>🌙</Text>

      {/* Stars */}
      <Animated.Text style={[styles.star, styles.star1, { opacity: twinkleAnim }]}>
        ✦
      </Animated.Text>
      <Animated.Text style={[styles.star, styles.star2, { opacity: twinkleAnim }]}>
        ✧
      </Animated.Text>
      <Animated.Text style={[styles.star, styles.star3, { opacity: twinkleAnim }]}>
        ✦
      </Animated.Text>
      <Animated.Text style={[styles.star, styles.star4, { opacity: twinkleAnim }]}>
        ·
      </Animated.Text>
      <Animated.Text style={[styles.star, styles.star5, { opacity: twinkleAnim }]}>
        ✧
      </Animated.Text>
      <Animated.Text style={[styles.star, styles.star6, { opacity: twinkleAnim }]}>
        ·
      </Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10, 10, 40, 0.55)',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moon: {
    position: 'absolute',
    top: 8,
    right: 12,
    fontSize: 22,
  },
  star: {
    position: 'absolute',
    color: '#FFE4A0',
    fontWeight: 'bold',
  },
  star1: {
    top: 12,
    left: 18,
    fontSize: 14,
  },
  star2: {
    top: 6,
    left: '45%',
    fontSize: 10,
  },
  star3: {
    bottom: 18,
    right: 22,
    fontSize: 12,
  },
  star4: {
    top: 25,
    right: 35,
    fontSize: 18,
  },
  star5: {
    bottom: 12,
    left: 25,
    fontSize: 10,
  },
  star6: {
    bottom: 30,
    left: '50%',
    fontSize: 16,
  },
});
