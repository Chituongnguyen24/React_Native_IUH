// app/index.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { initDbAndSeed } from '../src/db/db';
import { Product } from '../src/models/types';
import { addToCart } from '../src/repos/cart.repo';
import { getAllProducts } from '../src/repos/product.repo';

const COLORS = {
  primary: '#FF6B6B',
  secondary: '#4ECDC4',
  background: '#F7F7F7',
  white: '#FFFFFF',
  text: '#2C3E50',
  textLight: '#7F8C8D',
  border: '#E0E0E0',
  success: '#2ECC71',
  danger: '#E74C3C',
  disabled: '#BDC3C7',
};

export default function ProductsScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const router = useRouter();

  async function load() {
    try {
      const ps = await getAllProducts();
      setProducts(ps);
    } catch (err: any) {
      console.error('Failed to load products:', err);
      Alert.alert('Lỗi', (err && err.message) ? `${err.message}\nSử dụng dữ liệu mẫu tạm thời.` : 'Không thể tải danh sách sản phẩm.');
      const sampleProducts: Product[] = [
        { product_id: 'p1', name: 'Bánh mì sữa (mẫu)', price: 12000, stock: 10 },
        { product_id: 'p2', name: 'Bánh ngọt socola (mẫu)', price: 25000, stock: 5 },
        { product_id: 'p3', name: 'Bánh trung thu (mẫu)', price: 80000, stock: 2 },
      ];
      setProducts(sampleProducts);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        await initDbAndSeed();
        await load();
      } catch (err: any) {
        Alert.alert('Lỗi khởi tạo DB', err.message || String(err));
        setLoading(false);
      }
    })();
  }, []);

  async function handleRefresh() {
    setRefreshing(true);
    await load();
  }

  async function handleAdd(p: Product) {
    try {
      await addToCart(p.product_id);
      Alert.alert('✓ Thành công', `Đã thêm "${p.name}" vào giỏ hàng`);
      await load();
    } catch (err: any) {
      Alert.alert('Không thể thêm', err.message || 'Lỗi');
    }
  }

  const formatVND = (n: number) => new Intl.NumberFormat('vi-VN').format(n) + '₫';

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter(p => {
      if (q && !p.name.toLowerCase().includes(q)) return false;
      if (minPrice !== undefined && p.price < minPrice) return false;
      if (maxPrice !== undefined && p.price > maxPrice) return false;
      return true;
    });
  }, [products, query, minPrice, maxPrice]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Đang tải sản phẩm...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Sản phẩm</Text>
          <Text style={styles.headerSubtitle}>{products.length} sản phẩm có sẵn</Text>
        </View>
        {/* cart button removed as requested */}
      </View>

      {/* Search & Filters */}
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color={COLORS.textLight} />
          <TextInput
            placeholder="Tìm theo tên sản phẩm..."
            value={query}
            onChangeText={setQuery}
            style={styles.searchInput}
            returnKeyType="search"
          />
        </View>

        <TouchableOpacity style={styles.filterButton} onPress={() => setShowFilters(s => !s)}>
          <Ionicons name={showFilters ? 'close' : 'filter'} size={20} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      {/* Price range inputs (shown when filter icon toggled) */}
      {showFilters && (
        <View style={styles.priceRow}>
        <TextInput
          style={styles.priceInput}
          placeholder="Giá từ"
          keyboardType="numeric"
          value={minPrice !== undefined ? String(minPrice) : ''}
          onChangeText={(t) => {
            const v = t.replace(/[^0-9]/g, '');
            setMinPrice(v === '' ? undefined : Number(v));
          }}
        />
        <Text style={{ marginHorizontal: 8, fontSize: 16 }}>—</Text>
        <TextInput
          style={styles.priceInput}
          placeholder="Đến"
          keyboardType="numeric"
          value={maxPrice !== undefined ? String(maxPrice) : ''}
          onChangeText={(t) => {
            const v = t.replace(/[^0-9]/g, '');
            setMaxPrice(v === '' ? undefined : Number(v));
          }}
        />
        <TouchableOpacity style={styles.clearPriceButton} onPress={() => { setMinPrice(undefined); setMaxPrice(undefined); }}>
          <Text style={{ color: COLORS.white }}>Xóa</Text>
        </TouchableOpacity>
        </View>
      )}

      {/* Products List */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(it) => it.product_id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={handleRefresh}
            colors={[COLORS.primary]}
          />
        }
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>{formatVND(item.price)}</Text>
              <View style={styles.stockContainer}>
                <Ionicons 
                  name={item.stock > 0 ? "checkmark-circle" : "close-circle"} 
                  size={16} 
                  color={item.stock > 0 ? COLORS.success : COLORS.danger} 
                />
                <Text style={[
                  styles.stockText,
                  { color: item.stock > 0 ? COLORS.success : COLORS.danger }
                ]}>
                  {item.stock > 0 ? `Còn ${item.stock} sản phẩm` : 'Hết hàng'}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.addButton,
                item.stock <= 0 && styles.addButtonDisabled
              ]}
              onPress={() => handleAdd(item)}
              disabled={item.stock <= 0}
            >
              <Ionicons 
                name="add-circle" 
                size={20} 
                color={COLORS.white} 
              />
              <Text style={styles.addButtonText}>
                {item.stock > 0 ? 'Thêm' : 'Hết'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Ionicons name="cube-outline" size={64} color={COLORS.textLight} />
            <Text style={styles.emptyText}>Chưa có sản phẩm</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: COLORS.textLight,
  },
  header: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 4,
  },
  cartButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 16,
  },
  productCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  productInfo: {
    flex: 1,
    paddingRight: 16,
  },
  productName: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 6,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 8,
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stockText: {
    fontSize: 13,
    marginLeft: 4,
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  addButtonDisabled: {
    backgroundColor: COLORS.disabled,
  },
  addButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: COLORS.textLight,
  },
  searchRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.white,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
    fontSize: 14,
  },
  filterButton: {
    marginLeft: 8,
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.white,
  },
  filterText: {
    color: COLORS.text,
    fontSize: 14,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: COLORS.white,
  },
  priceInput: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    fontSize: 14,
  },
  clearPriceButton: {
    marginLeft: 12,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});