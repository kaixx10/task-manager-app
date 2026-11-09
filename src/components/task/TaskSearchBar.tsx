import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { C, RADIUS, shadow } from '@/constants/colors';

export interface TaskSearchBarProps {
  value: string;
  onChange: (text: string) => void;
}

export const TaskSearchBar: React.FC<TaskSearchBarProps> = ({ value, onChange }) => (
  <View style={s.box}>
    <Ionicons name="search" size={18} color={C.muted} />
    <TextInput
      style={s.input}
      placeholder="Cari nama tugas atau mata kuliah..."
      placeholderTextColor="#94a3b8"
      value={value}
      onChangeText={onChange}
      autoCorrect={false}
    />
    {value.length > 0 && (
      <TouchableOpacity onPress={() => onChange('')} accessibilityLabel="Hapus pencarian">
        <Ionicons name="close-circle" size={18} color={C.muted} />
      </TouchableOpacity>
    )}
  </View>
);

const s = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 46,
    paddingHorizontal: 12,
    backgroundColor: C.card,
    borderRadius: RADIUS,
    borderWidth: 1,
    borderColor: C.border,
    ...shadow,
  },
  input: { flex: 1, fontSize: 14, color: C.text, paddingVertical: 0 },
});
