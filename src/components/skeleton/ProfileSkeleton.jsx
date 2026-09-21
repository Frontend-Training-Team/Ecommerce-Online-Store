export default function ProfileSkeleton() {
  return (
    <div className="w-full bg-white min-h-screen py-10 sm:py-12 animate-pulse">
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-7">

        <div className="flex flex-col gap-2.5">
          <div className="h-3.5 w-36 bg-[#EBE7E1] rounded"></div>
          <div className="h-9 w-60 bg-[#DED7CE] rounded-lg"></div>
          <div className="h-3.5 w-80 max-w-full bg-[#EBE7E1] rounded"></div>
        </div>

        <div className="flex flex-col md:flex-row gap-7 lg:gap-8 items-start">

          <aside className="w-full md:w-[280px] lg:w-[310px] flex-shrink-0 flex flex-col gap-5">

            <div className="bg-white border border-[#DDD7D1] rounded-2xl p-6 flex flex-col items-center 
            text-center shadow-md">
              <div className="w-24 h-24 rounded-full bg-[#EDE7E1] mb-3"></div>
              <div className="h-5 w-32 bg-[#DFD9D2] rounded mb-2"></div>
              <div className="h-3.5 w-44 bg-[#EBE7E1] rounded mb-3"></div>
              <div className="h-6 w-24 bg-[#EDE7E1] rounded-full mb-2"></div>
              <div className="h-3 w-28 bg-[#F0EBE5] rounded"></div>
            </div>

            <div className="bg-white border border-[#DDD7D1] rounded-2xl p-2.5 flex flex-col gap-1.5 shadow-md">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="w-full h-11 bg-[#F5F2EE] rounded-xl"></div>
              ))}
            </div>
          </aside>

          <div className="flex-1 w-full flex flex-col gap-6">

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-5 border border-[#DDD7D1] rounded-2xl bg-[#FAF8F6] flex flex-col gap-2.5 
                shadow-sm">
                  <div className="h-3 w-24 bg-[#E8E2DC] rounded"></div>
                  <div className="h-8 w-14 bg-[#DED7CE] rounded"></div>
                  <div className="h-3 w-32 bg-[#EDE8E2] rounded"></div>
                </div>
              ))}
            </div>

            <div className="bg-white border border-[#DDD7D1] rounded-2xl p-6 sm:p-7 flex flex-col gap-5 shadow-md">
              <div className="flex items-center justify-between border-b border-[#EDE8E3] pb-4">
                <div className="h-6 w-44 bg-[#DFD9D2] rounded"></div>
                <div className="h-9 w-20 bg-[#EBE7E1] rounded-lg"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <div className="h-3 w-20 bg-[#EBE7E1] rounded"></div>
                    <div className="h-5 w-40 bg-[#DFD9D2] rounded"></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-[#DDD7D1] rounded-2xl p-6 sm:p-7 flex flex-col gap-5 shadow-md">
              <div className="flex items-center justify-between border-b border-[#EDE8E3] pb-4">
                <div className="h-6 w-40 bg-[#DFD9D2] rounded"></div>
                <div className="h-9 w-32 bg-[#EBE7E1] rounded-lg"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {[1, 2].map((i) => (
                  <div key={i} className="p-4 rounded-xl border border-[#E3DEDA] bg-[#FAF8F6] flex flex-col gap-2">
                    <div className="h-4 w-28 bg-[#DFD9D2] rounded"></div>
                    <div className="h-3 w-44 bg-[#EBE7E1] rounded"></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[1, 2].map((i) => (
                <div key={i} className="bg-white border border-[#DDD7D1] rounded-2xl p-6 flex flex-col justify-between 
                gap-4 shadow-md min-h-[160px]">
                  <div className="flex flex-col gap-2">
                    <div className="h-5 w-28 bg-[#DFD9D2] rounded"></div>
                    <div className="h-3 w-48 bg-[#EBE7E1] rounded"></div>
                    <div className="h-3 w-36 bg-[#EBE7E1] rounded"></div>
                  </div>
                  <div className="h-9 w-32 bg-[#EAE5DF] rounded-lg"></div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}