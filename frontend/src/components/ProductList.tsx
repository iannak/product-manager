import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { setProducts, setFilters, setCurrentPage } from '@/store/productSlice';
import { ProductCard } from './ProductCard';
import { ProductFilters, Product } from '@/types/Product';
import { ProductForm } from './ProductForm';
import { Pagination } from './Pagination';
import { fetchProducts } from '@/services/api';

export const ProductList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, filters, pagination } = useSelector((state: RootState) => state.products);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProducts();
        dispatch(setProducts(data));
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [dispatch]);

  const handleFilterChange = (filterUpdates: Partial<ProductFilters>) => {
    dispatch(setFilters(filterUpdates));
  };

  const handleEdit = (product: Product) => {
    setProductToEdit(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setProductToEdit(null);
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const nameMatch = product.nome.toLowerCase().includes(filters.name.toLowerCase());
      const priceMatch = (!filters.minPrice || product.preco >= filters.minPrice) &&
        (!filters.maxPrice || product.preco <= filters.maxPrice);
      return nameMatch && priceMatch;
    });
  }, [products, filters]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      const multiplier = filters.sortOrder === 'asc' ? 1 : -1;
      if (filters.sortBy === 'name') {
        return multiplier * a.nome.localeCompare(b.nome);
      }
      return multiplier * (a.preco - b.preco);
    });
  }, [filteredProducts, filters.sortBy, filters.sortOrder]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const endIndex = startIndex + pagination.itemsPerPage;
    return sortedProducts.slice(startIndex, endIndex);
  }, [sortedProducts, pagination.currentPage, pagination.itemsPerPage]);

  const totalPages = Math.ceil(sortedProducts.length / pagination.itemsPerPage);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {productToEdit && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
          <ProductForm
            productToEdit={productToEdit}
            onCancel={handleCancelEdit}
          />
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="nameFilter" className="block text-sm font-medium text-gray-700">
              Search by name
            </label>
            <input
              type="text"
              id="nameFilter"
              value={filters.name}
              onChange={(e) => handleFilterChange({ name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700">
              Minimum price ($)
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                id="minPrice"
                value={filters.minPrice || ''}
                onChange={(e) => handleFilterChange({ minPrice: e.target.value ? parseFloat(e.target.value) : null })}
                className="pl-12 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div>
            <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">
              Maximum price ($)
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                id="maxPrice"
                value={filters.maxPrice || ''}
                onChange={(e) => handleFilterChange({ maxPrice: e.target.value ? parseFloat(e.target.value) : null })}
                className="pl-12 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                min="0"
                step="0.01"
              />
            </div>
          </div>
        </div>

        <div className="flex space-x-4">
          <div>
            <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700">
              Sort by
            </label>
            <select
              id="sortBy"
              value={filters.sortBy}
              onChange={(e) => handleFilterChange({ sortBy: e.target.value as 'name' | 'price' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="name">Name</option>
              <option value="price">Price</option>
            </select>
          </div>

          <div>
            <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700">
              Order
            </label>
            <select
              id="sortOrder"
              value={filters.sortOrder}
              onChange={(e) => handleFilterChange({ sortOrder: e.target.value as 'asc' | 'desc' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={handleEdit}
          />
        ))}
      </div>

      <Pagination
        currentPage={pagination.currentPage}
        totalPages={totalPages}
        totalItems={sortedProducts.length}
        itemsPerPage={pagination.itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}; 