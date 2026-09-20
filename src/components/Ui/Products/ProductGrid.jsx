import React from 'react';
import ProductCard from './ProductCard';
import { ProductGridSkeleton } from '../skeletons/ProductSkeleton';

export default function ProductGrid({
  products = [],
  isLoading = false,
  isLoadingMore = false,
  hasMore = false,
  onLoadMore,
  onAddToCart, 
  onAddToCartSuccess, 
}) {
  if (isLoading && products.length === 0) {
    return <ProductGridSkeleton count={8} />;
  }

  if (!isLoading && products.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-16 px-4 bg-white/20 backdrop-blur-md rounded-3xl border border-white/40 text-center shadow-none">
        <div className="text-3xl mb-3 opacity-80">🔍</div>
        <h3 className="text-lg font-bold text-gray-500 mb-1">No products found</h3>
        <p className="text-sm text-gray-500 max-w-sm">
          Try adjusting your search or filter keywords.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8">
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.map((product, index) => (
          <ProductCard
            key={product._id || product.id || index}
            product={product}
            onAddToCart={onAddToCart ? () => onAddToCart(product) : onAddToCartSuccess} 
          />
        ))}
      </div>

      {/* See More Button */}
      {hasMore && (
        <div className="flex justify-center mt-10">
          <button
            onClick={onLoadMore}
            disabled={isLoadingMore}
            className="px-8 py-3 bg-gray-100 !text-copper-800 hover:bg-indigo-600 hover:text-white 
            rounded-xl font-medium text-sm transition shadow-sm active:scale-95 flex items-center gap-2.5
             disabled:opacity-70 disabled:cursor-not-allowed group min-w-[140px] justify-center"
          >
            {isLoadingMore ? (
              <>
                <div className="w-4 h-4 border-2 border-t-transparent group-hover:border-white group-hover:border-t-transparent rounded-full animate-spin"></div>
                <span>Loading...</span>
              </>
            ) : (
              'Load More'
            )}
          </button>
        </div>
      )}
    </div>
  );
}