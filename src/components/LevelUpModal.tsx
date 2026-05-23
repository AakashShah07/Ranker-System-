import React, { useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withSpring,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { RankTier } from '../constants/types';
import { getRankColor, getRankTitle } from '../utils/xpCalculator';

interface LevelUpModalProps {
  visible: boolean;
  level: number;
  rank: RankTier;
  onClose: () => void;
}

export default function LevelUpModal({ visible, level, rank, onClose }: LevelUpModalProps) {
  const scale = useSharedValue(0);
  const glow = useSharedValue(0);
  const color = getRankColor(rank);
  const title = getRankTitle(level);

  useEffect(() => {
    if (visible) {
      scale.value = withSequence(
        withSpring(1.2, { damping: 4, stiffness: 100 }),
        withTiming(1, { duration: 300 })
      );
      glow.value = withDelay(
        200,
        withSequence(
          withTiming(1, { duration: 500 }),
          withTiming(0.6, { duration: 500 }),
          withTiming(1, { duration: 500 })
        )
      );
    } else {
      scale.value = 0;
      glow.value = 0;
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: scale.value,
  }));

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Animated.View style={[styles.content, animatedStyle]}>
          <Text style={styles.systemText}>[ SYSTEM NOTIFICATION ]</Text>
          <Text style={styles.levelUpText}>LEVEL UP!</Text>
          <View style={[styles.rankCircle, { borderColor: color }]}>
            <Text style={[styles.rankText, { color, textShadowColor: color }]}>
              {rank === 'National' ? 'NL' : rank}
            </Text>
            <Text style={styles.levelNum}>Lv.{level}</Text>
          </View>
          <Text style={[styles.title, { color }]}>{title}</Text>
          <Text style={styles.subtitle}>Your power grows stronger.</Text>

          <TouchableOpacity style={[styles.button, { backgroundColor: color + '30', borderColor: color }]} onPress={onClose}>
            <Text style={[styles.buttonText, { color }]}>ACKNOWLEDGE</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#0f0f1a',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1e1e30',
    width: '85%',
  },
  systemText: {
    color: '#64748b',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 12,
  },
  levelUpText: {
    color: '#f59e0b',
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 4,
    textShadowColor: '#f59e0b',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
    marginBottom: 20,
  },
  rankCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
    marginBottom: 16,
  },
  rankText: {
    fontSize: 32,
    fontWeight: '900',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  levelNum: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '700',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  subtitle: {
    color: '#64748b',
    fontSize: 13,
    marginBottom: 24,
  },
  button: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 2,
  },
});
