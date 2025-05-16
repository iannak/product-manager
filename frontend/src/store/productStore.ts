import { create } from 'zustand';
import { Product } from '@/types/Product';

interface ProductState {
  products: Product[];
  addProduct: (product: Product) => void;
  setProducts: (products: Product[]) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
  setProducts: (products) => set({ products })
}));