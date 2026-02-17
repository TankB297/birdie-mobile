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
  onPressJoinGame: (game: NearbyGame) => void;
};

export function NearbyGamesSection({ title, games, viewMoreLabel, onPressJoinGame }: NearbyGamesSectionProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="fire" size={18} color={appTheme.colors.textMuted} />
        <Text style={styles.title}>{title}</Text>
      </View>

      {games.map((game) => (
        <GameCard key={game.id} game={game} onPressJoin={onPressJoinGame} />
      ))}

      <Button
        label={viewMoreLabel}
        variant="secondary"
        size="md"
        leftIcon={
          <MaterialCommunityIcons name="chevron-down-circle-outline" size={18} color={appTheme.colors.textSecondary} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: appTheme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: appTheme.spacing.sm,
  },
  title: {
    color: appTheme.colors.textPrimary,
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600',
  },
});
