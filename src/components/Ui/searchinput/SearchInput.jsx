import React, { useState, useEffect } from 'react';
import { useDebounce } from '../../../hooks/useDebounce';
import { ProductGridSkeleton } from '../skeletons/ProductSkeleton';
import ProductFilterSidebar from '../searchinput/FilterSidebar'; 

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('default');

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 400);
  const debouncedMinPrice = useDebounce(minPrice, 400);
  const debouncedMaxPrice = useDebounce(maxPrice, 400);

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setMinPrice('');
    setMaxPrice('');
    setSortBy('default');
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const queryParams = new URLSearchParams({
          page: '1',
          limit: '10',
        });

        if (debouncedSearchTerm.trim()) {
          queryParams.append('keyword', debouncedSearchTerm.trim());
        }

        if (selectedCategory !== 'All') {
          queryParams.append('category', selectedCategory);
        }

        if (debouncedMinPrice) {
          queryParams.append('minPrice', debouncedMinPrice);
        }

        if (debouncedMaxPrice) {
          queryParams.append('maxPrice', debouncedMaxPrice);
        }

        if (sortBy !== 'default') {
          queryParams.append('sort', sortBy);
        }

        const response = await fetch(
          `https://e-commerce-api-3wara.vercel.app/products/search?${queryParams.toString()}`
        );

        const data = await response.json();
        let fetchedProducts = data.products || (Array.isArray(data) ? data : []);

        if (debouncedMinPrice) {
          fetchedProducts = fetchedProducts.filter(
            (p) => p.price >= Number(debouncedMinPrice)
          );
        }
        if (debouncedMaxPrice) {
          fetchedProducts = fetchedProducts.filter(
            (p) => p.price <= Number(debouncedMaxPrice)
          );
        }

        if (sortBy === 'lowToHigh') {
          fetchedProducts.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'highToLow') {
          fetchedProducts.sort((a, b) => b.price - a.price);
        }

        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [
    debouncedSearchTerm,
    selectedCategory,
    debouncedMinPrice,
    debouncedMaxPrice,
    sortBy,
  ]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* 1. Search Bar */}
      <div className="mb-6">
        <div className="relative w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            🔍
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm shadow-sm"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <ProductFilterSidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onClearFilters={handleClearFilters}
        />

        {/* Product List Section */}
        <div className="w-full md:w-3/4">
          {isLoading ? (
            <ProductGridSkeleton count={4} />
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {products.map((product) => {
                const imageUrl =
                  product.image ||
                  product.cover ||
                  (product.images && product.images[0]) ||
                  'https://via.placeholder.com/150';

                return (
                  <div
                    key={product._id || product.id}
                    className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <img
                        src={imageUrl}
                        alt={product.title || product.name}
                        className="w-full h-40 object-cover rounded-lg mb-3"
                      />
                      <h4 className="font-medium text-sm text-gray-800 line-clamp-2">
                        {product.title || product.name}
                      </h4>
                      <p className="text-indigo-600 font-bold mt-2">
                        EGP {product.price}
                      </p>
                    </div>
                    <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
                      Add to Cart
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl border border-gray-100 text-center">
              <p className="text-gray-500 text-lg font-medium">
                No products found
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}