import { StyleSheet, View, type ViewProps } from 'react-native';

import { appTheme } from '@/constants/app-theme';

type SectionCardProps = ViewProps;

export function SectionCard({ style, ...props }: SectionCardProps) {
  return <View {...props} style={[styles.base, style]} />;
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: appTheme.colors.surface,
    borderRadius: appTheme.radius.lg,
    borderWidth: 1,
    borderColor: appTheme.colors.border,
    padding: appTheme.spacing.lg,
    ...appTheme.shadow.card,
  },
});
