import { fetchNearbyGamesApi } from '@/features/home/api/home.api';
import type { HomeFilterState, NearbyGame } from '@/features/home/types/home.types';

export const defaultHomeFilters: HomeFilterState = {
  day: 'today',
  under3km: true,
  intermediatePlus: true,
  mixedOnly: true,
  availableOnly: false,
  genderFlexible: true,
};

function hasAvailableSlots(game: NearbyGame): boolean {
  return game.bookedSlots < game.totalSlots;
}

function matchesDayFilter(game: NearbyGame, filters: HomeFilterState): boolean {
  return game.day === filters.day;
}

function matchesDistanceFilter(game: NearbyGame, filters: HomeFilterState): boolean {
  if (!filters.under3km) {
    return true;
  }

  return game.distanceKm <= 3;
}

function matchesLevelFilter(game: NearbyGame, filters: HomeFilterState): boolean {
  if (!filters.intermediatePlus) {
    return true;
  }

  return game.level === 'intermediatePlus' || game.level === 'advanced';
}

function matchesFormatFilter(game: NearbyGame, filters: HomeFilterState): boolean {
  if (!filters.mixedOnly) {
    return true;
  }

  return game.format === 'mixed';
}

function matchesAvailabilityFilter(game: NearbyGame, filters: HomeFilterState): boolean {
  if (!filters.availableOnly) {
    return true;
  }

  return hasAvailableSlots(game);
}

function matchesGenderFlexFilter(game: NearbyGame, filters: HomeFilterState): boolean {
  if (!filters.genderFlexible) {
    return true;
  }

  return game.genderFlexible;
}

function sortByDistanceThenTime(games: NearbyGame[]): NearbyGame[] {
  return [...games].sort((first, second) => {
    if (first.distanceKm !== second.distanceKm) {
      return first.distanceKm - second.distanceKm;
    }

    return first.startTime.localeCompare(second.startTime);
  });
}

function matchesAllFilters(game: NearbyGame, filters: HomeFilterState): boolean {
  return (
    matchesDayFilter(game, filters) &&
    matchesDistanceFilter(game, filters) &&
    matchesLevelFilter(game, filters) &&
    matchesFormatFilter(game, filters) &&
    matchesAvailabilityFilter(game, filters) &&
    matchesGenderFlexFilter(game, filters)
  );
}

export async function getNearbyGames(filters: HomeFilterState): Promise<NearbyGame[]> {
  const games = await fetchNearbyGamesApi();

  const filteredGames = games.filter((game) => matchesAllFilters(game, filters));

  return sortByDistanceThenTime(filteredGames);
}

export function calculateAvailableSlots(game: NearbyGame): number {
  return Math.max(game.totalSlots - game.bookedSlots, 0);
}

export function isGameOpen(game: NearbyGame): boolean {
  return calculateAvailableSlots(game) > 0;
}
