import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useGameStore } from '../store/useGameStore';
import { calculateLevel, calculateRank, getRankTitle, getRankColor } from '../utils/xpCalculator';
import { getCurrentDay, getFormattedToday, getDaysRemaining, getPhaseForDay } from '../utils/dateUtils';
import { TOTAL_DAYS } from '../constants/xp';
import { STUDY_PLAN } from '../constants/studyPlan';
import XPBar from '../components/XPBar';
import RankBadge from '../components/RankBadge';
import StatCard from '../components/StatCard';
import GlowText from '../components/GlowText';

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const { totalXP, streak, completedDays, subjectProgress, checkAndUpdateStreak } = useGameStore();

  const level = calculateLevel(totalXP);
  const rank = calculateRank(level);
  const rankTitle = getRankTitle(level);
  const rankColor = getRankColor(rank);
  const currentDay = getCurrentDay();
  const daysRemaining = getDaysRemaining();
  const phase = getPhaseForDay(currentDay);
  const dayPlan = STUDY_PLAN.find((d) => d.dayNumber === currentDay);

  // Paper progress
  const paper1Subjects = ['Quant', 'Reasoning', 'English', 'GA'];
  const paper2Subjects = ['DBMS', 'OS', 'CN', 'DSA', 'Algorithms', 'COA', 'SE', 'Web/IT'];

  const calcProgress = (subjects: string[]) => {
    let total = 0, completed = 0;
    subjects.forEach((s) => {
      if (subjectProgress[s]) {
        total += subjectProgress[s].total;
        completed += subjectProgress[s].completed;
      }
    });
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const paper1Progress = calcProgress(paper1Subjects);
  const paper2Progress = calcProgress(paper2Subjects);
  const overallProgress = Math.round((completedDays.length / TOTAL_DAYS) * 100);

  useEffect(() => {
    checkAndUpdateStreak();
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0f" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View entering={FadeInDown.duration(500)} style={styles.header}>
          <View>
            <Text style={styles.systemTag}>[ HUNTER STATUS ]</Text>
            <Text style={styles.date}>{getFormattedToday()}</Text>
          </View>
          <RankBadge rank={rank} level={level} />
        </Animated.View>

        {/* Rank Title */}
        <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.rankSection}>
          <GlowText color={rankColor} size={22} bold>{rankTitle}</GlowText>
          <Text style={styles.totalXP}>{totalXP.toLocaleString()} Total XP</Text>
        </Animated.View>

        {/* XP Bar */}
        <Animated.View entering={FadeInDown.delay(200).duration(500)} style={styles.section}>
          <XPBar totalXP={totalXP} />
        </Animated.View>

        {/* Stats Row */}
        <Animated.View entering={FadeInDown.delay(300).duration(500)} style={styles.statsRow}>
          <StatCard icon="calendar-check" label="Day" value={`${currentDay}/${TOTAL_DAYS}`} color="#00d4ff" />
          <StatCard icon="fire" label="Streak" value={`${streak}d`} color="#f59e0b" />
          <StatCard icon="clock-outline" label="Remaining" value={`${daysRemaining}d`} color="#8b5cf6" />
        </Animated.View>

        {/* Phase Banner */}
        <Animated.View entering={FadeInDown.delay(400).duration(500)} style={styles.phaseBanner}>
          <Text style={styles.phaseLabel}>CURRENT PHASE</Text>
          <Text style={styles.phaseName}>{phase}</Text>
          {dayPlan && (
            <Text style={styles.weekFocus}>{dayPlan.weekFocus} | Target: {dayPlan.scoreTarget}</Text>
          )}
        </Animated.View>

        {/* Progress Section */}
        <Animated.View entering={FadeInDown.delay(500).duration(500)} style={styles.section}>
          <Text style={styles.sectionTitle}>PROGRESS</Text>
          <View style={styles.progressRow}>
            <ProgressItem label="Paper 1" value={paper1Progress} color="#00d4ff" />
            <ProgressItem label="Paper 2" value={paper2Progress} color="#8b5cf6" />
            <ProgressItem label="Overall" value={overallProgress} color="#10b981" />
          </View>
        </Animated.View>

        {/* Start Quests Button */}
        <Animated.View entering={FadeInDown.delay(600).duration(500)} style={styles.section}>
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => navigation.navigate('Quests')}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons name="sword-cross" size={20} color="#00d4ff" />
            <Text style={styles.startButtonText}>START TODAY'S QUESTS</Text>
            <MaterialCommunityIcons name="chevron-right" size={20} color="#00d4ff" />
          </TouchableOpacity>
        </Animated.View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function ProgressItem({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <View style={progressStyles.item}>
      <Text style={[progressStyles.value, { color }]}>{value}%</Text>
      <View style={progressStyles.barBg}>
        <View style={[progressStyles.barFill, { width: `${value}%`, backgroundColor: color }]} />
      </View>
      <Text style={progressStyles.label}>{label}</Text>
    </View>
  );
}

const progressStyles = StyleSheet.create({
  item: { flex: 1, alignItems: 'center', marginHorizontal: 4 },
  value: { fontSize: 18, fontWeight: '800', marginBottom: 4 },
  barBg: {
    height: 6,
    width: '100%',
    backgroundColor: '#1e1e30',
    borderRadius: 3,
    overflow: 'hidden',
  },
  barFill: { height: '100%', borderRadius: 3 },
  label: { color: '#94a3b8', fontSize: 11, fontWeight: '600', marginTop: 4 },
});

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0a0a0f' },
  container: { flex: 1, paddingHorizontal: 16 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  systemTag: {
    color: '#64748b',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 4,
  },
  date: { color: '#94a3b8', fontSize: 13, fontWeight: '500' },
  rankSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  totalXP: {
    color: '#64748b',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 4,
  },
  section: { marginBottom: 20 },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  phaseBanner: {
    backgroundColor: '#161625',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#1e1e30',
    alignItems: 'center',
  },
  phaseLabel: {
    color: '#64748b',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 4,
  },
  phaseName: {
    color: '#00d4ff',
    fontSize: 16,
    fontWeight: '700',
    textShadowColor: '#00d4ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  weekFocus: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
  sectionTitle: {
    color: '#64748b',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 12,
  },
  progressRow: {
    flexDirection: 'row',
  },
  startButton: {
    backgroundColor: '#161625',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#00d4ff40',
  },
  startButtonText: {
    color: '#00d4ff',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 2,
  },
});
