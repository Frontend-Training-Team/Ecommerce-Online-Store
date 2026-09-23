export default function OrderSummary({ cartItems = [], subtotal = 0, shipping = 50, tax = 0, total = 0, isSubmitting = false, onPlaceOrder }) {
  return (
    <div className="rounded-2xl border border-[#E8DDD4] bg-white p-5 shadow-sm dark:border-[#2e2724] dark:bg-[#1c1816] dark:shadow-lg dark:shadow-black/20">
      <h2 className="border-b border-[#EBE1D7] pb-4 text-xl font-serif text-[#2D241E] dark:border-[#2e2724] dark:text-[#f3ede6]">
        Order Summary
      </h2>

      <div className="mt-4 space-y-4">
        {cartItems.length === 0 ? (
          <p className="text-xs text-[#a39489] italic">Your cart is empty.</p>
        ) : (
          cartItems.map((item, idx) => {
            const product = item.product || item;
            const productName = item.name || product.name || product.title || 'Product Name';
            const productImage = item.image || product.image || product.imageCover ||
              (Array.isArray(product.images) ? product.images[0]?.url || product.images[0] : '');

            return (
              <div key={item._id || idx} className="flex items-center justify-between gap-3 text-xs">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-[#E8DDD4] bg-[#FAF5F0] dark:border-[#3e352f] dark:bg-[#2a2420]">
                    {productImage ? (
                      <img src={productImage} alt={productName} className="h-full w-full object-cover" />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center text-[10px] text-[#a39489]">Item</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-medium text-[#2d2421] dark:text-[#f3ede6]">{productName}</p>
                    <p className="text-[11px] text-[#8c7b70] dark:text-[#a38f7d]">x{item.quantity || 1}</p>
                  </div>
                </div>
                <p className="shrink-0 font-semibold text-[#2d2421] dark:text-[#f3ede6]">EGP {(item.price || product.price || 0) * (item.quantity || 1)}</p>
              </div>
            );
          })
        )}
      </div>

      <div className="mt-5 border-t border-[#EBE1D7] pt-4 text-xs text-[#736358] dark:border-[#2e2724] dark:text-[#a38f7d]">
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span>Subtotal</span>
            <span className="font-medium text-[#2d2421] dark:text-[#f3ede6]">EGP {subtotal}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Shipping</span>
            <span className="rounded bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">EGP {shipping}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Tax (14%)</span>
            <span className="font-medium text-[#2d2421] dark:text-[#f3ede6]">EGP {tax}</span>
          </div>
        </div>

        <div className="my-4 border-t border-dashed border-[#EBE1D7] dark:border-[#2e2724]" />

        <div className="mb-5 flex items-baseline justify-between">
          <span className="text-sm font-semibold text-[#5C4A3E] dark:text-[#c5b6a3]">Total</span>
          <span className="bg-gradient-to-r from-[#8A4C1E] to-[#A76434] bg-clip-text text-2xl font-extrabold tracking-tight text-transparent dark:bg-none dark:text-[#fcba69]">
            EGP {total}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onPlaceOrder}
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8A4C1E] to-[#A76434] px-4 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg active:scale-[0.98] disabled:opacity-50 dark:from-[#cca474] dark:to-[#cca474] dark:text-[#141110]"
      >
        {isSubmitting ? 'Placing Order...' : 'Place Order'}
      </button>
    </div>
  );
}