import React from 'react';
import { StyleSheet, View, Text, useColorScheme, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * Props untuk komponen anak TaskSummary (Ringkasan Tugas).
 * Menerima nilai yang dihitung menggunakan useMemo dari komponen induk.
 */
export interface TaskSummaryProps {
  total: number;
  pending: number;
  completed: number;
}

export const TaskSummary: React.FC<TaskSummaryProps> = ({
  total,
  pending,
  completed,
}) => {
  const isDark = useColorScheme() === 'dark';
  const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <View style={styles.container}>
      {/* 3 Metric Cards */}
      <View style={styles.metricsRow}>
        {/* Total Tasks Card */}
        <View
          style={[
            styles.metricCard,
            {
              backgroundColor: isDark ? '#1E1F25' : '#FFFFFF',
              borderColor: isDark ? '#2E3138' : '#E5E7EB',
            },
          ]}>
          <View style={styles.metricHeader}>
            <View style={[styles.iconCircle, { backgroundColor: isDark ? '#312E81' : '#EEF2FF' }]}>
              <Ionicons name="folder-outline" size={16} color="#6366F1" />
            </View>
            <Text style={[styles.metricLabel, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
              Total
            </Text>
          </View>
          <Text style={[styles.metricValue, { color: isDark ? '#FFFFFF' : '#111827' }]}>
            {total}
          </Text>
        </View>

        {/* Belum Dikerjakan Card */}
        <View
          style={[
            styles.metricCard,
            {
              backgroundColor: isDark ? '#1E1F25' : '#FFFFFF',
              borderColor: isDark ? '#2E3138' : '#E5E7EB',
            },
          ]}>
          <View style={styles.metricHeader}>
            <View style={[styles.iconCircle, { backgroundColor: isDark ? '#78350F33' : '#FEF3C7' }]}>
              <Ionicons name="time-outline" size={16} color="#D97706" />
            </View>
            <Text style={[styles.metricLabel, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
              Tertunda
            </Text>
          </View>
          <Text style={[styles.metricValue, { color: isDark ? '#FBBF24' : '#D97706' }]}>
            {pending}
          </Text>
        </View>

        {/* Selesai Card */}
        <View
          style={[
            styles.metricCard,
            {
              backgroundColor: isDark ? '#1E1F25' : '#FFFFFF',
              borderColor: isDark ? '#2E3138' : '#E5E7EB',
            },
          ]}>
          <View style={styles.metricHeader}>
            <View style={[styles.iconCircle, { backgroundColor: isDark ? '#064E3B44' : '#D1FAE5' }]}>
              <Ionicons name="checkmark-done" size={16} color="#059669" />
            </View>
            <Text style={[styles.metricLabel, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
              Selesai
            </Text>
          </View>
          <Text style={[styles.metricValue, { color: isDark ? '#34D399' : '#059669' }]}>
            {completed}
          </Text>
        </View>
      </View>

      {/* Progress Bar Container */}
      <View
        style={[
          styles.progressCard,
          {
            backgroundColor: isDark ? '#1E1F25' : '#FFFFFF',
            borderColor: isDark ? '#2E3138' : '#E5E7EB',
          },
        ]}>
        <View style={styles.progressHeader}>
          <Text style={[styles.progressTitle, { color: isDark ? '#F3F4F6' : '#1F2937' }]}>
            Progres Penyelesaian Tugas
          </Text>
          <Text style={[styles.progressPercent, { color: '#6366F1' }]}>
            {completionPercentage}%
          </Text>
        </View>

        <View style={[styles.progressBarTrack, { backgroundColor: isDark ? '#2E3138' : '#F3F4F6' }]}>
          <View
            style={[
              styles.progressBarFill,
              {
                width: `${completionPercentage}%`,
                backgroundColor: completionPercentage === 100 ? '#10B981' : '#6366F1',
              },
            ]}
          />
        </View>

        <Text style={[styles.progressSubtext, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
          {total === 0
            ? 'Belum ada tugas tercatat'
            : completed === total
            ? '🎉 Hebat! Semua tugas telah diselesaikan'
            : `${completed} dari ${total} tugas telah selesai (${pending} tugas tersisa)`}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
    gap: 10,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  metricCard: {
    flex: 1,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      },
      default: {
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
      },
    }),
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  iconCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 11.5,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  metricValue: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  progressCard: {
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    gap: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      },
      default: {
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
      },
    }),
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressTitle: {
    fontSize: 12.5,
    fontWeight: '700',
  },
  progressPercent: {
    fontSize: 12.5,
    fontWeight: '800',
  },
  progressBarTrack: {
    height: 7,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressSubtext: {
    fontSize: 11.5,
    fontWeight: '500',
  },
});
