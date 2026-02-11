import { ActivityIndicator, View, type ViewStyle } from 'react-native';

import { appTheme } from '@/constants/app-theme';

type LoaderSize = 'sm' | 'md' | 'lg';

type LoaderProps = {
  size?: LoaderSize;
  color?: string;
  style?: ViewStyle;
};

const indicatorSizeMap: Record<LoaderSize, 'small' | 'large'> = {
  sm: 'small',
  md: 'small',
  lg: 'large',
};

export function Loader({
  size = 'md',
  color = appTheme.colors.accent,
  style,
}: LoaderProps) {
  return (
    <View style={style}>
      <ActivityIndicator size={indicatorSizeMap[size]} color={color} />
    </View>
  );
}
