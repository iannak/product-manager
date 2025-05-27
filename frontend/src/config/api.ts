export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://product-manager-little-wave-7617.fly.dev';

export const api = {
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
}; 