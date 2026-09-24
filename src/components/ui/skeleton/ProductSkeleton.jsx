export function ProductCardSkeleton() {
  const customPath =
    'path("M 12 0 L 318 0 A 12 12 0 0 1 330 12 L 330 258 A 12 12 0 0 1 318 270 L 217 270 A 12 12 0 0 0 205 282 L 205 318 A 12 12 0 0 1 193 330 L 12 330 A 12 12 0 0 1 0 318 L 0 12 A 12 12 0 0 1 12 0 Z")';

  return (
    <div className="h-fit w-fit bg-white dark:bg-noir-800 border-2 border-gray-200 dark:border-line rounded-xl p-2.5 animate-pulse group">

      <div className="relative h-82.5 w-82.5">
        <div
          className="relative h-82.5 w-82.5 bg-gray-200 dark:bg-noir-700"
          style={{ clipPath: customPath }}
        />

        <div className="absolute top-4 left-4 h-7 w-24 bg-gray-300 dark:bg-noir-650 rounded-3xl shadow-xs z-10"></div>
        <div className="absolute top-4 right-4 flex items-center gap-1.5 z-10">
          <div className="h-7 w-12 bg-gray-300 dark:bg-noir-650 rounded-3xl shadow-xs"></div>
          <div className="h-7 w-20 bg-gray-300 dark:bg-noir-650 rounded-3xl shadow-xs"></div>
        </div>

        <div className="absolute bottom-2 left-2 w-12.5 h-12.5 bg-gray-300 dark:bg-noir-650 rounded-xl shadow-xs
        border-none dark:border-line z-10 flex flex-col items-center justify-center gap-1">
          <div className="rounded bg-gray-400 dark:bg-noir-600" />
        </div>

        <div className="absolute bottom-0 right-0 grid grid-cols-2 gap-2 z-10">
          <div className="h-13.5 w-13.5 bg-gray-300 dark:bg-noir-650 rounded-xl"></div>
          <div className="h-13.5 w-13.5 bg-gray-300 dark:bg-noir-650 rounded-xl"></div>
        </div>
      </div>

      <div className="text-center mt-5 mb-3 max-w-82.5 flex flex-col items-center">
        <div className="h-8 w-4/5 bg-gray-200 dark:bg-noir-700 rounded mb-2"></div>
        <div className="flex justify-center items-center mt-1">
          <div className="h-7 w-20 bg-gray-200 dark:bg-noir-700 rounded"></div>
          <div className="h-5 w-16 bg-gray-100 dark:bg-noir-750 rounded ml-2"></div>
        </div>
      </div>

    </div>
  );
}
export function ProductGridSkeleton({ count = 8, className = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" }) {
  return (
    <div className={`grid ${className} w-full justify-items-center`}>
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}