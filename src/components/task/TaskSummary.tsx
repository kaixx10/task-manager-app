import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { C, RADIUS, shadow } from '@/constants/colors';

export interface TaskSummaryProps {
  total: number;
  pending: number;
  completed: number;
}

type IconName = React.ComponentProps<typeof Ionicons>['name'];

const Card = ({ icon, label, value, color }: { icon: IconName; label: string; value: number; color: string }) => (
  <View style={[s.card, { borderTopColor: color }]}>
    <Ionicons name={icon} size={20} color={color} />
    <Text style={[s.value, { color }]}>{value}</Text>
    <Text style={s.label}>{label}</Text>
  </View>
);

export const TaskSummary: React.FC<TaskSummaryProps> = ({ total, pending, completed }) => (
  <View style={s.row}>
    <Card icon="albums-outline" label="Total Tugas" value={total} color={C.primary} />
    <Card icon="hourglass-outline" label="Belum Dikerjakan" value={pending} color={C.danger} />
    <Card icon="checkmark-circle-outline" label="Selesai" value={completed} color={C.success} />
  </View>
);

const s = StyleSheet.create({
  row: { flexDirection: 'row', gap: 10 },
  card: {
    flex: 1,
    backgroundColor: C.card,
    borderRadius: RADIUS,
    borderTopWidth: 3,
    padding: 12,
    gap: 2,
    ...shadow,
  },
  value: { fontSize: 26, fontWeight: '800', marginTop: 4 },
  label: { fontSize: 11.5, fontWeight: '600', color: C.muted },
});
