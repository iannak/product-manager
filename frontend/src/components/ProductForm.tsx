'use client';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct, updateProduct } from '@/store/productSlice';
import { AppDispatch } from '@/store/store';
import { Product, PRODUCT_CATEGORIES, ProductCategory } from '@/types/Product';
import { api } from '@/config/api';

interface ProductFormProps {
  productToEdit?: Product | null;
  onCancel?: () => void;
}

export const ProductForm = ({ productToEdit, onCancel }: ProductFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    name: '',
    category: PRODUCT_CATEGORIES[0],
    price: '',
    description: '',
    imagem_url: '',
  });

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.nome,
        category: productToEdit.categoria as ProductCategory,
        price: productToEdit.preco.toString(),
        description: productToEdit.descricao,
        imagem_url: productToEdit.imagem_url,
      });
    }
  }, [productToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const productData = {
      nome: formData.name,
      categoria: formData.category,
      preco: Number(Number(formData.price).toFixed(2)), // ⬅️ Corrigido aqui
      descricao: formData.description,
      quantidade_estoque: 0,
      imagem_url: formData.imagem_url,
    };
  
    if (productToEdit) {
      console.log("API URL:", api.baseURL);
  
      const response = await fetch(`${api.baseURL}/products/${productToEdit.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
  
      if (response.ok) {
        const updatedProduct = await response.json();
        dispatch(updateProduct(updatedProduct));
        if (onCancel) onCancel();
      } else {
        const error = await response.text();
        console.error("Erro ao atualizar produto:", error);
      }
    } else {
      console.log("Enviando dados para a API:", productData); // 👈 TESTE
  
      const response = await fetch(`${api.baseURL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
  
      console.log("Resposta da API:", response.status); // 👈 TESTE
  
      if (response.ok) {
        const newProduct = await response.json();
        console.log('Produto criado com sucesso:', newProduct); // 👈 TESTE
        dispatch(addProduct(newProduct));
        setFormData({
          name: '',
          category: PRODUCT_CATEGORIES[0],
          price: '',
          description: '',
          imagem_url: '',
        });
      } else {
        const error = await response.text();
        console.error("Erro na resposta:", error); // 👈 TESTE
      }
    }
  };
  

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nome do Produto
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Categoria
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {PRODUCT_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Preço (R$)
        </label>
        <div className="relative mt-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">R$</span>
          </div>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            step="0.001"
            min="0"
            className="pl-12 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Descrição
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="imagem_url" className="block text-sm font-medium text-gray-700">
          URL da Imagem
        </label>
        <input
          type="url"
          id="imagem_url"
          name="imagem_url"
          value={formData.imagem_url}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-end space-x-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {productToEdit ? 'Salvar Alterações' : 'Adicionar Produto'}
        </button>
      </div>
    </form>
  );
};
