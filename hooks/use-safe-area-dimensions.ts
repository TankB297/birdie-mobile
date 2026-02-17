import { useSafeAreaInsets } from "react-native-safe-area-context";

export const useSafeAreaDimensions = () => {
  const insets = useSafeAreaInsets();

  return {
    bottomBarHeight: insets.bottom,
    topBarHeight: insets.top,
  };
};
