import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandStorage } from './storage';
import { Quest, ErrorEntry, MockScore, QuestStatus } from '../constants/types';
import { STUDY_PLAN } from '../constants/studyPlan';
import {
  DAILY_BONUS_XP,
  STREAK_3_BONUS,
  STREAK_7_BONUS,
  PENALTY_THRESHOLD,
  XP_VALUES,
} from '../constants/xp';
import { calculateLevel, calculateRank } from '../utils/xpCalculator';
import { format } from 'date-fns';

interface SubjectProgress {
  total: number;
  completed: number;
}

interface GameState {
  // Player
  totalXP: number;
  streak: number;
  lastCompletedDate: string | null;

  // Quests - tracks completion status per day
  questStatus: Record<string, QuestStatus>; // key: "day-questId"

  // Progress
  completedDays: number[];
  mockScores: MockScore[];
  subjectProgress: Record<string, SubjectProgress>;

  // Error notebook
  errorEntries: ErrorEntry[];

  // Penalty
  penaltyActive: boolean;
  penaltyDayNumber: number | null;

  // Settings
  soundEnabled: boolean;
  notificationsEnabled: boolean;
  reminderTime: string;

  // Computed helpers
  getLevel: () => number;
  getRank: () => string;
  getQuestsForDay: (dayNumber: number) => Quest[];
  getDayCompletionRate: (dayNumber: number) => number;
  getOverallProgress: () => number;

  // Actions
  completeQuest: (dayNumber: number, questId: string) => {
    xpGained: number;
    leveledUp: boolean;
    newLevel: number;
    newRank: string;
    allCompleted: boolean;
    streakBonus: number;
  };
  uncompleteQuest: (dayNumber: number, questId: string) => void;
  checkAndUpdateStreak: () => void;
  checkPenalty: (dayNumber: number) => boolean;
  addMockScore: (score: MockScore) => void;
  addErrorEntry: (entry: Omit<ErrorEntry, 'id' | 'createdAt'>) => void;
  updateErrorEntry: (id: string, updates: Partial<ErrorEntry>) => void;
  deleteErrorEntry: (id: string) => void;
  toggleSound: () => void;
  toggleNotifications: () => void;
  setReminderTime: (time: string) => void;
  resetProgress: () => void;
  exportProgress: () => string;
}

const initialSubjectProgress: Record<string, SubjectProgress> = {
  DBMS: { total: 0, completed: 0 },
  OS: { total: 0, completed: 0 },
  CN: { total: 0, completed: 0 },
  DSA: { total: 0, completed: 0 },
  Algorithms: { total: 0, completed: 0 },
  COA: { total: 0, completed: 0 },
  SE: { total: 0, completed: 0 },
  'Web/IT': { total: 0, completed: 0 },
  Quant: { total: 0, completed: 0 },
  Reasoning: { total: 0, completed: 0 },
  English: { total: 0, completed: 0 },
  GA: { total: 0, completed: 0 },
  Practice: { total: 0, completed: 0 },
};

// Count total quests per subject from study plan
function buildSubjectTotals(): Record<string, SubjectProgress> {
  const totals = JSON.parse(JSON.stringify(initialSubjectProgress));
  for (const day of STUDY_PLAN) {
    for (const quest of day.quests) {
      if (totals[quest.subject]) {
        totals[quest.subject].total++;
      }
    }
  }
  return totals;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      totalXP: 0,
      streak: 0,
      lastCompletedDate: null,
      questStatus: {},
      completedDays: [],
      mockScores: [],
      subjectProgress: buildSubjectTotals(),
      errorEntries: [],
      penaltyActive: false,
      penaltyDayNumber: null,
      soundEnabled: true,
      notificationsEnabled: true,
      reminderTime: '07:00',

      getLevel: () => calculateLevel(get().totalXP),
      getRank: () => calculateRank(calculateLevel(get().totalXP)),

      getQuestsForDay: (dayNumber: number) => {
        const dayPlan = STUDY_PLAN.find((d) => d.dayNumber === dayNumber);
        if (!dayPlan) return [];
        const status = get().questStatus;
        return dayPlan.quests.map((q) => ({
          ...q,
          status: status[`${dayNumber}-${q.id}`] || 'pending',
        }));
      },

      getDayCompletionRate: (dayNumber: number) => {
        const dayPlan = STUDY_PLAN.find((d) => d.dayNumber === dayNumber);
        if (!dayPlan) return 0;
        const status = get().questStatus;
        const completed = dayPlan.quests.filter(
          (q) => status[`${dayNumber}-${q.id}`] === 'completed'
        ).length;
        return dayPlan.quests.length > 0 ? completed / dayPlan.quests.length : 0;
      },

      getOverallProgress: () => {
        const totalQuests = STUDY_PLAN.reduce((sum, d) => sum + d.quests.length, 0);
        const status = get().questStatus;
        const completed = Object.values(status).filter((s) => s === 'completed').length;
        return totalQuests > 0 ? (completed / totalQuests) * 100 : 0;
      },

      completeQuest: (dayNumber, questId) => {
        const state = get();
        const dayPlan = STUDY_PLAN.find((d) => d.dayNumber === dayNumber);
        const quest = dayPlan?.quests.find((q) => q.id === questId);
        if (!quest) {
          return { xpGained: 0, leveledUp: false, newLevel: state.getLevel(), newRank: state.getRank(), allCompleted: false, streakBonus: 0 };
        }

        const key = `${dayNumber}-${questId}`;
        if (state.questStatus[key] === 'completed') {
          return { xpGained: 0, leveledUp: false, newLevel: state.getLevel(), newRank: state.getRank(), allCompleted: false, streakBonus: 0 };
        }

        const prevLevel = calculateLevel(state.totalXP);
        let xpGained = quest.xp;
        let streakBonus = 0;

        // Check if all quests for this day are now completed
        const newStatus = { ...state.questStatus, [key]: 'completed' as QuestStatus };
        const allCompleted = dayPlan!.quests.every(
          (q) => newStatus[`${dayNumber}-${q.id}`] === 'completed'
        );

        if (allCompleted) {
          xpGained += DAILY_BONUS_XP;

          // Streak logic
          const today = format(new Date(), 'yyyy-MM-dd');
          const yesterday = format(new Date(Date.now() - 86400000), 'yyyy-MM-dd');
          let newStreak = state.streak;

          if (state.lastCompletedDate === yesterday || state.lastCompletedDate === today) {
            newStreak = state.lastCompletedDate === today ? state.streak : state.streak + 1;
          } else {
            newStreak = 1;
          }

          if (newStreak === 3) streakBonus = STREAK_3_BONUS;
          if (newStreak === 7) streakBonus = STREAK_7_BONUS;
          if (newStreak > 7 && newStreak % 7 === 0) streakBonus = STREAK_7_BONUS;
          xpGained += streakBonus;

          set({
            streak: newStreak,
            lastCompletedDate: today,
            completedDays: state.completedDays.includes(dayNumber)
              ? state.completedDays
              : [...state.completedDays, dayNumber],
          });
        }

        const newTotalXP = state.totalXP + xpGained;
        const newLevel = calculateLevel(newTotalXP);
        const leveledUp = newLevel > prevLevel;

        // Update subject progress
        const newSubjectProgress = { ...state.subjectProgress };
        if (newSubjectProgress[quest.subject]) {
          newSubjectProgress[quest.subject] = {
            ...newSubjectProgress[quest.subject],
            completed: newSubjectProgress[quest.subject].completed + 1,
          };
        }

        set({
          totalXP: newTotalXP,
          questStatus: newStatus,
          subjectProgress: newSubjectProgress,
        });

        return {
          xpGained,
          leveledUp,
          newLevel,
          newRank: calculateRank(newLevel),
          allCompleted,
          streakBonus,
        };
      },

      uncompleteQuest: (dayNumber, questId) => {
        const state = get();
        const key = `${dayNumber}-${questId}`;
        const quest = STUDY_PLAN.find((d) => d.dayNumber === dayNumber)?.quests.find((q) => q.id === questId);
        if (!quest || state.questStatus[key] !== 'completed') return;

        const newStatus = { ...state.questStatus };
        newStatus[key] = 'pending';

        const newSubjectProgress = { ...state.subjectProgress };
        if (newSubjectProgress[quest.subject]) {
          newSubjectProgress[quest.subject] = {
            ...newSubjectProgress[quest.subject],
            completed: Math.max(0, newSubjectProgress[quest.subject].completed - 1),
          };
        }

        set({
          totalXP: Math.max(0, state.totalXP - quest.xp),
          questStatus: newStatus,
          subjectProgress: newSubjectProgress,
          completedDays: state.completedDays.filter((d) => d !== dayNumber),
        });
      },

      checkAndUpdateStreak: () => {
        const state = get();
        const today = format(new Date(), 'yyyy-MM-dd');
        const yesterday = format(new Date(Date.now() - 86400000), 'yyyy-MM-dd');
        if (state.lastCompletedDate !== today && state.lastCompletedDate !== yesterday) {
          set({ streak: 0 });
        }
      },

      checkPenalty: (dayNumber) => {
        const rate = get().getDayCompletionRate(dayNumber);
        const shouldPenalize = rate > 0 && rate < PENALTY_THRESHOLD;
        set({ penaltyActive: shouldPenalize, penaltyDayNumber: shouldPenalize ? dayNumber : null });
        return shouldPenalize;
      },

      addMockScore: (score) => {
        set((state) => ({
          mockScores: [...state.mockScores, score],
        }));
      },

      addErrorEntry: (entry) => {
        const newEntry: ErrorEntry = {
          ...entry,
          id: `err-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          errorEntries: [...state.errorEntries, newEntry],
        }));
      },

      updateErrorEntry: (id, updates) => {
        set((state) => ({
          errorEntries: state.errorEntries.map((e) =>
            e.id === id ? { ...e, ...updates } : e
          ),
        }));
      },

      deleteErrorEntry: (id) => {
        set((state) => ({
          errorEntries: state.errorEntries.filter((e) => e.id !== id),
        }));
      },

      toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
      toggleNotifications: () => set((s) => ({ notificationsEnabled: !s.notificationsEnabled })),
      setReminderTime: (time) => set({ reminderTime: time }),

      resetProgress: () => {
        set({
          totalXP: 0,
          streak: 0,
          lastCompletedDate: null,
          questStatus: {},
          completedDays: [],
          mockScores: [],
          subjectProgress: buildSubjectTotals(),
          errorEntries: [],
          penaltyActive: false,
          penaltyDayNumber: null,
        });
      },

      exportProgress: () => {
        const state = get();
        return JSON.stringify({
          totalXP: state.totalXP,
          level: calculateLevel(state.totalXP),
          rank: calculateRank(calculateLevel(state.totalXP)),
          streak: state.streak,
          completedDays: state.completedDays,
          mockScores: state.mockScores,
          subjectProgress: state.subjectProgress,
          errorEntries: state.errorEntries,
          questStatus: state.questStatus,
          exportedAt: new Date().toISOString(),
        }, null, 2);
      },
    }),
    {
      name: 'ranker-system-storage',
      storage: createJSONStorage(() => zustandStorage),
      partialize: (state) => ({
        totalXP: state.totalXP,
        streak: state.streak,
        lastCompletedDate: state.lastCompletedDate,
        questStatus: state.questStatus,
        completedDays: state.completedDays,
        mockScores: state.mockScores,
        subjectProgress: state.subjectProgress,
        errorEntries: state.errorEntries,
        penaltyActive: state.penaltyActive,
        penaltyDayNumber: state.penaltyDayNumber,
        soundEnabled: state.soundEnabled,
        notificationsEnabled: state.notificationsEnabled,
        reminderTime: state.reminderTime,
      }),
    }
  )
);
