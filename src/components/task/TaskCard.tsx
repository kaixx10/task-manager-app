import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TaskStatus } from '@/types/task';

/**
 * Props untuk komponen anak TaskCard.
 * Sesuai ketentuan Soal 5:
 * "komponen TaskCard menerima nama tugas, mata kuliah, deadline, dan status tugas dari komponen induk."
 */
export interface TaskCardProps {
  id: string;
  title: string;        // nama tugas
  course: string;       // nama mata kuliah
  description: string;  // deskripsi tugas
  deadline: string;     // deadline pengumpulan
  status: TaskStatus;   // status pengerjaan
  colorTag?: string;    // warna aksen mata kuliah
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  course,
  description,
  deadline,
  status,
  colorTag = '#6366F1',
  onToggle,
  onDelete,
}) => {
  const isDark = useColorScheme() === 'dark';
  const isCompleted = status === 'Selesai';

  const handleConfirmDelete = () => {
    if (Platform.OS === 'web') {
      if (window.confirm(`Hapus tugas "${title}"?`)) {
        onDelete(id);
      }
    } else {
      Alert.alert(
        'Hapus Tugas',
        `Apakah Anda yakin ingin menghapus tugas "${title}"?`,
        [
          { text: 'Batal', style: 'cancel' },
          { text: 'Hapus', style: 'destructive', onPress: () => onDelete(id) },
        ],
        { cancelable: true }
      );
    }
  };

  // Format deadline date for display
  const formatDeadline = (rawDate: string) => {
    if (!rawDate) return '-';
    try {
      const date = new Date(rawDate);
      if (isNaN(date.getTime())) return rawDate;
      return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return rawDate;
    }
  };

  const dynamicStyles = {
    card: {
      backgroundColor: isDark ? '#18191E' : '#FFFFFF',
      borderColor: isCompleted
        ? isDark ? '#14532D' : '#D1FAE5'
        : isDark ? '#2E3138' : '#E5E7EB',
    },
    title: {
      color: isCompleted
        ? isDark ? '#6B7280' : '#9CA3AF'
        : isDark ? '#F3F4F6' : '#111827',
      textDecorationLine: isCompleted ? ('line-through' as const) : ('none' as const),
    },
    description: {
      color: isDark ? '#9CA3AF' : '#4B5563',
    },
    deadlineText: {
      color: isDark ? '#D1D5DB' : '#374151',
    },
    deadlineBg: {
      backgroundColor: isDark ? '#23252B' : '#F3F4F6',
    },
    cardBorderStatus: isCompleted
      ? isDark ? '#065F46' : '#10B981'
      : colorTag,
  };

  return (
    <View style={[styles.cardContainer, dynamicStyles.card]}>
      {/* Visual Accent Strip on Left */}
      <View
        style={[
          styles.accentStrip,
          { backgroundColor: dynamicStyles.cardBorderStatus },
        ]}
      />

      <View style={styles.cardContent}>
        {/* Header: Course Pill & Status Badge */}
        <View style={styles.headerRow}>
          <View
            style={[
              styles.coursePill,
              {
                backgroundColor: isDark ? `${colorTag}22` : `${colorTag}15`,
                borderColor: `${colorTag}40`,
              },
            ]}>
            <View style={[styles.courseDot, { backgroundColor: colorTag }]} />
            <Text
              style={[styles.courseText, { color: colorTag }]}
              numberOfLines={1}>
              {course}
            </Text>
          </View>

          {/* Status Badge */}
          <View
            style={[
              styles.statusBadge,
              isCompleted ? styles.statusBadgeCompleted : styles.statusBadgePending,
              isDark && (isCompleted ? styles.statusBadgeCompletedDark : styles.statusBadgePendingDark),
            ]}>
            <Ionicons
              name={isCompleted ? 'checkmark-circle' : 'time-outline'}
              size={12}
              color={isCompleted ? (isDark ? '#34D399' : '#059669') : (isDark ? '#FBBF24' : '#D97706')}
              style={{ marginRight: 4 }}
            />
            <Text
              style={[
                styles.statusText,
                isCompleted ? styles.statusTextCompleted : styles.statusTextPending,
                isDark && (isCompleted ? styles.statusTextCompletedDark : styles.statusTextPendingDark),
              ]}>
              {status}
            </Text>
          </View>
        </View>

        {/* Task Title */}
        <Text style={[styles.title, dynamicStyles.title]}>
          {title}
        </Text>

        {/* Task Description */}
        {description ? (
          <Text style={[styles.description, dynamicStyles.description]}>
            {description}
          </Text>
        ) : null}

        {/* Footer: Deadline & Action Buttons */}
        <View style={styles.footerRow}>
          {/* Deadline Chip */}
          <View style={[styles.deadlineChip, dynamicStyles.deadlineBg]}>
            <Ionicons
              name="calendar-outline"
              size={13}
              color={isDark ? '#9CA3AF' : '#6B7280'}
            />
            <Text style={[styles.deadlineText, dynamicStyles.deadlineText]}>
              {formatDeadline(deadline)}
            </Text>
          </View>

          {/* Action Buttons: Status Toggle & Delete */}
          <View style={styles.actionsContainer}>
            {/* Toggle Status Button */}
            <TouchableOpacity
              style={[
                styles.toggleButton,
                isCompleted ? styles.toggleButtonCompleted : styles.toggleButtonPending,
                isDark && (isCompleted ? styles.toggleButtonCompletedDark : styles.toggleButtonPendingDark),
              ]}
              onPress={() => onToggle(id)}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel={`Ubah status ${title}`}>
              <Ionicons
                name={isCompleted ? 'checkbox' : 'square-outline'}
                size={16}
                color={isCompleted ? '#10B981' : (isDark ? '#9CA3AF' : '#4B5563')}
              />
              <Text
                style={[
                  styles.toggleButtonText,
                  isCompleted ? styles.toggleTextCompleted : styles.toggleTextPending,
                  isDark && (isCompleted ? styles.toggleTextCompletedDark : styles.toggleTextPendingDark),
                ]}>
                {isCompleted ? 'Selesai' : 'Tandai Selesai'}
              </Text>
            </TouchableOpacity>

            {/* Delete Button */}
            <TouchableOpacity
              style={[
                styles.deleteButton,
                isDark && styles.deleteButtonDark,
              ]}
              onPress={handleConfirmDelete}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel={`Hapus tugas ${title}`}>
              <Ionicons
                name="trash-outline"
                size={16}
                color={isDark ? '#F87171' : '#EF4444'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 16,
    borderWidth: 1,
    marginHorizontal: 16,
    marginVertical: 6,
    overflow: 'hidden',
    flexDirection: 'row',
    // Modern soft shadow
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
      default: {
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.06), 0 1px 2px -1px rgba(0, 0, 0, 0.06)',
      },
    }),
  },
  accentStrip: {
    width: 5,
  },
  cardContent: {
    flex: 1,
    padding: 14,
    gap: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  coursePill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 3.5,
    borderRadius: 20,
    borderWidth: 1,
    maxWidth: '65%',
  },
  courseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  courseText: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  statusBadgePending: {
    backgroundColor: '#FEF3C7',
  },
  statusBadgePendingDark: {
    backgroundColor: '#78350F33',
  },
  statusBadgeCompleted: {
    backgroundColor: '#D1FAE5',
  },
  statusBadgeCompletedDark: {
    backgroundColor: '#064E3B44',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  statusTextPending: {
    color: '#B45309',
  },
  statusTextPendingDark: {
    color: '#FCD34D',
  },
  statusTextCompleted: {
    color: '#047857',
  },
  statusTextCompletedDark: {
    color: '#6EE7B7',
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 20,
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    paddingTop: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(156, 163, 175, 0.25)',
  },
  deadlineChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  deadlineText: {
    fontSize: 11.5,
    fontWeight: '500',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  toggleButtonPending: {
    backgroundColor: '#F3F4F6',
    borderColor: '#E5E7EB',
  },
  toggleButtonPendingDark: {
    backgroundColor: '#272930',
    borderColor: '#374151',
  },
  toggleButtonCompleted: {
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0',
  },
  toggleButtonCompletedDark: {
    backgroundColor: '#064E3B33',
    borderColor: '#059669',
  },
  toggleButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  toggleTextPending: {
    color: '#374151',
  },
  toggleTextPendingDark: {
    color: '#D1D5DB',
  },
  toggleTextCompleted: {
    color: '#059669',
  },
  toggleTextCompletedDark: {
    color: '#34D399',
  },
  deleteButton: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: '#FEE2E2',
  },
  deleteButtonDark: {
    backgroundColor: '#7F1D1D33',
  },
});
