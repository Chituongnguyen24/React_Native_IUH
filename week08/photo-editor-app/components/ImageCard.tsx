import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '../constants/theme';

interface ImageCardProps {
  uri: string;
  date: string;
  onPress: () => void;
  onDelete?: () => void;
}

export const ImageCard: React.FC<ImageCardProps> = ({ 
  uri, 
  date, 
  onPress,
  onDelete 
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image source={{ uri }} style={styles.image} resizeMode="cover" />
      <View style={styles.info}>
        <Text style={styles.date} numberOfLines={1}>{date}</Text>
        {onDelete && (
          <TouchableOpacity onPress={onDelete} style={styles.deleteBtn}>
            <Text style={styles.deleteText}>Xóa</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.borderRadius,
    marginBottom: SIZES.medium,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: COLORS.background,
  },
  info: {
    padding: SIZES.medium,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: FONTS.sizes.small,
    color: COLORS.textSecondary,
    flex: 1,
  },
  deleteBtn: {
    paddingHorizontal: SIZES.small,
    paddingVertical: 4,
  },
  deleteText: {
    color: COLORS.danger,
    fontSize: FONTS.sizes.small,
    fontWeight: '600',
  },
});