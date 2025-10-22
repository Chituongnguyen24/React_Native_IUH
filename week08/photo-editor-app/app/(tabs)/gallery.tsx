import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Modal,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ImageCard } from '../../components/ImageCard';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { useEditedImages } from '../../hooks/useEditImages';

export default function GalleryScreen() {
  const { images, loading, deleteImage, refreshImages } = useEditedImages();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const handleDelete = (id: string) => {
    Alert.alert(
      'Xác nhận xóa',
      'Bạn có chắc muốn xóa ảnh này?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: () => deleteImage(id),
        },
      ]
    );
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refreshImages();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>Đang tải...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ảnh đã chỉnh sửa</Text>
        <Text style={styles.count}>{images.length} ảnh</Text>
      </View>

      {images.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>Chưa có ảnh nào</Text>
          <Text style={styles.emptySubtext}>
            Hãy chỉnh sửa và lưu ảnh từ trang chủ
          </Text>
        </View>
      ) : (
        <FlatList
          data={images}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ImageCard
              uri={item.uri}
              date={item.date}
              onPress={() => setSelectedImage(item.uri)}
              onDelete={() => handleDelete(item.id)}
            />
          )}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={COLORS.primary}
            />
          }
        />
      )}

      <Modal
        visible={!!selectedImage}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedImage(null)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setSelectedImage(null)}
        >
          <View style={styles.modalContent}>
            {selectedImage && (
              <Image
                source={{ uri: selectedImage }}
                style={styles.modalImage}
                resizeMode="contain"
              />
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedImage(null)}
            >
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SIZES.medium,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: FONTS.sizes.xlarge,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  count: {
    fontSize: FONTS.sizes.small,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.large,
  },
  emptyText: {
    fontSize: FONTS.sizes.large,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: SIZES.small,
  },
  emptySubtext: {
    fontSize: FONTS.sizes.medium,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  list: {
    padding: SIZES.medium,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    height: '80%',
    backgroundColor: COLORS.card,
    borderRadius: SIZES.borderRadius,
    overflow: 'hidden',
  },
  modalImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  closeButton: {
    padding: SIZES.medium,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
  },
  closeButtonText: {
    color: COLORS.card,
    fontSize: FONTS.sizes.medium,
    fontWeight: '600',
  },
});