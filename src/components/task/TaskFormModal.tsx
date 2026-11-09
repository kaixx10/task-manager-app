import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COURSE_PRESETS } from '@/types/task';

export interface TaskFormModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: () => void;
  // State inputs dari parent (useState)
  taskName: string;
  setTaskName: (val: string) => void;
  courseName: string;
  setCourseName: (val: string) => void;
  description: string;
  setDescription: (val: string) => void;
  deadline: string;
  setDeadline: (val: string) => void;
  // Ref input nama tugas (useRef)
  taskNameInputRef: React.RefObject<any>;
}

export const TaskFormModal: React.FC<TaskFormModalProps> = ({
  visible,
  onClose,
  onSubmit,
  taskName,
  setTaskName,
  courseName,
  setCourseName,
  description,
  setDescription,
  deadline,
  setDeadline,
  taskNameInputRef,
}) => {
  const isDark = useColorScheme() === 'dark';

  // Helper untuk preset tanggal deadline
  const setQuickDeadline = (daysAhead: number) => {
    const d = new Date();
    d.setDate(d.getDate() + daysAhead);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    setDeadline(`${yyyy}-${mm}-${dd}`);
  };

  const isFormValid = taskName.trim().length > 0 && courseName.trim().length > 0;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.overlay}>
        <View
          style={[
            styles.modalContent,
            {
              backgroundColor: isDark ? '#18191E' : '#FFFFFF',
              borderColor: isDark ? '#2E3138' : '#E5E7EB',
            },
          ]}>
          {/* Header Modal */}
          <View style={styles.modalHeader}>
            <View style={styles.titleContainer}>
              <View style={[styles.headerIconCircle, { backgroundColor: isDark ? '#312E81' : '#EEF2FF' }]}>
                <Ionicons name="add-circle" size={20} color="#6366F1" />
              </View>
              <View>
                <Text style={[styles.modalTitle, { color: isDark ? '#FFFFFF' : '#111827' }]}>
                  Tambah Tugas Kuliah
                </Text>
                <Text style={[styles.modalSubtitle, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
                  Isi rincian tugas akademik mahasiswa
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={onClose}
              style={[styles.closeButton, { backgroundColor: isDark ? '#272930' : '#F3F4F6' }]}
              accessibilityRole="button"
              accessibilityLabel="Tutup formulir">
              <Ionicons name="close" size={18} color={isDark ? '#9CA3AF' : '#6B7280'} />
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <ScrollView
            style={styles.scrollArea}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled">
            {/* Input 1: Nama Tugas (useRef attached here!) */}
            <View style={styles.formGroup}>
              <View style={styles.labelRow}>
                <Text style={[styles.label, { color: isDark ? '#E5E7EB' : '#374151' }]}>
                  Nama Tugas <Text style={styles.requiredStar}>*</Text>
                </Text>
                <Text style={[styles.inputHint, { color: isDark ? '#6B7280' : '#9CA3AF' }]}>
                  (useRef Auto-Focus)
                </Text>
              </View>
              <TextInput
                ref={taskNameInputRef as any}
                style={[
                  styles.input,
                  {
                    backgroundColor: isDark ? '#23252B' : '#F9FAFB',
                    borderColor: isDark ? '#374151' : '#D1D5DB',
                    color: isDark ? '#FFFFFF' : '#111827',
                  },
                ]}
                placeholder="cth: Praktikum Modul 5 React Native"
                placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
                value={taskName}
                onChangeText={setTaskName}
                autoFocus={true}
              />
            </View>

            {/* Input 2: Nama Mata Kuliah */}
            <View style={styles.formGroup}>
              <View style={styles.labelRow}>
                <Text style={[styles.label, { color: isDark ? '#E5E7EB' : '#374151' }]}>
                  Mata Kuliah <Text style={styles.requiredStar}>*</Text>
                </Text>
              </View>

              {/* Quick Course Presets */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.presetScroll}
                contentContainerStyle={styles.presetContainer}>
                {COURSE_PRESETS.map((c) => {
                  const isSelected = courseName === c.name;
                  return (
                    <TouchableOpacity
                      key={c.name}
                      style={[
                        styles.courseChip,
                        {
                          backgroundColor: isSelected
                            ? isDark ? '#312E81' : '#EEF2FF'
                            : isDark ? '#23252B' : '#F3F4F6',
                          borderColor: isSelected ? '#6366F1' : 'transparent',
                        },
                      ]}
                      onPress={() => setCourseName(c.name)}>
                      <View style={[styles.chipDot, { backgroundColor: c.color }]} />
                      <Text
                        style={[
                          styles.courseChipText,
                          {
                            color: isSelected
                              ? '#6366F1'
                              : isDark ? '#D1D5DB' : '#4B5563',
                            fontWeight: isSelected ? '700' : '500',
                          },
                        ]}>
                        {c.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: isDark ? '#23252B' : '#F9FAFB',
                    borderColor: isDark ? '#374151' : '#D1D5DB',
                    color: isDark ? '#FFFFFF' : '#111827',
                  },
                ]}
                placeholder="Atau ketik nama mata kuliah lain..."
                placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
                value={courseName}
                onChangeText={setCourseName}
              />
            </View>

            {/* Input 3: Deskripsi Tugas */}
            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: isDark ? '#E5E7EB' : '#374151' }]}>
                Deskripsi Tugas
              </Text>
              <TextInput
                style={[
                  styles.input,
                  styles.textArea,
                  {
                    backgroundColor: isDark ? '#23252B' : '#F9FAFB',
                    borderColor: isDark ? '#374151' : '#D1D5DB',
                    color: isDark ? '#FFFFFF' : '#111827',
                  },
                ]}
                placeholder="Rincian instruksi pengerjaan tugas, kriteria, link referensi..."
                placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            </View>

            {/* Input 4: Tanggal Pengumpulan (Deadline) */}
            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: isDark ? '#E5E7EB' : '#374151' }]}>
                Tanggal Pengumpulan (Deadline)
              </Text>

              {/* Quick Deadline Presets */}
              <View style={styles.quickDeadlineRow}>
                <TouchableOpacity
                  style={[styles.quickDeadlineBtn, { backgroundColor: isDark ? '#23252B' : '#F3F4F6' }]}
                  onPress={() => setQuickDeadline(1)}>
                  <Text style={[styles.quickDeadlineText, { color: isDark ? '#D1D5DB' : '#374151' }]}>
                    Besok
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.quickDeadlineBtn, { backgroundColor: isDark ? '#23252B' : '#F3F4F6' }]}
                  onPress={() => setQuickDeadline(3)}>
                  <Text style={[styles.quickDeadlineText, { color: isDark ? '#D1D5DB' : '#374151' }]}>
                    3 Hari
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.quickDeadlineBtn, { backgroundColor: isDark ? '#23252B' : '#F3F4F6' }]}
                  onPress={() => setQuickDeadline(7)}>
                  <Text style={[styles.quickDeadlineText, { color: isDark ? '#D1D5DB' : '#374151' }]}>
                    1 Minggu
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.quickDeadlineBtn, { backgroundColor: isDark ? '#23252B' : '#F3F4F6' }]}
                  onPress={() => setQuickDeadline(14)}>
                  <Text style={[styles.quickDeadlineText, { color: isDark ? '#D1D5DB' : '#374151' }]}>
                    2 Minggu
                  </Text>
                </TouchableOpacity>
              </View>

              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: isDark ? '#23252B' : '#F9FAFB',
                    borderColor: isDark ? '#374151' : '#D1D5DB',
                    color: isDark ? '#FFFFFF' : '#111827',
                  },
                ]}
                placeholder="Format: YYYY-MM-DD (cth: 2026-11-20)"
                placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
                value={deadline}
                onChangeText={setDeadline}
              />
            </View>
          </ScrollView>

          {/* Footer Actions */}
          <View style={[styles.modalFooter, { borderTopColor: isDark ? '#2E3138' : '#E5E7EB' }]}>
            <TouchableOpacity
              style={[styles.cancelButton, { backgroundColor: isDark ? '#272930' : '#F3F4F6' }]}
              onPress={onClose}>
              <Text style={[styles.cancelText, { color: isDark ? '#D1D5DB' : '#4B5563' }]}>
                Batal
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.submitButton,
                !isFormValid && styles.submitButtonDisabled,
              ]}
              onPress={onSubmit}
              disabled={!isFormValid}
              activeOpacity={0.8}>
              <Ionicons name="checkmark-sharp" size={18} color="#FFFFFF" />
              <Text style={styles.submitText}>
                Simpan Tugas
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderBottomWidth: 0,
    maxHeight: '90%',
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(156, 163, 175, 0.25)',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '700',
  },
  modalSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollArea: {
    maxHeight: 460,
  },
  scrollContent: {
    padding: 20,
    gap: 16,
  },
  formGroup: {
    gap: 6,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
  },
  inputHint: {
    fontSize: 11,
    fontStyle: 'italic',
  },
  requiredStar: {
    color: '#EF4444',
  },
  input: {
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  textArea: {
    minHeight: 70,
    paddingTop: 10,
  },
  presetScroll: {
    marginBottom: 4,
  },
  presetContainer: {
    gap: 6,
    paddingVertical: 2,
  },
  courseChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
    borderWidth: 1,
    gap: 5,
  },
  chipDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  courseChipText: {
    fontSize: 11.5,
  },
  quickDeadlineRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 4,
  },
  quickDeadlineBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  quickDeadlineText: {
    fontSize: 11.5,
    fontWeight: '500',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    paddingTop: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  cancelButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  cancelText: {
    fontSize: 13.5,
    fontWeight: '600',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#6366F1',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
  },
  submitButtonDisabled: {
    backgroundColor: '#A5B4FC',
    opacity: 0.6,
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: '700',
  },
});
