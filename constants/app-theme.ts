export const appTheme = {
  colors: {
    background: '#F8F3EE',
    surface: '#FFFFFF',
    surfaceMuted: '#F4ECE5',
    textPrimary: '#2E1E14',
    textSecondary: '#715447',
    textMuted: '#A57A67',
    border: '#E6D3C7',
    accent: '#CC5500',
    accentStrong: '#A94900',
    accentSoft: '#F2C9A8',
    success: '#2B8A3E',
    warning: '#B26A00',
    danger: '#B63A2B',
  },
  radius: {
    sm: 10,
    md: 14,
    lg: 20,
    xl: 28,
    pill: 999,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
  },
  shadow: {
    card: {
      shadowColor: '#2E1E14',
      shadowOpacity: 0.06,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 8 },
      elevation: 3,
    },
  },
} as const;

export type AppTheme = typeof appTheme;
