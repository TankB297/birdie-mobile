import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { appTheme } from '@/constants/app-theme';
import { useI18n } from '@/locales';

type FloatingTabButtonProps = {
  children: React.ReactNode;
  onPress?: () => void;
  accessibilityState?: {
    selected?: boolean;
  };
};

function FloatingTabButton({ children, onPress }: FloatingTabButtonProps) {
  return (
    <Pressable onPress={onPress} style={styles.tabButton}>
      {children}
    </Pressable>
  );
}

function CenterCreateButton({ children, onPress }: FloatingTabButtonProps) {
  return (
    <Pressable onPress={onPress} style={styles.centerButton}>
      <View style={styles.centerButtonInner}>{children}</View>
    </Pressable>
  );
}

export default function TabLayout() {
  const { t } = useI18n('vn');

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: appTheme.colors.accent,
        tabBarInactiveTintColor: appTheme.colors.textMuted,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
        tabBarItemStyle: styles.tabItem,
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: t('tabs.labels.home'),
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home-outline" size={size} color={color} />,
          tabBarButton: (props) => <FloatingTabButton {...props} />,
        }}
      />

      <Tabs.Screen
        name="clubs"
        options={{
          title: t('tabs.labels.clubs'),
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="badminton" size={size} color={color} />,
          tabBarButton: (props) => <FloatingTabButton {...props} />,
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          title: t('tabs.labels.create'),
          tabBarIcon: () => <MaterialCommunityIcons name="plus" size={28} color="#FFFFFF" />,
          tabBarLabel: () => <Text style={styles.centerLabel}>{t('tabs.labels.create')}</Text>,
          tabBarButton: (props) => <CenterCreateButton {...props} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: t('tabs.labels.profile'),
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="account-outline" size={size} color={color} />,
          tabBarButton: (props) => <FloatingTabButton {...props} />,
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: t('tabs.labels.settings'),
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="cog-outline" size={size} color={color} />,
          tabBarButton: (props) => <FloatingTabButton {...props} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    left: 14,
    right: 14,
    bottom: 14,
    height: 78,
    borderRadius: 26,
    borderTopWidth: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    elevation: 10,
    shadowColor: '#2E1E14',
    shadowOpacity: 0.14,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    paddingHorizontal: 6,
    paddingTop: 8,
  },
  tabItem: {
    paddingVertical: 4,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 5,
  },
  centerButton: {
    top: -22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerButtonInner: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: appTheme.colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.94)',
    shadowColor: '#2E1E14',
    shadowOpacity: 0.2,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  centerLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: appTheme.colors.accentStrong,
    marginBottom: 5,
  },
});
