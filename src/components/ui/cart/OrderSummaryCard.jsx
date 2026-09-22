import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Tag, X, ArrowRight, ArrowLeft } from "lucide-react";

export default function OrderSummaryCard({ cart, onApplyCoupon, onRemoveCoupon }) {
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
  const tax = Math.max(subtotal - discount, 0) * TAX_RATE;
  const total = Math.max(subtotal - discount, 0) + tax;

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
      <div className="rounded-2xl border border-[#E8DDD4] bg-[#FAF7F3] p-5 shadow-sm dark:border-[#2e2724] dark:bg-[#1c1816] dark:shadow-lg dark:shadow-black/20">
        <h2 className="border-b border-[#EBE1D7] pb-4 text-xl font-serif text-[#2D241E] dark:border-[#2e2724] dark:text-[#f3ede6]">
          Order Summary
        </h2>

        <dl className="mt-4 space-y-2.5 text-sm">
          <div className="flex items-center justify-between text-[#8C7A6E] dark:text-[#a38f7d]">
            <dt>Subtotal</dt>
            <dd className="font-medium text-[#2D241E] dark:text-[#f3ede6]">
              EGP {Number(cart?.subtotal ?? 0).toFixed(2)}
            </dd>
          </div>

          <div className="flex items-center justify-between text-[#8C7A6E] dark:text-[#a38f7d]">
            <dt>Shipping</dt>
            <dd className="rounded bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
              Free
            </dd>
          </div>

          {hasDiscount && (
            <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
              <dt className="flex items-center gap-1.5">
                Discount
                {cart?.coupon && (
                  <span className="rounded border border-emerald-200 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider dark:border-emerald-500/20">
                    {cart.coupon}
                  </span>
                )}
              </dt>
              <dd className="font-medium">-EGP {Number(cart.discountAmount).toFixed(2)}</dd>
            </div>
          )}

          <div className="flex items-center justify-between text-[#8C7A6E] dark:text-[#a38f7d]">
            <dt>Tax ({(TAX_RATE * 100).toFixed(0)}%)</dt>
            <dd className="font-medium text-[#2D241E] dark:text-[#f3ede6]">EGP {tax.toFixed(2)}</dd>
          </div>
        </dl>

        <div className="my-4 border-t border-dashed border-[#EBE1D7] dark:border-[#2e2724]" />

        <div className="mb-5 flex items-baseline justify-between">
          <span className="text-sm font-semibold text-[#5C4A3E] dark:text-[#c5b6a3]">Total</span>
          <span className="bg-gradient-to-r from-[#8A4C1E] to-[#A76434] bg-clip-text text-2xl font-extrabold tracking-tight text-transparent dark:bg-none dark:text-[#fcba69]">
            EGP {total.toFixed(2)}
          </span>
        </div>

        <button
          type="button"
          onClick={() => navigate("/checkout")}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8A4C1E] to-[#A76434] px-4 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg active:scale-[0.98] dark:from-[#cca474] dark:to-[#cca474] dark:text-[#141110]"
        >
          Proceed to Checkout
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="rounded-2xl border border-[#E8DDD4] bg-[#FAF7F3] p-4 shadow-sm dark:border-[#2e2724] dark:bg-[#1c1816] dark:shadow-lg dark:shadow-black/20">
        <label className="mb-2.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8C7A6E] dark:text-[#a38f7d]" htmlFor="coupon-code">
          <Tag className="h-4 w-4 text-[#8C7A6E] dark:text-[#cca474]" />
          Coupon Code
        </label>

        {cart?.coupon ? (
          <div className="flex items-center justify-between rounded-xl border border-[#C5A893] bg-[#FAF5F0] px-3.5 py-2.5 dark:border-[#48342d] dark:bg-[#261e1b]">
            <span className="text-sm font-semibold text-[#6F4723] dark:text-[#e2a890]">
              {cart.coupon} applied
            </span>
            <button
              type="button"
              onClick={handleRemove}
              disabled={removing}
              aria-label="Remove coupon"
              className="text-[#8C7A6E] transition-colors hover:text-red-500 disabled:opacity-50 dark:text-[#a38f7d] dark:hover:text-red-400"
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
              className="w-full rounded-xl border border-[#D8C2B6] bg-white px-3.5 py-2.5 text-sm text-[#2D241E] placeholder-[#A3968F] transition-colors focus:border-[#8A4C1E] focus:outline-none focus:ring-1 focus:ring-[#8A4C1E] dark:border-[#3a322d] dark:bg-[#181413] dark:text-[#f3ede6] dark:placeholder-[#786c64] dark:focus:border-[#cca474] dark:focus:ring-[#cca474]"
            />
            <button
              type="submit"
              disabled={applying || !code.trim()}
              className="shrink-0 rounded-xl border border-[#C5A893] bg-white px-4 py-2.5 text-sm font-semibold text-[#6F4723] transition-colors hover:bg-[#F2E8DF] disabled:opacity-50 dark:border-[#48342d] dark:bg-[#221d1a] dark:text-[#e2a890] dark:hover:bg-[#342823]"
            >
              {applying ? "..." : "Apply"}
            </button>
          </form>
        )}
      </div>
      <button
        type="button"
        onClick={() => navigate("/products")}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#D8C2B6] bg-white px-4 py-3 text-sm font-semibold text-[#5C4A3E] transition-colors hover:bg-[#F5EFEA] hover:text-[#2D241E] dark:border-[#3a322d] dark:bg-[#221d1a] dark:text-[#c5b6a3] dark:hover:bg-[#342823] dark:hover:text-[#f3ede6]"
      >
        <ArrowLeft className="h-4 w-4" />
        Continue Shopping
      </button>
    </div>
  );
}