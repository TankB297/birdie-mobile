import { PlaceholderScreen } from '@/components/ui/placeholder-screen';
import { useI18n } from '@/locales';

export default function CreateTabScreen() {
  const { t } = useI18n('vn');

  return (
    <PlaceholderScreen
      iconName="plus-circle-outline"
      title={t('tabs.screens.create.title')}
      subtitle={t('tabs.screens.create.subtitle')}
    />
  );
}
