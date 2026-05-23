import { XP_PER_LEVEL, RANK_TIERS } from '../constants/xp';
import { RankTier } from '../constants/types';

export function calculateLevel(totalXP: number): number {
  return Math.floor(totalXP / XP_PER_LEVEL) + 1;
}

export function calculateRank(level: number): RankTier {
  for (const tier of RANK_TIERS) {
    if (level >= tier.minLevel && level <= tier.maxLevel) {
      return tier.rank;
    }
  }
  return 'National';
}

export function getRankTitle(level: number): string {
  for (const tier of RANK_TIERS) {
    if (level >= tier.minLevel && level <= tier.maxLevel) {
      return tier.title;
    }
  }
  return 'National Level Hunter';
}

export function xpForNextLevel(totalXP: number): number {
  const currentLevel = calculateLevel(totalXP);
  const xpNeeded = currentLevel * XP_PER_LEVEL;
  return xpNeeded - totalXP;
}

export function xpProgress(totalXP: number): number {
  const xpInCurrentLevel = totalXP % XP_PER_LEVEL;
  return (xpInCurrentLevel / XP_PER_LEVEL) * 100;
}

export function getRankColor(rank: RankTier): string {
  const colors: Record<RankTier, string> = {
    E: '#6b7280',
    D: '#10b981',
    C: '#3b82f6',
    B: '#8b5cf6',
    A: '#f59e0b',
    S: '#ef4444',
    National: '#ec4899',
  };
  return colors[rank];
}
