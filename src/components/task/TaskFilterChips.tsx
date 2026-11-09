import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';

export type FilterStatus = 'Semua' | 'Belum Dikerjakan' | 'Selesai';

export interface TaskFilterChipsProps {
  activeFilter: FilterStatus;
  onSelectFilter: (filter: FilterStatus) => void;
  counts: {
    total: number;
    pending: number;
    completed: number;
  };
}

export const TaskFilterChips: React.FC<TaskFilterChipsProps> = ({
  activeFilter,
  onSelectFilter,
  counts,
}) => {
  const isDark = useColorScheme() === 'dark';

  const filters: { key: FilterStatus; label: string; count: number }[] = [
    { key: 'Semua', label: 'Semua', count: counts.total },
    { key: 'Belum Dikerjakan', label: 'Belum Dikerjakan', count: counts.pending },
    { key: 'Selesai', label: 'Selesai', count: counts.completed },
  ];

  return (
    <View style={styles.container}>
      {filters.map((f) => {
        const isSelected = activeFilter === f.key;
        return (
          <TouchableOpacity
            key={f.key}
            style={[
              styles.chip,
              isSelected ? styles.chipSelected : styles.chipUnselected,
              isDark && (isSelected ? styles.chipSelectedDark : styles.chipUnselectedDark),
            ]}
            onPress={() => onSelectFilter(f.key)}
            activeOpacity={0.7}
            accessibilityRole="tab"
            accessibilityState={{ selected: isSelected }}>
            <Text
              style={[
                styles.chipText,
                isSelected ? styles.chipTextSelected : styles.chipTextUnselected,
                isDark && (isSelected ? styles.chipTextSelectedDark : styles.chipTextUnselectedDark),
              ]}>
              {f.label}
            </Text>
            <View
              style={[
                styles.badge,
                isSelected ? styles.badgeSelected : styles.badgeUnselected,
                isDark && (isSelected ? styles.badgeSelectedDark : styles.badgeUnselectedDark),
              ]}>
              <Text
                style={[
                  styles.badgeText,
                  isSelected ? styles.badgeTextSelected : styles.badgeTextUnselected,
                  isDark && (isSelected ? styles.badgeTextSelectedDark : styles.badgeTextUnselectedDark),
                ]}>
                {f.count}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 6,
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6.5,
    borderRadius: 20,
    borderWidth: 1,
  },
  chipUnselected: {
    backgroundColor: '#F3F4F6',
    borderColor: '#E5E7EB',
  },
  chipUnselectedDark: {
    backgroundColor: '#1E1F25',
    borderColor: '#2E3138',
  },
  chipSelected: {
    backgroundColor: '#EEF2FF',
    borderColor: '#6366F1',
  },
  chipSelectedDark: {
    backgroundColor: '#312E8144',
    borderColor: '#6366F1',
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  chipTextUnselected: {
    color: '#4B5563',
  },
  chipTextUnselectedDark: {
    color: '#9CA3AF',
  },
  chipTextSelected: {
    color: '#4F46E5',
  },
  chipTextSelectedDark: {
    color: '#818CF8',
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 10,
  },
  badgeUnselected: {
    backgroundColor: '#E5E7EB',
  },
  badgeUnselectedDark: {
    backgroundColor: '#374151',
  },
  badgeSelected: {
    backgroundColor: '#6366F1',
  },
  badgeSelectedDark: {
    backgroundColor: '#6366F1',
  },
  badgeText: {
    fontSize: 10.5,
    fontWeight: '700',
  },
  badgeTextUnselected: {
    color: '#4B5563',
  },
  badgeTextUnselectedDark: {
    color: '#D1D5DB',
  },
  badgeTextSelected: {
    color: '#FFFFFF',
  },
  badgeTextSelectedDark: {
    color: '#FFFFFF',
  },
});
