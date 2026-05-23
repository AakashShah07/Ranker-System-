import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface StatCardProps {
  icon: string;
  label: string;
  value: string | number;
  color?: string;
  subtitle?: string;
}

export default function StatCard({
  icon,
  label,
  value,
  color = '#00d4ff',
  subtitle,
}: StatCardProps) {
  return (
    <View style={styles.card}>
      <MaterialCommunityIcons name={icon as any} size={22} color={color} />
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#161625',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#1e1e30',
  },
  value: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '800',
    marginTop: 6,
  },
  label: {
    color: '#94a3b8',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  subtitle: {
    color: '#64748b',
    fontSize: 9,
    marginTop: 2,
  },
});
