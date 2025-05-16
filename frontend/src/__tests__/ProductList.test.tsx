import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../store/productSlice';
import { ProductList } from '../components/ProductList';
import { Product, ProductCategory } from '../types/Product';

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Test Product 1',
    price: 29.99,
    category: 'Eletrônicos' as ProductCategory,
    description: 'Test description 1',
    imagem_url: '/images/test-product-1.jpg',
  },
  {
    id: 2,
    name: 'Test Product 2',
    price: 39.99,
    category: 'Roupas' as ProductCategory,
    description: 'Test description 2',
    imagem_url: '/images/test-product-2.jpg',
  },
];

const store = configureStore({
  reducer: {
    products: productReducer,
  },
  preloadedState: {
    products: {
      products: mockProducts,
      filters: {
        name: '',
        minPrice: null,
        maxPrice: null,
        sortBy: 'name' as const,
        sortOrder: 'asc' as const,
      },
      pagination: {
        currentPage: 1,
        itemsPerPage: 3,
        totalItems: mockProducts.length,
      },
    },
  },
});

describe('ProductList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockProducts,
    });
  });

  it('should match snapshot', async () => {
    const { container } = render(
      <Provider store={store}>
        <ProductList />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getAllByTestId('product-card')).toHaveLength(mockProducts.length);
    });

    expect(container).toMatchSnapshot();
  });
}); 