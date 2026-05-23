import React, { useState } from 'react';
import {
  View, Text, ScrollView, TextInput, TouchableOpacity,
  StyleSheet, StatusBar, Alert, Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useGameStore } from '../store/useGameStore';
import { SUBJECTS } from '../constants/xp';

export default function ErrorNotebookScreen() {
  const { errorEntries, addErrorEntry, updateErrorEntry, deleteErrorEntry } = useGameStore();
  const [showForm, setShowForm] = useState(false);
  const [filterSubject, setFilterSubject] = useState<string>('All');
  const [question, setQuestion] = useState('');
  const [mistake, setMistake] = useState('');
  const [concept, setConcept] = useState('');
  const [subject, setSubject] = useState<string>(SUBJECTS[0]);

  const filteredEntries = filterSubject === 'All'
    ? errorEntries
    : errorEntries.filter((e) => e.subject === filterSubject);

  const pendingCount = errorEntries.filter((e) => !e.revised).length;

  const handleAdd = () => {
    if (!question.trim()) {
      Alert.alert('Required', 'Enter the question or topic');
      return;
    }
    addErrorEntry({
      question: question.trim(),
      mistake: mistake.trim(),
      concept: concept.trim(),
      subject,
      revisionDate: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
      revised: false,
    });
    setQuestion('');
    setMistake('');
    setConcept('');
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    Alert.alert('Delete Entry', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteErrorEntry(id) },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0f" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{errorEntries.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statValue, { color: '#f59e0b' }]}>{pendingCount}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statValue, { color: '#10b981' }]}>{errorEntries.length - pendingCount}</Text>
            <Text style={styles.statLabel}>Revised</Text>
          </View>
        </View>

        {/* Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
          {['All', ...SUBJECTS].map((s) => (
            <TouchableOpacity
              key={s}
              style={[styles.filterChip, filterSubject === s && styles.filterChipActive]}
              onPress={() => setFilterSubject(s)}
            >
              <Text style={[styles.filterText, filterSubject === s && styles.filterTextActive]}>
                {s}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Entries */}
        {filteredEntries.length === 0 ? (
          <Text style={styles.emptyText}>No entries yet. Add your first mistake!</Text>
        ) : (
          filteredEntries.map((entry) => (
            <View key={entry.id} style={[styles.entryCard, entry.revised && styles.entryRevised]}>
              <View style={styles.entryHeader}>
                <View style={styles.subjectTag}>
                  <Text style={styles.subjectTagText}>{entry.subject}</Text>
                </View>
                <View style={styles.entryActions}>
                  <TouchableOpacity
                    onPress={() => updateErrorEntry(entry.id, { revised: !entry.revised })}
                  >
                    <MaterialCommunityIcons
                      name={entry.revised ? 'check-circle' : 'circle-outline'}
                      size={22}
                      color={entry.revised ? '#10b981' : '#64748b'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDelete(entry.id)}>
                    <MaterialCommunityIcons name="trash-can-outline" size={20} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles.entryQuestion}>{entry.question}</Text>
              {entry.mistake ? (
                <View style={styles.entryDetail}>
                  <Text style={styles.detailLabel}>Mistake:</Text>
                  <Text style={styles.detailText}>{entry.mistake}</Text>
                </View>
              ) : null}
              {entry.concept ? (
                <View style={styles.entryDetail}>
                  <Text style={[styles.detailLabel, { color: '#10b981' }]}>Correct:</Text>
                  <Text style={styles.detailText}>{entry.concept}</Text>
                </View>
              ) : null}
            </View>
          ))
        )}
        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Add Button */}
      <TouchableOpacity style={styles.fab} onPress={() => setShowForm(true)} activeOpacity={0.8}>
        <MaterialCommunityIcons name="plus" size={28} color="#0a0a0f" />
      </TouchableOpacity>

      {/* Add Form Modal */}
      <Modal visible={showForm} transparent animationType="slide" onRequestClose={() => setShowForm(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>New Error Entry</Text>

            <Text style={styles.inputLabel}>Subject</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.subjectPicker}>
              {SUBJECTS.map((s) => (
                <TouchableOpacity
                  key={s}
                  style={[styles.filterChip, subject === s && styles.filterChipActive]}
                  onPress={() => setSubject(s)}
                >
                  <Text style={[styles.filterText, subject === s && styles.filterTextActive]}>{s}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={styles.inputLabel}>Question / Topic *</Text>
            <TextInput
              style={styles.input}
              value={question}
              onChangeText={setQuestion}
              placeholder="What did you get wrong?"
              placeholderTextColor="#64748b"
              multiline
            />

            <Text style={styles.inputLabel}>Mistake Reason</Text>
            <TextInput
              style={styles.input}
              value={mistake}
              onChangeText={setMistake}
              placeholder="Why did you make this mistake?"
              placeholderTextColor="#64748b"
              multiline
            />

            <Text style={styles.inputLabel}>Correct Concept</Text>
            <TextInput
              style={styles.input}
              value={concept}
              onChangeText={setConcept}
              placeholder="What's the correct approach?"
              placeholderTextColor="#64748b"
              multiline
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setShowForm(false)}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
                <Text style={styles.addBtnText}>ADD ENTRY</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0a0a0f' },
  container: { flex: 1, paddingHorizontal: 16 },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
    marginTop: 8,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#161625',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1e1e30',
  },
  statValue: { color: '#00d4ff', fontSize: 22, fontWeight: '800' },
  statLabel: { color: '#64748b', fontSize: 10, fontWeight: '600', marginTop: 2 },
  filterRow: { marginBottom: 16 },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#161625',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#1e1e30',
  },
  filterChipActive: {
    backgroundColor: '#00d4ff20',
    borderColor: '#00d4ff',
  },
  filterText: { color: '#64748b', fontSize: 12, fontWeight: '600' },
  filterTextActive: { color: '#00d4ff' },
  emptyText: {
    color: '#64748b',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 40,
    fontStyle: 'italic',
  },
  entryCard: {
    backgroundColor: '#161625',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#1e1e30',
  },
  entryRevised: { opacity: 0.5 },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  subjectTag: {
    backgroundColor: '#00d4ff20',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  subjectTagText: { color: '#00d4ff', fontSize: 10, fontWeight: '700' },
  entryActions: { flexDirection: 'row', gap: 12 },
  entryQuestion: { color: '#ffffff', fontSize: 14, fontWeight: '600', marginBottom: 6 },
  entryDetail: { marginTop: 4 },
  detailLabel: { color: '#ef4444', fontSize: 11, fontWeight: '700', marginBottom: 2 },
  detailText: { color: '#94a3b8', fontSize: 12, lineHeight: 18 },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#00d4ff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#00d4ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#0f0f1a',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '85%',
  },
  modalTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 20,
    textAlign: 'center',
  },
  subjectPicker: { marginBottom: 16 },
  inputLabel: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#161625',
    borderRadius: 10,
    padding: 14,
    color: '#ffffff',
    fontSize: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#1e1e30',
    minHeight: 50,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  cancelBtn: {
    flex: 1,
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#1e1e30',
    alignItems: 'center',
  },
  cancelBtnText: { color: '#94a3b8', fontSize: 14, fontWeight: '700' },
  addBtn: {
    flex: 1,
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#00d4ff20',
    borderWidth: 1,
    borderColor: '#00d4ff',
    alignItems: 'center',
  },
  addBtnText: { color: '#00d4ff', fontSize: 14, fontWeight: '800', letterSpacing: 1 },
});
