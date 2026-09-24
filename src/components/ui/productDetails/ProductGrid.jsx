import { ProductGridSkeleton } from '../skeleton/ProductSkeleton';
import ProductCard from './ProductCard';
import Pagination from './Pagination';
import { Search } from 'lucide-react';

export default function ProductGrid({
  products = [],
  isLoading = false,
  isLoadingMore = false,
  hasMore = false,
  onLoadMore,
  onAddToCart,
  onAddToCartSuccess,
  columns = "xl:grid-cols-2 2xl:grid-cols-3",
  currentPage = 1,
  totalPages = 0,
  onPageChange,
}) {
  if (isLoading && products.length === 0) {
    return <ProductGridSkeleton count={6} className={`grid-cols-1 ${columns} gap-4`} />;
  }

  if (!isLoading && products.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-16 px-4 bg-white/40 dark:bg-noir-800/40 
      backdrop-blur-md rounded-3xl border border-gray-200 dark:border-line text-center shadow-none">
        <div className="text-3xl mb-3 opacity-80"><Search className="w-5 h-5" /></div>
        <h3 className="text-lg font-bold text-gray-700 dark:text-fg-secondary mb-1">No products found</h3>
        <p className="text-sm text-gray-500 dark:text-fg-tertiary max-w-sm">
          Try adjusting your search or filter keywords.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8">
      <div className={`grid grid-cols-1 ${columns} gap-4 justify-items-center`}>
        {products.map((product, index) => (
          <ProductCard
            key={product._id || product.id || index}
            product={product}
            onAddToCart={onAddToCart ? () => onAddToCart(product) : onAddToCartSuccess}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 0 && onPageChange && (
        <div className="w-full pt-4 pb-2">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}

      {/* Fallback See More Button */}
      {!onPageChange && hasMore && (
        <div className="flex justify-center mt-10">
          <button
            type="button"
            onClick={onLoadMore}
            disabled={isLoadingMore}
            className="px-8 py-3 bg-gray-100 dark:bg-noir-750 text-copper-700 dark:text-copper-400 hover:bg-copper-700 hover:text-white dark:hover:bg-copper-500 dark:hover:text-fg-on-accent 
            rounded-xl font-medium text-sm transition shadow-sm active:scale-95 flex items-center gap-2.5
            disabled:opacity-70 disabled:cursor-not-allowed group min-w-35 justify-center border border-gray-200 dark:border-line cursor-pointer"
          >
            {isLoadingMore ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
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