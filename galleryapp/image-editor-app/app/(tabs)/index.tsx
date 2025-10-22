import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const [hasLibraryPermission, setHasLibraryPermission] = useState<boolean | null>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const libraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasLibraryPermission(libraryStatus.status === 'granted');
      
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  const pickImage = async () => {
    if (!hasLibraryPermission) {
      Alert.alert('Lỗi', 'Vui lòng cấp quyền truy cập thư viện ảnh!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      // Navigate to editor with image
      router.push({
        pathname: '/explore',
        params: { imageUri: result.assets[0].uri }
      });
    }
  };

  const takePhoto = async () => {
    if (!hasCameraPermission) {
      Alert.alert('Lỗi', 'Vui lòng cấp quyền truy cập camera!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      router.push({
        pathname: '/explore',
        params: { imageUri: result.assets[0].uri }
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="images" size={80} color="#6366f1" />
        <Text style={styles.title}>Ứng Dụng Chỉnh Sửa Ảnh</Text>
        <Text style={styles.subtitle}>
          Chỉnh sửa hình ảnh dễ dàng và chuyên nghiệp
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.primaryButton} onPress={pickImage}>
          <Ionicons name="images-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Chọn Ảnh Từ Thư Viện</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={takePhoto}>
          <Ionicons name="camera-outline" size={24} color="#6366f1" />
          <Text style={styles.secondaryButtonText}>Chụp Ảnh Mới</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tertiaryButton}
          onPress={() => router.push('/modal')}
        >
          <Ionicons name="folder-open-outline" size={24} color="#6366f1" />
          <Text style={styles.secondaryButtonText}>Xem Ảnh Đã Chỉnh Sửa</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.features}>
        <Text style={styles.featuresTitle}>Tính năng:</Text>
        <View style={styles.featureItem}>
          <Ionicons name="checkmark-circle" size={20} color="#10b981" />
          <Text style={styles.featureText}>Cắt, xoay, lật ảnh</Text>
        </View>
        <View style={styles.featureItem}>
          <Ionicons name="checkmark-circle" size={20} color="#10b981" />
          <Text style={styles.featureText}>Bộ lọc màu đa dạng</Text>
        </View>
        <View style={styles.featureItem}>
          <Ionicons name="checkmark-circle" size={20} color="#10b981" />
          <Text style={styles.featureText}>Lưu và quản lý ảnh</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    gap: 15,
  },
  primaryButton: {
    backgroundColor: '#6366f1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    borderRadius: 12,
    gap: 10,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  secondaryButton: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    borderRadius: 12,
    gap: 10,
    borderWidth: 2,
    borderColor: '#6366f1',
  },
  tertiaryButton: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    borderRadius: 12,
    gap: 10,
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#6366f1',
    fontSize: 16,
    fontWeight: '600',
  },
  features: {
    marginTop: 40,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 15,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  featureText: {
    fontSize: 15,
    color: '#475569',
  },
});