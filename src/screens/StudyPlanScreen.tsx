import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useGameStore } from '../store/useGameStore';
import { STUDY_PLAN } from '../constants/studyPlan';
import { getCurrentDay, getDayDateShort } from '../utils/dateUtils';
import GlowText from '../components/GlowText';

const PHASE_COLORS: Record<string, string> = {
  foundation: '#00d4ff',
  core: '#8b5cf6',
  completion: '#f59e0b',
  mock: '#ef4444',
};

const PHASE_LABELS: Record<string, string> = {
  foundation: 'PHASE 1: FOUNDATION',
  core: 'PHASE 2: CORE BUILDING',
  completion: 'PHASE 3: COMPLETION',
  mock: 'PHASE 4: MOCK INTENSIVE',
};

export default function StudyPlanScreen() {
  const { completedDays, getDayCompletionRate } = useGameStore();
  const currentDay = getCurrentDay();
  const [expandedWeeks, setExpandedWeeks] = useState<Set<number>>(
    new Set([Math.ceil(currentDay / 7)])
  );

  // Group days by week
  const weeks: Record<number, typeof STUDY_PLAN> = {};
  STUDY_PLAN.forEach((day) => {
    if (!weeks[day.weekNumber]) weeks[day.weekNumber] = [];
    weeks[day.weekNumber].push(day);
  });

  const toggleWeek = (week: number) => {
    setExpandedWeeks((prev) => {
      const next = new Set(prev);
      if (next.has(week)) next.delete(week);
      else next.add(week);
      return next;
    });
  };

  let lastPhase = '';

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0f" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.systemTag}>[ QUEST MAP ]</Text>
          <GlowText size={20} bold>60-Day Battle Plan</GlowText>
          <Text style={styles.subtitle}>Day {currentDay} of 60</Text>
        </View>

        {Object.entries(weeks).map(([weekStr, days]) => {
          const week = Number(weekStr);
          const isExpanded = expandedWeeks.has(week);
          const firstDay = days[0];
          const phaseColor = PHASE_COLORS[firstDay.phase] || '#00d4ff';
          const showPhaseHeader = firstDay.phase !== lastPhase;
          lastPhase = firstDay.phase;

          const weekCompleted = days.filter((d) =>
            completedDays.includes(d.dayNumber)
          ).length;

          return (
            <View key={week}>
              {showPhaseHeader && (
                <View style={[styles.phaseHeader, { borderColor: phaseColor }]}>
                  <Text style={[styles.phaseText, { color: phaseColor }]}>
                    {PHASE_LABELS[firstDay.phase]}
                  </Text>
                </View>
              )}

              <TouchableOpacity
                style={[styles.weekHeader, { borderLeftColor: phaseColor }]}
                onPress={() => toggleWeek(week)}
                activeOpacity={0.7}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.weekTitle}>Week {week}</Text>
                  <Text style={styles.weekFocus}>{firstDay.weekFocus}</Text>
                </View>
                <View style={styles.weekMeta}>
                  <Text style={styles.weekProgress}>{weekCompleted}/{days.length}</Text>
                  <MaterialCommunityIcons
                    name={isExpanded ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color="#64748b"
                  />
                </View>
              </TouchableOpacity>

              {isExpanded &&
                days.map((day) => {
                  const isToday = day.dayNumber === currentDay;
                  const isComplete = completedDays.includes(day.dayNumber);
                  const isPast = day.dayNumber < currentDay;
                  const rate = getDayCompletionRate(day.dayNumber);

                  const paper1Tasks = day.quests
                    .filter((q) => q.category === 'paper1')
                    .map((q) => q.title)
                    .join(' | ');
                  const paper2Tasks = day.quests
                    .filter((q) => q.category === 'paper2')
                    .map((q) => q.title)
                    .join(' | ');
                  const practiceTasks = day.quests
                    .filter((q) => q.category === 'practice')
                    .map((q) => q.title)
                    .join(' | ');

                  return (
                    <View
                      key={day.dayNumber}
                      style={[
                        styles.dayCard,
                        isToday && styles.dayCardToday,
                        isComplete && styles.dayCardComplete,
                      ]}
                    >
                      <View style={styles.dayHeader}>
                        <View style={styles.dayBadgeRow}>
                          <View style={[
                            styles.dayBadge,
                            { backgroundColor: isToday ? '#00d4ff' : isComplete ? '#10b981' : isPast ? '#64748b' : '#2a2a40' },
                          ]}>
                            <Text style={styles.dayBadgeText}>D{day.dayNumber}</Text>
                          </View>
                          <Text style={styles.dayDate}>{getDayDateShort(day.dayNumber)}</Text>
                          {day.isMockDay && (
                            <View style={styles.mockTag}>
                              <Text style={styles.mockTagText}>MOCK</Text>
                            </View>
                          )}
                          {day.isTestDay && (
                            <View style={[styles.mockTag, { backgroundColor: '#f59e0b20' }]}>
                              <Text style={[styles.mockTagText, { color: '#f59e0b' }]}>TEST</Text>
                            </View>
                          )}
                          {day.isRevisionDay && (
                            <View style={[styles.mockTag, { backgroundColor: '#8b5cf620' }]}>
                              <Text style={[styles.mockTagText, { color: '#8b5cf6' }]}>REV</Text>
                            </View>
                          )}
                        </View>
                        {rate > 0 && (
                          <Text style={[styles.rateText, { color: rate >= 0.6 ? '#10b981' : '#f59e0b' }]}>
                            {Math.round(rate * 100)}%
                          </Text>
                        )}
                      </View>

                      {paper1Tasks.length > 0 && (
                        <View style={styles.topicRow}>
                          <Text style={styles.topicLabel}>P1</Text>
                          <Text style={styles.topicText} numberOfLines={2}>{paper1Tasks}</Text>
                        </View>
                      )}
                      {paper2Tasks.length > 0 && (
                        <View style={styles.topicRow}>
                          <Text style={[styles.topicLabel, { color: '#8b5cf6' }]}>P2</Text>
                          <Text style={styles.topicText} numberOfLines={2}>{paper2Tasks}</Text>
                        </View>
                      )}
                      {practiceTasks.length > 0 && (
                        <View style={styles.topicRow}>
                          <Text style={[styles.topicLabel, { color: '#f59e0b' }]}>PR</Text>
                          <Text style={styles.topicText} numberOfLines={2}>{practiceTasks}</Text>
                        </View>
                      )}
                    </View>
                  );
                })}
            </View>
          );
        })}
        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0a0a0f' },
  container: { flex: 1, paddingHorizontal: 16 },
  header: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  systemTag: {
    color: '#64748b',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 8,
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 4,
  },
  phaseHeader: {
    borderLeftWidth: 3,
    paddingLeft: 12,
    paddingVertical: 8,
    marginBottom: 8,
    marginTop: 16,
  },
  phaseText: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 2,
  },
  weekHeader: {
    backgroundColor: '#161625',
    borderRadius: 10,
    padding: 14,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 3,
    borderWidth: 1,
    borderColor: '#1e1e30',
  },
  weekTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  weekFocus: {
    color: '#94a3b8',
    fontSize: 11,
    marginTop: 2,
  },
  weekMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  weekProgress: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: '700',
  },
  dayCard: {
    backgroundColor: '#0f0f1a',
    borderRadius: 10,
    padding: 12,
    marginBottom: 6,
    marginLeft: 16,
    borderWidth: 1,
    borderColor: '#1e1e30',
  },
  dayCardToday: {
    borderColor: '#00d4ff50',
    backgroundColor: '#00d4ff08',
  },
  dayCardComplete: {
    borderColor: '#10b98130',
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  dayBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dayBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  dayBadgeText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '800',
  },
  dayDate: {
    color: '#64748b',
    fontSize: 11,
  },
  mockTag: {
    backgroundColor: '#ef444420',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  mockTagText: {
    color: '#ef4444',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
  },
  rateText: {
    fontSize: 12,
    fontWeight: '700',
  },
  topicRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  topicLabel: {
    color: '#00d4ff',
    fontSize: 10,
    fontWeight: '800',
    width: 22,
    marginTop: 1,
  },
  topicText: {
    color: '#94a3b8',
    fontSize: 11,
    flex: 1,
    lineHeight: 16,
  },
});
