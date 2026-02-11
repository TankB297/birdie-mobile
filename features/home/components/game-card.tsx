import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { SectionCard } from '@/components/ui/section-card';
import { appTheme } from '@/constants/app-theme';
import { useI18n } from '@/locales';
import { calculateAvailableSlots, isGameOpen } from '@/features/home/services/home.service';
import type { NearbyGame } from '@/features/home/types/home.types';

type GameCardProps = {
  game: NearbyGame;
};

function formatDistance(distanceKm: number): string {
  return `${distanceKm.toFixed(1)}km`;
}

function formatRating(rating: number): string {
  return rating.toFixed(1);
}

function formatPriceLine(game: NearbyGame, t: (key: string, params?: Record<string, string | number>) => string): string {
  if (game.splitEvenly) {
    return t('home.priceSplitEvenly');
  }

  return t('home.priceByGender', {
    male: game.malePriceLabel,
    female: game.femalePriceLabel,
  });
}

export function GameCard({ game }: GameCardProps) {
  const { t } = useI18n();
  const availableSlots = calculateAvailableSlots(game);
  const openForJoin = isGameOpen(game);

  const slotsLabel = openForJoin
    ? t('home.slotsRemaining', { available: availableSlots, total: game.totalSlots })
    : t('home.slotsFull', { booked: game.bookedSlots, total: game.totalSlots });

  const ratingLine = t('home.ratingLine', {
    rating: formatRating(game.rating),
    quote: t(game.reviewQuoteKey),
  });

  return (
    <SectionCard style={styles.card}>
      <View style={styles.line}>
        <MaterialCommunityIcons name="clock-outline" size={20} color={appTheme.colors.warning} />
        <Text style={styles.primaryText}>{`${game.startTime} - ${game.endTime}`}</Text>
      </View>

      <View style={styles.line}>
        <MaterialCommunityIcons name="map-marker" size={20} color={appTheme.colors.accent} />
        <Text style={styles.secondaryText}>{`${game.courtName} (${formatDistance(game.distanceKm)})`}</Text>
      </View>

      <View style={styles.line}>
        <MaterialCommunityIcons name="badminton" size={20} color={appTheme.colors.accentStrong} />
        <Text style={styles.secondaryText}>{game.clubName}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.line}>
        <MaterialCommunityIcons
          name="account-group-outline"
          size={20}
          color={openForJoin ? appTheme.colors.accent : appTheme.colors.danger}
        />
        <Text style={[styles.primaryText, !openForJoin ? styles.dangerText : undefined]}>{slotsLabel}</Text>
      </View>

      <View style={styles.line}>
        <MaterialCommunityIcons name="cash-multiple" size={20} color={appTheme.colors.warning} />
        <Text style={styles.secondaryText}>{formatPriceLine(game, t)}</Text>
      </View>

      <View style={styles.line}>
        <MaterialCommunityIcons name="star-outline" size={20} color={appTheme.colors.warning} />
        <Text style={styles.secondaryText}>{ratingLine}</Text>
      </View>

      <Button
        label={openForJoin ? t('home.actions.join') : t('home.actions.full')}
        variant={openForJoin ? 'primary' : 'outline'}
      />
    </SectionCard>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: appTheme.spacing.sm,
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: appTheme.spacing.sm,
  },
  primaryText: {
    color: appTheme.colors.textPrimary,
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 24,
  },
  secondaryText: {
    color: appTheme.colors.textSecondary,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 23,
    flex: 1,
  },
  divider: {
    marginVertical: appTheme.spacing.xs,
    height: 1,
    backgroundColor: appTheme.colors.border,
  },
  dangerText: {
    color: appTheme.colors.danger,
  },
});
