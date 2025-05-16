import { Product } from '@/types/Product';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '@/store/productSlice';
import { api } from '@/config/api';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
}

export const ProductCard = ({ product, onEdit }: ProductCardProps) => {
  const dispatch = useDispatch();

  const formatPrice = (price: number) => {
    return `R$ ${price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm('Tem certeza que deseja excluir este produto?');
    if (!isConfirmed) return;

    try {
      const response = await fetch(`${api.baseURL}/products/${product.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        dispatch(deleteProduct(product.id));
        alert('Produto excluído com sucesso');
      } else {
        alert('Erro ao excluir o produto. Tente novamente.');
      }
    } catch {
      alert('Erro de rede. Não foi possível excluir o produto.');
    }
  };

  const imagem_url = product.imagem_url ? product.imagem_url: '';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden" data-testid="product-card">
      <div className="relative h-48">
        <Image
          src={imagem_url}
          alt={product.nome}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.nome}</h3>
        <p className="text-gray-600">{product.categoria}</p>
        <p className="text-sm text-gray-500 mt-2">{product.descricao}</p>
        <p className="text-xl font-bold text-blue-600 mt-2">{formatPrice(Number(product.preco))}</p>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={() => onEdit(product)}
            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Editar
          </button>
          <button
            onClick={handleDelete}
            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};
