// app/cart.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { CartItem } from '../src/models/types';
import { getCartItems, removeItem, updateQty } from '../src/repos/cart.repo';
import { subscribe } from '../src/state/cartStore';

const COLORS = {
  primary: '#2998e7ff',
  secondary: '#4ECDC4',
  background: '#F7F7F7',
  white: '#FFFFFF',
  text: '#2C3E50',
  textLight: '#7F8C8D',
  border: '#E0E0E0',
  success: '#2ECC71',
  danger: '#E74C3C',
};

export default function CartScreen() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  async function load() {
    try {
      const cs = await getCartItems();
      setItems(cs);
    } catch (err: any) {
      console.error('Failed to load cart items:', err);
      Alert.alert('Lỗi', err.message || 'Không thể tải giỏ hàng');
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);
  useEffect(() => {
    const unsub = subscribe(() => { load().catch(() => {}); });
    return unsub;
  }, []);

  async function handleChangeQty(item: CartItem, delta: number) {
    const newQty = item.qty + delta;
    if (newQty <= 0) {
      Alert.alert('Xóa sản phẩm', `Xóa "${item.name}" khỏi giỏ hàng?`, [
        { text: 'Hủy', style: 'cancel' },
        { 
          text: 'Xóa', 
          style: 'destructive',
          onPress: () => {
            removeItem(item.product_id)
              .then(() => load())
              .catch((e) => Alert.alert('Lỗi', e?.message || 'Không thể xóa'));
          }
        }
      ]);
      return;
    }
    try {
      await updateQty(item.product_id, newQty);
      await load();
    } catch (err: any) {
      Alert.alert('Không thể cập nhật', err.message || 'Lỗi');
    }
  }

  async function handleRemove(item: CartItem) {
    Alert.alert('Xóa sản phẩm', `Xóa "${item.name}" khỏi giỏ hàng?`, [
      { text: 'Hủy', style: 'cancel' },
      { 
          text: 'Xóa', 
          style: 'destructive',
          onPress: () => {
            removeItem(item.product_id)
              .then(() => load())
              .catch((e) => Alert.alert('Lỗi', e?.message || 'Không thể xóa'));
          }
        }
    ]);
  }

  const formatVND = (n: number) => new Intl.NumberFormat('vi-VN').format(n) + '₫';

  const totalAmount = items.reduce((sum, item) => sum + (item.qty * Number(item.price)), 0);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Giỏ hàng</Text>
          <Text style={styles.headerSubtitle}>
            {items.length > 0 ? `${items.length} sản phẩm` : 'Trống'}
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.push('/')}
        >
          <Ionicons name="home-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Cart Items */}
      <FlatList
        data={items}
        keyExtractor={(i) => String(i.id)}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Ionicons name="cart-outline" size={80} color={COLORS.textLight} />
            <Text style={styles.emptyTitle}>Giỏ hàng trống</Text>
            <Text style={styles.emptySubtitle}>Hãy thêm sản phẩm vào giỏ hàng</Text>
            <TouchableOpacity 
              style={styles.shopButton} 
              onPress={() => router.push('/')}
            >
              <Text style={styles.shopButtonText}>Mua sắm ngay</Text>
            </TouchableOpacity>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>{formatVND(Number(item.price))}</Text>
              <View style={styles.stockBadge}>
                <Text style={styles.stockText}>Tồn: {item.stock}</Text>
              </View>
            </View>

            <View style={styles.itemActions}>
              {/* Quantity Control */}
              <View style={styles.qtyControl}>
                <TouchableOpacity
                  style={styles.qtyButton}
                  onPress={() => {
                    // if qty is 1, removing should delete item directly
                    if (item.qty <= 1) {
                      removeItem(item.product_id)
                        .then(() => load())
                        .catch((e) => Alert.alert('Lỗi', e?.message || 'Không thể xóa'));
                    } else {
                      handleChangeQty(item, -1);
                    }
                  }}
                >
                  <Ionicons name="remove" size={18} color={COLORS.white} />
                </TouchableOpacity>
                
                <Text style={styles.qtyText}>{item.qty}</Text>
                
                <TouchableOpacity
                  style={styles.qtyButton}
                  onPress={() => handleChangeQty(item, 1)}
                >
                  <Ionicons name="add" size={18} color={COLORS.white} />
                </TouchableOpacity>
              </View>

              {/* Subtotal */}
              <Text style={styles.itemTotal}>
                {formatVND(item.qty * Number(item.price))}
              </Text>

              {/* Delete Button */}
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => {
                  // immediate delete without extra confirm
                  removeItem(item.product_id)
                    .then(() => load())
                    .catch((e) => Alert.alert('Lỗi', e?.message || 'Không thể xóa'));
                }}
              >
                <Ionicons name="trash-outline" size={20} color={COLORS.danger} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Bottom Summary */}
      {items.length > 0 && (
        <View style={styles.bottomBar}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Tổng cộng</Text>
            <Text style={styles.totalAmount}>{formatVND(totalAmount)}</Text>
          </View>
          <TouchableOpacity 
            style={styles.checkoutButton}
            onPress={() => router.push('/invoice')}
          >
            <Text style={styles.checkoutButtonText}>Xem hóa đơn</Text>
            <Ionicons name="arrow-forward" size={20} color={COLORS.white} />
          </TouchableOpacity>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
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
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 16,
    flexGrow: 1,
  },
  cartItem: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  itemInfo: {
    marginBottom: 12,
  },
  itemName: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 6,
  },
  itemPrice: {
    fontSize: 16,
    color: COLORS.textLight,
    marginBottom: 6,
  },
  stockBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.background,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  stockText: {
    fontSize: 12,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  qtyControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 4,
  },
  qtyButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginHorizontal: 16,
    minWidth: 24,
    textAlign: 'center',
  },
  itemTotal: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
    flex: 1,
    textAlign: 'center',
  },
  deleteButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 24,
  },
  emptySubtitle: {
    fontSize: 15,
    color: COLORS.textLight,
    marginTop: 8,
  },
  shopButton: {
    marginTop: 32,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  shopButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  bottomBar: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.primary,
  },
  checkoutButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  checkoutButtonText: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: '600',
  },
});