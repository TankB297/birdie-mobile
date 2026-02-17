import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { PlatformPressable } from "@react-navigation/elements";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";

import { appTheme } from "@/constants/app-theme";
import { useSafeAreaDimensions } from "@/hooks/use-safe-area-dimensions";
import { useI18n } from "@/locales";

function FloatingTabButton({
  children,
  style,
  ...props
}: BottomTabBarButtonProps) {
  return (
    <PlatformPressable {...props} style={[style, styles.tabButton]}>
      {children}
    </PlatformPressable>
  );
}

function CenterCreateButton({
  children,
  style,
  ...props
}: BottomTabBarButtonProps) {
  return (
    <PlatformPressable {...props} style={[style, styles.centerButton]}>
      <View style={styles.centerButtonInner}>{children}</View>
    </PlatformPressable>
  );
}

export default function TabLayout() {
  const { t } = useI18n("vn");
  const { bottomBarHeight } = useSafeAreaDimensions();
  const { width: screenWidth } = useWindowDimensions();
  const tabBarHorizontalInset = Math.round(screenWidth * 0.04);

  return (
    <Tabs
      initialRouteName="home"
      safeAreaInsets={{ bottom: 0 }}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: appTheme.colors.accent,
        tabBarInactiveTintColor: appTheme.colors.textMuted,
        tabBarStyle: [
          styles.tabBar,
          {
            marginHorizontal: tabBarHorizontalInset,
            bottom: bottomBarHeight + 10,
          },
        ],
        tabBarLabelStyle: styles.tabLabel,
        tabBarItemStyle: styles.tabItem,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: t("tabs.labels.home"),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home-outline"
              size={size}
              color={color}
            />
          ),
          tabBarButton: (props) => <FloatingTabButton {...props} />,
        }}
      />

      <Tabs.Screen
        name="clubs"
        options={{
          title: t("tabs.labels.clubs"),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="badminton"
              size={size}
              color={color}
            />
          ),
          tabBarButton: (props) => <FloatingTabButton {...props} />,
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          title: t("tabs.labels.create"),
          tabBarLabel: () => null,
          tabBarLabelStyle: styles.hiddenLabel,
          tabBarIcon: () => (
            <MaterialCommunityIcons name="plus" size={28} color="#FFFFFF" />
          ),
          tabBarButton: (props) => <CenterCreateButton {...props} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: t("tabs.labels.profile"),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-outline"
              size={size}
              color={color}
            />
          ),
          tabBarButton: (props) => <FloatingTabButton {...props} />,
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: t("tabs.labels.settings"),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="cog-outline"
              size={size}
              color={color}
            />
          ),
          tabBarButton: (props) => <FloatingTabButton {...props} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    height: 78,
    borderRadius: 26,
    borderTopWidth: 0,
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    elevation: 10,
    shadowColor: "#2E1E14",
    shadowOpacity: 0.14,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    paddingHorizontal: 6,
    paddingVertical: 0,
  },
  tabItem: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 0,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: "600",
  },
  hiddenLabel: {
    display: "none",
  },
  centerButton: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  centerButtonInner: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: appTheme.colors.accent,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ translateY: -22 }],
    borderWidth: 4,
    borderColor: "rgba(255, 255, 255, 0.94)",
    shadowColor: "#2E1E14",
    shadowOpacity: 0.2,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
});
