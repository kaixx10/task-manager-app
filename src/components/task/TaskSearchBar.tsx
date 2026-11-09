import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  useColorScheme,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * Komponen input pencarian tugas.
 * Menerima keyword dan handler dari komponen induk.
 */
export interface TaskSearchBarProps {
  searchKeyword: string;
  onChangeKeyword: (text: string) => void;
  onClear: () => void;
  resultCount: number;
  totalCount: number;
}

export const TaskSearchBar: React.FC<TaskSearchBarProps> = ({
  searchKeyword,
  onChangeKeyword,
  onClear,
  resultCount,
  totalCount,
}) => {
  const isDark = useColorScheme() === 'dark';
  const hasKeyword = searchKeyword.trim().length > 0;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: isDark ? '#1E1F25' : '#FFFFFF',
            borderColor: hasKeyword
              ? '#6366F1'
              : isDark ? '#2E3138' : '#E5E7EB',
          },
        ]}>
        <Ionicons
          name="search-outline"
          size={18}
          color={hasKeyword ? '#6366F1' : (isDark ? '#9CA3AF' : '#6B7280')}
          style={styles.searchIcon}
        />

        <TextInput
          style={[
            styles.input,
            { color: isDark ? '#FFFFFF' : '#111827' },
          ]}
          placeholder="Cari nama tugas atau mata kuliah..."
          placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
          value={searchKeyword}
          onChangeText={onChangeKeyword}
          returnKeyType="search"
          autoCorrect={false}
          clearButtonMode="never"
        />

        {hasKeyword ? (
          <TouchableOpacity
            onPress={onClear}
            style={styles.clearButton}
            accessibilityRole="button"
            accessibilityLabel="Hapus pencarian">
            <Ionicons
              name="close-circle"
              size={18}
              color={isDark ? '#9CA3AF' : '#6B7280'}
            />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Live search indicator */}
      {hasKeyword ? (
        <View style={styles.feedbackRow}>
          <Text style={[styles.feedbackText, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
            Ditemukan <Text style={{ fontWeight: '700', color: '#6366F1' }}>{resultCount}</Text> dari {totalCount} tugas untuk &quot;{searchKeyword}&quot;
          </Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    gap: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1.5,
    paddingHorizontal: 12,
    height: 44,
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
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    paddingVertical: 0,
  },
  clearButton: {
    padding: 4,
  },
  feedbackRow: {
    paddingHorizontal: 4,
    paddingTop: 2,
  },
  feedbackText: {
    fontSize: 11.5,
  },
});
