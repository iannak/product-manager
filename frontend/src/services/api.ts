import { Product } from '@/types/Product';
import { Order, CreateOrderDto } from '@/types/Order';
import { api } from '@/config/api';

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${api.baseURL}/products`, {
    method: 'GET',
    headers: api.headers,
  });
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

export const fetchProduct = async (id: number): Promise<Product> => {
  const response = await fetch(`${api.baseURL}/products/${id}`, {
    method: 'GET',
    headers: api.headers,
  });
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  return response.json();
};

export const createProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  const response = await fetch(`${api.baseURL}/products`, {
    method: 'POST',
    headers: api.headers,
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error('Failed to create product');
  }
  return response.json();
};

export const updateProduct = async (id: number, product: Omit<Product, 'id'>): Promise<Product> => {
  const response = await fetch(`${api.baseURL}/products/${id}`, {
    method: 'PUT',
    headers: api.headers,
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error('Failed to update product');
  }
  return response.json();
};

export const deleteProduct = async (id: number): Promise<void> => {
  const response = await fetch(`${api.baseURL}/products/${id}`, {
    method: 'DELETE',
    headers: api.headers,
  });
  if (!response.ok) {
    throw new Error('Failed to delete product');
  }
};

export const fetchOrders = async (): Promise<Order[]> => {
  const response = await fetch(`${api.baseURL}/orders`, {
    method: 'GET',
    headers: api.headers,
  });
  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }
  return response.json();
};

export const fetchOrder = async (id: number): Promise<Order> => {
  const response = await fetch(`${api.baseURL}/orders/${id}`, {
    method: 'GET',
    headers: api.headers,
  });
  if (!response.ok) {
    throw new Error('Failed to fetch order');
  }
  return response.json();
};

export const createOrder = async (order: CreateOrderDto): Promise<Order> => {
  const response = await fetch(`${api.baseURL}/orders`, {
    method: 'POST',
    headers: api.headers,
    body: JSON.stringify(order),
  });
  if (!response.ok) {
    throw new Error('Failed to create order');
  }
  return response.json();
};

export const updateOrderStatus = async (id: number, status: Order['status']): Promise<Order> => {
  const response = await fetch(`${api.baseURL}/orders/${id}/status`, {
    method: 'PUT',
    headers: api.headers,
    body: JSON.stringify({ status }),
  });
  if (!response.ok) {
    throw new Error('Failed to update order status');
  }
  return response.json();
};

export const deleteOrder = async (id: number): Promise<void> => {
  const response = await fetch(`${api.baseURL}/orders/${id}`, {
    method: 'DELETE',
    headers: api.headers,
  });
  if (!response.ok) {
    throw new Error('Failed to delete order');
  }
};
