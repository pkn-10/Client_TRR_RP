import { apiFetch } from './api';

export interface StockItem {
  id: number;
  code: string;
  name: string;
  quantity: number;
  category?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StockTransaction {
  id: number;
  stockItemId: number;
  type: 'IN' | 'OUT';
  quantity: number;
  previousQty: number;
  newQty: number;
  reference?: string;
  note?: string;
  userId?: number;
  createdAt: string;
  stockItem?: StockItem;
}

export interface BulkImportResponse {
  created: number;
  updated: number;
  total: number;
  errors: any[];
}

export const stockService = {
  async getStockItems(): Promise<StockItem[]> {
    return apiFetch('/stock');
  },

  async createStockItem(data: Partial<StockItem>): Promise<StockItem> {
    return apiFetch('/stock', 'POST', data);
  },

  async updateStockItem(id: number, data: Partial<StockItem>): Promise<StockItem> {
    return apiFetch(`/stock/${id}`, 'PUT', data);
  },

  async withdrawStockItem(id: number, data: { quantity: number; reference?: string; note?: string; userId?: number }): Promise<any> {
    return apiFetch(`/stock/${id}/withdraw`, 'POST', data);
  },

  async addStockItem(id: number, data: { quantity: number; reference?: string; note?: string; userId?: number }): Promise<any> {
    return apiFetch(`/stock/${id}/add`, 'POST', data);
  },

  async getTransactions(stockItemId?: number): Promise<StockTransaction[]> {
    const url = stockItemId ? `/stock/transactions?stockItemId=${stockItemId}` : '/stock/transactions';
    return apiFetch(url);
  },

  async deleteStockItem(id: number): Promise<void> {
    return apiFetch(`/stock/${id}`, 'DELETE');
  },

  async deleteCategory(name: string): Promise<any> {
    return apiFetch(`/stock/category/${encodeURIComponent(name)}`, 'DELETE');
  },

  async bulkImportStockItems(items: Partial<StockItem>[]): Promise<BulkImportResponse> {
    return apiFetch('/stock/bulk-import', 'POST', { items });
  },
};
