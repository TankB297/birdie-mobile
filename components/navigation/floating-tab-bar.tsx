import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withSpring } from 'react-native-reanimated';

import { appTheme } from '@/constants/app-theme';
import { useSafeAreaDimensions } from '@/hooks/use-safe-area-dimensions';
import { useAuth } from '@/contexts/auth-context';

const ACTIVE_PILL_SIZE = 44;

function getIconName(routeName: string): keyof typeof MaterialCommunityIcons.glyphMap {
  switch (routeName) {
    case 'home':
      return 'home-outline';
    case 'clubs':
      return 'account-group-outline';
    case 'community':
      return 'compass-outline';
    default:
      return 'circle-outline';
  }
}

function getInitial(displayName: string | null | undefined): string {
  if (!displayName) {
    return '?';
  }

  return displayName.trim().charAt(0).toUpperCase();
}

function ProfileIcon({ focused }: { focused: boolean }) {
  const { user } = useAuth();

  if (user?.photoURL) {
    return (
      <Image
        source={{ uri: user.photoURL }}
        style={[styles.avatarImage, focused ? styles.avatarImageActive : undefined]}
      />
    );
  }

  if (user?.displayName) {
    return (
      <View style={[styles.avatarFallback, focused ? styles.avatarFallbackActive : undefined]}>
        <Text style={[styles.avatarInitial, focused ? styles.avatarInitialActive : undefined]}>
          {getInitial(user.displayName)}
        </Text>
      </View>
    );
  }

  return (
    <MaterialCommunityIcons
      name="account-outline"
      size={22}
      color={focused ? appTheme.colors.accent : appTheme.colors.textMuted}
    />
  );
}

export function FloatingTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { bottomBarHeight } = useSafeAreaDimensions();
  const count = state.routes.length;
  const barWidth = useSharedValue(0);
  const indicatorX = useSharedValue(0);

  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorX.value }],
  }));

  const onLayoutBar = (width: number) => {
    barWidth.value = width;

    if (count === 0) {
      return;
    }

    const itemWidth = width / count;
    const nextX = itemWidth * state.index + (itemWidth - ACTIVE_PILL_SIZE) / 2;

    indicatorX.value = nextX;
  };

  useDerivedValue(() => {
    if (barWidth.value === 0 || count === 0) {
      return;
    }

    const itemWidth = barWidth.value / count;
    const nextX = itemWidth * state.index + (itemWidth - ACTIVE_PILL_SIZE) / 2;

    indicatorX.value = withSpring(nextX, {
      damping: 16,
      stiffness: 180,
      mass: 0.7,
    });
  }, [count, state.index]);

  return (
    <View style={[styles.outer, { bottom: bottomBarHeight + 18 }]}>
      <View
        style={styles.inner}
        onLayout={(event) => {
          onLayoutBar(event.nativeEvent.layout.width);
        }}>
        <Animated.View style={[styles.activePill, animatedIndicatorStyle]} />

        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.item}>
              {route.name === 'profile' ? (
                <ProfileIcon focused={isFocused} />
              ) : (
                <MaterialCommunityIcons
                  name={getIconName(route.name)}
                  size={22}
                  color={isFocused ? appTheme.colors.accent : appTheme.colors.textMuted}
                />
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  inner: {
    width: '92%',
    height: 72,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    borderWidth: 1,
    borderColor: '#EFE5DE',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: '#17100A',
    shadowOpacity: 0.11,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  activePill: {
    position: 'absolute',
    width: ACTIVE_PILL_SIZE,
    height: ACTIVE_PILL_SIZE,
    borderRadius: ACTIVE_PILL_SIZE / 2,
    backgroundColor: '#FCEBDD',
  },
  item: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  avatarImageActive: {
    borderWidth: 1.5,
    borderColor: appTheme.colors.accent,
  },
  avatarFallback: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E9E1DB',
  },
  avatarFallbackActive: {
    backgroundColor: '#FCEBDD',
    borderWidth: 1,
    borderColor: appTheme.colors.accent,
  },
  avatarInitial: {
    fontSize: 12,
    fontWeight: '700',
    color: appTheme.colors.textSecondary,
  },
  avatarInitialActive: {
    color: appTheme.colors.accentStrong,
  },
});
