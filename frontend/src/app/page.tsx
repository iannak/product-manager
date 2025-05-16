'use client';

import { ProductList } from '@/components/ProductList';
import { ProductForm } from '@/components/ProductForm';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Gerenciamento de Produtos
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Adicionar Produto</h2>
          <ProductForm />
        </div>
        
        <div className="lg:col-span-3">
          <h2 className="text-xl font-semibold mb-4">Lista de Produtos</h2>
          <ProductList />
        </div>
      </div>
    </main>
  );
}