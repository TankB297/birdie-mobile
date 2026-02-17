import { Tabs } from 'expo-router';

import { FloatingTabBar } from '@/components/navigation/floating-tab-bar';
import { useI18n } from '@/locales';

export default function TabLayout() {
  const { t } = useI18n('vn');

  return (
    <Tabs
      initialRouteName="home"
      tabBar={(props) => <FloatingTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: t('tabs.labels.home'),
        }}
      />
      <Tabs.Screen
        name="clubs"
        options={{
          title: t('tabs.labels.clubs'),
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: t('tabs.labels.community'),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('tabs.labels.profile'),
        }}
      />
    </Tabs>
  );
}
