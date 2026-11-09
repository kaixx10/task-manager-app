import React, { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import { C } from '@/constants/colors';
import { INITIAL_TASKS, Task } from '@/types/task';
import { taskReducer } from '@/reducers/taskReducer';
import { confirmAction, isValidDate } from '@/utils/helpers';
import { TaskCard } from '@/components/task/TaskCard';
import { TaskForm, TextInputRef } from '@/components/task/TaskForm';
import { TaskSearchBar } from '@/components/task/TaskSearchBar';
import { TaskSummary } from '@/components/task/TaskSummary';

export default function HomeScreen() {
  // useReducer: ADD_TASK, DELETE_TASK, TOGGLE_STATUS, RESET_TASKS
  const [tasks, dispatch] = useReducer(taskReducer, INITIAL_TASKS);

  // useState: input form + keyword pencarian
  const [taskName, setTaskName] = useState('');
  const [courseName, setCourseName] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [formError, setFormError] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  // useRef: akses TextInput "Nama Tugas"
  const taskNameInputRef = useRef<TextInputRef>(null);

  // useEffect: pantau perubahan keyword pencarian
  useEffect(() => {
    console.log(`[Pencarian] Keyword berubah: "${searchKeyword}"`);
  }, [searchKeyword]);

  // useMemo: ringkasan hanya dihitung ulang saat data tugas berubah
  const pendingCount = useMemo(() => tasks.filter((t) => t.status === 'Belum Dikerjakan').length, [tasks]);
  const completedCount = useMemo(() => tasks.filter((t) => t.status === 'Selesai').length, [tasks]);

  const filteredTasks = useMemo(() => {
    const q = searchKeyword.trim().toLowerCase();
    if (!q) return tasks;
    return tasks.filter((t) => t.title.toLowerCase().includes(q) || t.course.toLowerCase().includes(q));
  }, [tasks, searchKeyword]);

  // useCallback: tambah, hapus, ubah status, reset
  const handleAddTask = useCallback(() => {
    if (!taskName.trim() || !courseName.trim()) {
      setFormError('Nama tugas dan mata kuliah wajib diisi.');
      return;
    }
    if (!isValidDate(deadline.trim())) {
      setFormError('Deadline harus berformat YYYY-MM-DD, contoh 2026-11-20.');
      return;
    }
    dispatch({
      type: 'ADD_TASK',
      payload: {
        id: `task-${Date.now()}`,
        title: taskName.trim(),
        course: courseName.trim(),
        description: description.trim(),
        deadline: deadline.trim(),
        status: 'Belum Dikerjakan',
      },
    });
    setTaskName('');
    setCourseName('');
    setDescription('');
    setDeadline('');
    setFormError('');
    taskNameInputRef.current?.focus(); // fokus kembali ke input nama tugas
  }, [taskName, courseName, description, deadline]);

  const handleToggleStatus = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE_STATUS', payload: { id } });
  }, []);

  const handleDeleteTask = useCallback((id: string) => {
    confirmAction('Hapus Tugas', 'Tugas ini akan dihapus dari daftar.', 'Hapus', () =>
      dispatch({ type: 'DELETE_TASK', payload: { id } })
    );
  }, []);

  const handleResetTasks = useCallback(() => {
    confirmAction('Hapus Semua Tugas', 'Seluruh data tugas akan dihapus.', 'Hapus Semua', () =>
      dispatch({ type: 'RESET_TASKS' })
    );
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Task }) => (
      <TaskCard
        id={item.id}
        title={item.title}
        course={item.course}
        description={item.description}
        deadline={item.deadline}
        status={item.status}
        onToggle={handleToggleStatus}
        onDelete={handleDeleteTask}
      />
    ),
    [handleToggleStatus, handleDeleteTask]
  );

  const searching = searchKeyword.trim().length > 0;

  const header = (
    <View style={s.header}>
      <View>
        <Text style={s.appTitle}>Manajemen Tugas Mahasiswa</Text>
        <Text style={s.appSubtitle}>Kelola dan pantau deadline tugas perkuliahan</Text>
      </View>

      <TaskSummary total={tasks.length} pending={pendingCount} completed={completedCount} />
      <TaskSearchBar value={searchKeyword} onChange={setSearchKeyword} />
      <TaskForm
        taskName={taskName}
        setTaskName={setTaskName}
        courseName={courseName}
        setCourseName={setCourseName}
        description={description}
        setDescription={setDescription}
        deadline={deadline}
        setDeadline={setDeadline}
        error={formError}
        onSubmit={handleAddTask}
        ref={taskNameInputRef}
      />

      <View style={s.listHeader}>
        <Text style={s.listTitle}>Daftar Tugas ({filteredTasks.length})</Text>
        {tasks.length > 0 && (
          <TouchableOpacity style={s.resetBtn} onPress={handleResetTasks}>
            <Ionicons name="trash-bin-outline" size={14} color={C.danger} />
            <Text style={s.resetText}>Hapus Semua</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const empty = (
    <View style={s.empty}>
      <Ionicons name={searching ? 'search-outline' : 'clipboard-outline'} size={36} color={C.muted} />
      <Text style={s.emptyTitle}>{searching ? 'Tugas tidak ditemukan' : 'Belum ada tugas'}</Text>
      <Text style={s.emptyText}>
        {searching
          ? `Tidak ada nama tugas atau mata kuliah yang cocok dengan "${searchKeyword}".`
          : 'Isi formulir di atas untuk menambahkan tugas pertama Anda.'}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={s.safe} edges={['top', 'left', 'right']}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView style={s.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListHeaderComponent={header}
          ListEmptyComponent={empty}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={s.content}
          showsVerticalScrollIndicator={false}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  flex: { flex: 1 },
  content: { padding: 16, paddingBottom: 40, width: '100%', maxWidth: 720, alignSelf: 'center' },
  header: { gap: 16, marginBottom: 8 },
  appTitle: { fontSize: 24, fontWeight: '800', color: C.text },
  appSubtitle: { fontSize: 14, color: C.muted, marginTop: 2 },
  listHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  listTitle: { fontSize: 17, fontWeight: '700', color: C.text },
  resetBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, padding: 6 },
  resetText: { fontSize: 12.5, fontWeight: '600', color: C.danger },
  empty: { alignItems: 'center', gap: 6, paddingVertical: 32, paddingHorizontal: 24 },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: C.text },
  emptyText: { fontSize: 13, color: C.muted, textAlign: 'center' },
});
