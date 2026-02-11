import { Pressable, StyleSheet, View } from 'react-native';

import { appTheme } from '@/constants/app-theme';

type SwitchSize = 'sm' | 'md';

type SwitchProps = {
  value: boolean;
  onValueChange: (nextValue: boolean) => void;
  disabled?: boolean;
  size?: SwitchSize;
};

const sizeMap: Record<SwitchSize, { width: number; height: number; dot: number; offset: number }> = {
  sm: {
    width: 38,
    height: 22,
    dot: 16,
    offset: 2,
  },
  md: {
    width: 46,
    height: 28,
    dot: 20,
    offset: 3,
  },
};

export function Switch({ value, onValueChange, disabled = false, size = 'sm' }: SwitchProps) {
  const config = sizeMap[size];
  const translateX = value ? config.width - config.dot - config.offset * 2 : 0;

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled }}
      onPress={() => onValueChange(!value)}
      disabled={disabled}
      style={[
        styles.track,
        {
          width: config.width,
          height: config.height,
          borderRadius: config.height,
          backgroundColor: value ? appTheme.colors.secondaryAccent : '#DCC9BD',
          opacity: disabled ? 0.5 : 1,
        },
      ]}>
      <View
        style={[
          styles.thumb,
          {
            width: config.dot,
            height: config.dot,
            borderRadius: config.dot,
            left: config.offset,
            transform: [{ translateX }],
          },
        ]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    justifyContent: 'center',
  },
  thumb: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    shadowColor: '#2E1E14',
    shadowOpacity: 0.12,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
});
