import { PlaceholderScreen } from '@/components/ui/placeholder-screen';
import { useI18n } from '@/locales';

export default function SettingsTabScreen() {
  const { t } = useI18n('vn');

  return (
    <PlaceholderScreen
      iconName="cog-outline"
      title={t('tabs.screens.settings.title')}
      subtitle={t('tabs.screens.settings.subtitle')}
    />
  );
}
