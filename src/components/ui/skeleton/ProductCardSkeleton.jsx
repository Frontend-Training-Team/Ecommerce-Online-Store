function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-line dark:bg-noir-800 dark:shadow-none dark:shadow-none">
      
      {/* Product Image */}
      <div className="h-56 w-full animate-pulse bg-gray-200 dark:bg-noir-700" />

      {/* Product Info */}
      <div className="space-y-3 p-4">
        
        {/* Product Name */}
        <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-noir-700" />

        {/* Category */}
        <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-noir-700" />

        {/* Price */}
        <div className="h-5 w-1/3 animate-pulse rounded bg-gray-200 dark:bg-noir-700" />

      </div>
    </div>
  );
}

export default ProductCardSkeleton;