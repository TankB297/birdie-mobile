import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { appTheme } from '@/constants/app-theme';
import { Fonts } from '@/constants/theme';
import { SectionCard } from '@/components/ui/section-card';

type HomeHeaderProps = {
  locationLabel: string;
};

export function HomeHeader({ locationLabel }: HomeHeaderProps) {
  return (
    <SectionCard style={styles.card}>
      <View style={styles.locationRow}>
        <View style={styles.locationLabelWrap}>
          <MaterialCommunityIcons name="map-marker" size={18} color={appTheme.colors.textMuted} />
          <Text style={styles.locationLabel}>{locationLabel}</Text>
        </View>
        <MaterialCommunityIcons name="bell-outline" size={20} color={appTheme.colors.textSecondary} />
      </View>
    </SectionCard>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 0,
    paddingTop: appTheme.spacing.md,
    paddingBottom: appTheme.spacing.md,
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
    color: appTheme.colors.textPrimary,
    fontSize: 17,
    fontWeight: '700',
    fontFamily: Fonts.rounded,
  },
});
