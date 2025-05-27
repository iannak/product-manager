export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://product-manager-backend.fly.dev';

export const api = {
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
}; 