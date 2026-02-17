import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Chip } from '@/components/ui/chip';
import { SectionCard } from '@/components/ui/section-card';
import { appTheme } from '@/constants/app-theme';
import type { GameDay, HomeFilterState } from '@/features/home/types/home.types';

type HomeFiltersText = {
  title: string;
  today: string;
  tomorrow: string;
  weekend: string;
  under3km: string;
  intermediatePlus: string;
  mixed: string;
  availableOnly: string;
};

type HomeFiltersProps = {
  filters: HomeFilterState;
  text: HomeFiltersText;
  onDayChange: (day: GameDay) => void;
  onToggleUnder3km: () => void;
  onToggleIntermediatePlus: () => void;
  onToggleMixedOnly: () => void;
  onToggleAvailableOnly: () => void;
};

export function HomeFilters({
  filters,
  text,
  onDayChange,
  onToggleUnder3km,
  onToggleIntermediatePlus,
  onToggleMixedOnly,
  onToggleAvailableOnly,
}: HomeFiltersProps) {
  return (
    <SectionCard style={styles.card}>
      <Text style={styles.sectionTitle}>{text.title}</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipRowContent}
        style={styles.chipRowScroll}>
        <Chip label={text.today} active={filters.day === 'today'} onPress={() => onDayChange('today')} />
        <Chip
          label={text.tomorrow}
          active={filters.day === 'tomorrow'}
          onPress={() => onDayChange('tomorrow')}
        />
        <Chip
          label={text.weekend}
          active={filters.day === 'weekend'}
          onPress={() => onDayChange('weekend')}
        />
        <Chip label={text.under3km} active={filters.under3km} variant="filled" onPress={onToggleUnder3km} />
        <Chip
          label={text.intermediatePlus}
          active={filters.intermediatePlus}
          variant="filled"
          onPress={onToggleIntermediatePlus}
        />
        <Chip label={text.mixed} active={filters.mixedOnly} variant="filled" onPress={onToggleMixedOnly} />
        <Chip label={text.availableOnly} active={filters.availableOnly} variant="filled" onPress={onToggleAvailableOnly} />
      </ScrollView>
    </SectionCard>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: appTheme.spacing.sm,
    paddingTop: appTheme.spacing.md,
    paddingBottom: appTheme.spacing.md,
  },
  sectionTitle: {
    color: appTheme.colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  chipRowScroll: {
    marginHorizontal: -appTheme.spacing.xs,
  },
  chipRowContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: appTheme.spacing.sm,
    paddingHorizontal: appTheme.spacing.xs,
  },
});
