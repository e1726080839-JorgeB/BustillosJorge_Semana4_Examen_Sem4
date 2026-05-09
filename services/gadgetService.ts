import Database from '../database/database';
import type { Gadget, NewGadget } from '../types/Gadget';

class GadgetService {
  static async createGadget(gadget: NewGadget): Promise<void> {
    try {
      const db = await Database.getConnection();
      await db.runAsync(
        'INSERT INTO gadgets (name, brand, category, price, purchaseYear) VALUES (?, ?, ?, ?, ?)',
        [gadget.name, gadget.brand, gadget.category, gadget.price, gadget.purchaseYear]
      );
    } catch {
      throw new Error('No se pudo crear el gadget');
    } finally {
      await Promise.resolve();
    }
  }

  static async getAllGadgets(): Promise<Gadget[]> {
    try {
      const db = await Database.getConnection();
      return await db.getAllAsync<Gadget>('SELECT * FROM gadgets ORDER BY id DESC');
    } catch {
      throw new Error('No se pudo cargar el inventario');
    } finally {
      await Promise.resolve();
    }
  }

  static async getGadgetById(id: number): Promise<Gadget | null> {
    try {
      const db = await Database.getConnection();
      return await db.getFirstAsync<Gadget>('SELECT * FROM gadgets WHERE id = ?', [id]);
    } catch {
      throw new Error('No se pudo cargar el gadget');
    } finally {
      await Promise.resolve();
    }
  }

  static async updateGadget(id: number, gadget: NewGadget): Promise<void> {
    try {
      const db = await Database.getConnection();
      await db.runAsync(
        'UPDATE gadgets SET name = ?, brand = ?, category = ?, price = ?, purchaseYear = ? WHERE id = ?',
        [gadget.name, gadget.brand, gadget.category, gadget.price, gadget.purchaseYear, id]
      );
    } catch {
      throw new Error('No se pudo actualizar el gadget');
    } finally {
      await Promise.resolve();
    }
  }

  static async deleteGadget(id: number): Promise<void> {
    try {
      const db = await Database.getConnection();
      await db.runAsync('DELETE FROM gadgets WHERE id = ?', [id]);
    } catch {
      throw new Error('No se pudo eliminar el gadget');
    } finally {
      await Promise.resolve();
    }
  }
}

export default GadgetService;
