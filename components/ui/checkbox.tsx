import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { appTheme } from '@/constants/app-theme';

type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
};

export function Checkbox({ checked, onChange, label, disabled = false }: CheckboxProps) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      onPress={() => onChange(!checked)}
      disabled={disabled}
      style={[styles.container, disabled ? styles.disabled : undefined]}>
      <View style={[styles.box, checked ? styles.boxChecked : undefined]}>
        {checked ? <MaterialIcons name="check" size={14} color="#FFFFFF" /> : null}
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: appTheme.spacing.sm,
  },
  box: {
    width: 18,
    height: 18,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: appTheme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  boxChecked: {
    backgroundColor: appTheme.colors.accent,
    borderColor: appTheme.colors.accent,
  },
  label: {
    color: appTheme.colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.5,
  },
});
