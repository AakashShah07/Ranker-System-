import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Animated,
  LayoutChangeEvent,
} from 'react-native';
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

const PHASE_ICONS: Record<string, string> = {
  foundation: 'shield-outline',
  core: 'sword',
  completion: 'flag-checkered',
  mock: 'trophy-outline',
};

export default function StudyPlanScreen() {
  const { completedDays, getDayCompletionRate } = useGameStore();
  const currentDay = getCurrentDay();
  const scrollRef = useRef<ScrollView>(null);
  const currentWeek = Math.ceil(currentDay / 7);
  const [expandedWeeks, setExpandedWeeks] = useState<Set<number>>(
    new Set([currentWeek])
  );
  const [showJumpButton, setShowJumpButton] = useState(false);
  const weekPositions = useRef<Record<number, number>>({});
  const todayPosition = useRef(0);
  const pulseAnim = useRef(new Animated.Value(0.4)).current;

  // Pulse animation for today's card
  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.4,
          duration: 1500,
          useNativeDriver: false,
        }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, []);

  // Auto-scroll to current week on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (todayPosition.current > 0) {
        scrollRef.current?.scrollTo({ y: todayPosition.current - 100, animated: true });
      }
    }, 500);
    return () => clearTimeout(timer);
  }, []);

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

  const jumpToToday = () => {
    if (todayPosition.current > 0) {
      scrollRef.current?.scrollTo({ y: todayPosition.current - 100, animated: true });
    }
    if (!expandedWeeks.has(currentWeek)) {
      setExpandedWeeks((prev) => new Set(prev).add(currentWeek));
    }
  };

  const handleScroll = useCallback((event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    const todayY = todayPosition.current;
    const viewHeight = event.nativeEvent.layoutMeasurement.height;
    const isNearToday = y >= todayY - viewHeight && y <= todayY + 100;
    setShowJumpButton(!isNearToday && todayY > 0);
  }, []);

  // Overall progress
  const totalDays = STUDY_PLAN.length;
  const completedCount = completedDays.length;
  const overallProgress = totalDays > 0 ? completedCount / totalDays : 0;

  let lastPhase = '';

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0f" />
      <ScrollView
        ref={scrollRef}
        style={styles.container}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={100}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.systemTag}>[ QUEST MAP ]</Text>
          <GlowText size={22} bold>60-Day Battle Plan</GlowText>
          <Text style={styles.subtitle}>Day {currentDay} of 60</Text>

          {/* Overall progress bar */}
          <View style={styles.overallProgressContainer}>
            <View style={styles.overallProgressRow}>
              <Text style={styles.overallProgressLabel}>OVERALL</Text>
              <Text style={styles.overallProgressValue}>{completedCount}/{totalDays}</Text>
            </View>
            <View style={styles.overallProgressTrack}>
              <View
                style={[
                  styles.overallProgressFill,
                  { width: `${Math.round(overallProgress * 100)}%` },
                ]}
              />
            </View>
          </View>
        </View>

        {Object.entries(weeks).map(([weekStr, days]) => {
          const week = Number(weekStr);
          const isExpanded = expandedWeeks.has(week);
          const firstDay = days[0];
          const phaseColor = PHASE_COLORS[firstDay.phase] || '#00d4ff';
          const phaseIcon = PHASE_ICONS[firstDay.phase] || 'shield-outline';
          const showPhaseHeader = firstDay.phase !== lastPhase;
          lastPhase = firstDay.phase;

          const weekCompleted = days.filter((d) =>
            completedDays.includes(d.dayNumber)
          ).length;
          const weekProgress = days.length > 0 ? weekCompleted / days.length : 0;
          const isCurrentWeek = week === currentWeek;

          return (
            <View
              key={week}
              onLayout={(e: LayoutChangeEvent) => {
                weekPositions.current[week] = e.nativeEvent.layout.y;
                if (isCurrentWeek) {
                  todayPosition.current = e.nativeEvent.layout.y;
                }
              }}
            >
              {/* Phase Header */}
              {showPhaseHeader && (
                <View style={[styles.phaseHeader, { borderColor: phaseColor }]}>
                  <View style={[styles.phaseIconCircle, { backgroundColor: phaseColor + '20' }]}>
                    <MaterialCommunityIcons
                      name={phaseIcon as any}
                      size={18}
                      color={phaseColor}
                    />
                  </View>
                  <View style={styles.phaseTextContainer}>
                    <Text style={[styles.phaseText, { color: phaseColor }]}>
                      {PHASE_LABELS[firstDay.phase]}
                    </Text>
                    <Text style={styles.phaseSubtext}>
                      Target: {firstDay.scoreTarget}
                    </Text>
                  </View>
                  <View style={[styles.phaseLine, { backgroundColor: phaseColor + '30' }]} />
                </View>
              )}

              {/* Week Header */}
              <TouchableOpacity
                style={[
                  styles.weekHeader,
                  { borderLeftColor: phaseColor },
                  isCurrentWeek && styles.weekHeaderCurrent,
                ]}
                onPress={() => toggleWeek(week)}
                activeOpacity={0.7}
              >
                <View style={{ flex: 1 }}>
                  <View style={styles.weekTitleRow}>
                    <Text style={styles.weekTitle}>Week {week}</Text>
                    {isCurrentWeek && (
                      <View style={styles.currentPill}>
                        <Text style={styles.currentPillText}>NOW</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.weekFocus}>{firstDay.weekFocus}</Text>

                  {/* Week progress bar */}
                  <View style={styles.weekProgressContainer}>
                    <View style={styles.weekProgressTrack}>
                      <View
                        style={[
                          styles.weekProgressFill,
                          {
                            width: `${Math.round(weekProgress * 100)}%`,
                            backgroundColor: phaseColor,
                          },
                        ]}
                      />
                    </View>
                    <Text style={[styles.weekProgressText, { color: phaseColor }]}>
                      {weekCompleted}/{days.length}
                    </Text>
                  </View>
                </View>
                <MaterialCommunityIcons
                  name={isExpanded ? 'chevron-up' : 'chevron-down'}
                  size={22}
                  color="#64748b"
                />
              </TouchableOpacity>

              {/* Day Cards with Timeline */}
              {isExpanded && (
                <View style={styles.timelineContainer}>
                  {/* Timeline vertical line */}
                  <View style={[styles.timelineLine, { backgroundColor: phaseColor + '30' }]} />

                  {days.map((day, index) => {
                    const isToday = day.dayNumber === currentDay;
                    const isComplete = completedDays.includes(day.dayNumber);
                    const isPast = day.dayNumber < currentDay;
                    const rate = getDayCompletionRate(day.dayNumber);
                    const isLast = index === days.length - 1;

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

                    // Timeline dot color
                    const dotColor = isToday
                      ? '#00d4ff'
                      : isComplete
                      ? '#10b981'
                      : isPast
                      ? '#f59e0b'
                      : '#2a2a40';

                    return (
                      <View key={day.dayNumber} style={styles.timelineRow}>
                        {/* Timeline dot */}
                        <View style={styles.timelineDotColumn}>
                          <View
                            style={[
                              styles.timelineDot,
                              { backgroundColor: dotColor, borderColor: dotColor },
                              isToday && styles.timelineDotToday,
                              isComplete && styles.timelineDotComplete,
                            ]}
                          >
                            {isComplete && (
                              <MaterialCommunityIcons name="check" size={10} color="#fff" />
                            )}
                          </View>
                        </View>

                        {/* Day Card */}
                        <Animated.View
                          style={[
                            styles.dayCard,
                            isToday && {
                              ...styles.dayCardToday,
                              borderColor: pulseAnim.interpolate({
                                inputRange: [0.4, 1],
                                outputRange: ['#00d4ff40', '#00d4ffaa'],
                              }),
                            },
                            isComplete && styles.dayCardComplete,
                            isPast && !isComplete && styles.dayCardMissed,
                          ]}
                          onLayout={
                            isToday
                              ? (e: LayoutChangeEvent) => {
                                  todayPosition.current =
                                    (weekPositions.current[week] || 0) +
                                    e.nativeEvent.layout.y;
                                }
                              : undefined
                          }
                        >
                          {/* Day Header */}
                          <View style={styles.dayHeader}>
                            <View style={styles.dayBadgeRow}>
                              <View
                                style={[
                                  styles.dayBadge,
                                  {
                                    backgroundColor: isToday
                                      ? '#00d4ff'
                                      : isComplete
                                      ? '#10b981'
                                      : isPast
                                      ? '#64748b'
                                      : '#2a2a40',
                                  },
                                ]}
                              >
                                <Text style={styles.dayBadgeText}>D{day.dayNumber}</Text>
                              </View>
                              <Text style={styles.dayDate}>{getDayDateShort(day.dayNumber)}</Text>
                              {isToday && (
                                <View style={styles.todayPill}>
                                  <Text style={styles.todayPillText}>TODAY</Text>
                                </View>
                              )}
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
                              <View style={styles.rateContainer}>
                                <Text
                                  style={[
                                    styles.rateText,
                                    { color: rate >= 0.6 ? '#10b981' : '#f59e0b' },
                                  ]}
                                >
                                  {Math.round(rate * 100)}%
                                </Text>
                              </View>
                            )}
                            {isComplete && rate === 0 && (
                              <MaterialCommunityIcons name="check-circle" size={18} color="#10b981" />
                            )}
                          </View>

                          {/* Topic Rows */}
                          {paper1Tasks.length > 0 && (
                            <View style={styles.topicRow}>
                              <View style={[styles.topicDot, { backgroundColor: '#00d4ff' }]} />
                              <Text style={styles.topicLabel}>Paper 1</Text>
                              <Text style={styles.topicText} numberOfLines={2}>
                                {paper1Tasks}
                              </Text>
                            </View>
                          )}
                          {paper2Tasks.length > 0 && (
                            <View style={styles.topicRow}>
                              <View style={[styles.topicDot, { backgroundColor: '#8b5cf6' }]} />
                              <Text style={[styles.topicLabel, { color: '#8b5cf6' }]}>Paper 2</Text>
                              <Text style={styles.topicText} numberOfLines={2}>
                                {paper2Tasks}
                              </Text>
                            </View>
                          )}
                          {practiceTasks.length > 0 && (
                            <View style={styles.topicRow}>
                              <View style={[styles.topicDot, { backgroundColor: '#f59e0b' }]} />
                              <Text style={[styles.topicLabel, { color: '#f59e0b' }]}>Practice</Text>
                              <Text style={styles.topicText} numberOfLines={2}>
                                {practiceTasks}
                              </Text>
                            </View>
                          )}

                          {/* Day completion bar */}
                          {rate > 0 && (
                            <View style={styles.dayProgressTrack}>
                              <View
                                style={[
                                  styles.dayProgressFill,
                                  {
                                    width: `${Math.round(rate * 100)}%`,
                                    backgroundColor: rate >= 0.6 ? '#10b981' : '#f59e0b',
                                  },
                                ]}
                              />
                            </View>
                          )}
                        </Animated.View>
                      </View>
                    );
                  })}
                </View>
              )}
            </View>
          );
        })}
        <View style={{ height: 30 }} />
      </ScrollView>

      {/* Jump to Today FAB */}
      {showJumpButton && (
        <TouchableOpacity
          style={styles.fab}
          onPress={jumpToToday}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons name="crosshairs-gps" size={20} color="#0a0a0f" />
          <Text style={styles.fabText}>Today</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0a0a0f' },
  container: { flex: 1, paddingHorizontal: 16 },

  // Header
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

  // Overall progress
  overallProgressContainer: {
    width: '100%',
    marginTop: 16,
    backgroundColor: '#161625',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#1e1e30',
  },
  overallProgressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  overallProgressLabel: {
    color: '#64748b',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  overallProgressValue: {
    color: '#94a3b8',
    fontSize: 10,
    fontWeight: '700',
  },
  overallProgressTrack: {
    height: 4,
    backgroundColor: '#1e1e30',
    borderRadius: 2,
    overflow: 'hidden',
  },
  overallProgressFill: {
    height: '100%',
    backgroundColor: '#00d4ff',
    borderRadius: 2,
  },

  // Phase
  phaseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#0f0f1a',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#1e1e30',
  },
  phaseIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  phaseTextContainer: {
    flex: 1,
  },
  phaseText: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 2,
  },
  phaseSubtext: {
    color: '#64748b',
    fontSize: 10,
    marginTop: 2,
  },
  phaseLine: {
    position: 'absolute',
    bottom: 0,
    left: 12,
    right: 12,
    height: 1,
  },

  // Week
  weekHeader: {
    backgroundColor: '#161625',
    borderRadius: 10,
    padding: 14,
    marginBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 3,
    borderWidth: 1,
    borderColor: '#1e1e30',
  },
  weekHeaderCurrent: {
    backgroundColor: '#1a1a2e',
    borderColor: '#00d4ff20',
  },
  weekTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  weekTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  currentPill: {
    backgroundColor: '#00d4ff',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  currentPillText: {
    color: '#0a0a0f',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
  },
  weekFocus: {
    color: '#94a3b8',
    fontSize: 11,
    marginTop: 2,
  },
  weekProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 8,
  },
  weekProgressTrack: {
    flex: 1,
    height: 3,
    backgroundColor: '#1e1e30',
    borderRadius: 2,
    overflow: 'hidden',
  },
  weekProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  weekProgressText: {
    fontSize: 11,
    fontWeight: '700',
    minWidth: 24,
    textAlign: 'right',
  },

  // Timeline
  timelineContainer: {
    position: 'relative',
    paddingLeft: 20,
    marginBottom: 8,
  },
  timelineLine: {
    position: 'absolute',
    left: 8,
    top: 12,
    bottom: 12,
    width: 2,
    borderRadius: 1,
  },
  timelineRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  timelineDotColumn: {
    width: 24,
    alignItems: 'center',
    paddingTop: 14,
    marginLeft: -20,
  },
  timelineDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineDotToday: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderColor: '#00d4ff',
    backgroundColor: '#00d4ff',
    shadowColor: '#00d4ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 4,
  },
  timelineDotComplete: {
    borderColor: '#10b981',
    backgroundColor: '#10b981',
  },

  // Day Card
  dayCard: {
    flex: 1,
    backgroundColor: '#0f0f1a',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#1e1e30',
    marginLeft: 8,
  },
  dayCardToday: {
    backgroundColor: '#00d4ff08',
    borderWidth: 1.5,
  },
  dayCardComplete: {
    borderColor: '#10b98130',
    backgroundColor: '#10b98108',
  },
  dayCardMissed: {
    borderColor: '#f59e0b20',
    opacity: 0.7,
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
    gap: 6,
    flexWrap: 'wrap',
    flex: 1,
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
  todayPill: {
    backgroundColor: '#00d4ff20',
    borderColor: '#00d4ff50',
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  todayPillText: {
    color: '#00d4ff',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
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
  rateContainer: {
    backgroundColor: '#10b98115',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  rateText: {
    fontSize: 12,
    fontWeight: '700',
  },

  // Topic Rows
  topicRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  topicDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 5,
    marginRight: 6,
  },
  topicLabel: {
    color: '#00d4ff',
    fontSize: 10,
    fontWeight: '800',
    width: 48,
    marginTop: 1,
  },
  topicText: {
    color: '#94a3b8',
    fontSize: 11,
    flex: 1,
    lineHeight: 16,
  },

  // Day progress bar
  dayProgressTrack: {
    height: 2,
    backgroundColor: '#1e1e30',
    borderRadius: 1,
    overflow: 'hidden',
    marginTop: 8,
  },
  dayProgressFill: {
    height: '100%',
    borderRadius: 1,
  },

  // FAB
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 16,
    backgroundColor: '#00d4ff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 24,
    gap: 6,
    shadowColor: '#00d4ff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  fabText: {
    color: '#0a0a0f',
    fontSize: 12,
    fontWeight: '800',
  },
});
