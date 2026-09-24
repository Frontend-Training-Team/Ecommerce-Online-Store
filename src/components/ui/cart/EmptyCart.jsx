import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

export default function EmptyCart() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-112 w-full flex-col items-center justify-center gap-4 rounded-2xl border 
    border-[#E8DDD4] bg-[#FAF7F3] px-6 py-16 text-center dark:border-line dark:bg-noir-800">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EFE6DC] dark:bg-noir-750">
        <ShoppingCart className="h-7 w-7 text-[#8C7A6E] dark:text-fg-tertiary" />
      </div>
      <div>
        <p className="text-lg font-bold text-[#2D241E] dark:text-fg">Your cart is empty</p>
        <p className="mt-1.5 text-sm text-[#8C7A6E] dark:text-fg-tertiary">
          Looks like you haven't added anything yet.
        </p>
      </div>
      <button
        type="button"
        onClick={() => navigate("/shop")}
        className="mt-2 rounded-xl bg-linear-to-r from-[#8A4C1E] to-[#A76434] px-6 py-2.5 text-sm font-semibold 
        text-white shadow-md transition-all hover:shadow-lg active:scale-[0.98] dark:from-copper-500 
        dark:to-copper-500 dark:text-fg-on-accent dark:hover:from-copper-400 dark:hover:to-copper-400"
      >
        Start Browsing
      </button>
    </div>
  );
}