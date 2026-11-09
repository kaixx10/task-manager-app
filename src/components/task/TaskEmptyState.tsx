import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface TaskEmptyStateProps {
  isSearchActive: boolean;
  searchKeyword: string;
  onResetSearch: () => void;
  onAddTask: () => void;
  onLoadSamples: () => void;
}

export const TaskEmptyState: React.FC<TaskEmptyStateProps> = ({
  isSearchActive,
  searchKeyword,
  onResetSearch,
  onAddTask,
  onLoadSamples,
}) => {
  const isDark = useColorScheme() === 'dark';

  if (isSearchActive) {
    return (
      <View style={styles.container}>
        <View style={[styles.iconCircle, { backgroundColor: isDark ? '#23252B' : '#F3F4F6' }]}>
          <Ionicons name="search-outline" size={32} color={isDark ? '#9CA3AF' : '#6B7280'} />
        </View>
        <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#111827' }]}>
          Tugas Tidak Ditemukan
        </Text>
        <Text style={[styles.subtitle, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
          Tidak ada tugas atau mata kuliah yang cocok dengan &quot;{searchKeyword}&quot;.
        </Text>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: '#6366F1' }]}
          onPress={onResetSearch}
          activeOpacity={0.8}>
          <Ionicons name="close-circle-outline" size={16} color="#FFFFFF" />
          <Text style={styles.actionBtnText}>Hapus Pencarian</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.iconCircle, { backgroundColor: isDark ? '#312E81' : '#EEF2FF' }]}>
        <Ionicons name="school-outline" size={34} color="#6366F1" />
      </View>
      <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#111827' }]}>
        Daftar Tugas Kosong
      </Text>
      <Text style={[styles.subtitle, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
        Semua tugas telah dihapus atau belum ditambahkan. Tambahkan tugas baru atau muat ulang tugas contoh.
      </Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: '#6366F1' }]}
          onPress={onAddTask}
          activeOpacity={0.8}>
          <Ionicons name="add" size={16} color="#FFFFFF" />
          <Text style={styles.actionBtnText}>Tambah Tugas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.actionBtnSecondary,
            {
              backgroundColor: isDark ? '#272930' : '#F3F4F6',
              borderColor: isDark ? '#374151' : '#E5E7EB',
            },
          ]}
          onPress={onLoadSamples}
          activeOpacity={0.8}>
          <Ionicons name="refresh-outline" size={16} color={isDark ? '#D1D5DB' : '#374151'} />
          <Text style={[styles.actionBtnSecondaryText, { color: isDark ? '#D1D5DB' : '#374151' }]}>
            Muat Data Contoh
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 20,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
    maxWidth: 280,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  actionBtnSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  actionBtnSecondaryText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
