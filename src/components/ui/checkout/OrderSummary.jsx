export default function OrderSummary({ cartItems = [], subtotal = 0, shipping = 50, tax = 0, total = 0, isSubmitting = false, onPlaceOrder }) {
  return (
    <div className="rounded-2xl border border-[#E8DDD4] bg-white p-5 shadow-sm dark:border-line dark:bg-noir-800 dark:shadow-none">
      <h2 className="border-b border-[#EBE1D7] pb-4 text-xl font-serif text-[#2D241E] dark:border-line-subtle dark:text-fg">
        Order Summary
      </h2>

      <div className="mt-4 space-y-4">
        {cartItems.length === 0 ? (
          <p className="text-xs text-[#a39489] dark:text-fg-tertiary italic">Your cart is empty.</p>
        ) : (
          cartItems.map((item, idx) => {
            const product = item.product || item;
            const productName = item.name || product.name || product.title || 'Product Name';
            const productImage = item.image || product.image || product.imageCover ||
              (Array.isArray(product.images) ? product.images[0]?.url || product.images[0] : '');

            return (
              <div key={item._id || idx} className="flex items-center justify-between gap-3 text-xs">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-[#E8DDD4] bg-[#FAF5F0] dark:border-line dark:bg-noir-750">
                    {productImage ? (
                      <img src={productImage} alt={productName} className="h-full w-full object-cover dark:brightness-[.92]" />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center text-[10px] text-[#a39489] dark:text-fg-tertiary">Item</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-medium text-[#2d2421] dark:text-fg">{productName}</p>
                    <p className="text-[11px] text-[#8c7b70] dark:text-fg-tertiary">x{item.quantity || 1}</p>
                  </div>
                </div>
                <p className="shrink-0 font-semibold text-[#2d2421] dark:text-fg">EGP {(item.price || product.price || 0) * (item.quantity || 1)}</p>
              </div>
            );
          })
        )}
      </div>

      <div className="mt-5 border-t border-[#EBE1D7] pt-4 text-xs text-[#736358] dark:border-line-subtle dark:text-fg-secondary">
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span>Subtotal</span>
            <span className="font-medium text-[#2d2421] dark:text-fg">EGP {subtotal}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Shipping</span>
            <span className="rounded bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-state-success/10 dark:text-state-success">EGP {shipping}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Tax (14%)</span>
            <span className="font-medium text-[#2d2421] dark:text-fg">EGP {tax}</span>
          </div>
        </div>

        <div className="my-4 border-t border-dashed border-[#EBE1D7] dark:border-line-subtle" />

        <div className="mb-5 flex items-baseline justify-between">
          <span className="text-sm font-semibold text-[#5C4A3E] dark:text-fg">Total</span>
          <span className="bg-linear-to-r from-[#8A4C1E] to-[#A76434] bg-clip-text text-2xl font-extrabold tracking-tight text-transparent dark:bg-none dark:text-copper-400">
            EGP {total}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onPlaceOrder}
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#8A4C1E] to-[#A76434] px-4 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg active:scale-[0.98] disabled:opacity-50 dark:from-copper-500 dark:to-copper-500 dark:text-fg-on-accent dark:hover:from-copper-400 dark:hover:to-copper-400"
      >
        {isSubmitting ? 'Placing Order...' : 'Place Order'}
      </button>
    </div>
  );
}