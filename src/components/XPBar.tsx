import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { xpProgress, xpForNextLevel, calculateLevel } from '../utils/xpCalculator';
import { XP_PER_LEVEL } from '../constants/xp';

interface XPBarProps {
  totalXP: number;
}

export default function XPBar({ totalXP }: XPBarProps) {
  const progress = xpProgress(totalXP);
  const remaining = xpForNextLevel(totalXP);
  const level = calculateLevel(totalXP);
  const xpInLevel = totalXP % XP_PER_LEVEL;
  const animatedWidth = useSharedValue(0);

  useEffect(() => {
    animatedWidth.value = withTiming(progress, {
      duration: 800,
      easing: Easing.out(Easing.cubic),
    });
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${animatedWidth.value}%`,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>EXP</Text>
        <Text style={styles.xpText}>
          {xpInLevel} / {XP_PER_LEVEL}
        </Text>
      </View>
      <View style={styles.barBg}>
        <Animated.View style={[styles.barFill, animatedStyle]}>
          <LinearGradient
            colors={['#00d4ff', '#8b5cf6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
      </View>
      <Text style={styles.remaining}>{remaining} XP to Level {level + 1}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%' },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    color: '#00d4ff',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
  },
  xpText: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '600',
  },
  barBg: {
    height: 12,
    backgroundColor: '#1e1e30',
    borderRadius: 6,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2a2a40',
  },
  barFill: {
    height: '100%',
    borderRadius: 6,
    overflow: 'hidden',
  },
  remaining: {
    color: '#64748b',
    fontSize: 11,
    marginTop: 4,
    textAlign: 'right',
  },
});
