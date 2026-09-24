export default function ProductDetailsSkeleton() {
  return (
    <div className="mt-16 xl:mt-17 w-full bg-white dark:bg-noir-900 min-h-screen py-8 sm:py-12">
      <div className="w-full max-w-310 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-14">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 lg:gap-x-14 gap-y-4 items-stretch">

          <div className="order-1 lg:order-0 lg:col-start-1 lg:row-start-1 w-full h-full min-h-90 lg:min-h-0 relative">
            <div className="relative lg:absolute lg:inset-0 w-full aspect-square lg:aspect-auto bg-[#F2EFEA] dark:bg-noir-750 rounded-3xl border 
            border-[#EDE8E3] dark:border-line"></div>
          </div>

          <div className="order-2 lg:order-0 lg:col-start-1 lg:row-start-2 flex items-center justify-center gap-3 pt-1">
            <div className="w-8 h-8 rounded-full bg-[#F2EFEA] dark:bg-noir-750 border border-[#E3DDD5] dark:border-line"></div>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#F2EFEA] dark:bg-noir-750 border border-[#EDE8E3] dark:border-line"></div>
            ))}
            <div className="w-8 h-8 rounded-full bg-[#F2EFEA] dark:bg-noir-750 border border-[#E3DDD5] dark:border-line"></div>
          </div>

          <div className="order-3 lg:order-0 lg:col-start-2 lg:row-start-1 w-full flex flex-col gap-5">
            <div className="flex items-center gap-2.5">
              <div className="h-6 w-20 bg-[#E8E2DC] dark:bg-noir-700 rounded-full"></div>
              <div className="h-6 w-24 bg-[#E0D7CE] dark:bg-noir-650 rounded-full"></div>
            </div>

            <div className="h-9 w-4/5 bg-[#E8E2DC] dark:bg-noir-700 rounded-xl"></div>

            <div className="flex flex-col gap-2">
              <div className="h-4 w-full bg-[#F2EFEA] dark:bg-noir-750 rounded"></div>
              <div className="h-4 w-3/4 bg-[#F2EFEA] dark:bg-noir-750 rounded"></div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="h-6 w-20 bg-[#F2EFEA] dark:bg-noir-750 rounded-full"></div>
              <div className="h-6 w-24 bg-[#F2EFEA] dark:bg-noir-750 rounded-full"></div>
            </div>

            <div className="flex items-center gap-3.5 pt-1">
              <div className="h-9 w-28 bg-[#E8E2DC] dark:bg-noir-700 rounded-xl"></div>
              <div className="h-6 w-16 bg-[#F2EFEA] dark:bg-noir-750 rounded-full"></div>
            </div>

            <div className="flex items-center gap-3 pt-2 flex-wrap sm:flex-nowrap">
              <div className="h-14 w-36 sm:w-44 bg-[#F2EFEA] dark:bg-noir-750 rounded-full border border-[#EDE8E3] dark:border-line"></div>
              <div className="h-14 flex-1 min-w-45 bg-[#E8E2DC] dark:bg-noir-700 rounded-full"></div>
              <div className="h-14 w-14 rounded-full bg-[#F2EFEA] dark:bg-noir-750 border border-[#EDE8E3] dark:border-line shrink-0"></div>
            </div>

            <div className="border border-[#EDE8E3] dark:border-line rounded-2xl p-5 flex flex-col gap-4 mt-2 bg-white dark:bg-noir-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#F2EFEA] dark:bg-noir-750"></div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <div className="h-4 w-28 bg-[#E8E2DC] dark:bg-noir-700 rounded"></div>
                  <div className="h-3 w-48 bg-[#F2EFEA] dark:bg-noir-750 rounded"></div>
                </div>
              </div>
              <div className="h-px bg-[#EDE8E3] dark:bg-line-subtle"></div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#F2EFEA] dark:bg-noir-750"></div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <div className="h-4 w-28 bg-[#E8E2DC] dark:bg-noir-700 rounded"></div>
                  <div className="h-3 w-40 bg-[#F2EFEA] dark:bg-noir-750 rounded"></div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="flex flex-col md:flex-row gap-8 pt-8 border-t border-[#EDE8E3] dark:border-line">
          <div className="flex md:flex-col gap-2 w-full md:w-48">
            <div className="h-11 w-32 md:w-full bg-[#F2EFEA] dark:bg-noir-750 rounded-xl"></div>
            <div className="h-11 w-32 md:w-full bg-[#FAF8F5] dark:bg-noir-800 rounded-xl"></div>
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <div className="h-7 w-48 bg-[#E8E2DC] dark:bg-noir-700 rounded"></div>
            <div className="h-4 w-full bg-[#F2EFEA] dark:bg-noir-750 rounded"></div>
            <div className="h-4 w-5/6 bg-[#F2EFEA] dark:bg-noir-750 rounded"></div>
            <div className="h-4 w-2/3 bg-[#F2EFEA] dark:bg-noir-750 rounded"></div>
          </div>
        </div>

        <div className="flex flex-col gap-6 pt-6 border-t border-[#EDE8E3] dark:border-line">
          <div className="h-8 w-64 bg-[#E8E2DC] dark:bg-noir-700 rounded-lg"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col gap-3 p-3 rounded-2xl border border-[#EDE8E3] dark:border-line bg-white dark:bg-noir-800">
                <div className="w-full aspect-square bg-[#F2EFEA] dark:bg-noir-750 rounded-xl"></div>
                <div className="h-4 w-3/4 bg-[#E8E2DC] dark:bg-noir-700 rounded"></div>
                <div className="h-5 w-1/2 bg-[#F2EFEA] dark:bg-noir-750 rounded"></div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
