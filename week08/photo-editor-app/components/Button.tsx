import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  loading?: boolean;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
}) => {
  const bgColor = variant === 'primary' ? COLORS.primary : 
                  variant === 'secondary' ? COLORS.secondary : 
                  COLORS.danger;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: bgColor },
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={COLORS.card} />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: SIZES.medium,
    paddingHorizontal: SIZES.large,
    borderRadius: SIZES.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  text: {
    color: COLORS.card,
    fontSize: FONTS.sizes.medium,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.5,
  },
});