import { clearAllImages, deleteEditedImage, getEditedImages } from '@/utils/imageStorage';
import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import * as Sharing from 'expo-sharing';
import React, { useCallback, useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');
const ITEM_SIZE = (width - 45) / 3;

interface EditedImage {
  id: string;
  uri: string;
  date: string;
  timestamp: number;
}

export default function GalleryScreen() {
  const [images, setImages] = useState<EditedImage[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadImages = async () => {
    const savedImages = await getEditedImages();
    setImages(savedImages);
  };

  useFocusEffect(
    useCallback(() => {
      loadImages();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadImages();
    setRefreshing(false);
  };

  const handleDeleteImage = (id: string, uri: string) => {
    Alert.alert(
      'Xóa ảnh',
      'Bạn có chắc chắn muốn xóa ảnh này?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: async () => {
            await deleteEditedImage(id);
            await loadImages();
          },
        },
      ]
    );
  };

  const handleClearAll = () => {
    if (images.length === 0) {
      Alert.alert('Thông báo', 'Không có ảnh nào để xóa');
      return;
    }

    Alert.alert(
      'Xóa tất cả',
      'Bạn có chắc chắn muốn xóa tất cả ảnh đã chỉnh sửa?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa tất cả',
          style: 'destructive',
          onPress: async () => {
            await clearAllImages();
            await loadImages();
          },
        },
      ]
    );
  };

  const handleShareImage = async (uri: string) => {
    try {
      const isAvailable = await Sharing.isAvailableAsync();
      if (isAvailable) {
        await Sharing.shareAsync(uri);
      } else {
        Alert.alert('Lỗi', 'Tính năng chia sẻ không khả dụng');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể chia sẻ ảnh');
    }
  };

  const renderItem = ({ item }: { item: EditedImage }) => (
    <TouchableOpacity
      style={styles.imageItem}
      onPress={() => router.push({
        pathname: '/explore',
        params: { imageUri: item.uri }
      })}
      onLongPress={() => handleDeleteImage(item.id, item.uri)}
    >
      <Image source={{ uri: item.uri }} style={styles.thumbnail} />
      <View style={styles.imageOverlay}>
        <TouchableOpacity
          style={styles.shareButton}
          onPress={() => handleShareImage(item.uri)}
        >
          <Ionicons name="share-social" size={20} color="white" />
        </TouchableOpacity>
      </View>
      <Text style={styles.dateText}>{item.date}</Text>
    </TouchableOpacity>
  );

  if (images.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="images-outline" size={80} color="#cbd5e1" />
        <Text style={styles.emptyText}>Chưa có ảnh nào</Text>
        <Text style={styles.emptySubtext}>
          Các ảnh đã chỉnh sửa sẽ hiển thị ở đây
        </Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push('/')}
        >
          <Ionicons name="add" size={24} color="white" />
          <Text style={styles.addButtonText}>Chỉnh Sửa Ảnh Mới</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {images.length} ảnh đã chỉnh sửa
        </Text>
        <TouchableOpacity onPress={handleClearAll}>
          <Ionicons name="trash-outline" size={24} color="#ef4444" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  listContent: {
    padding: 10,
  },
  imageItem: {
    width: ITEM_SIZE,
    height: ITEM_SIZE + 30,
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  thumbnail: {
    width: '100%',
    height: ITEM_SIZE,
  },
  imageOverlay: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  shareButton: {
    backgroundColor: 'rgba(99, 102, 241, 0.9)',
    padding: 6,
    borderRadius: 6,
  },
  dateText: {
    fontSize: 10,
    color: '#64748b',
    textAlign: 'center',
    paddingVertical: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#64748b',
    marginTop: 20,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 8,
    textAlign: 'center',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#6366f1',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 30,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});