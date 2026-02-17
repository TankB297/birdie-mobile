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
  onPressJoin: (game: NearbyGame) => void;
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

export function GameCard({ game, onPressJoin }: GameCardProps) {
  const { t } = useI18n();
  const availableSlots = calculateAvailableSlots(game);
  const openForJoin = isGameOpen(game);
  const slotsUrgent = openForJoin && availableSlots <= 2;

  const slotsLabel = openForJoin
    ? t('home.card.slotsOpenBadge', { available: availableSlots, total: game.totalSlots })
    : t('home.card.slotsFullBadge');

  const ratingLine = `${formatRating(game.rating)} • ${t(game.reviewQuoteKey)}`;

  return (
    <SectionCard style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.line}>
          <MaterialCommunityIcons name="clock-outline" size={18} color={appTheme.colors.textSecondary} />
          <Text style={styles.timeText}>{`${game.startTime} - ${game.endTime}`}</Text>
        </View>

        <View
          style={[
            styles.slotBadge,
            !openForJoin ? styles.slotBadgeFull : slotsUrgent ? styles.slotBadgeUrgent : styles.slotBadgeNormal,
          ]}>
          <Text
            style={[
              styles.slotBadgeLabel,
              !openForJoin ? styles.slotBadgeLabelFull : slotsUrgent ? styles.slotBadgeLabelUrgent : undefined,
            ]}>
            {slotsLabel}
          </Text>
        </View>
      </View>

      <View style={styles.line}>
        <MaterialCommunityIcons name="map-marker" size={17} color={appTheme.colors.textMuted} />
        <Text style={styles.bodyText}>{`${game.courtName} (${formatDistance(game.distanceKm)})`}</Text>
      </View>

      <View style={styles.line}>
        <MaterialCommunityIcons name="badminton" size={17} color={appTheme.colors.textMuted} />
        <Text style={styles.bodyText}>{game.clubName}</Text>
      </View>

      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <MaterialCommunityIcons name="cash-multiple" size={15} color={appTheme.colors.textMuted} />
          <Text style={styles.metaText}>{formatPriceLine(game, t)}</Text>
        </View>
        <View style={styles.metaItem}>
          <MaterialCommunityIcons name="star-outline" size={15} color={appTheme.colors.textMuted} />
          <Text style={styles.metaText}>{ratingLine}</Text>
        </View>
      </View>

      <Button
        label={openForJoin ? t('home.actions.join') : t('home.actions.full')}
        variant={openForJoin ? 'primary' : 'outline'}
        onPress={openForJoin ? () => onPressJoin(game) : undefined}
      />
    </SectionCard>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: appTheme.spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: appTheme.spacing.md,
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: appTheme.spacing.sm,
  },
  timeText: {
    color: appTheme.colors.textPrimary,
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 30,
    letterSpacing: 0.2,
  },
  slotBadge: {
    borderRadius: appTheme.radius.pill,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  slotBadgeNormal: {
    backgroundColor: appTheme.colors.surfaceMuted,
  },
  slotBadgeUrgent: {
    backgroundColor: '#FFE7D3',
  },
  slotBadgeFull: {
    backgroundColor: '#FDE3E1',
  },
  slotBadgeLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: appTheme.colors.textSecondary,
  },
  slotBadgeLabelUrgent: {
    color: appTheme.colors.accentStrong,
  },
  slotBadgeLabelFull: {
    color: appTheme.colors.danger,
  },
  bodyText: {
    color: appTheme.colors.textSecondary,
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 21,
    flex: 1,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: appTheme.spacing.sm,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  metaText: {
    color: appTheme.colors.textMuted,
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
  },
});
