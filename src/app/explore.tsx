import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function ExploreScreen() {
  const isDark = useColorScheme() === 'dark';

  // Demo state untuk Soal 2: Counter menggunakan useState (tambah, kurang, reset)
  const [counter, setCounter] = useState<number>(0);

  const dynamicStyles = {
    bg: { backgroundColor: isDark ? '#101114' : '#F8F9FA' },
    card: {
      backgroundColor: isDark ? '#18191E' : '#FFFFFF',
      borderColor: isDark ? '#2E3138' : '#E5E7EB',
    },
    textPrimary: { color: isDark ? '#FFFFFF' : '#111827' },
    textSecondary: { color: isDark ? '#9CA3AF' : '#4B5563' },
    codeBg: { backgroundColor: isDark ? '#23252B' : '#F3F4F6' },
    codeText: { color: isDark ? '#A5B4FC' : '#4F46E5' },
  };

  return (
    <SafeAreaView style={[styles.safeArea, dynamicStyles.bg]} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={[styles.badge, { color: '#6366F1' }]}>
            TUGAS PTM 5 — PEMROGRAMAN VISUAL
          </Text>
          <Text style={[styles.title, dynamicStyles.textPrimary]}>
            Dokumentasi & Implementasi Hook
          </Text>
          <Text style={[styles.subtitle, dynamicStyles.textSecondary]}>
            Rangkuman konsep dan verifikasi implementasi Soal 1 s.d. Soal 5 React Native & Expo.
          </Text>
        </View>

        {/* Card: Soal 5 Checklist Fitur */}
        <View style={[styles.card, dynamicStyles.card]}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconCircle, { backgroundColor: '#6366F120' }]}>
              <Ionicons name="checkmark-done-circle" size={20} color="#6366F1" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.cardTitle, dynamicStyles.textPrimary]}>
                Checklist Ketentuan Soal 5
              </Text>
              <Text style={[styles.cardSubtitle, dynamicStyles.textSecondary]}>
                Seluruh 6 fitur dan 7 hook telah aktif
              </Text>
            </View>
          </View>

          <View style={styles.checklist}>
            <View style={styles.checkItem}>
              <Ionicons name="checkmark-circle" size={18} color="#10B981" />
              <Text style={[styles.checkText, dynamicStyles.textPrimary]}>
                1. Daftar Tugas Minimal 5 data (FlatList)
              </Text>
            </View>
            <View style={styles.checkItem}>
              <Ionicons name="checkmark-circle" size={18} color="#10B981" />
              <Text style={[styles.checkText, dynamicStyles.textPrimary]}>
                2. Tambah Tugas baru langsung muncul
              </Text>
            </View>
            <View style={styles.checkItem}>
              <Ionicons name="checkmark-circle" size={18} color="#10B981" />
              <Text style={[styles.checkText, dynamicStyles.textPrimary]}>
                3. Ubah Status (Belum Dikerjakan ⟷ Selesai)
              </Text>
            </View>
            <View style={styles.checkItem}>
              <Ionicons name="checkmark-circle" size={18} color="#10B981" />
              <Text style={[styles.checkText, dynamicStyles.textPrimary]}>
                4. Hapus Tugas dari daftar
              </Text>
            </View>
            <View style={styles.checkItem}>
              <Ionicons name="checkmark-circle" size={18} color="#10B981" />
              <Text style={[styles.checkText, dynamicStyles.textPrimary]}>
                5. Pencarian Tugas (Nama & Mata Kuliah)
              </Text>
            </View>
            <View style={styles.checkItem}>
              <Ionicons name="checkmark-circle" size={18} color="#10B981" />
              <Text style={[styles.checkText, dynamicStyles.textPrimary]}>
                6. Ringkasan Tugas (Total, Tertunda, Selesai)
              </Text>
            </View>
          </View>
        </View>

        {/* Card: Soal 2 Demo Counter useState */}
        <View style={[styles.card, dynamicStyles.card]}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconCircle, { backgroundColor: '#F59E0B20' }]}>
              <Ionicons name="calculator-outline" size={20} color="#F59E0B" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.cardTitle, dynamicStyles.textPrimary]}>
                Soal 2: Demo Counter (useState)
              </Text>
              <Text style={[styles.cardSubtitle, dynamicStyles.textSecondary]}>
                Tombol Tambah, Kurang, dan Reset dengan State lokal
              </Text>
            </View>
          </View>

          <View style={styles.counterBox}>
            <Text style={[styles.counterDisplay, dynamicStyles.textPrimary]}>
              {counter}
            </Text>
            <Text style={[styles.counterCaption, dynamicStyles.textSecondary]}>
              Nilai Counter State saat ini
            </Text>

            <View style={styles.counterActionRow}>
              <TouchableOpacity
                style={[styles.counterBtn, { backgroundColor: '#EF4444' }]}
                onPress={() => setCounter((prev) => prev - 1)}>
                <Ionicons name="remove" size={18} color="#FFFFFF" />
                <Text style={styles.counterBtnText}>Kurang</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.counterBtn, { backgroundColor: '#6B7280' }]}
                onPress={() => setCounter(0)}>
                <Ionicons name="refresh" size={18} color="#FFFFFF" />
                <Text style={styles.counterBtnText}>Reset</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.counterBtn, { backgroundColor: '#10B981' }]}
                onPress={() => setCounter((prev) => prev + 1)}>
                <Ionicons name="add" size={18} color="#FFFFFF" />
                <Text style={styles.counterBtnText}>Tambah</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Card: Rangkuman 7 Hook di Aplikasi */}
        <View style={[styles.card, dynamicStyles.card]}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconCircle, { backgroundColor: '#8B5CF620' }]}>
              <Ionicons name="code-slash" size={20} color="#8B5CF6" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.cardTitle, dynamicStyles.textPrimary]}>
                Implementasi 7 Hook & Props
              </Text>
              <Text style={[styles.cardSubtitle, dynamicStyles.textSecondary]}>
                Penerapan pada layar utama TaskHub Mahasiswa
              </Text>
            </View>
          </View>

          <View style={styles.hookList}>
            {/* 1. Props */}
            <View style={styles.hookItem}>
              <Text style={[styles.hookBadge, { backgroundColor: '#EEF2FF', color: '#4F46E5' }]}>
                1. Props
              </Text>
              <Text style={[styles.hookDesc, dynamicStyles.textSecondary]}>
                Komponen induk (<Text style={{ fontWeight: '600' }}>HomeScreen</Text>) mengirimkan data tugas (nama, mata kuliah, deadline, status, onToggle, onDelete) ke komponen anak (<Text style={{ fontWeight: '600' }}>TaskCard</Text>, <Text style={{ fontWeight: '600' }}>TaskSummary</Text>).
              </Text>
            </View>

            {/* 2. useState */}
            <View style={styles.hookItem}>
              <Text style={[styles.hookBadge, { backgroundColor: '#FEF3C7', color: '#B45309' }]}>
                2. useState
              </Text>
              <Text style={[styles.hookDesc, dynamicStyles.textSecondary]}>
                Mengelola input form (<Text style={{ fontWeight: '600' }}>taskName</Text>, <Text style={{ fontWeight: '600' }}>courseName</Text>, <Text style={{ fontWeight: '600' }}>description</Text>, <Text style={{ fontWeight: '600' }}>deadline</Text>), keyword pencarian, dan status filter tab.
              </Text>
            </View>

            {/* 3. useEffect */}
            <View style={styles.hookItem}>
              <Text style={[styles.hookBadge, { backgroundColor: '#ECFDF5', color: '#047857' }]}>
                3. useEffect
              </Text>
              <Text style={[styles.hookDesc, dynamicStyles.textSecondary]}>
                Memantau perubahan keyword pencarian dengan dependency array <Text style={dynamicStyles.codeText}>[searchKeyword]</Text> dan mencetak log otomatis ke <Text style={dynamicStyles.codeText}>console.log()</Text>.
              </Text>
            </View>

            {/* 4. useMemo */}
            <View style={styles.hookItem}>
              <Text style={[styles.hookBadge, { backgroundColor: '#FDF2F8', color: '#BE185D' }]}>
                4. useMemo
              </Text>
              <Text style={[styles.hookDesc, dynamicStyles.textSecondary]}>
                Menghitung <Text style={{ fontWeight: '600' }}>pendingTasksCount</Text>, <Text style={{ fontWeight: '600' }}>completedTasksCount</Text>, dan <Text style={{ fontWeight: '600' }}>filteredTasks</Text> secara efisien hanya ketika dependency <Text style={dynamicStyles.codeText}>[tasks]</Text> berubah.
              </Text>
            </View>

            {/* 5. useCallback */}
            <View style={styles.hookItem}>
              <Text style={[styles.hookBadge, { backgroundColor: '#EFF6FF', color: '#1D4ED8' }]}>
                5. useCallback
              </Text>
              <Text style={[styles.hookDesc, dynamicStyles.textSecondary]}>
                Memoisasi fungsi <Text style={{ fontWeight: '600' }}>handleAddTask</Text>, <Text style={{ fontWeight: '600' }}>handleDeleteTask</Text>, <Text style={{ fontWeight: '600' }}>handleToggleStatus</Text>, dan <Text style={{ fontWeight: '600' }}>handleResetTasks</Text> agar tidak dirender ulang secara berlebihan.
              </Text>
            </View>

            {/* 6. useRef */}
            <View style={styles.hookItem}>
              <Text style={[styles.hookBadge, { backgroundColor: '#FFF7ED', color: '#C2410C' }]}>
                6. useRef
              </Text>
              <Text style={[styles.hookDesc, dynamicStyles.textSecondary]}>
                Menyimpan referensi ke TextInput nama tugas (<Text style={dynamicStyles.codeText}>taskNameInputRef</Text>). Setelah tugas berhasil ditambahkan, fokus diarahkan kembali via <Text style={dynamicStyles.codeText}>focus()</Text>.
              </Text>
            </View>

            {/* 7. useReducer */}
            <View style={styles.hookItem}>
              <Text style={[styles.hookBadge, { backgroundColor: '#F3E8FF', color: '#7E22CE' }]}>
                7. useReducer
              </Text>
              <Text style={[styles.hookDesc, dynamicStyles.textSecondary]}>
                Mengelola state array tugas dengan action: <Text style={dynamicStyles.codeText}>ADD_TASK</Text>, <Text style={dynamicStyles.codeText}>DELETE_TASK</Text>, <Text style={dynamicStyles.codeText}>TOGGLE_STATUS</Text>, dan <Text style={dynamicStyles.codeText}>RESET_TASKS</Text>.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
    gap: 16,
  },
  header: {
    gap: 6,
    paddingVertical: 8,
  },
  badge: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 18,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  cardSubtitle: {
    fontSize: 12,
  },
  checklist: {
    gap: 10,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  checkText: {
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
  },
  counterBox: {
    alignItems: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  counterDisplay: {
    fontSize: 48,
    fontWeight: '900',
    letterSpacing: -1,
  },
  counterCaption: {
    fontSize: 12,
    marginBottom: 6,
  },
  counterActionRow: {
    flexDirection: 'row',
    gap: 10,
  },
  counterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  counterBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  hookList: {
    gap: 14,
  },
  hookItem: {
    gap: 4,
  },
  hookBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    fontSize: 11.5,
    fontWeight: '700',
    overflow: 'hidden',
  },
  hookDesc: {
    fontSize: 12.5,
    lineHeight: 18,
  },
});
