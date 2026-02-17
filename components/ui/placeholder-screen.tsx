import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { AppScreenHeader } from '@/components/shared/app-screen-header';
import { SectionCard } from '@/components/ui/section-card';
import { appTheme } from '@/constants/app-theme';

type PlaceholderScreenProps = {
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  subtitle: string;
};

export function PlaceholderScreen({ iconName, title, subtitle }: PlaceholderScreenProps) {
  return (
    <View style={styles.container}>
      <AppScreenHeader title={title} />

      <SectionCard style={styles.card}>
        <MaterialCommunityIcons name={iconName} size={34} color={appTheme.colors.accent} />
        <Text style={styles.subtitle}>{subtitle}</Text>
      </SectionCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appTheme.colors.background,
    padding: appTheme.spacing.md,
    gap: appTheme.spacing.md,
  },
  card: {
    marginTop: appTheme.spacing.sm,
    alignItems: 'center',
    gap: appTheme.spacing.sm,
    paddingVertical: appTheme.spacing.xxl,
  },
  subtitle: {
    color: appTheme.colors.textSecondary,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 20,
  },
});
