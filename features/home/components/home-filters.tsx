import { StyleSheet, Text, View } from 'react-native';

import { Checkbox } from '@/components/ui/checkbox';
import { Chip } from '@/components/ui/chip';
import { SectionCard } from '@/components/ui/section-card';
import { Switch } from '@/components/ui/switch';
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
  genderFlexible: string;
};

type HomeFiltersProps = {
  filters: HomeFilterState;
  text: HomeFiltersText;
  onDayChange: (day: GameDay) => void;
  onToggleUnder3km: () => void;
  onToggleIntermediatePlus: () => void;
  onToggleMixedOnly: () => void;
  onToggleAvailableOnly: () => void;
  onToggleGenderFlexible: () => void;
};

export function HomeFilters({
  filters,
  text,
  onDayChange,
  onToggleUnder3km,
  onToggleIntermediatePlus,
  onToggleMixedOnly,
  onToggleAvailableOnly,
  onToggleGenderFlexible,
}: HomeFiltersProps) {
  return (
    <SectionCard style={styles.card}>
      <Text style={styles.sectionTitle}>{text.title}</Text>

      <View style={styles.row}>
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
      </View>

      <View style={styles.row}>
        <Chip label={text.under3km} active={filters.under3km} variant="filled" onPress={onToggleUnder3km} />
        <Chip
          label={text.intermediatePlus}
          active={filters.intermediatePlus}
          variant="filled"
          onPress={onToggleIntermediatePlus}
        />
        <Chip label={text.mixed} active={filters.mixedOnly} variant="filled" onPress={onToggleMixedOnly} />
      </View>

      <View style={styles.preferencesRow}>
        <View style={styles.switchItem}>
          <Switch value={filters.availableOnly} onValueChange={onToggleAvailableOnly} />
          <Text style={styles.preferenceLabel}>{text.availableOnly}</Text>
        </View>

        <Checkbox checked={filters.genderFlexible} onChange={onToggleGenderFlexible} label={text.genderFlexible} />
      </View>
    </SectionCard>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: appTheme.spacing.md,
  },
  sectionTitle: {
    color: appTheme.colors.textSecondary,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: appTheme.spacing.sm,
  },
  preferencesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    rowGap: appTheme.spacing.sm,
    columnGap: appTheme.spacing.md,
    marginTop: appTheme.spacing.xs,
  },
  switchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: appTheme.spacing.sm,
  },
  preferenceLabel: {
    color: appTheme.colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
});
