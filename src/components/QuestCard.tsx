import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withSpring,
  withTiming,
  FadeInDown,
} from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Quest, Difficulty } from '../constants/types';
import { COLORS } from '../constants/theme';

interface QuestCardProps {
  quest: Quest;
  index: number;
  onComplete: () => void;
  onUncomplete: () => void;
}

const difficultyConfig: Record<Difficulty, { label: string; color: string; icon: string }> = {
  easy: { label: 'EASY', color: COLORS.difficulty.easy, icon: 'shield-outline' },
  normal: { label: 'NORMAL', color: COLORS.difficulty.normal, icon: 'shield-half-full' },
  hard: { label: 'HARD', color: COLORS.difficulty.hard, icon: 'shield' },
  boss: { label: 'BOSS', color: COLORS.difficulty.boss, icon: 'skull-crossbones' },
};

export default function QuestCard({ quest, index, onComplete, onUncomplete }: QuestCardProps) {
  const scale = useSharedValue(1);
  const isCompleted = quest.status === 'completed';
  const diff = difficultyConfig[quest.difficulty];

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    if (isCompleted) {
      onUncomplete();
    } else {
      scale.value = withSequence(
        withSpring(1.05, { damping: 4 }),
        withTiming(1, { duration: 200 })
      );
      onComplete();
    }
  };

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 80).duration(400)}
      style={animatedStyle}
    >
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        style={[
          styles.card,
          isCompleted && styles.cardCompleted,
          { borderLeftColor: diff.color, borderLeftWidth: 3 },
        ]}
      >
        <View style={styles.row}>
          <View style={[styles.checkbox, isCompleted && { backgroundColor: diff.color + '30', borderColor: diff.color }]}>
            {isCompleted ? (
              <MaterialCommunityIcons name="check-bold" size={16} color={diff.color} />
            ) : (
              <View style={styles.checkboxInner} />
            )}
          </View>

          <View style={styles.content}>
            <Text style={[styles.title, isCompleted && styles.titleCompleted]} numberOfLines={2}>
              {quest.title}
            </Text>
            <View style={styles.metaRow}>
              <View style={[styles.diffBadge, { backgroundColor: diff.color + '20' }]}>
                <MaterialCommunityIcons name={diff.icon as any} size={10} color={diff.color} />
                <Text style={[styles.diffText, { color: diff.color }]}>{diff.label}</Text>
              </View>
              <Text style={styles.time}>{quest.estimatedMinutes}m</Text>
              <Text style={styles.subject}>{quest.subject}</Text>
            </View>
          </View>

          <View style={styles.xpContainer}>
            <Text style={[styles.xpValue, { color: diff.color }]}>+{quest.xp}</Text>
            <Text style={styles.xpLabel}>XP</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#161625',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#1e1e30',
  },
  cardCompleted: {
    opacity: 0.6,
    backgroundColor: '#0f0f1a',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#2a2a40',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxInner: {
    width: 10,
    height: 10,
    borderRadius: 3,
  },
  content: {
    flex: 1,
  },
  title: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: '#64748b',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  diffBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    gap: 3,
  },
  diffText: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
  },
  time: {
    color: '#64748b',
    fontSize: 11,
  },
  subject: {
    color: '#94a3b8',
    fontSize: 11,
    fontWeight: '600',
  },
  xpContainer: {
    alignItems: 'center',
    marginLeft: 8,
  },
  xpValue: {
    fontSize: 16,
    fontWeight: '800',
  },
  xpLabel: {
    color: '#64748b',
    fontSize: 9,
    fontWeight: '700',
  },
});
