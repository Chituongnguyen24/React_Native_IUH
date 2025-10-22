import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants/theme';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông tin ứng dụng</Text>
      <Text style={styles.text}>
        Ứng dụng chỉnh sửa ảnh đơn giản
      </Text>
      <Text style={styles.version}>Phiên bản 1.0.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SIZES.large,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: FONTS.sizes.xlarge,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.medium,
  },
  text: {
    fontSize: FONTS.sizes.medium,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SIZES.small,
  },
  version: {
    fontSize: FONTS.sizes.small,
    color: COLORS.textSecondary,
  },
});