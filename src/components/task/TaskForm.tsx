import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { C, RADIUS, shadow } from '@/constants/colors';
import { addDays } from '@/utils/helpers';

export type TextInputRef = React.ComponentRef<typeof TextInput>;

export interface TaskFormProps {
  taskName: string;
  setTaskName: (v: string) => void;
  courseName: string;
  setCourseName: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  deadline: string;
  setDeadline: (v: string) => void;
  error: string;
  onSubmit: () => void;
  /** ref ke input Nama Tugas (useRef di parent, untuk fokus kembali setelah tugas ditambahkan) */
  ref?: React.Ref<TextInputRef>;
}

const QUICK = [
  { label: 'Besok', days: 1 },
  { label: '3 Hari', days: 3 },
  { label: '1 Minggu', days: 7 },
];

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <View style={s.field}>
    <Text style={s.label}>{label}</Text>
    {children}
  </View>
);

export const TaskForm = ({
  taskName, setTaskName, courseName, setCourseName, description, setDescription,
  deadline, setDeadline, error, onSubmit, ref,
}: TaskFormProps) => (
  <View style={s.card}>
    <Text style={s.title}>Tambah Tugas Baru</Text>

    <Field label="Nama Tugas">
      <TextInput
        ref={ref}
        style={s.input}
        placeholder="cth: Laporan Praktikum Modul 5"
        placeholderTextColor="#94a3b8"
        value={taskName}
        onChangeText={setTaskName}
      />
    </Field>

    <Field label="Mata Kuliah">
      <TextInput
        style={s.input}
        placeholder="cth: Pemrograman Visual"
        placeholderTextColor="#94a3b8"
        value={courseName}
        onChangeText={setCourseName}
      />
    </Field>

    <Field label="Deskripsi Tugas">
      <TextInput
        style={[s.input, s.area]}
        placeholder="Tulis rincian atau instruksi tugas..."
        placeholderTextColor="#94a3b8"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={3}
        textAlignVertical="top"
      />
    </Field>

    <Field label="Tanggal Pengumpulan (Deadline)">
      <View style={s.chips}>
        {QUICK.map((q) => (
          <TouchableOpacity key={q.label} style={s.chip} onPress={() => setDeadline(addDays(q.days))}>
            <Text style={s.chipText}>{q.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TextInput
        style={s.input}
        placeholder="YYYY-MM-DD (cth: 2026-11-20)"
        placeholderTextColor="#94a3b8"
        value={deadline}
        onChangeText={setDeadline}
        keyboardType="numbers-and-punctuation"
        maxLength={10}
      />
    </Field>

    {error ? <Text style={s.error}>{error}</Text> : null}

    <TouchableOpacity style={s.button} onPress={onSubmit} activeOpacity={0.85}>
      <Ionicons name="add-circle-outline" size={20} color="#fff" />
      <Text style={s.buttonText}>Tambah Tugas</Text>
    </TouchableOpacity>
  </View>
);

const s = StyleSheet.create({
  card: { backgroundColor: C.card, borderRadius: RADIUS, padding: 16, gap: 12, ...shadow },
  title: { fontSize: 17, fontWeight: '700', color: C.text },
  field: { gap: 6 },
  label: { fontSize: 13, fontWeight: '600', color: C.text },
  input: {
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: RADIUS,
    backgroundColor: C.bg,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: C.text,
  },
  area: { minHeight: 80 },
  chips: { flexDirection: 'row', gap: 8 },
  chip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, backgroundColor: C.primaryLight },
  chipText: { fontSize: 12, fontWeight: '600', color: C.primary },
  error: { color: C.danger, fontSize: 13, fontWeight: '500' },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: C.primary,
    borderRadius: RADIUS,
    paddingVertical: 13,
  },
  buttonText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});
