import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Switch,
  StyleSheet, StatusBar, Alert, Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useGameStore } from '../store/useGameStore';
import { calculateLevel, calculateRank, getRankTitle } from '../utils/xpCalculator';
import GlowText from '../components/GlowText';

export default function SettingsScreen() {
  const {
    soundEnabled, notificationsEnabled, reminderTime,
    toggleSound, toggleNotifications, resetProgress, exportProgress,
    totalXP, streak, completedDays,
  } = useGameStore();

  const level = calculateLevel(totalXP);
  const rank = calculateRank(level);

  const handleReset = () => {
    Alert.alert(
      'Reset Progress',
      'This will delete ALL your progress, XP, streaks, and error notebook entries. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset Everything',
          style: 'destructive',
          onPress: () => {
            resetProgress();
            Alert.alert('System Reset', 'All progress has been wiped.');
          },
        },
      ]
    );
  };

  const handleExport = async () => {
    const data = exportProgress();
    try {
      await Share.share({
        message: data,
        title: 'Ranker System Progress Export',
      });
    } catch {
      Alert.alert('Export', 'Progress data copied. Save it somewhere safe.');
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0f" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.systemTag}>[ SYSTEM CONFIG ]</Text>
          <GlowText size={20} bold>Settings</GlowText>
        </View>

        {/* Profile Summary */}
        <View style={styles.profileCard}>
          <Text style={styles.profileRank}>{getRankTitle(level)}</Text>
          <Text style={styles.profileStats}>
            Level {level} | {totalXP} XP | {streak}d Streak | {completedDays.length} Days
          </Text>
        </View>

        {/* Sound */}
        <View style={styles.settingSection}>
          <Text style={styles.sectionTitle}>AUDIO & NOTIFICATIONS</Text>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <MaterialCommunityIcons name="volume-high" size={22} color="#00d4ff" />
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.settingLabel}>Sound Effects</Text>
                <Text style={styles.settingDesc}>Quest complete, level up, penalty</Text>
              </View>
            </View>
            <Switch
              value={soundEnabled}
              onValueChange={toggleSound}
              trackColor={{ false: '#2a2a40', true: '#00d4ff40' }}
              thumbColor={soundEnabled ? '#00d4ff' : '#64748b'}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <MaterialCommunityIcons name="bell-ring" size={22} color="#8b5cf6" />
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.settingLabel}>Notifications</Text>
                <Text style={styles.settingDesc}>Daily reminders & streak alerts</Text>
              </View>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={toggleNotifications}
              trackColor={{ false: '#2a2a40', true: '#8b5cf640' }}
              thumbColor={notificationsEnabled ? '#8b5cf6' : '#64748b'}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <MaterialCommunityIcons name="clock-outline" size={22} color="#f59e0b" />
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.settingLabel}>Reminder Time</Text>
                <Text style={styles.settingDesc}>{reminderTime} daily</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Data */}
        <View style={styles.settingSection}>
          <Text style={styles.sectionTitle}>DATA MANAGEMENT</Text>

          <TouchableOpacity style={styles.actionRow} onPress={handleExport} activeOpacity={0.7}>
            <MaterialCommunityIcons name="export" size={22} color="#10b981" />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={styles.settingLabel}>Export Progress</Text>
              <Text style={styles.settingDesc}>Save your data as JSON</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={20} color="#64748b" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionRow} onPress={handleReset} activeOpacity={0.7}>
            <MaterialCommunityIcons name="delete-forever" size={22} color="#ef4444" />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={[styles.settingLabel, { color: '#ef4444' }]}>Reset All Progress</Text>
              <Text style={styles.settingDesc}>Delete everything and start over</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={20} color="#64748b" />
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>RANKER SYSTEM</Text>
          <Text style={styles.infoText}>v1.0.0</Text>
          <Text style={styles.infoText}>COAL India MT CSE/System 2026</Text>
          <Text style={styles.infoText}>60-Day Preparation Tracker</Text>
          <Text style={[styles.infoText, { marginTop: 8 }]}>
            Original dark fantasy RPG productivity tracker.
          </Text>
        </View>

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
  profileCard: {
    backgroundColor: '#161625',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#1e1e30',
  },
  profileRank: {
    color: '#00d4ff',
    fontSize: 18,
    fontWeight: '800',
    textShadowColor: '#00d4ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  profileStats: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 6,
  },
  settingSection: { marginBottom: 24 },
  sectionTitle: {
    color: '#64748b',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 12,
  },
  settingRow: {
    backgroundColor: '#161625',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#1e1e30',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingLabel: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  settingDesc: {
    color: '#64748b',
    fontSize: 11,
    marginTop: 2,
  },
  actionRow: {
    backgroundColor: '#161625',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#1e1e30',
  },
  infoSection: {
    alignItems: 'center',
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: '#1e1e30',
  },
  infoTitle: {
    color: '#00d4ff',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 3,
    textShadowColor: '#00d4ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
    marginBottom: 8,
  },
  infoText: {
    color: '#64748b',
    fontSize: 12,
    marginTop: 2,
  },
});
