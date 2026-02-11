import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { SectionCard } from '@/components/ui/section-card';
import { appTheme } from '@/constants/app-theme';

type HomeCtaProps = {
  title: string;
  subtitle: string;
  actionLabel: string;
};

export function HomeCta({ title, subtitle, actionLabel }: HomeCtaProps) {
  return (
    <SectionCard style={styles.card}>
      <View style={styles.titleRow}>
        <MaterialCommunityIcons name="emoticon-confused-outline" size={24} color={appTheme.colors.accentStrong} />
        <Text style={styles.title}>{title}</Text>
      </View>

      <Text style={styles.subtitle}>{subtitle}</Text>

      <Button
        label={actionLabel}
        size="lg"
        leftIcon={<MaterialCommunityIcons name="plus" size={18} color="#FFFFFF" />}
      />
    </SectionCard>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: appTheme.spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: appTheme.spacing.sm,
  },
  title: {
    color: appTheme.colors.textPrimary,
    fontSize: 26,
    lineHeight: 34,
    fontWeight: '700',
  },
  subtitle: {
    color: appTheme.colors.textSecondary,
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '500',
  },
});
