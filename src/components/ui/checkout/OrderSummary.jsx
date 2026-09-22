import React from 'react';

export default function OrderSummary({ cartItems = [], subtotal = 0, shipping = 50, tax = 0, total = 0, isSubmitting = false, onPlaceOrder }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#f0eae1] space-y-5 sticky top-6">
      <h2 className="text-[18px] font-bold text-[#2d2421] pb-3 border-b border-[#f5efe6]">
        Order Summary
      </h2>

      {/* Cart Items */}
      <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
        {cartItems.length === 0 ? (
          <p className="text-xs[12px] text-[#a39489] italic">Your cart is empty.</p>
        ) : (
          cartItems.map((item, idx) => {
            const product = item.product || item;
            return (
              <div key={item._id || idx} className="flex items-center justify-between text-xs[12px]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-[#faf8f5] border border-[#e8dfd5] overflow-hidden
                   flex-shrink-0 flex items-center justify-center">
                    {product.imageCover ? (
                      <img src={product.imageCover} alt={product.title} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-[10px] text-[#a39489]">Item</span>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-[#2d2421] line-clamp-1">{product.title || 'Product Name'}</p>
                    <p className="text-[11px] text-[#8c7b70]">x{item.quantity || 1}</p>
                  </div>
                </div>
                <p className="font-semibold text-[#2d2421]">EGP {(item.price || product.price || 0) * (item.quantity || 1)}</p>
              </div>
            );
          })
        )}
      </div>

      {/* Pricing Details */}
      <div className="border-t border-[#f5efe6] pt-4 space-y-2.5 text-xs[12px] text-[#736358]">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-semibold text-[#2d2421]">EGP {subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="font-semibold text-[#2d2421]">EGP {shipping}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax (14%)</span>
          <span className="font-semibold text-[#2d2421]">EGP {tax}</span>
        </div>
        <div className="border-t border-[#f5efe6] pt-3 flex justify-between text-[14px] font-bold text-[#2d2421]">
          <span>Total</span>
          <span className="text-[#c07a50]">EGP {total}</span>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="button"
        onClick={onPlaceOrder}
        disabled={isSubmitting}
        className="w-full py-3 px-6 rounded-xl bg-[#c07a50] hover:bg-[#ad6a42] text-white font-semibold text-sml[14px]
         transition-colors shadow-sm active:scale-[0.99] disabled:opacity-50"
      >
        {isSubmitting ? 'Placing Order...' : 'Place Order'}
      </button>
    </div>
  );
}