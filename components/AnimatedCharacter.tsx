import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet, Easing } from 'react-native';
import { LifeStage } from '../types';

interface AnimatedCharacterProps {
  children: React.ReactNode;
  lifeStage: LifeStage;
  isSick?: boolean;
  isDead?: boolean;
  isSleeping?: boolean;
}

/**
 * Wrapper component that adds idle animations to characters
 * Animations vary based on life stage and status
 */
export const AnimatedCharacter: React.FC<AnimatedCharacterProps> = ({
  children,
  lifeStage,
  isSick = false,
  isDead = false,
  isSleeping = false,
}) => {
  // Animation values
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const breatheAnim = useRef(new Animated.Value(1)).current;
  const wobbleAnim = useRef(new Animated.Value(0)).current;
  const sickSwayAnim = useRef(new Animated.Value(0)).current;

  // Get animation config based on life stage
  const getAnimationConfig = () => {
    switch (lifeStage) {
      case 'baby':
        return {
          bounceDuration: 600,
          bounceHeight: 8,
          breatheScale: 1.05,
          breatheDuration: 1500,
          wobbleAngle: 5,
          wobbleDuration: 400,
        };
      case 'child':
        return {
          bounceDuration: 800,
          bounceHeight: 6,
          breatheScale: 1.03,
          breatheDuration: 2000,
          wobbleAngle: 3,
          wobbleDuration: 600,
        };
      case 'teen':
        return {
          bounceDuration: 1000,
          bounceHeight: 4,
          breatheScale: 1.02,
          breatheDuration: 2500,
          wobbleAngle: 2,
          wobbleDuration: 800,
        };
      case 'adult':
        return {
          bounceDuration: 1200,
          bounceHeight: 3,
          breatheScale: 1.015,
          breatheDuration: 3000,
          wobbleAngle: 1,
          wobbleDuration: 1000,
        };
      case 'senior':
        return {
          bounceDuration: 1500,
          bounceHeight: 2,
          breatheScale: 1.01,
          breatheDuration: 3500,
          wobbleAngle: 0.5,
          wobbleDuration: 1200,
        };
      default:
        return {
          bounceDuration: 1000,
          bounceHeight: 4,
          breatheScale: 1.02,
          breatheDuration: 2500,
          wobbleAngle: 2,
          wobbleDuration: 800,
        };
    }
  };

  const config = getAnimationConfig();

  // Bounce animation (babies bounce more, seniors barely move)
  useEffect(() => {
    if (isDead || isSleeping) {
      bounceAnim.setValue(0);
      return;
    }

    const bounce = Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -config.bounceHeight,
          duration: config.bounceDuration / 2,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: config.bounceDuration / 2,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );

    bounce.start();
    return () => bounce.stop();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lifeStage, isDead, isSleeping, config.bounceDuration, config.bounceHeight]);

  // Breathing animation (subtle scale pulse)
  useEffect(() => {
    const breathe = Animated.loop(
      Animated.sequence([
        Animated.timing(breatheAnim, {
          toValue: isSleeping ? config.breatheScale * 1.02 : config.breatheScale,
          duration: isSleeping ? config.breatheDuration * 1.5 : config.breatheDuration / 2,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(breatheAnim, {
          toValue: 1,
          duration: isSleeping ? config.breatheDuration * 1.5 : config.breatheDuration / 2,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    breathe.start();
    return () => breathe.stop();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lifeStage, isSleeping, config.breatheScale, config.breatheDuration]);

  // Wobble animation for babies and children
  useEffect(() => {
    if (isDead || isSleeping || lifeStage === 'adult' || lifeStage === 'senior') {
      wobbleAnim.setValue(0);
      return;
    }

    const wobble = Animated.loop(
      Animated.sequence([
        Animated.timing(wobbleAnim, {
          toValue: config.wobbleAngle,
          duration: config.wobbleDuration,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(wobbleAnim, {
          toValue: -config.wobbleAngle,
          duration: config.wobbleDuration * 2,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(wobbleAnim, {
          toValue: 0,
          duration: config.wobbleDuration,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    wobble.start();
    return () => wobble.stop();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lifeStage, isDead, isSleeping, config.wobbleAngle, config.wobbleDuration]);

  // Sick sway animation (woozy movement)
  useEffect(() => {
    if (!isSick || isDead) {
      sickSwayAnim.setValue(0);
      return;
    }

    const sway = Animated.loop(
      Animated.sequence([
        Animated.timing(sickSwayAnim, {
          toValue: 8,
          duration: 1500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(sickSwayAnim, {
          toValue: -8,
          duration: 3000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(sickSwayAnim, {
          toValue: 0,
          duration: 1500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    sway.start();
    return () => sway.stop();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSick, isDead]);

  // Combine rotation from wobble and sick sway
  const rotation = Animated.add(wobbleAnim, sickSwayAnim);

  const rotateInterpolation = rotation.interpolate({
    inputRange: [-15, 0, 15],
    outputRange: ['-15deg', '0deg', '15deg'],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          transform: [
            { translateY: bounceAnim },
            { scale: breatheAnim },
            { rotate: rotateInterpolation },
          ],
          opacity: isDead ? 0.5 : 1,
        },
      ]}
    >
      {children}

      {/* Sleeping Z's */}
      {isSleeping && <SleepingIndicator />}
    </Animated.View>
  );
};

/**
 * Animated Z's for sleeping state
 */
const SleepingIndicator: React.FC = () => {
  const z1Anim = useRef(new Animated.Value(0)).current;
  const z2Anim = useRef(new Animated.Value(0)).current;
  const z3Anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const createZAnimation = (anim: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.parallel([
            Animated.timing(anim, {
              toValue: 1,
              duration: 2000,
              useNativeDriver: true,
            }),
          ]),
          Animated.timing(anim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      );
    };

    const anim1 = createZAnimation(z1Anim, 0);
    const anim2 = createZAnimation(z2Anim, 600);
    const anim3 = createZAnimation(z3Anim, 1200);

    anim1.start();
    anim2.start();
    anim3.start();

    return () => {
      anim1.stop();
      anim2.stop();
      anim3.stop();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderZ = (anim: Animated.Value, size: number, offsetX: number, offsetY: number) => {
    const translateY = anim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -40],
    });
    const translateX = anim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 15],
    });
    const opacity = anim.interpolate({
      inputRange: [0, 0.2, 0.8, 1],
      outputRange: [0, 1, 1, 0],
    });
    const scale = anim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 1],
    });

    return (
      <Animated.Text
        style={[
          styles.sleepZ,
          {
            fontSize: size,
            right: offsetX,
            top: offsetY,
            transform: [{ translateY }, { translateX }, { scale }],
            opacity,
          },
        ]}
      >
        Z
      </Animated.Text>
    );
  };

  return (
    <View style={styles.sleepContainer}>
      {renderZ(z1Anim, 16, -10, 0)}
      {renderZ(z2Anim, 20, -20, -10)}
      {renderZ(z3Anim, 24, -30, -25)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sleepContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 60,
    height: 60,
  },
  sleepZ: {
    position: 'absolute',
    color: '#8B8FC7',
    fontWeight: 'bold',
  },
});
