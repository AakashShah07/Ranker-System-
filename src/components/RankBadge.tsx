import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RankTier } from '../constants/types';
import { getRankColor } from '../utils/xpCalculator';

interface RankBadgeProps {
  rank: RankTier;
  level: number;
  size?: 'small' | 'large';
}

export default function RankBadge({ rank, level, size = 'small' }: RankBadgeProps) {
  const color = getRankColor(rank);
  const isLarge = size === 'large';

  return (
    <View style={[styles.container, { borderColor: color }, isLarge && styles.containerLarge]}>
      <View style={[styles.inner, { backgroundColor: color + '20' }]}>
        <Text
          style={[
            styles.rankText,
            { color, textShadowColor: color },
            isLarge && styles.rankTextLarge,
          ]}
        >
          {rank === 'National' ? 'NL' : rank}
        </Text>
        <Text style={[styles.levelText, isLarge && styles.levelTextLarge]}>
          Lv.{level}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 2,
  },
  containerLarge: {
    borderRadius: 16,
    borderWidth: 3,
  },
  inner: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'center',
  },
  rankText: {
    fontSize: 20,
    fontWeight: '900',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  rankTextLarge: {
    fontSize: 36,
  },
  levelText: {
    color: '#94a3b8',
    fontSize: 10,
    fontWeight: '700',
    marginTop: 2,
  },
  levelTextLarge: {
    fontSize: 14,
  },
});
