// app/invoice.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { CartItem } from '../src/models/types';
import { checkout, getCartItems, removeItem } from '../src/repos/cart.repo';
import { subscribe } from '../src/state/cartStore';

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
  accent: '#F39C12',
};

export default function InvoiceScreen() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [vatEnabled, setVatEnabled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [paying, setPaying] = useState<boolean>(false);
  const [paidSuccess, setPaidSuccess] = useState<boolean>(false);
  const router = useRouter();

  async function load() {
    try {
      const cs = await getCartItems();
      setItems(cs);
    } catch (err: any) {
      console.error('Failed to load invoice items:', err);
      Alert.alert('Lỗi', err.message || 'Không thể tải hóa đơn');
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);
  useEffect(() => {
    const unsub = subscribe(() => {
      load().catch(() => {});
    });
    return unsub;
  }, []);

  const subtotal = items.reduce((sum, c) => sum + (c.qty * Number(c.price)), 0);
  const vatRate = vatEnabled ? 0.1 : 0;
  const vat = subtotal * vatRate;
  const total = subtotal + vat;

  const formatVND = (n: number) => new Intl.NumberFormat('vi-VN').format(n) + '₫';

  async function handlePay() {
    Alert.alert(
      'Xác nhận thanh toán',
      `Tổng tiền: ${formatVND(total)}\n\nBạn có chắc muốn thanh toán?`,
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Thanh toán',
          style: 'default',
          onPress: async () => {
            setPaying(true);
            try {
              await checkout();
              // show inline success message and then navigate
              setPaidSuccess(true);
              // small delay so user sees success view
              setTimeout(() => {
                setPaidSuccess(false);
                router.push('/');
              }, 1400);
              // also refresh data
              await load();
            } catch (err: any) {
              Alert.alert('Thanh toán thất bại', err.message || 'Lỗi');
            } finally {
              setPaying(false);
            }
          },
        },
      ]
    );
  }

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
          <Text style={styles.headerTitle}>Hóa đơn</Text>
          <Text style={styles.headerSubtitle}>
            {items.length > 0 ? `${items.length} mặt hàng` : 'Không có mặt hàng'}
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="receipt-outline" size={80} color={COLORS.textLight} />
          <Text style={styles.emptyTitle}>Chưa có hóa đơn</Text>
          <Text style={styles.emptySubtitle}>Thêm sản phẩm vào giỏ hàng để tạo hóa đơn</Text>
          <TouchableOpacity 
            style={styles.shopButton} 
            onPress={() => router.push('/')}
          >
            <Text style={styles.shopButtonText}>Mua sắm ngay</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {/* Invoice Items */}
          <FlatList
            data={items}
            keyExtractor={(i) => String(i.id)}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <View style={styles.invoiceItem}>
                <View style={styles.itemLeft}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemDetail}>
                    {formatVND(Number(item.price))} × {item.qty}
                  </Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.itemAmount}>
                    {formatVND(item.qty * Number(item.price))}
                  </Text>
                  <TouchableOpacity onPress={() => {
                    Alert.alert('Xóa sản phẩm', `Xóa "${item.name}" khỏi hóa đơn?`, [
                      { text: 'Hủy', style: 'cancel' },
                      { text: 'Xóa', style: 'destructive', onPress: () => {
                        removeItem(item.product_id)
                          .then(() => load())
                          .catch((e) => Alert.alert('Lỗi', e?.message || 'Không thể xóa'));
                      } }
                    ]);
                  }} style={{ marginTop:8 }}>
                    <Ionicons name="trash-outline" size={18} color={COLORS.danger} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />

          {/* Summary Card */}
          <View style={styles.summaryCard}>
            {/* Subtotal */}
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tạm tính</Text>
              <Text style={styles.summaryValue}>{formatVND(subtotal)}</Text>
            </View>

            {/* VAT Toggle */}
            <View style={styles.vatRow}>
              <View style={styles.vatLeft}>
                <Ionicons name="calculator-outline" size={20} color={COLORS.textLight} />
                <Text style={styles.vatLabel}>VAT 10%</Text>
              </View>
              <Switch
                value={vatEnabled}
                onValueChange={setVatEnabled}
                trackColor={{ false: COLORS.border, true: COLORS.secondary }}
                thumbColor={vatEnabled ? COLORS.white : COLORS.white}
              />
            </View>

            {vatEnabled && (
              <View style={[styles.summaryRow, styles.vatAmount]}>
                <Text style={styles.summaryLabel}>Thuế VAT</Text>
                <Text style={[styles.summaryValue, { color: COLORS.accent }]}>
                  {formatVND(vat)}
                </Text>
              </View>
            )}

            {/* Divider */}
            <View style={styles.divider} />

            {/* Total */}
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Tổng cộng</Text>
              <Text style={styles.totalAmount}>{formatVND(total)}</Text>
            </View>

            {/* Pay Button */}
            <TouchableOpacity
              style={[styles.payButton, paying && styles.payButtonDisabled]}
              onPress={handlePay}
              disabled={paying}
            >
              {paying ? (
                <ActivityIndicator color={COLORS.white} />
              ) : (
                <>
                  <Ionicons name="checkmark-circle" size={22} color={COLORS.white} />
                  <Text style={styles.payButtonText}>Thanh toán</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* Success overlay */}
      {paidSuccess && (
        <View style={{ position:'absolute', left:0, right:0, top:0, bottom:0, justifyContent:'center', alignItems:'center' }} pointerEvents="none">
          <View style={{ backgroundColor: COLORS.success, padding:20, borderRadius:12, shadowColor:'#000', elevation:6 }}>
            <Text style={{ color: COLORS.white, fontSize:18, fontWeight:'700' }}>✓ Thanh toán thành công</Text>
            <Text style={{ color: COLORS.white, marginTop:6 }}>Cảm ơn bạn đã mua hàng!</Text>
          </View>
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
  },
  invoiceItem: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemLeft: {
    flex: 1,
    paddingRight: 16,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  itemDetail: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  itemAmount: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.primary,
  },
  summaryCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 15,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 15,
    color: COLORS.text,
    fontWeight: '600',
  },
  vatRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  vatLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  vatLabel: {
    fontSize: 15,
    color: COLORS.text,
    fontWeight: '600',
  },
  vatAmount: {
    backgroundColor: COLORS.background,
    padding: 12,
    borderRadius: 8,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 16,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 18,
    color: COLORS.text,
    fontWeight: '600',
  },
  totalAmount: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.primary,
  },
  payButton: {
    backgroundColor: COLORS.success,
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  payButtonDisabled: {
    backgroundColor: COLORS.textLight,
  },
  payButtonText: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
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
    textAlign: 'center',
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
});