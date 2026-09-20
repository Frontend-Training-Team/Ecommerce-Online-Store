import React, { useState } from 'react';
import AddToCartButton from '../Animation/AddToCartButton';

export default function ProductCard({ product, onAddToCart }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const stock = product?.countInStock ?? product?.stock ?? product?.quantity ?? 0;
  const isOutOfStock = stock <= 0;

  const title = product?.name || product?.title || 'Untitled Product';
  const categoryName =
    typeof product?.category === 'object'
      ? product?.category?.name
      : product?.category || 'General';

  const originalPrice = Number(product?.price || 0);
  const discountPrice = product?.discountPrice ? Number(product?.discountPrice) : null;
  const currentPrice = discountPrice || originalPrice;
  const oldPrice = discountPrice ? originalPrice : null;

  const calculatedDiscount =
    oldPrice && oldPrice > currentPrice
      ? Math.round(((oldPrice - currentPrice) / oldPrice) * 100)
      : 0;

  const rating = product?.averageRating || product?.rating || 0;
  const reviewsCount = product?.numReviews || product?.reviewsCount || 0;

  const imageUrl =
    product?.images?.[0]?.url ||
    (typeof product?.images?.[0] === 'string' ? product?.images[0] : null) ||
    product?.image ||
    'https://via.placeholder.com/300';

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden relative group">
      
      <div className="bg-slate-50/60 p-4 relative flex items-center justify-center h-52">
        <span className="absolute top-3 left-3 bg-indigo-50 text-indigo-600 text-xs px-3 py-1 rounded-full font-medium capitalize">
          {categoryName}
        </span>

        <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
          {calculatedDiscount > 0 && (
            <span className="bg-red-50 text-red-500 text-xs px-2 py-0.5 rounded-full font-semibold">
              -{calculatedDiscount}%
            </span>
          )}
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-105 transition"
          >
            <svg
              className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
              fill={isFavorite ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>

        <img
          src={imageUrl}
          alt={title}
          className={`max-h-40 object-contain transition duration-300 ${
            isOutOfStock ? 'opacity-50' : 'group-hover:scale-105'
          }`}
        />

        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="bg-white text-red-500 font-semibold text-xs px-4 py-1.5 rounded-full shadow-md border border-red-100">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 min-h-[2.5rem] mb-2 leading-snug">
            {title}
          </h3>

          <div className="flex items-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-3.5 h-3.5 ${
                  star <= Math.round(rating)
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-gray-200 fill-gray-200'
                }`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-xs text-gray-400 ml-1">({reviewsCount})</span>
          </div>

          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-lg font-bold text-copper-700">
              EGP {currentPrice.toLocaleString()}
            </span>
            {oldPrice && (
              <span className="text-sm text-gray-400 line-through">
                EGP {oldPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {isOutOfStock ? (
          <button
            disabled
            className="w-full bg-slate-100 text-slate-400 font-medium py-2.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2 cursor-not-allowed"
          >
            <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            Out of Stock
          </button>
        ) : (
         
          <AddToCartButton
            productId={product?.id || product?._id}
            onSuccess={() => onAddToCart && onAddToCart(product)}
          />
        )}
      </div>
    </div>
  );
}