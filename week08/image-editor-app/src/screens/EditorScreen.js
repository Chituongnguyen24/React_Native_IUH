import { Ionicons } from '@expo/vector-icons';
import * as ImageManipulator from 'expo-image-manipulator';
import * as MediaLibrary from 'expo-media-library';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { saveEditedImage } from '../utils/imageStorage';

export default function EditorScreen({ route, navigation }) {
  const [imageUri, setImageUri] = useState(route.params?.imageUri || null);
  const [originalUri, setOriginalUri] = useState(route.params?.imageUri || null);
  const [loading, setLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    if (route.params?.imageUri) {
      setImageUri(route.params.imageUri);
      setOriginalUri(route.params.imageUri);
    }
  }, [route.params?.imageUri]);

  const applyManipulation = async (actions) => {
    if (!originalUri) return;
    
    setLoading(true);
    try {
      const manipResult = await ImageManipulator.manipulateAsync(
        originalUri,
        actions,
        { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
      );
      setImageUri(manipResult.uri);
      setOriginalUri(manipResult.uri);
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể chỉnh sửa ảnh');
    }
    setLoading(false);
  };

  const rotateImage = async () => {
    await applyManipulation([{ rotate: 90 }]);
  };

  const flipImage = async () => {
    await applyManipulation([{ flip: ImageManipulator.FlipType.Horizontal }]);
  };

  const cropImage = async () => {
    if (!imageUri) return;
    
    setLoading(true);
    try {
      const manipResult = await ImageManipulator.manipulateAsync(
        imageUri,
        [{ crop: { originX: 50, originY: 50, width: 300, height: 300 } }],
        { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
      );
      setImageUri(manipResult.uri);
      setOriginalUri(manipResult.uri);
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể cắt ảnh');
    }
    setLoading(false);
  };

  const resetImage = () => {
    if (route.params?.imageUri) {
      setImageUri(route.params.imageUri);
      setOriginalUri(route.params.imageUri);
    }
  };

  const saveImage = async () => {
    if (!imageUri) {
      Alert.alert('Lỗi', 'Không có ảnh để lưu');
      return;
    }

    if (!hasPermission) {
      Alert.alert('Lỗi', 'Vui lòng cấp quyền truy cập thư viện ảnh!');
      return;
    }

    setLoading(true);
    try {
      await MediaLibrary.createAssetAsync(imageUri);
      await saveEditedImage(imageUri);
      
      Alert.alert(
        'Thành công',
        'Ảnh đã được lưu vào thư viện!',
        [
          {
            text: 'Xem thư viện',
            onPress: () => navigation.navigate('Gallery'),
          },
          { text: 'OK' },
        ]
      );
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể lưu ảnh: ' + error.message);
    }
    setLoading(false);
  };

  if (!imageUri) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="image-outline" size={80} color="#cbd5e1" />
        <Text style={styles.emptyText}>Chưa có ảnh nào được chọn</Text>
        <Text style={styles.emptySubtext}>
          Vui lòng chọn ảnh từ trang chủ
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageContainer}>
          {loading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#6366f1" />
            </View>
          )}
          <Image source={{ uri: imageUri }} style={styles.image} resizeMode="contain" />
        </View>

        <View style={styles.toolsContainer}>
          <Text style={styles.sectionTitle}>Công cụ chỉnh sửa</Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.toolsScroll}>
            <TouchableOpacity style={styles.toolButton} onPress={rotateImage}>
              <Ionicons name="refresh" size={24} color="#6366f1" />
              <Text style={styles.toolText}>Xoay</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.toolButton} onPress={flipImage}>
              <Ionicons name="swap-horizontal" size={24} color="#6366f1" />
              <Text style={styles.toolText}>Lật</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.toolButton} onPress={cropImage}>
              <Ionicons name="crop" size={24} color="#6366f1" />
              <Text style={styles.toolText}>Cắt</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.toolButton} onPress={resetImage}>
              <Ionicons name="reload" size={24} color="#6366f1" />
              <Text style={styles.toolText}>Đặt lại</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Ionicons name="close" size={24} color="#ef4444" />
          <Text style={styles.cancelButtonText}>Hủy</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.saveButton}
          onPress={saveImage}
          disabled={loading}
        >
          <Ionicons name="checkmark" size={24} color="white" />
          <Text style={styles.saveButtonText}>Lưu Ảnh</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContent: {
    paddingBottom: 100,
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
  },
  imageContainer: {
    width: '100%',
    height: 400,
    backgroundColor: '#1e293b',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  toolsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 15,
  },
  toolsScroll: {
    flexDirection: 'row',
  },
  toolButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 12,
    marginRight: 12,
    minWidth: 80,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  toolText: {
    marginTop: 5,
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    gap: 10,
  },
  cancelButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#fee2e2',
    borderRadius: 12,
    gap: 5,
  },
  cancelButtonText: {
    color: '#ef4444',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#6366f1',
    borderRadius: 12,
    gap: 5,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});