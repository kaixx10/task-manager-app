import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { C, RADIUS, shadow } from '@/constants/colors';
import { TaskStatus } from '@/types/task';
import { formatDate, isOverdue } from '@/utils/helpers';

export interface TaskCardProps {
  id: string;
  title: string;
  course: string;
  description: string;
  deadline: string;
  status: TaskStatus;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskCardBase: React.FC<TaskCardProps> = ({
  id, title, course, description, deadline, status, onToggle, onDelete,
}) => {
  const done = status === 'Selesai';
  const late = !done && isOverdue(deadline);

  return (
    <View style={[s.card, { borderLeftColor: done ? C.success : C.danger }, done && s.cardDone]}>
      <View style={s.topRow}>
        <View style={s.course}>
          <Text style={s.courseText} numberOfLines={1}>{course}</Text>
        </View>
        <View style={[s.badge, { backgroundColor: done ? C.successLight : C.dangerLight }]}>
          <Text style={[s.badgeText, { color: done ? C.successDark : C.danger }]}>{status}</Text>
        </View>
      </View>

      <Text style={[s.title, done && s.titleDone]}>{title}</Text>
      {description ? <Text style={s.desc}>{description}</Text> : null}

      <View style={s.deadline}>
        <Ionicons name="time-outline" size={15} color={late ? C.danger : C.muted} />
        <Text style={[s.deadlineText, late && { color: C.danger, fontWeight: '700' }]}>
          {formatDate(deadline)}{late ? ' (terlambat)' : ''}
        </Text>
      </View>

      <View style={s.actions}>
        <TouchableOpacity
          style={[s.btn, { borderColor: done ? C.border : C.success }]}
          onPress={() => onToggle(id)}
          activeOpacity={0.8}>
          <Ionicons
            name={done ? 'arrow-undo-outline' : 'checkmark-circle-outline'}
            size={16}
            color={done ? C.muted : C.successDark}
          />
          <Text style={[s.btnText, { color: done ? C.muted : C.successDark }]}>
            {done ? 'Batal Selesai' : 'Tandai Selesai'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[s.btn, { borderColor: C.danger, backgroundColor: C.dangerLight }]}
          onPress={() => onDelete(id)}
          activeOpacity={0.8}>
          <Ionicons name="trash-outline" size={16} color={C.danger} />
          <Text style={[s.btnText, { color: C.danger }]}>Hapus Tugas</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const TaskCard = React.memo(TaskCardBase);

const s = StyleSheet.create({
  card: {
    backgroundColor: C.card,
    borderRadius: RADIUS,
    borderLeftWidth: 4,
    padding: 14,
    gap: 8,
    marginBottom: 12,
    ...shadow,
  },
  cardDone: { opacity: 0.85 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 },
  course: { flexShrink: 1, backgroundColor: C.primaryLight, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  courseText: { fontSize: 12, fontWeight: '600', color: C.primary },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  badgeText: { fontSize: 11.5, fontWeight: '700' },
  title: { fontSize: 16, fontWeight: '700', color: C.text },
  titleDone: { textDecorationLine: 'line-through', color: C.muted },
  desc: { fontSize: 13, lineHeight: 19, color: C.muted },
  deadline: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  deadlineText: { fontSize: 12.5, color: C.muted, fontWeight: '500' },
  actions: { flexDirection: 'row', gap: 8, marginTop: 4 },
  btn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 9,
    borderRadius: RADIUS,
    borderWidth: 1,
  },
  btnText: { fontSize: 12.5, fontWeight: '700' },
});
