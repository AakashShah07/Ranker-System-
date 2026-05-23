export type Difficulty = 'easy' | 'normal' | 'hard' | 'boss';
export type QuestStatus = 'pending' | 'completed' | 'missed';
export type Phase = 'foundation' | 'core' | 'completion' | 'mock';

export interface Quest {
  id: string;
  title: string;
  subject: string;
  category: 'paper1' | 'paper2' | 'practice';
  difficulty: Difficulty;
  xp: number;
  estimatedMinutes: number;
  status: QuestStatus;
}

export interface DayPlan {
  dayNumber: number;
  weekNumber: number;
  phase: Phase;
  date: string;
  quests: Quest[];
  isTestDay: boolean;
  isMockDay: boolean;
  isRevisionDay: boolean;
  weekFocus: string;
  scoreTarget: string;
}

export interface ErrorEntry {
  id: string;
  question: string;
  mistake: string;
  concept: string;
  subject: string;
  createdAt: string;
  revisionDate: string;
  revised: boolean;
}

export interface MockScore {
  mockNumber: number;
  date: string;
  paper1Score: number;
  paper2Score: number;
  total: number;
  maxScore: number;
}

export interface SubjectProgress {
  total: number;
  completed: number;
}

export type RankTier = 'E' | 'D' | 'C' | 'B' | 'A' | 'S' | 'National';
