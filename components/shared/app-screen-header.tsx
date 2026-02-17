import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { SectionCard } from '@/components/ui/section-card';
import { appTheme } from '@/constants/app-theme';

type AppScreenHeaderProps = {
  title?: string;
  locationLabel?: string;
  showNotification?: boolean;
  onPressNotification?: () => void;
  onPressCreate?: () => void;
};

function LeftContent({ title, locationLabel }: { title?: string; locationLabel?: string }) {
  if (locationLabel) {
    return (
      <View style={styles.leftRow}>
        <MaterialCommunityIcons name="map-marker" size={18} color={appTheme.colors.textMuted} />
        <Text style={styles.locationText}>{locationLabel}</Text>
      </View>
    );
  }

  return <Text style={styles.titleText}>{title}</Text>;
}

export function AppScreenHeader({
  title,
  locationLabel,
  showNotification = false,
  onPressNotification,
  onPressCreate,
}: AppScreenHeaderProps) {
  return (
    <SectionCard style={styles.card}>
      <View style={styles.row}>
        <LeftContent title={title} locationLabel={locationLabel} />

        <View style={styles.actions}>
          {showNotification ? (
            <Pressable onPress={onPressNotification} style={styles.iconButton}>
              <MaterialCommunityIcons name="bell-outline" size={18} color={appTheme.colors.textSecondary} />
            </Pressable>
          ) : null}

          <Pressable onPress={onPressCreate} style={styles.iconButton}>
            <MaterialCommunityIcons name="plus" size={18} color={appTheme.colors.textSecondary} />
          </Pressable>
        </View>
      </View>
    </SectionCard>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingVertical: appTheme.spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: appTheme.spacing.md,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: appTheme.spacing.sm,
    flex: 1,
  },
  locationText: {
    color: appTheme.colors.textPrimary,
    fontSize: 17,
    fontWeight: '700',
  },
  titleText: {
    color: appTheme.colors.textPrimary,
    fontSize: 20,
    fontWeight: '700',
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: appTheme.spacing.sm,
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: appTheme.colors.surfaceMuted,
  },
});
