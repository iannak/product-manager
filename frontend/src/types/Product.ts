export type ProductCategory = 
  | 'Eletrônicos'
  | 'Roupas'
  | 'Calçados'
  | 'Acessórios'
  | 'Livros'
  | 'Games'
  | 'Casa e Decoração'
  | 'Esportes'
  | 'Beleza e Cuidados Pessoais'
  | 'Alimentos e Bebidas';

export interface Product {
  id: number;
  nome: string;
  categoria: string;
  descricao: string;
  preco: number;
  quantidade_estoque: number;
  imagem_url: string;
}

export interface ProductFilters {
  name: string;
  minPrice: number | null;
  maxPrice: number | null;
  sortBy: 'name' | 'price';
  sortOrder: 'asc' | 'desc';
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  'Eletrônicos',
  'Roupas',
  'Calçados',
  'Acessórios',
  'Livros',
  'Games',
  'Casa e Decoração',
  'Esportes',
  'Beleza e Cuidados Pessoais',
  'Alimentos e Bebidas'
];