import { Difficulty, RankTier } from './types';

export const XP_VALUES: Record<Difficulty, number> = {
  easy: 10,
  normal: 20,
  hard: 35,
  boss: 60,
};

export const DAILY_BONUS_XP = 50;
export const STREAK_3_BONUS = 30;
export const STREAK_7_BONUS = 100;
export const XP_PER_LEVEL = 250;

export const START_DATE = '2026-05-23';
export const END_DATE = '2026-07-21';
export const TOTAL_DAYS = 60;

export const RANK_TIERS: { rank: RankTier; minLevel: number; maxLevel: number; title: string }[] = [
  { rank: 'E', minLevel: 1, maxLevel: 5, title: 'E-Rank Hunter' },
  { rank: 'D', minLevel: 6, maxLevel: 10, title: 'D-Rank Hunter' },
  { rank: 'C', minLevel: 11, maxLevel: 15, title: 'C-Rank Hunter' },
  { rank: 'B', minLevel: 16, maxLevel: 22, title: 'B-Rank Hunter' },
  { rank: 'A', minLevel: 23, maxLevel: 30, title: 'A-Rank Hunter' },
  { rank: 'S', minLevel: 31, maxLevel: 40, title: 'S-Rank Hunter' },
  { rank: 'National', minLevel: 41, maxLevel: 999, title: 'National Level Hunter' },
];

export const PENALTY_THRESHOLD = 0.6;

export const SUBJECTS = [
  'DBMS', 'OS', 'CN', 'DSA', 'Algorithms', 'COA', 'SE', 'Web/IT',
  'Quant', 'Reasoning', 'English', 'GA',
] as const;

export type Subject = typeof SUBJECTS[number];
