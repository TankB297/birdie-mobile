import { PlaceholderScreen } from '@/components/ui/placeholder-screen';
import { useI18n } from '@/locales';

export default function ProfileTabScreen() {
  const { t } = useI18n('vn');

  return (
    <PlaceholderScreen
      iconName="account-circle-outline"
      title={t('tabs.screens.profile.title')}
      subtitle={t('tabs.screens.profile.subtitle')}
    />
  );
}
