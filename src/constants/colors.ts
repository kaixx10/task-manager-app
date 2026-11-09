import { Platform, type ViewStyle } from 'react-native';

export const C = {
  bg: '#f8fafc',
  card: '#ffffff',
  primary: '#2563eb',
  primaryLight: '#dbeafe',
  success: '#22c55e',
  successDark: '#15803d',
  successLight: '#dcfce7',
  danger: '#ef4444',
  dangerLight: '#fee2e2',
  text: '#0f172a',
  muted: '#64748b',
  border: '#e2e8f0',
} as const;

export const RADIUS = 12;

export const shadow = Platform.select({
  ios: {
    shadowColor: '#0f172a',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  android: { elevation: 2 },
  default: { boxShadow: '0 2px 8px rgba(15, 23, 42, 0.08)' },
}) as ViewStyle;
