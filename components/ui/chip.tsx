import { Pressable, StyleSheet, Text, type ViewStyle } from 'react-native';

import { appTheme } from '@/constants/app-theme';

type ChipVariant = 'filled' | 'outlined';

type ChipProps = {
  label: string;
  active?: boolean;
  onPress?: () => void;
  variant?: ChipVariant;
  style?: ViewStyle;
};

export function Chip({
  label,
  active = false,
  onPress,
  variant = 'outlined',
  style,
}: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        variant === 'filled' ? styles.filled : styles.outlined,
        active ? styles.active : undefined,
        pressed ? styles.pressed : undefined,
        style,
      ]}>
      <Text style={[styles.label, active ? styles.labelActive : undefined]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: appTheme.radius.pill,
    paddingVertical: appTheme.spacing.sm,
    paddingHorizontal: appTheme.spacing.md,
    borderWidth: 1,
  },
  outlined: {
    borderColor: appTheme.colors.border,
    backgroundColor: '#FFFFFF',
  },
  filled: {
    borderColor: appTheme.colors.accentSoft,
    backgroundColor: appTheme.colors.surfaceMuted,
  },
  active: {
    borderColor: appTheme.colors.accent,
    backgroundColor: '#FFE7D3',
  },
  label: {
    color: appTheme.colors.textSecondary,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  labelActive: {
    color: appTheme.colors.accentStrong,
  },
  pressed: {
    opacity: 0.8,
  },
});
