import { MapPin, CreditCard, FileText } from 'lucide-react';

export default function CheckoutForm({ register, errors, handleSubmit, onSubmit }) {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Shipping Address Card */}
      <div className="bg-white dark:bg-noir-800 p-6 rounded-2xl shadow-sm dark:shadow-none border border-[#f0eae1] dark:border-line space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#f5efe6] text-xl font-serif text-[#2D241E] dark:border-line-subtle dark:text-fg">
          <MapPin className="w-5 h-5" />
          <h2>Shipping Address</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs[12px] font-semibold text-[#574940] dark:text-fg-secondary mb-1">
              Full Name *
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              {...register('fullName', { required: 'Full name is required' })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#faf8f5] border border-[#e8dfd5] text-[#2d2421] placeholder-[#a39489] dark:bg-noir-750 dark:border-line-control dark:text-fg dark:placeholder-fg-placeholder dark:hover:border-line-hover
               text-xs[12px] focus:outline-none focus:border-[#c07a50] focus:ring-1 focus:ring-[#c07a50] dark:focus:border-copper-400 dark:focus:ring-copper-400/25 transition-colors"
            />
            {errors.fullName && (
              <p className="text-red-500 dark:text-state-danger text-[11px] mt-1">{errors.fullName.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs[12px] font-semibold text-[#574940] dark:text-fg-secondary mb-1">
              Phone *
            </label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              {...register('phone', { required: 'Phone number is required' })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#faf8f5] border border-[#e8dfd5] text-[#2d2421] placeholder-[#a39489] dark:bg-noir-750 dark:border-line-control dark:text-fg dark:placeholder-fg-placeholder dark:hover:border-line-hover
               text-xs[12px] focus:outline-none focus:border-[#c07a50] focus:ring-1 focus:ring-[#c07a50] dark:focus:border-copper-400 dark:focus:ring-copper-400/25 transition-colors"
            />
            {errors.phone && (
              <p className="text-red-500 dark:text-state-danger text-[11px] mt-1">{errors.phone.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Country */}
          <div>
            <label className="block text-xs[12px] font-semibold text-[#574940] dark:text-fg-secondary mb-1">
              Country *
            </label>
            <input
              type="text"
              defaultValue="Egypt"
              {...register('country', { required: 'Country is required' })}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#e8dfd5] text-[#2d2421] dark:bg-noir-750 dark:border-line-control dark:text-fg dark:hover:border-line-hover text-xs[12px] focus:outline-none focus:border-[#c07a50] dark:focus:border-copper-400
               focus:ring-1 focus:ring-[#c07a50] dark:focus:ring-copper-400/25 transition-colors"
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-xs[12px] font-semibold text-[#574940] dark:text-fg-secondary mb-1">
              City *
            </label>
            <input
              type="text"
              placeholder="Enter city"
              {...register('city', { required: 'City is required' })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#faf8f5] border border-[#e8dfd5] text-[#2d2421] placeholder-[#a39489] dark:bg-noir-750 dark:border-line-control dark:text-fg dark:placeholder-fg-placeholder dark:hover:border-line-hover
               text-xs[12px] focus:outline-none focus:border-[#c07a50] focus:ring-1 focus:ring-[#c07a50] dark:focus:border-copper-400 dark:focus:ring-copper-400/25 transition-colors"
            />
            {errors.city && (
              <p className="text-red-500 dark:text-state-danger text-[11px] mt-1">{errors.city.message}</p>
            )}
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-xs[12px] font-semibold text-[#574940] dark:text-fg-secondary mb-1">
            Address *
          </label>
          <input
            type="text"
            placeholder="Street address, apartment, suite, etc."
            {...register('address', { required: 'Address is required' })}
            className="w-full px-4 py-2.5 rounded-xl bg-[#faf8f5] border border-[#e8dfd5] text-[#2d2421] placeholder-[#a39489] dark:bg-noir-750 dark:border-line-control dark:text-fg dark:placeholder-fg-placeholder dark:hover:border-line-hover
             text-xs[12px] focus:outline-none focus:border-[#c07a50] focus:ring-1 focus:ring-[#c07a50] dark:focus:border-copper-400 dark:focus:ring-copper-400/25 transition-colors"
          />
          {errors.address && (
            <p className="text-red-500 dark:text-state-danger text-[11px] mt-1">{errors.address.message}</p>
          )}
        </div>

        {/* Postal Code */}
        <div>
          <label className="block text-xs[12px] font-semibold text-[#574940] dark:text-fg-secondary mb-1">
            Postal Code
          </label>
          <input
            type="text"
            placeholder="Enter postal code"
            {...register('postalCode')}
            className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#e8dfd5] text-[#2d2421] placeholder-[#a39489] dark:bg-noir-750 dark:border-line-control dark:text-fg dark:placeholder-fg-placeholder dark:hover:border-line-hover text-xs[12px]
             focus:outline-none focus:border-[#c07a50] focus:ring-1 focus:ring-[#c07a50] dark:focus:border-copper-400 dark:focus:ring-copper-400/25 transition-colors"
          />
        </div>
      </div>

      {/* Payment Method Card */}
      <div className="bg-white dark:bg-noir-800 p-6 rounded-2xl shadow-sm dark:shadow-none border border-[#f0eae1] dark:border-line space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#f5efe6] text-xl font-serif text-[#2D241E] dark:border-line-subtle dark:text-fg">
          <CreditCard className="w-5 h-5" />
          <h2>Payment Method</h2>
        </div>

        <div className="p-4 rounded-xl bg-[#faf8f5] dark:bg-copper-900/40 border-2 border-[#c07a50] dark:border-copper-600 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-white dark:bg-noir-800 border border-[#e8dfd5] dark:border-line flex items-center justify-center text-[#c07a50] dark:text-copper-400">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm[14px] text-[#2d2421] dark:text-fg">Cash on Delivery</h3>
            <p className="text-xs[12px] text-[#8c7b70] dark:text-fg-tertiary">Pay when you receive your order</p>
          </div>
        </div>
      </div>

      {/* Order Notes Card */}
      <div className="bg-white dark:bg-noir-800 p-6 rounded-2xl shadow-sm dark:shadow-none border border-[#f0eae1] dark:border-line space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-[#f5efe6] text-xl font-serif text-[#2D241E] dark:border-line-subtle dark:text-fg">
          <FileText className="w-5 h-5" />
          <h2>Order Notes (Optional)</h2>
        </div>

        <textarea
          rows={3}
          placeholder="Any special instructions for your order..."
          {...register('notes')}
          className="w-full px-4 py-2.5 rounded-xl bg-[#faf8f5] border border-[#e8dfd5] text-[#2d2421] placeholder-[#a39489] dark:bg-noir-750 dark:border-line-control dark:text-fg dark:placeholder-fg-placeholder dark:hover:border-line-hover
           text-xs[12px] focus:outline-none focus:border-[#c07a50] focus:ring-1 focus:ring-[#c07a50] dark:focus:border-copper-400 dark:focus:ring-copper-400/25 transition-colors resize-none"
        />
      </div>
    </form>
  );
}