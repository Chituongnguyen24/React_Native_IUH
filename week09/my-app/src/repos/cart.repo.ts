// src/repos/cart.repo.ts
import { dbAvailable, execSqlAsync, getFirstAsync, runAsync, SAMPLE_PRODUCTS } from '../db/db';
import { CartItem } from '../models/types';
import { setCartCount } from '../state/cartStore';
import { getProductById } from './product.repo';

// In-memory fallback when sqlite isn't available
const inMemoryCart: Record<string, number> = {};

function prodFromSamples(product_id: string) {
  return SAMPLE_PRODUCTS.find(p => p.product_id === product_id) ?? null;
}

export async function getCartItems(): Promise<CartItem[]> {
  if (!dbAvailable) {
    const res: CartItem[] = [];
    let id = 1;
    let totalQty = 0;
    for (const pid of Object.keys(inMemoryCart)) {
      const prod = prodFromSamples(pid);
      const qty = inMemoryCart[pid];
      totalQty += qty;
      res.push({ id: id++, product_id: pid, qty, name: prod?.name, price: prod?.price, stock: prod?.stock });
    }
    return res;
  }
  const r = await execSqlAsync(`
    SELECT c.id, c.product_id, c.qty, p.name, p.price, p.stock
    FROM cart_items c
    JOIN products p ON p.product_id = c.product_id
    ORDER BY c.id;
  `);
  const res: CartItem[] = [];
  for (let i = 0; i < r.rows.length; i++) res.push(r.rows.item(i));
  // update badge count from DB result
  return res;
}

async function updateCartCountDb() {
  try {
    const r = await execSqlAsync(`SELECT SUM(qty) as total FROM cart_items;`);
    const total = (r.rows.length > 0 ? r.rows.item(0).total : 0) ?? 0;
    setCartCount(Number(total));
  } catch (e) {
    // ignore
  }
}

export async function getQtyInCart(product_id: string): Promise<number> {
  if (!dbAvailable) return inMemoryCart[product_id] ?? 0;
  const result = await getFirstAsync<{ qty: number }>(`SELECT qty FROM cart_items WHERE product_id = ?;`, [product_id]);
  return result?.qty ?? 0;
}

export async function addToCart(product_id: string): Promise<void> {
  const prod = await getProductById(product_id);
  if (!prod) throw new Error('Sản phẩm không tồn tại');

  const currentQty = await getQtyInCart(product_id);
  const newQty = currentQty + 1;

  if (newQty > prod.stock) throw new Error(`Không đủ tồn kho (hiện có ${prod.stock})`);
  if (!dbAvailable) {
    inMemoryCart[product_id] = newQty;
    const total = Object.values(inMemoryCart).reduce((s, v) => s + v, 0);
    console.debug('addToCart (inMemory) ->', { product_id, newQty, inMemoryCart, total });
    setCartCount(total);
    return;
  }

  if (currentQty === 0) {
    await runAsync(`INSERT INTO cart_items(product_id, qty) VALUES(?,?);`, [product_id, 1]);
  } else {
    await runAsync(`UPDATE cart_items SET qty = ? WHERE product_id = ?;`, [newQty, product_id]);
  }
  // update badge count from DB
  await updateCartCountDb();
}

export async function updateQty(product_id: string, qty: number): Promise<void> {
  if (qty <= 0) {
    await removeItem(product_id);
    return;
  }
  const prod = await getProductById(product_id);
  if (!prod) throw new Error('Sản phẩm không tồn tại');
  if (qty > prod.stock) throw new Error(`Không đủ tồn kho (hiện có ${prod.stock})`);
  if (!dbAvailable) {
    inMemoryCart[product_id] = qty;
    const total = Object.values(inMemoryCart).reduce((s, v) => s + v, 0);
    setCartCount(total);
    return;
  }

  await runAsync(`UPDATE cart_items SET qty = ? WHERE product_id = ?;`, [qty, product_id]);
  await updateCartCountDb();
}

export async function removeItem(product_id: string): Promise<void> {
  try {
    if (!dbAvailable) {
      console.debug('removeItem (inMemory):', product_id, 'before', JSON.stringify(inMemoryCart));
      delete inMemoryCart[product_id];
      const total = Object.values(inMemoryCart).reduce((s, v) => s + v, 0);
      setCartCount(total);
      console.debug('removeItem (inMemory) done, after', JSON.stringify(inMemoryCart));
      return;
    }

    await runAsync(`DELETE FROM cart_items WHERE product_id = ?;`, [product_id]);
    await updateCartCountDb();
  } catch (e) {
    console.error('removeItem error:', e);
    throw e;
  }
}

export async function clearCart(): Promise<void> {
  if (!dbAvailable) {
    for (const k of Object.keys(inMemoryCart)) delete inMemoryCart[k];
    setCartCount(0);
    return;
  }

  await runAsync(`DELETE FROM cart_items;`);
  await updateCartCountDb();
}

export async function getCartTotal(): Promise<number> {
  if (!dbAvailable) {
    let total = 0;
    for (const pid of Object.keys(inMemoryCart)) {
      const prod = prodFromSamples(pid);
      if (prod) total += (inMemoryCart[pid] * prod.price);
    }
    return total;
  }

  const result = await getFirstAsync<{ total: number | null }>(`
    SELECT SUM(c.qty * p.price) as total
    FROM cart_items c JOIN products p ON p.product_id = c.product_id;
  `);
  return result?.total ?? 0;
}

export async function checkout(): Promise<void> {
  if (!dbAvailable) {
    // simple in-memory checkout: deduct from sample products' stock and clear cart
    const itemsToUpdate: Array<{ product_id: string; qty: number; stock: number; name: string }> = [];
    for (const pid of Object.keys(inMemoryCart)) {
      const prod = prodFromSamples(pid);
      if (prod) itemsToUpdate.push({ product_id: pid, qty: inMemoryCart[pid], stock: prod.stock, name: prod.name });
    }

    if (itemsToUpdate.length === 0) throw new Error('Giỏ hàng trống!');

    for (const item of itemsToUpdate) {
      if (item.qty > item.stock) throw new Error(`Sản phẩm "${item.name}" không đủ tồn kho`);
    }

    // deduct stock in SAMPLE_PRODUCTS (mutating export is ok for demo)
    for (const item of itemsToUpdate) {
      const p = prodFromSamples(item.product_id) as any;
      if (p) p.stock -= item.qty;
    }
    // clear cart
    for (const k of Object.keys(inMemoryCart)) delete inMemoryCart[k];
  // update badge count and return
  setCartCount(0);
  console.log('Checkout thành công (in-memory)');
  return;
  }

  const itemsResult = await execSqlAsync(
    `SELECT c.product_id, c.qty, p.stock, p.name FROM cart_items c JOIN products p ON p.product_id = c.product_id;`
  );

  const itemsToUpdate: Array<{ product_id: string; qty: number; stock: number; name: string }> = [];
  for (let i = 0; i < itemsResult.rows.length; i++) {
    itemsToUpdate.push(itemsResult.rows.item(i));
  }

  if (itemsToUpdate.length === 0) {
    throw new Error("Giỏ hàng trống!");
  }

  for (const item of itemsToUpdate) {
    if (item.qty > item.stock) {
      throw new Error(`Sản phẩm "${item.name}" (${item.product_id}) không đủ tồn kho (cần ${item.qty}, còn ${item.stock})`);
    }
  }

  try {
    const updatePromises = itemsToUpdate.map(item =>
      runAsync(`UPDATE products SET stock = stock - ? WHERE product_id = ?;`, [item.qty, item.product_id])
    );

    await Promise.all(updatePromises);
    await clearCart();
    console.log('Checkout thành công!');

  } catch (error) {
    console.error("Lỗi trong quá trình checkout sau khi kiểm tra tồn kho:", error);
    throw new Error("Đã xảy ra lỗi trong quá trình xử lý checkout.");
  }
}