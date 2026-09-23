const CartSkeleton = () => {
    return (
        <div className="flex flex-col min-h-screen w-full bg-[#FAFAF8] px-4 py-10 dark:bg-[#141110] md:px-8 lg:px-12 animate-pulse">
            <div className="mx-auto flex w-full max-w-6xl flex-col">

                {/* Header Skeleton */}
                <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#EAE1DB] pb-5 dark:border-[#2e2724]">
                    <div className="flex items-center gap-3.5">
                        {/* Back Button */}
                        <div className="h-10 w-10 shrink-0 rounded-full bg-gray-200 dark:bg-[#221d1a]"></div>
                        <div className="flex items-center gap-3">
                            {/* Title */}
                            <div className="h-8 w-40 rounded-lg bg-gray-200 dark:bg-[#221d1a]"></div>
                            {/* Items Badge */}
                            <div className="h-5 w-16 rounded-full bg-gray-200 dark:bg-[#221d1a]"></div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">

                    {/* Left Column - Cart Items (lg:col-span-8) */}
                    <div className="flex flex-col gap-4 lg:col-span-8">
                        {/* Sub-header (Reviewing items & Empty cart button) */}
                        <div className="flex items-center justify-between gap-4 px-1">
                            <div className="h-6 w-48 rounded bg-gray-200 dark:bg-[#221d1a]"></div>
                            <div className="h-8 w-28 shrink-0 rounded-lg bg-gray-200 dark:bg-[#221d1a]"></div>
                        </div>

                        {/* Cart Items List Container */}
                        <div className="rounded-2xl border border-[#E8DDD4] bg-[#FAF7F3] shadow-sm dark:border-[#2e2724] dark:bg-[#1c1816]">
                            <div className="flex flex-col divide-y divide-[#EAE1DB] p-4 dark:divide-[#2e2724]">
                                {[1, 2].map((item) => (
                                    <div key={item} className="flex items-center justify-between py-5 first:pt-2 last:pb-2 gap-4">
                                        {/* Item Image & Details */}
                                        <div className="flex items-center gap-4">
                                            <div className="h-20 w-20 shrink-0 rounded-xl bg-gray-200 dark:bg-[#2b2522]"></div>
                                            <div className="space-y-3">
                                                <div className="h-4 w-32 sm:w-48 rounded bg-gray-200 dark:bg-[#2b2522]"></div>
                                                <div className="h-3 w-20 rounded bg-gray-100 dark:bg-[#221d1a]"></div>
                                            </div>
                                        </div>

                                        {/* Quantity & Price */}
                                        <div className="flex items-center gap-4 sm:gap-6">
                                            {/* Quantity Control Pill */}
                                            <div className="hidden sm:block h-10 w-24 rounded-lg bg-gray-200 dark:bg-[#2b2522]"></div>
                                            {/* Price & Delete */}
                                            <div className="flex flex-col items-end space-y-3">
                                                <div className="h-4 w-20 rounded bg-gray-200 dark:bg-[#2b2522]"></div>
                                                <div className="h-4 w-4 rounded bg-gray-100 dark:bg-[#221d1a]"></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Order Summary (lg:col-span-4) */}
                    <div className="flex flex-col gap-4 lg:col-span-4">

                        {/* Summary Card */}
                        <div className="rounded-2xl border border-[#E8DDD4] bg-[#FAF7F3] p-6 shadow-sm dark:border-[#2e2724] dark:bg-[#1c1816]">
                            <div className="mb-6 h-6 w-32 rounded bg-gray-200 dark:bg-[#2b2522]"></div>

                            {/* Calculation Rows */}
                            <div className="mb-6 space-y-4">
                                <div className="flex justify-between">
                                    <div className="h-4 w-16 rounded bg-gray-200 dark:bg-[#2b2522]"></div>
                                    <div className="h-4 w-20 rounded bg-gray-200 dark:bg-[#2b2522]"></div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="h-4 w-16 rounded bg-gray-200 dark:bg-[#2b2522]"></div>
                                    <div className="h-4 w-12 rounded bg-gray-200 dark:bg-[#2b2522]"></div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="h-4 w-20 rounded bg-gray-200 dark:bg-[#2b2522]"></div>
                                    <div className="h-4 w-24 rounded bg-gray-200 dark:bg-[#2b2522]"></div>
                                </div>
                            </div>

                            {/* Total Row */}
                            <div className="mb-6 flex items-center justify-between border-t border-[#EAE1DB] pt-4 dark:border-[#2e2724]">
                                <div className="h-5 w-12 rounded bg-gray-200 dark:bg-[#2b2522]"></div>
                                <div className="h-7 w-28 rounded bg-gray-300 dark:bg-[#3a322d]"></div>
                            </div>

                            {/* Checkout Button */}
                            <div className="h-12 w-full rounded-xl bg-gray-300 dark:bg-[#3a322d]"></div>
                        </div>

                        {/* Coupon Card */}
                        <div className="rounded-2xl border border-[#E8DDD4] bg-[#FAF7F3] p-6 shadow-sm dark:border-[#2e2724] dark:bg-[#1c1816]">
                            <div className="mb-4 h-4 w-28 rounded bg-gray-200 dark:bg-[#2b2522]"></div>
                            <div className="flex gap-3">
                                <div className="h-10 flex-1 rounded-lg bg-gray-200 dark:bg-[#2b2522]"></div>
                                <div className="h-10 w-20 rounded-lg bg-gray-200 dark:bg-[#2b2522]"></div>
                            </div>
                        </div>

                        {/* Continue Shopping Button */}
                        <div className="h-12 w-full rounded-xl border border-[#EAE1DB] bg-transparent dark:border-[#2e2724]"></div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartSkeleton;