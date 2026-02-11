import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Loader } from '@/components/ui/loader';
import { appTheme } from '@/constants/app-theme';
import { HomeCta } from '@/features/home/components/home-cta';
import { HomeFilters } from '@/features/home/components/home-filters';
import { HomeHeader } from '@/features/home/components/home-header';
import { NearbyGamesSection } from '@/features/home/components/nearby-games-section';
import { useHomeFeed } from '@/features/home/services/use-home-feed';
import { useI18n } from '@/locales';

export default function HomeScreen() {
  const { t } = useI18n('vn');
  const { filters, games, loading, actions } = useHomeFeed();

  const topGames = games.slice(0, 2);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.backgroundBlobOne} />
      <View style={styles.backgroundBlobTwo} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <HomeHeader locationLabel={t('home.locationLabel')} prompt={t('home.prompt')} />

        <HomeFilters
          filters={filters}
          text={{
            title: t('home.filterSectionTitle'),
            today: t('home.filters.today'),
            tomorrow: t('home.filters.tomorrow'),
            weekend: t('home.filters.weekend'),
            under3km: t('home.filters.under3km'),
            intermediatePlus: t('home.filters.intermediatePlus'),
            mixed: t('home.filters.mixed'),
            availableOnly: t('home.filters.availableOnly'),
            genderFlexible: t('home.filters.genderFlexible'),
          }}
          onDayChange={actions.onDayChange}
          onToggleUnder3km={actions.onToggleUnder3km}
          onToggleIntermediatePlus={actions.onToggleIntermediatePlus}
          onToggleMixedOnly={actions.onToggleMixedOnly}
          onToggleAvailableOnly={actions.onToggleAvailableOnly}
          onToggleGenderFlexible={actions.onToggleGenderFlexible}
        />

        {loading ? (
          <View style={styles.loadingWrap}>
            <Loader size="lg" />
            <Text style={styles.loadingText}>{t('common.loading')}</Text>
          </View>
        ) : (
          <NearbyGamesSection
            title={t('home.nearbySectionTitle')}
            games={topGames}
            viewMoreLabel={t('home.actions.viewMore')}
          />
        )}

        <HomeCta
          title={t('home.cta.title')}
          subtitle={t('home.cta.subtitle')}
          actionLabel={t('home.actions.createMatch')}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: appTheme.colors.background,
  },
  content: {
    gap: appTheme.spacing.lg,
    padding: appTheme.spacing.lg,
    paddingBottom: 40,
  },
  loadingWrap: {
    borderRadius: appTheme.radius.lg,
    paddingVertical: appTheme.spacing.xxl,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: appTheme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    gap: appTheme.spacing.sm,
  },
  loadingText: {
    color: appTheme.colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  backgroundBlobOne: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    top: -60,
    left: -70,
    backgroundColor: '#FFD8BE',
    opacity: 0.55,
  },
  backgroundBlobTwo: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    top: 230,
    right: -100,
    backgroundColor: '#FFEBDD',
    opacity: 0.75,
  },
});
