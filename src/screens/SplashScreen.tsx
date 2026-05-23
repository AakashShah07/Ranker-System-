import React, { useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withRepeat,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { useNavigation, CommonActions } from '@react-navigation/native';

export default function SplashScreen() {
  const navigation = useNavigation();
  const titleOpacity = useSharedValue(0);
  const titleScale = useSharedValue(0.8);
  const subtitleOpacity = useSharedValue(0);
  const pulseOpacity = useSharedValue(0.3);

  useEffect(() => {
    titleOpacity.value = withTiming(1, { duration: 1000, easing: Easing.out(Easing.cubic) });
    titleScale.value = withTiming(1, { duration: 1000, easing: Easing.out(Easing.back(1.5)) });
    subtitleOpacity.value = withDelay(800, withTiming(1, { duration: 600 }));
    pulseOpacity.value = withDelay(
      800,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 800 }),
          withTiming(0.3, { duration: 800 })
        ),
        -1
      )
    );

    const timer = setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({ index: 0, routes: [{ name: 'Main' as never }] })
      );
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ scale: titleScale.value }],
  }));

  const subtitleStyle = useAnimatedStyle(() => ({
    opacity: pulseOpacity.value,
  }));

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0f" />
      <Animated.View style={titleStyle}>
        <Text style={styles.systemTag}>[ SYSTEM ]</Text>
        <Text style={styles.title}>RANKER</Text>
        <Text style={styles.titleAlt}>SYSTEM</Text>
      </Animated.View>
      <Animated.View style={[styles.subtitleContainer, subtitleStyle]}>
        <Text style={styles.subtitle}>System Awakening...</Text>
      </Animated.View>
      <Text style={styles.version}>v1.0 | COAL India MT 2026</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  systemTag: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 4,
    textAlign: 'center',
    marginBottom: 8,
  },
  title: {
    color: '#00d4ff',
    fontSize: 52,
    fontWeight: '900',
    letterSpacing: 8,
    textAlign: 'center',
    textShadowColor: '#00d4ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 30,
  },
  titleAlt: {
    color: '#8b5cf6',
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: 12,
    textAlign: 'center',
    textShadowColor: '#8b5cf6',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
    marginTop: -4,
  },
  subtitleContainer: {
    marginTop: 40,
  },
  subtitle: {
    color: '#00d4ff',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 3,
    textShadowColor: '#00d4ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  version: {
    position: 'absolute',
    bottom: 40,
    color: '#2a2a40',
    fontSize: 11,
    fontWeight: '600',
  },
});
