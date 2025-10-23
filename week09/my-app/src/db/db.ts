// src/db/db.ts
import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native';

// Dùng hàm bất đồng bộ để mở database
// Try several possible export names from expo-sqlite to be robust across versions/environments
const openDbFn = (SQLite as any).openDatabase
  ?? (SQLite as any).openDatabaseSync
  ?? (SQLite as any).default?.openDatabase
  ?? (SQLite as any).default?.openDatabaseSync;

let db: any;
let dbAvailable = true;

// If running on web, do not attempt to open native SQLite
if (Platform?.OS === 'web') {
  console.info('Running on web platform: sqlite not available, using fallback');
  db = null;
  dbAvailable = false;
} else if (openDbFn) {
  try {
    db = openDbFn('shopping.db');
  } catch (err) {
    console.warn('Failed to open SQLite database using expo-sqlite openDatabase:', err);
    db = null;
    dbAvailable = false;
  }
} else {
  console.warn('expo-sqlite openDatabase not found; using stub DB that will return errors for SQL operations.');
  db = null;
  dbAvailable = false;
}

// If db is null (expo-sqlite not available), provide a stub that fails gracefully so imports don't crash
if (!db) {
  db = {
    transaction: (cb: any) => {
      const txStub = {
        executeSql: (_sql: string, _params: any[] = [], success?: any, error?: any) => {
          const err = new Error('expo-sqlite is not available in this environment. SQL operations are not supported.');
          if (typeof error === 'function') {
            // call error callback with signature similar to native
            error(null, err);
            return false;
          }
          throw err;
        }
      };
      try { cb(txStub); } catch (e) { console.error(e); }
    }
  };
}

// Hàm thực thi câu lệnh SQL (phiên bản async)
// Lưu ý: trả về Promise<any> để tránh tight coupling với expo-sqlite TS types
export async function execSqlAsync(sql: string, params: any[] = []): Promise<any> {
  return new Promise((resolve, reject) => {
    if (!dbAvailable) return reject(new Error('Database not available in this environment'));
    db.transaction((tx: any) => {
      tx.executeSql(
        sql,
        params,
        (_: any, resultSet: any) => resolve(resultSet), // Thành công
        (_: any, error: any) => { // Lỗi
          reject(error);
          return false; // Báo cho transaction biết là có lỗi và nên rollback (nếu có thể)
        }
      );
    });
  });
}

// Hàm lấy dòng đầu tiên (phiên bản async)
export async function getFirstAsync<T>(sql: string, params: any[] = []): Promise<T | null> {
  const resultSet: any = await execSqlAsync(sql, params);
  if (resultSet.rows.length > 0) {
    return resultSet.rows.item(0) as T;
  }
  return null;
}

// Hàm chạy câu lệnh (phiên bản async) - dùng cho INSERT, UPDATE, DELETE
export async function runAsync(sql: string, params: any[] = []): Promise<any> {
  // execSqlAsync đã bao gồm transaction nên có thể dùng luôn
  return execSqlAsync(sql, params);
}


// Hàm khởi tạo và seed dữ liệu mẫu (đã chuyển sang async)
export async function initDbAndSeed(): Promise<void> {
  if (!dbAvailable) {
    console.warn('initDbAndSeed: database not available, skipping init/seed');
    return;
  }
  // Tạo bảng (dùng execSqlAsync)
  await execSqlAsync(`
    CREATE TABLE IF NOT EXISTS products(
      product_id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      price REAL NOT NULL CHECK(price>=0),
      stock INTEGER NOT NULL CHECK(stock>=0)
    );
  `);

  await execSqlAsync(`
    CREATE TABLE IF NOT EXISTS cart_items(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id TEXT NOT NULL,
      qty INTEGER NOT NULL CHECK(qty>0),
      UNIQUE(product_id),
      FOREIGN KEY(product_id) REFERENCES products(product_id)
    );
  `);

  // Kiểm tra và seed dữ liệu mẫu (dùng getFirstAsync và runAsync)
  const result = await getFirstAsync<{ c: number }>('SELECT COUNT(*) as c FROM products;');
  const count = result?.c ?? 0;

  if (count === 0) {
    const samples = [
      ['p1', 'Bánh mì sữa', 12000, 10],
      ['p2', 'Bánh ngọt socola', 25000, 5],
      ['p3', 'Bánh trung thu', 80000, 2],
      ['p4', 'Bánh quy bơ', 15000, 20],
    ];

    // Dùng Promise.all để chạy song song các lệnh INSERT cho nhanh
    await Promise.all(
        samples.map(s => runAsync(
            `INSERT INTO products(product_id, name, price, stock) VALUES(?,?,?,?);`,
            s
        ))
    );
    console.log('Database seeded successfully!'); // Thêm log để biết seed thành công
  } else {
    console.log('Database already seeded.'); // Thêm log
  }
}

export default db; 

// Export dbAvailable so repos can switch to in-memory fallbacks when sqlite isn't present
export { dbAvailable };

// Sample products (same as seed) — exported so UI and fallback logic can use them when DB missing
export const SAMPLE_PRODUCTS = [
  { product_id: 'p1', name: 'Bánh mì sữa', price: 12000, stock: 10 },
  { product_id: 'p2', name: 'Bánh ngọt socola', price: 25000, stock: 5 },
  { product_id: 'p3', name: 'Bánh trung thu', price: 80000, stock: 2 },
  { product_id: 'p4', name: 'Bánh quy bơ', price: 15000, stock: 20 },
];