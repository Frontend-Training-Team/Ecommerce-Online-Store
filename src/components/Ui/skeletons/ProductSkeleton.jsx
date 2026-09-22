export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm animate-pulse flex flex-col justify-between h-[380px]">
          <div>
            <div className="flex justify-between items-center mb-3">
              <div className="h-5 w-20 bg-gray-200 rounded-full"></div>
              <div className="h-5 w-12 bg-gray-200 rounded-full"></div>
            </div>
            <div className="w-full h-40 bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
            <div className="h-3 bg-gray-200 rounded w-1/4 mb-4"></div>
          </div>
          <div>
            <div className="h-5 bg-gray-200 rounded w-1/3 mb-3"></div>
            <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
}


export function ShopPageSkeleton() {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 animate-pulse flex flex-col justify-between h-[380px]">
      <div>
        {/* Image Skeleton */}
        <div className="w-full h-40 bg-gray-200 rounded-lg mb-4 dark:bg-[#181B22]"></div>
        {/* Content Body Placeholder */}
        <div className="flex flex-1 flex-col justify-between p-6 space-y-4">
          {/* Title Skeleton */}
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 dark:bg-[#22262F]"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-3 dark:bg-[#22262F]"></div>
        </div>

        <div>
          {/* Price Skeleton */}
          <div className="h-5 bg-gray-200 rounded w-1/3 mb-3 dark:bg-[#22262F] "></div>
          {/* Button Skeleton */}
          <div className="h-10 bg-gray-200 rounded-lg w-full dark:bg-[#181B22] "></div>
        </div>
      </div>
    </div>
  );
}
