// src/repos/product.repo.ts
import { dbAvailable, execSqlAsync, runAsync, SAMPLE_PRODUCTS } from '../db/db';
import { Product } from '../models/types';

export async function getAllProducts(): Promise<Product[]> {
  if (!dbAvailable) {
    // return a shallow copy so consumers can't mutate the exported array directly
    return SAMPLE_PRODUCTS.map(p => ({ ...p }));
  }
  const r = await execSqlAsync(`SELECT product_id, name, price, stock FROM products;`);
  const res: Product[] = [];
  for (let i = 0; i < r.rows.length; i++) res.push(r.rows.item(i));
  return res;
}

export async function getProductById(product_id: string): Promise<Product | null> {
  if (!dbAvailable) {
    const p = SAMPLE_PRODUCTS.find(s => s.product_id === product_id);
    return p ? { ...p } : null;
  }
  const r = await execSqlAsync(`SELECT product_id, name, price, stock FROM products WHERE product_id = ?;`, [product_id]);
  if (r.rows.length === 0) return null;
  return r.rows.item(0);
}

export async function decreaseStock(product_id: string, amount: number): Promise<void> {
  if (!dbAvailable) {
    const p = SAMPLE_PRODUCTS.find(s => s.product_id === product_id) as any;
    if (p) p.stock = Math.max(0, p.stock - amount);
    return;
  }
  await runAsync(`UPDATE products SET stock = stock - ? WHERE product_id = ?;`, [amount, product_id]);
}

export async function increaseStock(product_id: string, amount: number): Promise<void> {
  if (!dbAvailable) {
    const p = SAMPLE_PRODUCTS.find(s => s.product_id === product_id) as any;
    if (p) p.stock += amount;
    return;
  }
  await runAsync(`UPDATE products SET stock = stock + ? WHERE product_id = ?;`, [amount, product_id]);
}
