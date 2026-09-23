import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

export default function EmptyCart() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-[28rem] w-full flex-col items-center justify-center gap-4 rounded-2xl border border-[#E8DDD4] bg-[#FAF7F3] px-6 py-16 text-center dark:border-[#2e2724] dark:bg-[#1c1816]">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EFE6DC] dark:bg-[#29211c]">
        <ShoppingCart className="h-7 w-7 text-[#8C7A6E] dark:text-[#cca474]" />
      </div>
      <div>
        <p className="text-lg font-bold text-[#2D241E] dark:text-[#f3ede6]">Your cart is empty</p>
        <p className="mt-1.5 text-sm text-[#8C7A6E] dark:text-[#a38f7d]">
          Looks like you haven't added anything yet.
        </p>
      </div>
      <button
        type="button"
        onClick={() => navigate("/shop")}
        className="mt-2 rounded-xl bg-gradient-to-r from-[#8A4C1E] to-[#A76434] px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg active:scale-[0.98] dark:from-[#cca474] dark:to-[#cca474] dark:text-[#141110]"
      >
        Start Browsing
      </button>
    </div>
  );
}