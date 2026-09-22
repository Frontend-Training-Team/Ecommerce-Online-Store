export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="h-fit w-fit bg-white dark:bg-[#181412] border-2 border-gray-200 dark:border-[#2e2724] rounded-xl p-2.5 animate-pulse group">
          <div className="relative h-82.5 w-82.5 bg-gray-200 dark:bg-[#221d1a] rounded-lg">
            <div className="absolute top-4 left-4 h-7 w-24 bg-gray-300 dark:bg-[#3a322d] rounded-3xl shadow-xs z-10"></div>
            <div className="absolute top-4 right-4 flex items-center gap-1.5 z-10">
              <div className="h-7 w-12 bg-gray-300 dark:bg-[#3a322d] rounded-3xl shadow-xs"></div>
              <div className="h-7 w-20 bg-gray-300 dark:bg-[#3a322d] rounded-3xl shadow-xs"></div>
            </div>

            <div className="absolute bottom-2 left-2 w-12.5 h-12.5 bg-gray-300 dark:bg-[#3a322d] rounded-xl shadow-xs border border-gray-100/80 dark:border-[#2e2724] z-10"></div>

            <div className="absolute bottom-0 right-0 grid grid-cols-2 gap-2 z-10">
              <div className="h-13.5 w-13.5 bg-gray-300 dark:bg-[#3a322d] rounded-xl"></div>
              <div className="h-13.5 w-13.5 bg-gray-300 dark:bg-[#3a322d] rounded-xl"></div>
            </div>
          </div>

          <div className="text-center mt-5 mb-3 max-w-82.5 flex flex-col items-center">
            <div className="h-8 w-4/5 bg-gray-200 dark:bg-[#2b2522] rounded mb-2"></div>
            <div className="flex justify-center items-center mt-1">
              <div className="h-7 w-20 bg-gray-200 dark:bg-[#2b2522] rounded"></div>
              <div className="h-5 w-16 bg-gray-100 dark:bg-[#221d1a] rounded ml-2"></div>
            </div>
          </div>

        </div>
      ))}
    </div>
  );
}