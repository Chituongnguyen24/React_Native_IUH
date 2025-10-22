import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
 
import React, { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button } from '../../components/Button';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { useEditedImages } from '../../hooks/useEditImages';

export default function HomeScreen() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [brightness, setBrightness] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [origW, setOrigW] = useState<number | null>(null);
  const [origH, setOrigH] = useState<number | null>(null);
  const [scalePercent, setScalePercent] = useState(100);
  const [cropPreset, setCropPreset] = useState<'none' | 'square' | '4:3' | '16:9'>('none');
  const [saving, setSaving] = useState(false);
  const { addImage } = useEditedImages();

  // Request permissions and pick image
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Thông báo', 'Cần cấp quyền truy cập thư viện ảnh!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setOrigW(result.assets[0].width ?? null);
      setOrigH(result.assets[0].height ?? null);
      setBrightness(1);
      setRotation(0);
      setFlipH(false);
      setFlipV(false);
      setScalePercent(100);
      setCropPreset('none');
    }
  };

  // Save edited image
  const saveImage = async () => {
    if (!selectedImage) return;

    setSaving(true);
    try {
      // Skip media library for now - just save to app gallery
      // Build manipulation actions
      const actions: ImageManipulator.Action[] = [];

      // 1) Crop (based on original size)
      if (cropPreset !== 'none' && origW && origH) {
        let targetAspect = 1;
        if (cropPreset === '4:3') targetAspect = 4 / 3;
        if (cropPreset === '16:9') targetAspect = 16 / 9;

        let cropWidth = origW;
        let cropHeight = origH;
        const currentAspect = origW / origH;
        if (currentAspect > targetAspect) {
          // Image is wider than target -> limit width
          cropHeight = origH;
          cropWidth = Math.round(cropHeight * targetAspect);
        } else {
          // Image is taller/narrower -> limit height
          cropWidth = origW;
          cropHeight = Math.round(cropWidth / targetAspect);
        }
        const originX = Math.round((origW - cropWidth) / 2);
        const originY = Math.round((origH - cropHeight) / 2);
        actions.push({ crop: { originX, originY, width: cropWidth, height: cropHeight } });
      }

      // 2) Flip
      if (flipH) actions.push({ flip: ImageManipulator.FlipType.Horizontal });
      if (flipV) actions.push({ flip: ImageManipulator.FlipType.Vertical });

      // 3) Rotate
      if (rotation % 360 !== 0) actions.push({ rotate: rotation });

      // 4) Resize (after other transforms)
      if (scalePercent !== 100 && origW && origH) {
        const ratio = scalePercent / 100;
        actions.push({ resize: { width: Math.max(1, Math.round(origW * ratio)) } });
      }

      const actionsToRun = actions.length > 0 ? actions : [{ rotate: 0 }];
      const result = await ImageManipulator.manipulateAsync(
        selectedImage,
        actionsToRun,
        { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
      );
      const outputUri = result.uri;

      // Save to app gallery
      await addImage(outputUri);
      console.log('Image saved to gallery:', outputUri);
      
      // Auto reset and show pick image button
      setSelectedImage(null);
      setRotation(0);
      setFlipH(false);
      setFlipV(false);
      setScalePercent(100);
      setCropPreset('none');
      setOrigW(null);
      setOrigH(null);
      
      Alert.alert(
        'Thành công',
        'Đã lưu ảnh vào thư viện! Bạn có thể chọn ảnh mới để chỉnh sửa.',
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể lưu ảnh. Vui lòng thử lại!');
      console.error('Error saving image:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Chỉnh sửa ảnh</Text>

        {!selectedImage ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Chưa chọn ảnh nào</Text>
            <Text style={styles.emptySubtext}>
              Nhấn nút bên dưới để chọn ảnh từ thư viện
            </Text>
          </View>
        ) : (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: selectedImage }}
              style={[
                styles.image,
                {
                  opacity: brightness,
                  transform: [
                    { rotate: `${rotation}deg` },
                    { scaleX: flipH ? -1 : 1 },
                    { scaleY: flipV ? -1 : 1 },
                  ],
                },
              ]}
              resizeMode="contain"
            />

            <View style={styles.controls}>
              <Text style={styles.controlLabel}>Độ sáng</Text>
              <View style={styles.controlButtons}>
                <TouchableOpacity
                  style={styles.controlBtn}
                  onPress={() => setBrightness(Math.max(0.5, brightness - 0.1))}
                >
                  <Text style={styles.controlBtnText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.controlValue}>{brightness.toFixed(1)}</Text>
                <TouchableOpacity
                  style={styles.controlBtn}
                  onPress={() => setBrightness(Math.min(1.5, brightness + 0.1))}
                >
                  <Text style={styles.controlBtnText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.controls}>
              <Text style={styles.controlLabel}>Kích thước</Text>
              <View style={styles.controlButtons}>
                <TouchableOpacity
                  style={styles.controlBtn}
                  onPress={() => setScalePercent((p) => Math.max(50, p - 10))}
                >
                  <Text style={styles.controlBtnText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.controlValue}>{scalePercent}%</Text>
                <TouchableOpacity
                  style={styles.controlBtn}
                  onPress={() => setScalePercent((p) => Math.min(150, p + 10))}
                >
                  <Text style={styles.controlBtnText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.controls}>
              <Text style={styles.controlLabel}>Cắt khung hình</Text>
              <View style={styles.controlButtons}>
                <TouchableOpacity
                  style={[styles.controlBtn, cropPreset === 'none' && styles.controlBtnActive]}
                  onPress={() => setCropPreset('none')}
                >
                  <Text style={styles.controlBtnText}>Gốc</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.controlBtn, cropPreset === 'square' && styles.controlBtnActive]}
                  onPress={() => setCropPreset('square')}
                >
                  <Text style={styles.controlBtnText}>1:1</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.controlBtn, cropPreset === '4:3' && styles.controlBtnActive]}
                  onPress={() => setCropPreset('4:3')}
                >
                  <Text style={styles.controlBtnText}>4:3</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.controlBtn, cropPreset === '16:9' && styles.controlBtnActive]}
                  onPress={() => setCropPreset('16:9')}
                >
                  <Text style={styles.controlBtnText}>16:9</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.controls}>
              <Text style={styles.controlLabel}>Xoay</Text>
              <View style={styles.controlButtons}>
                <TouchableOpacity
                  style={styles.controlBtn}
                  onPress={() => setRotation((prev) => (prev - 90 + 360) % 360)}
                >
                  <Text style={styles.controlBtnText}>⟲</Text>
                </TouchableOpacity>
                <Text style={styles.controlValue}>{rotation}°</Text>
                <TouchableOpacity
                  style={styles.controlBtn}
                  onPress={() => setRotation((prev) => (prev + 90) % 360)}
                >
                  <Text style={styles.controlBtnText}>⟳</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.controls}>
              <Text style={styles.controlLabel}>Lật</Text>
              <View style={styles.controlButtons}>
                <TouchableOpacity
                  style={styles.controlBtn}
                  onPress={() => setFlipH((v) => !v)}
                >
                  <Text style={styles.controlBtnText}>↔</Text>
                </TouchableOpacity>
                <Text style={styles.controlValue}>{flipH ? 'Ngang' : '—'}</Text>
                <TouchableOpacity
                  style={styles.controlBtn}
                  onPress={() => setFlipV((v) => !v)}
                >
                  <Text style={styles.controlBtnText}>↕</Text>
                </TouchableOpacity>
                <Text style={styles.controlValue}>{flipV ? 'Dọc' : '—'}</Text>
              </View>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity
                style={[styles.actionBtn, styles.cancelBtn]}
                onPress={() => setSelectedImage(null)}
              >
                <Text style={styles.cancelBtnText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionBtn, styles.saveBtn]}
                onPress={saveImage}
                disabled={saving}
              >
                <Text style={styles.saveBtnText}>
                  {saving ? 'Đang lưu...' : 'Lưu ảnh'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      {!selectedImage && (
        <View style={styles.bottomButton}>
          <Button title="Chọn ảnh từ thư viện" onPress={pickImage} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: SIZES.medium,
    flexGrow: 1,
  },
  title: {
    fontSize: FONTS.sizes.xlarge,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.large,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
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
  imageContainer: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 400,
    borderRadius: SIZES.borderRadius,
    backgroundColor: COLORS.card,
  },
  controls: {
    marginTop: SIZES.large,
    padding: SIZES.medium,
    backgroundColor: COLORS.card,
    borderRadius: SIZES.borderRadius,
  },
  controlLabel: {
    fontSize: FONTS.sizes.medium,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SIZES.small,
  },
  controlButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlBtnActive: {
    borderWidth: 2,
    borderColor: COLORS.border,
    backgroundColor: COLORS.secondary,
  },
  controlBtnText: {
    color: COLORS.card,
    fontSize: 24,
    fontWeight: 'bold',
  },
  controlValue: {
    fontSize: FONTS.sizes.large,
    fontWeight: '600',
    color: COLORS.text,
    marginHorizontal: SIZES.large,
    minWidth: 50,
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    gap: SIZES.medium,
    marginTop: SIZES.large,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: SIZES.medium,
    borderRadius: SIZES.borderRadius,
    alignItems: 'center',
  },
  cancelBtn: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cancelBtnText: {
    fontSize: FONTS.sizes.medium,
    fontWeight: '600',
    color: COLORS.text,
  },
  saveBtn: {
    backgroundColor: COLORS.primary,
  },
  saveBtnText: {
    fontSize: FONTS.sizes.medium,
    fontWeight: '600',
    color: COLORS.card,
  },
  bottomButton: {
    padding: SIZES.medium,
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
});