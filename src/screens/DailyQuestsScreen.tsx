import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGameStore } from '../store/useGameStore';
import { calculateLevel, calculateRank } from '../utils/xpCalculator';
import { getCurrentDay, getDayDate } from '../utils/dateUtils';
import { STUDY_PLAN } from '../constants/studyPlan';
import { RankTier } from '../constants/types';
import QuestCard from '../components/QuestCard';
import LevelUpModal from '../components/LevelUpModal';
import PenaltyModal from '../components/PenaltyModal';
import GlowText from '../components/GlowText';

export default function DailyQuestsScreen() {
  const {
    totalXP,
    streak,
    completeQuest,
    uncompleteQuest,
    getQuestsForDay,
    getDayCompletionRate,
    penaltyActive,
    soundEnabled,
  } = useGameStore();

  const [levelUpInfo, setLevelUpInfo] = useState<{ visible: boolean; level: number; rank: RankTier } | null>(null);
  const [showPenalty, setShowPenalty] = useState(false);

  const currentDay = getCurrentDay();
  const quests = getQuestsForDay(currentDay);
  const dayPlan = STUDY_PLAN.find((d) => d.dayNumber === currentDay);
  const completionRate = getDayCompletionRate(currentDay);
  const completedCount = quests.filter((q) => q.status === 'completed').length;

  const handleComplete = useCallback((questId: string) => {
    const result = completeQuest(currentDay, questId);
    if (result.leveledUp) {
      setLevelUpInfo({
        visible: true,
        level: result.newLevel,
        rank: result.newRank as RankTier,
      });
    }
  }, [currentDay, completeQuest]);

  const handleUncomplete = useCallback((questId: string) => {
    uncompleteQuest(currentDay, questId);
  }, [currentDay, uncompleteQuest]);

  // Group quests by category
  const paper1Quests = quests.filter((q) => q.category === 'paper1');
  const paper2Quests = quests.filter((q) => q.category === 'paper2');
  const practiceQuests = quests.filter((q) => q.category === 'practice');

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0f" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.systemTag}>[ DAILY QUESTS ]</Text>
          <GlowText size={20} bold>{`Day ${currentDay}`}</GlowText>
          <Text style={styles.date}>{getDayDate(currentDay)}</Text>
          {dayPlan && (
            <Text style={styles.focus}>
              {dayPlan.isMockDay ? 'MOCK TEST DAY' : dayPlan.isRevisionDay ? 'REVISION DAY' : dayPlan.weekFocus}
            </Text>
          )}
        </View>

        {/* Progress Bar */}
        <View style={styles.progressSection}>
          <View style={styles.progressRow}>
            <Text style={styles.progressLabel}>Quest Progress</Text>
            <Text style={styles.progressCount}>{completedCount}/{quests.length}</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View
              style={[
                styles.progressBarFill,
                {
                  width: `${completionRate * 100}%`,
                  backgroundColor: completionRate >= 0.6 ? '#10b981' : completionRate > 0 ? '#f59e0b' : '#2a2a40',
                },
              ]}
            />
          </View>
          {completedCount === quests.length && quests.length > 0 && (
            <Text style={styles.bonusText}>ALL CLEAR! +50 XP Bonus</Text>
          )}
          {streak > 0 && (
            <Text style={styles.streakText}>Streak: {streak} day{streak > 1 ? 's' : ''}</Text>
          )}
        </View>

        {/* Penalty Warning */}
        {penaltyActive && (
          <View style={styles.penaltyBanner}>
            <Text style={styles.penaltyText}>PENALTY ACTIVE - Complete extra tasks!</Text>
          </View>
        )}

        {/* Paper 1 Quests */}
        {paper1Quests.length > 0 && (
          <View style={styles.questSection}>
            <Text style={styles.sectionTitle}>PAPER 1 - PRELIMS</Text>
            {paper1Quests.map((quest, index) => (
              <QuestCard
                key={quest.id}
                quest={quest}
                index={index}
                onComplete={() => handleComplete(quest.id)}
                onUncomplete={() => handleUncomplete(quest.id)}
              />
            ))}
          </View>
        )}

        {/* Paper 2 Quests */}
        {paper2Quests.length > 0 && (
          <View style={styles.questSection}>
            <Text style={styles.sectionTitle}>PAPER 2 - CSE/IT</Text>
            {paper2Quests.map((quest, index) => (
              <QuestCard
                key={quest.id}
                quest={quest}
                index={index + paper1Quests.length}
                onComplete={() => handleComplete(quest.id)}
                onUncomplete={() => handleUncomplete(quest.id)}
              />
            ))}
          </View>
        )}

        {/* Practice Quests */}
        {practiceQuests.length > 0 && (
          <View style={styles.questSection}>
            <Text style={styles.sectionTitle}>PRACTICE & TESTS</Text>
            {practiceQuests.map((quest, index) => (
              <QuestCard
                key={quest.id}
                quest={quest}
                index={index + paper1Quests.length + paper2Quests.length}
                onComplete={() => handleComplete(quest.id)}
                onUncomplete={() => handleUncomplete(quest.id)}
              />
            ))}
          </View>
        )}

        <View style={{ height: 30 }} />
      </ScrollView>

      {/* Level Up Modal */}
      {levelUpInfo && (
        <LevelUpModal
          visible={levelUpInfo.visible}
          level={levelUpInfo.level}
          rank={levelUpInfo.rank}
          onClose={() => setLevelUpInfo(null)}
        />
      )}

      {/* Penalty Modal */}
      <PenaltyModal visible={showPenalty} onClose={() => setShowPenalty(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0a0a0f' },
  container: { flex: 1, paddingHorizontal: 16 },
  header: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  systemTag: {
    color: '#64748b',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 8,
  },
  date: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 4,
  },
  focus: {
    color: '#8b5cf6',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  progressSection: {
    backgroundColor: '#161625',
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#1e1e30',
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '600',
  },
  progressCount: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#1e1e30',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  bonusText: {
    color: '#10b981',
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 8,
    letterSpacing: 1,
  },
  streakText: {
    color: '#f59e0b',
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 4,
  },
  penaltyBanner: {
    backgroundColor: '#ef444420',
    borderWidth: 1,
    borderColor: '#ef4444',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    alignItems: 'center',
  },
  penaltyText: {
    color: '#ef4444',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  questSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#64748b',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 10,
  },
});
