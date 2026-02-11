import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Modal,
  Pressable,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
  View,
} from 'react-native';

import { appTheme } from '@/constants/app-theme';

type BottomSheetModalProps = {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
  horizontalPadding?: number;
};

export function BottomSheetModal({
  visible,
  onClose,
  children,
  contentStyle,
  horizontalPadding = appTheme.spacing.lg,
}: BottomSheetModalProps) {
  const translateY = useRef(new Animated.Value(420)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const [isMounted, setIsMounted] = useState(visible);

  useEffect(() => {
    if (visible) {
      setIsMounted(true);
      return;
    }

    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 420,
        duration: 210,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 170,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        setIsMounted(false);
      }
    });
  }, [backdropOpacity, translateY, visible]);

  useEffect(() => {
    if (!visible || !isMounted) {
      return;
    }

    translateY.setValue(420);
    backdropOpacity.setValue(0);

    const frame = requestAnimationFrame(() => {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          damping: 18,
          stiffness: 180,
          mass: 0.8,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 220,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    });

    return () => cancelAnimationFrame(frame);
  }, [backdropOpacity, isMounted, translateY, visible]);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal visible animationType="none" transparent onRequestClose={onClose}>
      <View style={styles.root}>
        <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
          <Pressable style={styles.backdropPressable} onPress={onClose} />
        </Animated.View>

        <Animated.View
          style={[
            styles.sheet,
            {
              transform: [{ translateY }],
              paddingHorizontal: horizontalPadding,
            },
            contentStyle,
          ]}>
          <View style={styles.handle} />
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(24, 13, 8, 0.42)',
  },
  backdropPressable: {
    flex: 1,
  },
  sheet: {
    backgroundColor: appTheme.colors.surface,
    borderTopLeftRadius: appTheme.radius.xl,
    borderTopRightRadius: appTheme.radius.xl,
    borderWidth: 1,
    borderColor: appTheme.colors.border,
    paddingHorizontal: appTheme.spacing.lg,
    paddingBottom: appTheme.spacing.xl,
    paddingTop: appTheme.spacing.sm,
    maxHeight: '88%',
  },
  handle: {
    width: 48,
    height: 5,
    borderRadius: appTheme.radius.pill,
    backgroundColor: appTheme.colors.border,
    alignSelf: 'center',
    marginBottom: appTheme.spacing.md,
  },
});
