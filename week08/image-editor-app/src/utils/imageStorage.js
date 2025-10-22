import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@edited_images';

export const saveEditedImage = async (imageUri) => {
  try {
    const existingImages = await getEditedImages();
    
    const timestamp = Date.now();
    
    // Đơn giản hơn: Lưu URI trực tiếp mà không cần copy
    const newImage = {
      id: timestamp.toString(),
      uri: imageUri, // Lưu URI gốc
      date: new Date().toLocaleDateString('vi-VN'),
      timestamp,
    };
    
    const updatedImages = [newImage, ...existingImages];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedImages));
    
    return newImage;
  } catch (error) {
    console.error('Error saving image:', error);
    throw error;
  }
};

export const getEditedImages = async () => {
  try {
    const imagesJson = await AsyncStorage.getItem(STORAGE_KEY);
    return imagesJson ? JSON.parse(imagesJson) : [];
  } catch (error) {
    console.error('Error getting images:', error);
    return [];
  }
};

export const deleteEditedImage = async (imageId) => {
  try {
    const images = await getEditedImages();
    const updatedImages = images.filter(img => img.id !== imageId);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedImages));
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};

export const clearAllImages = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing images:', error);
    throw error;
  }
};