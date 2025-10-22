export const COLORS = {
  primary: '#007AFF',
  secondary: '#5856D6',
  success: '#34C759',
  danger: '#FF3B30',
  warning: '#FF9500',
  background: '#F2F2F7',
  card: '#FFFFFF',
  text: '#000000',
  textSecondary: '#8E8E93',
  border: '#C6C6C8',
  overlay: 'rgba(0,0,0,0.5)',
};

export const SIZES = {
  small: 8,
  medium: 16,
  large: 24,
  xlarge: 32,
  borderRadius: 12,
  iconSize: 24,
};

export const FONTS = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
  sizes: {
    small: 12,
    medium: 16,
    large: 20,
    xlarge: 24,
  },
};

// Theme object used by Themed components (compat with Expo template)
export const Colors = {
  light: {
    text: COLORS.text,
    background: COLORS.background,
    tint: COLORS.primary,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: COLORS.primary,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: COLORS.primary,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: COLORS.primary,
  },
};