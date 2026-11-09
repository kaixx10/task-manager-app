import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  useReducer,
} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Platform,
  useColorScheme,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { Task, INITIAL_TASKS, COURSE_PRESETS } from '@/types/task';
import { taskReducer } from '@/reducers/taskReducer';
import { TaskCard } from '@/components/task/TaskCard';
import { TaskSummary } from '@/components/task/TaskSummary';
import { TaskSearchBar } from '@/components/task/TaskSearchBar';
import { TaskFilterChips, FilterStatus } from '@/components/task/TaskFilterChips';
import { TaskFormModal } from '@/components/task/TaskFormModal';
import { TaskEmptyState } from '@/components/task/TaskEmptyState';

export default function HomeScreen() {
  const isDark = useColorScheme() === 'dark';

  // =========================================================================
  // 1. useReducer: Mengelola state daftar tugas mahasiswa
  // Menyediakan action: ADD_TASK, DELETE_TASK, TOGGLE_STATUS, RESET_TASKS
  // =========================================================================
  const [tasks, dispatch] = useReducer(taskReducer, INITIAL_TASKS);

  // =========================================================================
  // 2. useState: Mengelola nilai input form, keyword pencarian, dan filter
  // =========================================================================
  const [taskName, setTaskName] = useState<string>('');
  const [courseName, setCourseName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [deadline, setDeadline] = useState<string>('');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('Semua');
  const [isFormModalVisible, setIsFormModalVisible] = useState<boolean>(false);

  // =========================================================================
  // 6. useRef: Mengakses komponen TextInput pada input nama tugas
  // Setelah tugas berhasil ditambahkan, arahkan fokus kembali ke input nama tugas
  // =========================================================================
  const taskNameInputRef = useRef<any>(null);

  // =========================================================================
  // 3. useEffect: Memantau perubahan keyword pencarian
  // Setiap kali keyword berubah, tampilkan perubahan melalui console.log()
  // =========================================================================
  useEffect(() => {
    console.log(`[Pencarian] Keyword pencarian berubah menjadi: "${searchKeyword}"`);
  }, [searchKeyword]);

  // =========================================================================
  // 4. useMemo: Menghitung ringkasan tugas dan memfilter daftar tugas
  // Perhitungan hanya dilakukan kembali ketika data tugas atau filter berubah
  // =========================================================================
  const pendingTasksCount = useMemo(() => {
    return tasks.filter((task) => task.status === 'Belum Dikerjakan').length;
  }, [tasks]);

  const completedTasksCount = useMemo(() => {
    return tasks.filter((task) => task.status === 'Selesai').length;
  }, [tasks]);

  const totalTasksCount = useMemo(() => {
    return tasks.length;
  }, [tasks]);

  // Memfilter tugas berdasarkan keyword pencarian (nama tugas ATAU mata kuliah) dan tab status
  const filteredTasks = useMemo(() => {
    const query = searchKeyword.trim().toLowerCase();
    return tasks.filter((task) => {
      // Pencarian berdasarkan nama tugas atau nama mata kuliah
      const matchesSearch =
        query === '' ||
        task.title.toLowerCase().includes(query) ||
        task.course.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query);

      // Filter berdasarkan tab status
      const matchesStatus =
        filterStatus === 'Semua' || task.status === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [tasks, searchKeyword, filterStatus]);

  // =========================================================================
  // 5. useCallback: Mengelola fungsi penambahan, penghapusan, dan toggle status
  // =========================================================================

  // Fungsi menambah tugas baru
  const handleAddTask = useCallback(() => {
    if (!taskName.trim() || !courseName.trim()) {
      const msg = 'Nama tugas dan mata kuliah wajib diisi!';
      if (Platform.OS === 'web') alert(msg);
      else Alert.alert('Peringatan', msg);
      return;
    }

    // Mencocokkan warna preset jika tersedia
    const matchedPreset = COURSE_PRESETS.find(
      (c) => c.name.toLowerCase() === courseName.trim().toLowerCase()
    );
    const colorTag = matchedPreset ? matchedPreset.color : '#6366F1';

    // Dispatch action ADD_TASK ke reducer
    dispatch({
      type: 'ADD_TASK',
      payload: {
        title: taskName,
        course: courseName,
        description: description,
        deadline: deadline || new Date().toISOString().split('T')[0],
        status: 'Belum Dikerjakan',
        colorTag: colorTag,
      },
    });

    // Reset input fields
    setTaskName('');
    setCourseName('');
    setDescription('');
    setDeadline('');

    // Sesuai ketentuan Soal 5:
    // "Setelah tugas berhasil ditambahkan, arahkan fokus kembali ke input nama tugas."
    setTimeout(() => {
      taskNameInputRef.current?.focus();
    }, 150);
  }, [taskName, courseName, description, deadline]);

  // Fungsi mengubah status tugas (toggle Belum Dikerjakan <-> Selesai)
  const handleToggleStatus = useCallback((id: string) => {
    dispatch({
      type: 'TOGGLE_STATUS',
      payload: { id },
    });
  }, []);

  // Fungsi menghapus tugas
  const handleDeleteTask = useCallback((id: string) => {
    dispatch({
      type: 'DELETE_TASK',
      payload: { id },
    });
  }, []);

  // Fungsi reset seluruh data tugas (RESET_TASKS action)
  const handleResetTasks = useCallback(() => {
    const doReset = () => {
      dispatch({ type: 'RESET_TASKS' });
    };

    if (Platform.OS === 'web') {
      if (window.confirm('Hapus seluruh daftar tugas? Tindakan ini akan mengosongkan semua data.')) {
        doReset();
      }
    } else {
      Alert.alert(
        'Hapus Seluruh Tugas',
        'Apakah Anda yakin ingin menghapus seluruh data tugas?',
        [
          { text: 'Batal', style: 'cancel' },
          { text: 'Hapus Semua', style: 'destructive', onPress: doReset },
        ],
        { cancelable: true }
      );
    }
  }, []);

  // Fungsi memuat ulang data contoh (LOAD_SAMPLE_TASKS action)
  const handleLoadSampleTasks = useCallback(() => {
    dispatch({ type: 'LOAD_SAMPLE_TASKS' });
  }, []);

  // Handler search bar
  const handleSearchChange = useCallback((text: string) => {
    setSearchKeyword(text);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchKeyword('');
  }, []);

  // =========================================================================
  // Render Item FlatList menggunakan Komponen Anak TaskCard (Props)
  // =========================================================================
  const renderTaskItem = useCallback(
    ({ item }: { item: Task }) => (
      <TaskCard
        id={item.id}
        title={item.title}
        course={item.course}
        description={item.description}
        deadline={item.deadline}
        status={item.status}
        colorTag={item.colorTag}
        onToggle={handleToggleStatus}
        onDelete={handleDeleteTask}
      />
    ),
    [handleToggleStatus, handleDeleteTask]
  );

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: isDark ? '#101114' : '#F8F9FA' },
      ]}
      edges={['top', 'left', 'right']}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      {/* FlatList: Komponen utama penampil daftar tugas sesuai ketentuan */}
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTaskItem}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
        // Header FlatList: Memuat Ringkasan, Form trigger, Search, dan Filter Chips
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            {/* Top Navigation Bar */}
            <View style={styles.topBar}>
              <View>
                <Text style={[styles.appBrand, { color: '#6366F1' }]}>
                  STUDENT TASK MANAGER
                </Text>
                <Text style={[styles.appTitle, { color: isDark ? '#FFFFFF' : '#111827' }]}>
                  TaskHub Mahasiswa
                </Text>
              </View>

              {/* Action Buttons Top Bar */}
              <View style={styles.topBarActions}>
                {/* Reset All Tasks Button */}
                <TouchableOpacity
                  style={[
                    styles.iconActionBtn,
                    {
                      backgroundColor: isDark ? '#23252B' : '#FFFFFF',
                      borderColor: isDark ? '#374151' : '#E5E7EB',
                    },
                  ]}
                  onPress={handleResetTasks}
                  activeOpacity={0.7}
                  accessibilityRole="button"
                  accessibilityLabel="Reset seluruh tugas">
                  <Ionicons
                    name="refresh-circle-outline"
                    size={20}
                    color={isDark ? '#F87171' : '#EF4444'}
                  />
                </TouchableOpacity>

                {/* Add Task Button */}
                <TouchableOpacity
                  style={styles.primaryAddBtn}
                  onPress={() => setIsFormModalVisible(true)}
                  activeOpacity={0.8}
                  accessibilityRole="button"
                  accessibilityLabel="Tambah tugas baru">
                  <Ionicons name="add" size={18} color="#FFFFFF" />
                  <Text style={styles.primaryAddBtnText}>Tambah</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Komponen Anak: TaskSummary (Ringkasan Tugas dengan useMemo) */}
            <TaskSummary
              total={totalTasksCount}
              pending={pendingTasksCount}
              completed={completedTasksCount}
            />

            {/* Komponen Anak: TaskSearchBar (Pencarian Tugas dengan useState & useEffect) */}
            <TaskSearchBar
              searchKeyword={searchKeyword}
              onChangeKeyword={handleSearchChange}
              onClear={handleClearSearch}
              resultCount={filteredTasks.length}
              totalCount={totalTasksCount}
            />

            {/* Komponen Anak: TaskFilterChips (Filter Status) */}
            <TaskFilterChips
              activeFilter={filterStatus}
              onSelectFilter={setFilterStatus}
              counts={{
                total: totalTasksCount,
                pending: pendingTasksCount,
                completed: completedTasksCount,
              }}
            />

            {/* Section Title */}
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
                DAFTAR TUGAS KULIAH ({filteredTasks.length})
              </Text>
            </View>
          </View>
        }
        // Komponen Anak: TaskEmptyState (Jika daftar tugas kosong)
        ListEmptyComponent={
          <TaskEmptyState
            isSearchActive={searchKeyword.trim().length > 0}
            searchKeyword={searchKeyword}
            onResetSearch={handleClearSearch}
            onAddTask={() => setIsFormModalVisible(true)}
            onLoadSamples={handleLoadSampleTasks}
          />
        }
      />

      {/* Floating Action Button (FAB) */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setIsFormModalVisible(true)}
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel="Tambah Tugas Baru">
        <Ionicons name="add" size={26} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Komponen Anak: TaskFormModal (Form Tambah Tugas dengan useRef auto-focus) */}
      <TaskFormModal
        visible={isFormModalVisible}
        onClose={() => setIsFormModalVisible(false)}
        onSubmit={() => {
          handleAddTask();
          // Tutup modal setelah submit
          setIsFormModalVisible(false);
        }}
        taskName={taskName}
        setTaskName={setTaskName}
        courseName={courseName}
        setCourseName={setCourseName}
        description={description}
        setDescription={setDescription}
        deadline={deadline}
        setDeadline={setDeadline}
        taskNameInputRef={taskNameInputRef}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 90,
  },
  headerContainer: {
    gap: 8,
    marginBottom: 6,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
  },
  appBrand: {
    fontSize: 10.5,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  appTitle: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  topBarActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconActionBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryAddBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#6366F1',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#6366F1',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      default: {
        boxShadow: '0 2px 4px 0 rgba(99, 102, 241, 0.3)',
      },
    }),
  },
  primaryAddBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  sectionHeader: {
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 4,
  },
  sectionTitle: {
    fontSize: 11.5,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#6366F1',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
      default: {
        boxShadow: '0 4px 12px 0 rgba(99, 102, 241, 0.4)',
      },
    }),
  },
});
