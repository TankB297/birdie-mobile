import { PlaceholderScreen } from '@/components/ui/placeholder-screen';
import { useI18n } from '@/locales';

export default function ClubsTabScreen() {
  const { t } = useI18n('vn');

  return (
    <PlaceholderScreen
      iconName="badminton"
      title={t('tabs.screens.clubs.title')}
      subtitle={t('tabs.screens.clubs.subtitle')}
    />
  );
}
