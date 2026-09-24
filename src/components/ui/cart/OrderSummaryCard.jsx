import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Tag, X, ArrowRight, ArrowLeft, Trash2 } from "lucide-react";

export default function OrderSummaryCard({ cart, onApplyCoupon, onRemoveCoupon, onEmptyCart }) {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [applying, setApplying] = useState(false);
  const [removing, setRemoving] = useState(false);

  const hasDiscount = Number(cart?.discountAmount) > 0;

  const handleApply = async (e) => {
    e.preventDefault();
    if (!code.trim() || applying) return;
    setApplying(true);
    try {
      await onApplyCoupon(code.trim().toUpperCase());
      toast.success("Coupon applied");
      setCode("");
    } catch {
      toast.error("Invalid coupon code");
    } finally {
      setApplying(false);
    }
  };

  const TAX_RATE = 0.14; // 14% 
  const subtotal = Number(cart?.subtotal ?? 0);
  const discount = Number(cart?.discountAmount ?? 0);
  const shipping = (subtotal > 0 && subtotal < 1000) ? 50 : 0;
  const tax = Math.max(subtotal - discount, 0) * TAX_RATE;
  const total = Math.max(subtotal - discount, 0) + tax + shipping;

  const handleRemove = async () => {
    if (removing) return;
    setRemoving(true);
    try {
      await onRemoveCoupon();
    } catch {
      toast.error("Couldn't remove coupon");
    } finally {
      setRemoving(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl border border-[#f0eae1] bg-white p-6 shadow-sm dark:border-line dark:bg-noir-800 
      dark:shadow-none">
        <h2 className="border-b border-[#f5efe6] pb-4 text-xl font-serif text-[#2D241E] dark:border-line-subtle 
        dark:text-fg">
          Order Summary
        </h2>

        <dl className="mt-4 space-y-2.5 text-sm">
          <div className="flex items-center justify-between text-[#8C7A6E] dark:text-fg-secondary">
            <dt>Subtotal</dt>
            <dd className="font-medium text-[#2D241E] dark:text-fg">
              EGP {Number(cart?.subtotal ?? 0).toFixed(2)}
            </dd>
          </div>

          <div className="flex items-center justify-between text-[#8C7A6E] dark:text-fg-secondary">
            <dt>Shipping</dt>
            <dd>
              {shipping === 0 ? (
                <span className="rounded bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700 
                dark:bg-state-success/10 dark:text-state-success">
                  Free
                </span>
              ) : (
                <span className="font-medium text-[#2D241E] dark:text-fg">
                  EGP 50.00
                </span>
              )}
            </dd>
          </div>

          {hasDiscount && (
            <div className="flex items-center justify-between text-emerald-600 dark:text-state-success">
              <dt className="flex items-center gap-1.5">
                Discount
                {cart?.coupon && (
                  <span className="rounded border border-emerald-200 px-1.5 py-0.5 text-[10px] font-bold uppercase 
                  tracking-wider dark:border-state-success/25">
                    {cart.coupon}
                  </span>
                )}
              </dt>
              <dd className="font-medium">-EGP {Number(cart.discountAmount).toFixed(2)}</dd>
            </div>
          )}

          <div className="flex items-center justify-between text-[#8C7A6E] dark:text-fg-secondary">
            <dt>Tax ({(TAX_RATE * 100).toFixed(0)}%)</dt>
            <dd className="font-medium text-[#2D241E] dark:text-fg">EGP {tax.toFixed(2)}</dd>
          </div>
        </dl>

        <div className="my-4 border-t border-dashed border-[#EBE1D7] dark:border-line-subtle" />

        <div className="mb-5 flex items-baseline justify-between">
          <span className="text-sm font-semibold text-[#5C4A3E] dark:text-fg">Total</span>
          <span className="bg-linear-to-r from-[#8A4C1E] to-[#A76434] bg-clip-text text-2xl font-extrabold 
          tracking-tight text-transparent dark:bg-none dark:text-copper-400">
            EGP {total.toFixed(2)}
          </span>
        </div>

        <button
          type="button"
          onClick={() => navigate("/checkout")}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#8A4C1E] 
          to-[#A76434] px-4 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg active:scale-[0.98] dark:from-copper-500 dark:to-copper-500 dark:text-fg-on-accent dark:hover:from-copper-400 dark:hover:to-copper-400"
        >
          Proceed to Checkout
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="rounded-2xl border border-[#f0eae1] bg-white p-4 shadow-sm dark:border-line dark:bg-noir-800 
      dark:shadow-none">
        <label className="mb-2.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8C7A6E] 
        dark:text-fg-tertiary" htmlFor="coupon-code">
          <Tag className="h-4 w-4 text-[#8C7A6E] dark:text-fg-tertiary" />
          Coupon Code
        </label>

        {cart?.coupon ? (
          <div className="flex items-center justify-between rounded-xl border border-[#C5A893] bg-[#FAF5F0] px-3.5 
          py-2.5 dark:border-copper-800 dark:bg-copper-900">
            <span className="text-sm font-semibold text-[#6F4723] dark:text-copper-300">
              {cart.coupon} applied
            </span>
            <button
              type="button"
              onClick={handleRemove}
              disabled={removing}
              aria-label="Remove coupon"
              className="text-[#8C7A6E] transition-colors hover:text-red-500 disabled:opacity-50 dark:text-fg-tertiary 
              dark:hover:text-state-danger"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <form onSubmit={handleApply} className="flex gap-2">
            <input
              id="coupon-code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter coupon code"
              className="w-full rounded-xl border border-[#D8C2B6] bg-white px-3.5 py-2.5 text-sm text-[#2D241E] 
              placeholder-[#A3968F] transition-colors focus:border-[#8A4C1E] focus:outline-none focus:ring-1 
              focus:ring-[#8A4C1E] dark:border-line-control dark:bg-noir-750 dark:text-fg dark:placeholder-fg-placeholder 
              dark:hover:border-line-hover dark:focus:border-copper-400 dark:focus:ring-copper-400/25"
            />
            <button
              type="submit"
              disabled={applying || !code.trim()}
              className="shrink-0 rounded-xl border border-[#C5A893] bg-white px-4 py-2.5 text-sm font-semibold 
              text-[#6F4723] transition-colors hover:bg-[#F2E8DF] disabled:opacity-50 dark:border-line-strong 
              dark:bg-noir-800 dark:text-copper-400 dark:hover:bg-noir-750 dark:hover:text-copper-300"
            >
              {applying ? "..." : "Apply"}
            </button>
          </form>
        )}
      </div>
      <button
        type="button"
        onClick={() => navigate("/shop")}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#D8C2B6] bg-white px-4 py-3 
        text-sm font-semibold text-[#5C4A3E] transition-colors hover:bg-[#F5EFEA] hover:text-[#2D241E] 
        dark:border-line-strong dark:bg-noir-800 dark:text-fg-secondary dark:hover:bg-noir-750 dark:hover:text-fg 
        dark:hover:border-line-hover"
      >
        <ArrowLeft className="h-4 w-4" />
        Continue Shopping
      </button>
    </div>
  );
}