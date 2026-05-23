import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface PenaltyModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function PenaltyModal({ visible, onClose }: PenaltyModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.content}>
          <MaterialCommunityIcons name="alert-octagon" size={48} color="#ef4444" />
          <Text style={styles.systemText}>[ SYSTEM WARNING ]</Text>
          <Text style={styles.title}>PENALTY QUEST ACTIVATED</Text>
          <Text style={styles.subtitle}>
            Daily completion below 60%. Additional tasks have been assigned.
          </Text>

          <View style={styles.penaltyList}>
            <View style={styles.penaltyItem}>
              <MaterialCommunityIcons name="sword" size={16} color="#ef4444" />
              <Text style={styles.penaltyText}>30 extra MCQs (Paper 1 + Paper 2)</Text>
            </View>
            <View style={styles.penaltyItem}>
              <MaterialCommunityIcons name="book-open-variant" size={16} color="#ef4444" />
              <Text style={styles.penaltyText}>Revise all missed topics</Text>
            </View>
            <View style={styles.penaltyItem}>
              <MaterialCommunityIcons name="notebook" size={16} color="#ef4444" />
              <Text style={styles.penaltyText}>20-minute error notebook review</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>ACCEPT PENALTY</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#0f0f1a',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ef4444',
    width: '85%',
  },
  systemText: {
    color: '#ef4444',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    marginTop: 12,
    marginBottom: 8,
  },
  title: {
    color: '#ef4444',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 2,
    textShadowColor: '#ef4444',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 18,
  },
  penaltyList: {
    width: '100%',
    gap: 12,
    marginBottom: 24,
  },
  penaltyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#1e1e30',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ef444440',
  },
  penaltyText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  button: {
    backgroundColor: '#ef444430',
    borderWidth: 1,
    borderColor: '#ef4444',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#ef4444',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 2,
  },
});
