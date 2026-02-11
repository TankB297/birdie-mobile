import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { appTheme } from '@/constants/app-theme';
import { Fonts } from '@/constants/theme';
import { SectionCard } from '@/components/ui/section-card';

type HomeHeaderProps = {
  locationLabel: string;
  prompt: string;
};

export function HomeHeader({ locationLabel, prompt }: HomeHeaderProps) {
  return (
    <SectionCard style={styles.card}>
      <View style={styles.locationRow}>
        <View style={styles.locationLabelWrap}>
          <MaterialCommunityIcons name="map-marker" size={18} color={appTheme.colors.accent} />
          <Text style={styles.locationLabel}>{locationLabel}</Text>
        </View>
        <MaterialCommunityIcons name="bell-outline" size={20} color={appTheme.colors.textSecondary} />
      </View>

      <Text style={styles.prompt}>{prompt}</Text>
    </SectionCard>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: appTheme.spacing.md,
    paddingTop: appTheme.spacing.xl,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationLabelWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: appTheme.spacing.sm,
  },
  locationLabel: {
    color: appTheme.colors.accentStrong,
    fontSize: 20,
    fontWeight: '700',
    fontFamily: Fonts.rounded,
  },
  prompt: {
    color: appTheme.colors.textPrimary,
    fontSize: 34,
    lineHeight: 42,
    fontWeight: '700',
    fontFamily: Fonts.rounded,
    letterSpacing: 0.2,
  },
});
