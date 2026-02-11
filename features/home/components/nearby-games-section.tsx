import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { appTheme } from '@/constants/app-theme';
import type { NearbyGame } from '@/features/home/types/home.types';
import { GameCard } from '@/features/home/components/game-card';

type NearbyGamesSectionProps = {
  title: string;
  games: NearbyGame[];
  viewMoreLabel: string;
};

export function NearbyGamesSection({ title, games, viewMoreLabel }: NearbyGamesSectionProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="fire" size={20} color={appTheme.colors.accent} />
        <Text style={styles.title}>{title}</Text>
      </View>

      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}

      <Button
        label={viewMoreLabel}
        variant="ghost"
        size="md"
        leftIcon={<MaterialCommunityIcons name="chevron-down-circle-outline" size={18} color={appTheme.colors.accent} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: appTheme.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: appTheme.spacing.sm,
  },
  title: {
    color: appTheme.colors.accentStrong,
    fontSize: 22,
    lineHeight: 30,
    fontWeight: '700',
  },
});
