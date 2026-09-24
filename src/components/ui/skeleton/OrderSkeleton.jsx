const OrderDetailsSkeleton = () => {
  return (
    <div className="min-h-screen w-full bg-[#FAFAF8] px-4 py-15 dark:bg-noir-900 md:px-8 lg:px-12 animate-pulse">
      <div className="mx-auto flex w-full max-w-6xl flex-col">
        
        {/* Header Skeleton */}
        <div className="mb-12 flex flex-wrap items-center justify-between gap-4 border-b border-[#EAE1DB] pb-5 dark:border-line">
          <div className="flex items-center gap-6">
            {/* Back Button */}
            <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-noir-700"></div>
            {/* Order Number */}
            <div className="h-4 w-32 rounded bg-gray-200 dark:bg-noir-700"></div>
          </div>

          <div className="flex items-center gap-3">
            {/* Status Badge */}
            <div className="h-8 w-20 rounded-full bg-gray-200 dark:bg-noir-700"></div>
            {/* Cancel Button */}
            <div className="h-10 w-32 rounded-xl bg-gray-200 dark:bg-noir-700"></div>
          </div>
        </div>

        {/* Grid Layout (Matches lg:grid-cols-12) */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          
          {/* Progress Section (lg:col-span-5) */}
          <div className="lg:col-span-5">
            <div className="h-full min-h-[450px] w-full rounded-2xl border border-[#EAE1DB] bg-white p-6 dark:border-line dark:bg-noir-800">
              <div className="mb-8 flex justify-between">
                <div className="h-4 w-1/3 rounded bg-gray-200 dark:bg-noir-700"></div>
                <div className="h-5 w-1/4 rounded-full bg-gray-200 dark:bg-noir-700"></div>
              </div>
              
              <div className="mt-6 space-y-10">
                {[1, 2, 3, 4, 5].map((step) => (
                  <div key={step} className="flex items-center gap-4">
                    <div className="h-8 w-8 shrink-0 rounded-full bg-gray-300 dark:bg-noir-650"></div>
                    <div className="h-4 w-24 rounded bg-gray-200 dark:bg-noir-700"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Details Section (lg:col-span-7) */}
          <div className="flex flex-col gap-4 lg:col-span-7">
            
            {/* Items Card */}
            <div className="rounded-2xl border border-[#EAE1DB] bg-white p-6 dark:border-line dark:bg-noir-800">
              <div className="mb-6 flex justify-between">
                <div className="h-4 w-1/4 rounded bg-gray-200 dark:bg-noir-700"></div>
                <div className="h-6 w-20 rounded-full bg-gray-200 dark:bg-noir-700"></div>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center justify-between rounded-xl border border-gray-100 p-4 dark:border-line-subtle">
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 shrink-0 rounded-lg bg-gray-200 dark:bg-noir-700"></div>
                      <div className="space-y-2">
                         <div className="h-4 w-32 rounded bg-gray-200 dark:bg-noir-700"></div>
                         <div className="h-3 w-20 rounded bg-gray-100 dark:bg-noir-750"></div>
                      </div>
                    </div>
                    <div className="h-5 w-16 rounded bg-gray-200 dark:bg-noir-700"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Card */}
            <div className="rounded-2xl border border-[#EAE1DB] bg-white p-6 dark:border-line dark:bg-noir-800">
              <div className="mb-6 h-4 w-1/4 rounded bg-gray-200 dark:bg-noir-700"></div>
              <div className="flex justify-between items-start">
                <div className="space-y-3">
                  <div className="h-5 w-32 rounded bg-gray-200 dark:bg-noir-700"></div>
                  <div className="h-3 w-48 rounded bg-gray-100 dark:bg-noir-750"></div>
                </div>
                <div className="h-6 w-28 rounded-full bg-gray-200 dark:bg-noir-700"></div>
              </div>
            </div>

            {/* Payment Card */}
            <div className="rounded-2xl border border-[#EAE1DB] bg-white p-6 dark:border-line dark:bg-noir-800">
               <div className="mb-6 flex justify-between">
                <div className="h-4 w-1/4 rounded bg-gray-200 dark:bg-noir-700"></div>
                <div className="h-6 w-16 rounded bg-gray-200 dark:bg-noir-700"></div>
              </div>
              <div className="mb-6 space-y-4">
                <div className="flex justify-between">
                  <div className="h-3 w-16 rounded bg-gray-200 dark:bg-noir-700"></div>
                  <div className="h-3 w-20 rounded bg-gray-200 dark:bg-noir-700"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-3 w-16 rounded bg-gray-200 dark:bg-noir-700"></div>
                  <div className="h-3 w-20 rounded bg-gray-200 dark:bg-noir-700"></div>
                </div>
              </div>
              <div className="flex items-end justify-between border-t border-[#EAE1DB] pt-4 dark:border-line">
                <div className="space-y-2">
                  <div className="h-4 w-12 rounded bg-gray-200 dark:bg-noir-700"></div>
                  <div className="h-3 w-32 rounded bg-gray-100 dark:bg-noir-750"></div>
                </div>
                <div className="h-8 w-32 rounded bg-gray-300 dark:bg-noir-650"></div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsSkeleton;