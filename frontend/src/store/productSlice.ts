import { Product, ProductFilters } from '@/types/Product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface ProductState {
  products: Product[];
  filters: ProductFilters;
  pagination: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
  };
}

const initialState: ProductState = {
  products: [],
  filters: {
    name: '',
    minPrice: null,
    maxPrice: null,
    sortBy: 'name',
    sortOrder: 'asc',
  },
  pagination: {
    currentPage: 1,
    itemsPerPage: 3,
    totalItems: 0,
  },
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.pagination.totalItems = action.payload.length;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
      state.pagination.totalItems = state.products.length;
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(p => p.id !== action.payload);
      state.pagination.totalItems = state.products.length;
      // Ajusta a página atual se necessário
      const totalPages = Math.ceil(state.pagination.totalItems / state.pagination.itemsPerPage);
      if (state.pagination.currentPage > totalPages && totalPages > 0) {
        state.pagination.currentPage = totalPages;
      }
    },
    setFilters: (state, action: PayloadAction<Partial<ProductFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.currentPage = 1; // Reset para primeira página ao filtrar
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload;
    },
  },
});

export const {
  setProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  setFilters,
  setCurrentPage,
} = productSlice.actions;

export default productSlice.reducer; 