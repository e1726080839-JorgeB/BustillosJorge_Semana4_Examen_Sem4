import * as SQLite from 'expo-sqlite';
import type { SQLiteDatabase } from 'expo-sqlite';
import type { NewGadget } from '../types/Gadget';

class Database {
  private static db: SQLiteDatabase | null = null;

  static async getConnection(): Promise<SQLiteDatabase> {
    if (Database.db === null) {
      Database.db = await SQLite.openDatabaseAsync('gadget_inventory.db');
    }

    return Database.db;
  }

  static async init(): Promise<void> {
    const db = await Database.getConnection();

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS gadgets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        brand TEXT NOT NULL,
        category TEXT NOT NULL,
        price REAL NOT NULL CHECK(price > 0),
        purchaseYear INTEGER NOT NULL CHECK(purchaseYear BETWEEN 2000 AND 2026)
      );
    `);

    const row = await db.getFirstAsync<{ total: number }>('SELECT COUNT(*) as total FROM gadgets');
    const total = row?.total ?? 0;

    if (total === 0) {
      const samples: NewGadget[] = [
        { name: 'MacBook Pro 14', brand: 'Apple', category: 'Laptop', price: 1999.99, purchaseYear: 2024 },
        { name: 'iPhone 15 Pro', brand: 'Apple', category: 'Phone', price: 1099.99, purchaseYear: 2023 },
        { name: 'iPad Air', brand: 'Apple', category: 'Tablet', price: 599.99, purchaseYear: 2024 },
      ];

      for (const item of samples) {
        await db.runAsync(
          'INSERT INTO gadgets (name, brand, category, price, purchaseYear) VALUES (?, ?, ?, ?, ?)',
          [item.name, item.brand, item.category, item.price, item.purchaseYear]
        );
      }
    }
  }
}

export default Database;
