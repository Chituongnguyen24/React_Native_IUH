import * as FileSystem from 'expo-file-system/legacy';
import { useEffect, useState } from 'react';

export interface EditedImage {
  id: string;
  uri: string;
  date: string;
  timestamp: number;
}

const STORAGE_KEY = 'edited_images.json';

export const useEditedImages = () => {
  const [images, setImages] = useState<EditedImage[]>([]);
  const [loading, setLoading] = useState(true);

  const storageUri = `${FileSystem.documentDirectory}${STORAGE_KEY}`;

  // Load images from storage
  const loadImages = async () => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(storageUri);
      if (fileInfo.exists) {
        const content = await FileSystem.readAsStringAsync(storageUri);
        const parsed = JSON.parse(content);
        setImages(parsed.sort((a: EditedImage, b: EditedImage) => b.timestamp - a.timestamp));
      }
    } catch (error) {
      console.error('Error loading images:', error);
    } finally {
      setLoading(false);
    }
  };

  // Save images to storage
  const saveImages = async (newImages: EditedImage[]) => {
    try {
      await FileSystem.writeAsStringAsync(storageUri, JSON.stringify(newImages));
    } catch (error) {
      console.error('Error saving images:', error);
    }
  };

  // Add new edited image
  const addImage = async (uri: string) => {
    console.log('Adding image to gallery:', uri);
    const newImage: EditedImage = {
      id: Date.now().toString(),
      uri,
      date: new Date().toLocaleString('vi-VN'),
      timestamp: Date.now(),
    };
    const newImages = [newImage, ...images];
    console.log('Updated images array:', newImages.length, 'images');
    setImages(newImages);
    await saveImages(newImages);
    console.log('Image saved to storage successfully');
  };

  // Delete image
  const deleteImage = async (id: string) => {
    const image = images.find(img => img.id === id);
    if (image) {
      try {
        await FileSystem.deleteAsync(image.uri, { idempotent: true });
      } catch (error) {
        console.error('Error deleting file:', error);
      }
    }
    const newImages = images.filter(img => img.id !== id);
    setImages(newImages);
    await saveImages(newImages);
  };

  useEffect(() => {
    loadImages();
  }, []);

  return {
    images,
    loading,
    addImage,
    deleteImage,
    refreshImages: loadImages,
  };
};