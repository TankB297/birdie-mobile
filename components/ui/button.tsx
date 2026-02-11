import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View, type PressableProps } from 'react-native';

import { appTheme } from '@/constants/app-theme';
import { Loader } from '@/components/ui/loader';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
} & PressableProps;

const sizeStyleMap: Record<ButtonSize, { container: object; label: object }> = {
  sm: {
    container: {
      minHeight: 36,
      paddingHorizontal: appTheme.spacing.md,
      paddingVertical: appTheme.spacing.sm,
    },
    label: {
      fontSize: 13,
    },
  },
  md: {
    container: {
      minHeight: 44,
      paddingHorizontal: appTheme.spacing.lg,
      paddingVertical: appTheme.spacing.md,
    },
    label: {
      fontSize: 15,
    },
  },
  lg: {
    container: {
      minHeight: 52,
      paddingHorizontal: appTheme.spacing.xl,
      paddingVertical: appTheme.spacing.md,
    },
    label: {
      fontSize: 16,
    },
  },
};

const variantStyleMap: Record<ButtonVariant, { container: object; label: object }> = {
  primary: {
    container: {
      backgroundColor: appTheme.colors.accent,
      borderWidth: 1,
      borderColor: appTheme.colors.accent,
    },
    label: {
      color: '#FFFFFF',
    },
  },
  secondary: {
    container: {
      backgroundColor: appTheme.colors.surfaceMuted,
      borderWidth: 1,
      borderColor: appTheme.colors.border,
    },
    label: {
      color: appTheme.colors.textPrimary,
    },
  },
  ghost: {
    container: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: 'transparent',
    },
    label: {
      color: appTheme.colors.accent,
    },
  },
  outline: {
    container: {
      backgroundColor: '#FFFFFF',
      borderWidth: 1,
      borderColor: appTheme.colors.accentSoft,
    },
    label: {
      color: appTheme.colors.accentStrong,
    },
  },
};

export function Button({
  label,
  variant = 'primary',
  size = 'md',
  disabled,
  loading,
  leftIcon,
  rightIcon,
  style,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      {...props}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        sizeStyleMap[size].container,
        variantStyleMap[variant].container,
        pressed && !isDisabled ? styles.pressed : undefined,
        isDisabled ? styles.disabled : undefined,
        style,
      ]}>
      <View style={styles.content}>
        {loading ? <Loader size="sm" color={variant === 'primary' ? '#FFFFFF' : appTheme.colors.accent} /> : leftIcon}
        <Text style={[styles.label, sizeStyleMap[size].label, variantStyleMap[variant].label]}>{label}</Text>
        {!loading ? rightIcon : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: appTheme.radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: appTheme.spacing.sm,
  },
  label: {
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.5,
  },
});
