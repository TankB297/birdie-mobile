import { useCallback, useEffect, useMemo, useState } from 'react';

import { defaultHomeFilters, getNearbyGames } from '@/features/home/services/home.service';
import type { GameDay, HomeFilterState, NearbyGame } from '@/features/home/types/home.types';

function createInitialFilters(): HomeFilterState {
  return { ...defaultHomeFilters };
}

function updateDay(filters: HomeFilterState, day: GameDay): HomeFilterState {
  return {
    ...filters,
    day,
  };
}

function toggleBooleanFilter(filters: HomeFilterState, key: keyof Omit<HomeFilterState, 'day'>): HomeFilterState {
  return {
    ...filters,
    [key]: !filters[key],
  };
}

export function useHomeFeed() {
  const [filters, setFilters] = useState<HomeFilterState>(createInitialFilters);
  const [games, setGames] = useState<NearbyGame[]>([]);
  const [loading, setLoading] = useState(true);

  const loadGames = useCallback(async (nextFilters: HomeFilterState) => {
    setLoading(true);

    const nextGames = await getNearbyGames(nextFilters);

    setGames(nextGames);
    setLoading(false);
  }, []);

  useEffect(() => {
    void loadGames(filters);
  }, [filters, loadGames]);

  const onDayChange = useCallback((day: GameDay) => {
    setFilters((current) => updateDay(current, day));
  }, []);

  const onToggleUnder3km = useCallback(() => {
    setFilters((current) => toggleBooleanFilter(current, 'under3km'));
  }, []);

  const onToggleIntermediatePlus = useCallback(() => {
    setFilters((current) => toggleBooleanFilter(current, 'intermediatePlus'));
  }, []);

  const onToggleMixedOnly = useCallback(() => {
    setFilters((current) => toggleBooleanFilter(current, 'mixedOnly'));
  }, []);

  const onToggleAvailableOnly = useCallback(() => {
    setFilters((current) => toggleBooleanFilter(current, 'availableOnly'));
  }, []);

  const onToggleGenderFlexible = useCallback(() => {
    setFilters((current) => toggleBooleanFilter(current, 'genderFlexible'));
  }, []);

  const actions = useMemo(
    () => ({
      onDayChange,
      onToggleUnder3km,
      onToggleIntermediatePlus,
      onToggleMixedOnly,
      onToggleAvailableOnly,
      onToggleGenderFlexible,
    }),
    [
      onDayChange,
      onToggleUnder3km,
      onToggleIntermediatePlus,
      onToggleMixedOnly,
      onToggleAvailableOnly,
      onToggleGenderFlexible,
    ]
  );

  return {
    filters,
    games,
    loading,
    actions,
  };
}
