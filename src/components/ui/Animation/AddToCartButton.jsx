import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';

export default function AddToCartButton({ productId, onSuccess, disabled = false }) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = async (e) => {
    e.stopPropagation();
    if (isAnimating || disabled) return;

    setIsAnimating(true);

    if (onSuccess) {
      try {
        await onSuccess(productId);
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    }

    setTimeout(() => {
      setIsAnimating(false);
    }, 1800);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || isAnimating}
      aria-label="Add to cart"
      className="relative w-full h-full flex items-center justify-center rounded-xl bg-[#8E4726] hover:bg-[#72381e] dark:bg-copper-500 dark:hover:bg-copper-400 text-white dark:text-fg-on-accent transition-all active:scale-95 cursor-pointer overflow-hidden shadow-sm"
    >
      {!isAnimating && (
        <ShoppingCart className="w-5 h-5 transition-transform duration-200 hover:scale-110" />
      )}

      {isAnimating && (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#d4a373] dark:bg-copper-800 border border-[#8e5229] dark:border-copper-600 rounded-[2px] animate-[dropAndDisappear_0.6s_cubic-bezier(0.45,0,0.55,1)_forwards] z-10 flex items-center justify-center">
            <div className="w-full h-[2px] bg-[#8e5229]/40 dark:bg-copper-400/40" />
          </div>

          <div className="animate-[driveCart_1.6s_ease-in-out_forwards]">
            <ShoppingCart className="w-5 h-5 text-white dark:text-fg-on-accent" />
          </div>
        </div>
      )}

      <style>{`
        @keyframes dropAndDisappear {
          0% {
            transform: translate(-50%, -16px) scale(0.7) rotate(-10deg);
            opacity: 0;
          }
          40% {
            opacity: 1;
          }
          85% {
            transform: translate(-50%, 4px) scale(0.85) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, 8px) scale(0);
            opacity: 0;
          }
        }

        @keyframes driveCart {
          0% {
            transform: translateX(-28px);
            opacity: 0;
          }
          25% {
            transform: translateX(0px);
            opacity: 1;
          }
          65% {
            transform: translateX(0px);
            opacity: 1;
          }
          100% {
            transform: translateX(32px);
            opacity: 0;
          }
        }
      `}</style>
    </button>
  );
}