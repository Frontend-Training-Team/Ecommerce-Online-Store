/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react';
import { Heart, ShoppingCart } from "lucide-react";
import { Plus } from 'lucide-react';

import AddToCartButton from '../Animation/AddToCartButton';

export default function ProductCard({ product, onAddToCart, onRateProduct }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [toasts, setToasts] = useState([]);

  const customPath = 'path("M 10 0 L 270 0 A 10 10 0 0 1 280 10 L 280 218 A 10 10 0 0 1 270 228 L 180 228 A 10 10 0 0 0 170 238 L 170 270 A 10 10 0 0 1 160 280 L 10 280 A 10 10 0 0 1 0 270 L 0 10 A 10 10 0 0 1 10 0 Z")';
  const stock = product?.countInStock ?? product?.stock ?? product?.quantity ?? 0;
  const isOutOfStock = stock <= 0;

  const title = product?.name || product?.title || 'Untitled Product';
  const categoryName =
    typeof product?.category === 'object'
      ? product?.category?.name
      : product?.category || 'General';

  const brandName = product?.brand || product?.brandName || 'BRAND';

  const originalPrice = Number(product?.price || 0);
  const discountPrice = product?.discountPrice ? Number(product?.discountPrice) : null;
  const currentPrice = discountPrice || originalPrice;
  const oldPrice = discountPrice ? originalPrice : null;

  const calculatedDiscount =
    oldPrice && oldPrice > currentPrice
      ? Math.round(((oldPrice - currentPrice) / oldPrice) * 100)
      : 0;

  const initialRating = product?.averageRating || product?.rating || 0;
  const [userRating, setUserRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);
  const reviewsCount = product?.numReviews || product?.reviewsCount || 0;

  const productId = product?.id || product?._id;

  useEffect(() => {
    if (!productId) return;
    const wishlist = JSON.parse(localStorage.getItem('guestWishlist') || '[]');
    const exists = wishlist.some((item) => (item.id || item._id) === productId);
    setIsFavorite(exists);
  }, [productId]);

  useEffect(() => {
    setUserRating(product?.averageRating || product?.rating || 0);
  }, [product?.averageRating, product?.rating]);

  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const handleToggleFavorite = () => {
    if (!product) return;
    const wishlist = JSON.parse(localStorage.getItem('guestWishlist') || '[]');
    const exists = wishlist.some((item) => (item.id || item._id) === productId);

    let updated;
    if (exists) {
      updated = wishlist.filter((item) => (item.id || item._id) !== productId);
      setIsFavorite(false);
      addToast('Removed from wishlist', 'info');
    } else {
      updated = [...wishlist, product];
      setIsFavorite(true);
      addToast('Added to wishlist', 'success');
    }

    localStorage.setItem('guestWishlist', JSON.stringify(updated));
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  const handleRatingClick = (starValue) => {
    setUserRating(starValue);
    if (onRateProduct) {
      onRateProduct(productId, starValue);
    }
  };

  const imageUrl =
    product?.images?.[0]?.url ||
    (typeof product?.images?.[0] === 'string' ? product?.images[0] : null) ||
    product?.image ||
    'https://via.placeholder.com/280';

  return (
    <>
      {/* Toast Notifications Stack */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 pointer-events-none items-center">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            style={{
              backgroundColor: toast.type === 'success' ? '#7A6E67' : '#A8653F'
            }}
            className="flex items-center gap-3 backdrop-blur-xl text-white text-sm font-medium px-5 py-3 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/20 transition-all animate-in slide-in-from-top-3 ease-out"
          >
            {toast.type === 'success' ? (
              <Plus className="w-5 h-5 text-emerald-300 shrink-0" />
            ) : (
              <Plus className="w-6 h-6 text-brand-200 shrink-0" />
            )}
            <span className="text-sm font-medium">{toast.message}</span>
          </div>
        ))}
      </div>

      <div className="h-fit w-[320px] bg-white dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-800 rounded-2xl p-2.5 mx-auto transition-all duration-300">
        <div className="relative h-[280px] w-[280px] mx-auto">
          <div
            className={`relative h-[280px] w-[280px] bg-amber-600 dark:bg-amber-700 transition-transform duration-300 ${isOutOfStock ? 'opacity-50' : 'hover:scale-[1.01]'
              }`}
            style={{
              clipPath: customPath,
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            {isOutOfStock && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="bg-white dark:bg-slate-900 text-red-500 font-bold text-xs px-3 py-1 rounded-full shadow-md border border-red-100 dark:border-red-900/30">
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          <div className="w-24 h-6 grid place-items-center bg-amber-950/90 dark:bg-amber-900 rounded-2xl uppercase text-[10px] text-white font-semibold tracking-wider absolute top-3 left-3 truncate px-2">
            <span>{categoryName}</span>
          </div>

          <div className="h-6 px-2.5 grid place-items-center bg-gray-100/90 dark:bg-slate-800 rounded-2xl uppercase text-[10px] text-black dark:text-slate-200 font-semibold tracking-wider absolute top-3 right-3 max-w-[100px] truncate">
            <span>{calculatedDiscount > 0 ? `-${calculatedDiscount}%` : brandName}</span>
          </div>

          <div className="absolute bottom-0 right-0 grid h-fit w-fit grid-cols-2 gap-1.5 z-10">
            <button
              onClick={handleToggleFavorite}
              className="flex h-[46px] w-[46px] items-center justify-center rounded-xl bg-gray-200 dark:bg-slate-800 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-slate-700 transition active:scale-95 cursor-pointer"
              aria-label="Add to favorites"
            >
              <Heart
                className={`h-5 w-5 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-700 dark:text-gray-300'
                  }`}
              />
            </button>

            {isOutOfStock ? (
              <button
                disabled
                className="flex h-[46px] w-[46px] items-center justify-center rounded-xl bg-gray-300 dark:bg-slate-800 text-gray-500 cursor-not-allowed opacity-70"
              >
                <ShoppingCart className="h-5 w-5" />
              </button>
            ) : (
              <div className="h-[46px] w-[46px]">
                <AddToCartButton
                  productId={productId}
                  onSuccess={() => onAddToCart && onAddToCart(product)}
                />
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-3 mb-2 px-1 w-[280px] mx-auto">
          <h3 className="font-semibold text-base text-[#1E1E1E] dark:text-slate-100 mb-1 line-clamp-1" title={title}>
            {title}
          </h3>

          <div className="flex items-center justify-center gap-1 mb-1.5">
            {[1, 2, 3, 4, 5].map((star) => {
              const activeRating = hoverRating || userRating;
              return (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingClick(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="focus:outline-none transition-transform hover:scale-125 cursor-pointer"
                  aria-label={`Rate ${star} stars`}
                >
                  <svg
                    className={`w-3.5 h-3.5 transition-colors duration-150 ${star <= Math.round(activeRating)
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-gray-200 dark:text-slate-700 fill-gray-200 dark:fill-slate-700'
                      }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              );
            })}
            <span className="text-xs text-gray-400 dark:text-gray-500 ml-1">({reviewsCount})</span>
          </div>

          <div className="flex items-baseline justify-center gap-2">
            <span className="text-lg text-[#8E4726] dark:text-amber-500 font-semibold">
              EGP {currentPrice.toLocaleString()}
            </span>
            {oldPrice && (
              <span className="text-xs text-[#7B7B7B] dark:text-slate-500 font-medium line-through">
                EGP {oldPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}