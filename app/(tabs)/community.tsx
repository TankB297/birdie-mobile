import { PlaceholderScreen } from '@/components/ui/placeholder-screen';
import { useI18n } from '@/locales';

export default function CommunityTabScreen() {
  const { t } = useI18n('vn');

  return (
    <PlaceholderScreen
      iconName="compass-outline"
      title={t('tabs.screens.community.title')}
      subtitle={t('tabs.screens.community.subtitle')}
    />
  );
}
