import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useGameStore } from '../store/useGameStore';
import { calculateLevel, calculateRank, getRankColor } from '../utils/xpCalculator';
import GlowText from '../components/GlowText';
import StatCard from '../components/StatCard';

const SUBJECT_COLORS: Record<string, string> = {
  DBMS: '#00d4ff',
  OS: '#8b5cf6',
  CN: '#10b981',
  DSA: '#f59e0b',
  Algorithms: '#ec4899',
  COA: '#06b6d4',
  SE: '#84cc16',
  'Web/IT': '#a78bfa',
  Quant: '#f97316',
  Reasoning: '#14b8a6',
  English: '#e879f9',
  GA: '#fbbf24',
};

export default function ProgressScreen() {
  const navigation = useNavigation<any>();
  const { totalXP, streak, completedDays, subjectProgress, mockScores, errorEntries } = useGameStore();

  const level = calculateLevel(totalXP);
  const rank = calculateRank(level);
  const rankColor = getRankColor(rank);

  // Sort subjects by completion % (ascending = weakest first)
  const sortedSubjects = Object.entries(subjectProgress)
    .filter(([_, v]) => v.total > 0)
    .sort((a, b) => {
      const aRate = a[1].total > 0 ? a[1].completed / a[1].total : 0;
      const bRate = b[1].total > 0 ? b[1].completed / b[1].total : 0;
      return aRate - bRate;
    });

  const weakTopics = sortedSubjects.filter(([_, v]) => {
    const rate = v.total > 0 ? v.completed / v.total : 0;
    return rate < 0.5 && v.total > 0;
  });

  const pendingErrors = errorEntries.filter((e) => !e.revised).length;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0f" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.systemTag}>[ HUNTER ANALYTICS ]</Text>
          <GlowText size={20} bold>Progress Report</GlowText>
        </View>

        {/* Stats */}
        <Animated.View entering={FadeInDown.duration(400)} style={styles.statsRow}>
          <StatCard icon="star-four-points" label="Total XP" value={totalXP.toLocaleString()} color="#00d4ff" />
          <StatCard icon="shield-sword" label="Level" value={level} color={rankColor} />
          <StatCard icon="fire" label="Streak" value={`${streak}d`} color="#f59e0b" />
        </Animated.View>

        {/* Subject Progress */}
        <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.section}>
          <Text style={styles.sectionTitle}>SUBJECT MASTERY</Text>
          {sortedSubjects.map(([subject, data]) => {
            const rate = data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0;
            const color = SUBJECT_COLORS[subject] || '#64748b';
            return (
              <View key={subject} style={styles.subjectRow}>
                <View style={styles.subjectHeader}>
                  <Text style={[styles.subjectName, { color }]}>{subject}</Text>
                  <Text style={styles.subjectCount}>{data.completed}/{data.total} ({rate}%)</Text>
                </View>
                <View style={styles.barBg}>
                  <View style={[styles.barFill, { width: `${rate}%`, backgroundColor: color }]} />
                </View>
              </View>
            );
          })}
        </Animated.View>

        {/* Weak Topics */}
        {weakTopics.length > 0 && (
          <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.section}>
            <Text style={styles.sectionTitle}>WEAK AREAS</Text>
            <View style={styles.weakList}>
              {weakTopics.map(([subject, data]) => {
                const rate = data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0;
                return (
                  <View key={subject} style={styles.weakItem}>
                    <MaterialCommunityIcons name="alert-circle" size={16} color="#ef4444" />
                    <Text style={styles.weakText}>{subject}</Text>
                    <Text style={styles.weakRate}>{rate}%</Text>
                  </View>
                );
              })}
            </View>
          </Animated.View>
        )}

        {/* Mock Scores */}
        <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.section}>
          <Text style={styles.sectionTitle}>MOCK TEST SCORES</Text>
          {mockScores.length === 0 ? (
            <Text style={styles.emptyText}>No mock tests taken yet</Text>
          ) : (
            mockScores.map((score) => (
              <View key={score.mockNumber} style={styles.mockRow}>
                <Text style={styles.mockNum}>Mock #{score.mockNumber}</Text>
                <View style={styles.mockScores}>
                  <Text style={styles.mockScore}>P1: {score.paper1Score}</Text>
                  <Text style={styles.mockScore}>P2: {score.paper2Score}</Text>
                  <Text style={[styles.mockScore, { color: '#00d4ff', fontWeight: '700' }]}>
                    Total: {score.total}/{score.maxScore}
                  </Text>
                </View>
              </View>
            ))
          )}
        </Animated.View>

        {/* Error Notebook Link */}
        <Animated.View entering={FadeInDown.delay(400).duration(400)} style={styles.section}>
          <TouchableOpacity
            style={styles.errorCard}
            onPress={() => navigation.navigate('ErrorNotebook')}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons name="notebook-edit" size={24} color="#f59e0b" />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.errorTitle}>Error Notebook</Text>
              <Text style={styles.errorSubtitle}>
                {errorEntries.length} entries | {pendingErrors} pending revision
              </Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={20} color="#64748b" />
          </TouchableOpacity>
        </Animated.View>

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
  statsRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  section: { marginBottom: 24 },
  sectionTitle: {
    color: '#64748b',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 12,
  },
  subjectRow: { marginBottom: 12 },
  subjectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  subjectName: { fontSize: 13, fontWeight: '700' },
  subjectCount: { color: '#64748b', fontSize: 11, fontWeight: '600' },
  barBg: {
    height: 8,
    backgroundColor: '#1e1e30',
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: { height: '100%', borderRadius: 4 },
  weakList: { gap: 8 },
  weakItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#ef444410',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ef444420',
  },
  weakText: { color: '#ffffff', fontSize: 13, fontWeight: '600', flex: 1 },
  weakRate: { color: '#ef4444', fontSize: 13, fontWeight: '700' },
  mockRow: {
    backgroundColor: '#161625',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#1e1e30',
  },
  mockNum: { color: '#ffffff', fontSize: 14, fontWeight: '700', marginBottom: 6 },
  mockScores: { flexDirection: 'row', gap: 16 },
  mockScore: { color: '#94a3b8', fontSize: 12, fontWeight: '600' },
  emptyText: { color: '#64748b', fontSize: 13, fontStyle: 'italic' },
  errorCard: {
    backgroundColor: '#161625',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f59e0b30',
  },
  errorTitle: { color: '#ffffff', fontSize: 15, fontWeight: '700' },
  errorSubtitle: { color: '#94a3b8', fontSize: 12, marginTop: 2 },
});
