import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Loader2, Star } from "lucide-react";
import { useCart } from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishlistContext";
import toast from "react-hot-toast";

export default function ProductCard({
  product,
  isInWishlist: propIsInWishlist,
  onToggleWishlist,
}) {
  const { addToCart } = useCart();
  const { isInWishlist: checkWishlist, toggleWishlist, isItemLoading } = useWishlist();
  const [addingToCart, setAddingToCart] = useState(false);

  if (!product) return null;

  const isWish = propIsInWishlist !== undefined ? propIsInWishlist : checkWishlist(product._id);
  const isWishLoading = isItemLoading(product._id);

  const isOutOfStock = product.stock <= 0;

  const price = Number(product.price) || 0;
  const discountPrice = Number(product.discountPrice) || 0;
  const hasDiscount = discountPrice > 0 && discountPrice < price;
  const currentPrice = hasDiscount ? discountPrice : price;
  const discountPercent = hasDiscount ? Math.round(((price - discountPrice) / price) * 100) : 0;
  const rating = Number(product.averageRating || product.ratings || product.rating || 4.9).toFixed(1);

  const imageUrl =
    (Array.isArray(product.images) && (product.images[0]?.url || product.images[0])) ||
    product.image ||
    "";

  const customPath =
    'path("M 12 0 L 318 0 A 12 12 0 0 1 330 12 L 330 258 A 12 12 0 0 1 318 270 L 217 270 A 12 12 0 0 0 205 282 L 205 318 A 12 12 0 0 1 193 330 L 12 330 A 12 12 0 0 1 0 318 L 0 12 A 12 12 0 0 1 12 0 Z")';

  const handleWishlistClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleWishlist) {
      onToggleWishlist(product._id);
    } else {
      await toggleWishlist(product._id);
    }
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;

    try {
      setAddingToCart(true);
      await addToCart(product._id, 1);
      toast.success("Added to cart!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add to cart");
    } finally {
      setAddingToCart(false);
    }
  };

  return (
    <div className="h-fit w-fit bg-white dark:bg-noir-800 border-2 border-gray-200 dark:border-line rounded-xl p-2.5 group">
      <div className="relative h-82.5 w-82.5">
        <Link
          to={`/products/${product._id}`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="block h-82.5 w-82.5 relative"
        >
          <div
            className="relative h-82.5 w-82.5 transition-transform duration-300 group-hover:scale-[1.01] dark:brightness-[.92]"
            style={{
              clipPath: customPath,
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          {isOutOfStock && (
            <div
              className="absolute inset-0 bg-black/60 flex items-center justify-center z-20"
              style={{ clipPath: customPath }}
            >
              <span className="text-[#F87171] dark:text-state-danger font-Inter font-bold text-lg uppercase tracking-wider bg-black/40 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/20">
                Out of Stock
              </span>
            </div>
          )}
        </Link>

        <div className="h-7 px-3.5 flex items-center justify-center bg-amber-950 dark:bg-noir-900/85 dark:backdrop-blur-sm dark:ring-1 dark:ring-white/10 rounded-3xl uppercase text-xs text-white dark:text-fg 
        text-Inter font-semibold tracking-wider absolute top-4 left-4 pointer-events-none max-w-32.5 truncate shadow-xs z-30">
          <span>{product.category || "Category"}</span>
        </div>

        <div className="absolute top-4 right-4 flex items-center gap-1.5 pointer-events-none z-30">
          {hasDiscount && (
            <div className="h-7 px-2.5 flex items-center justify-center bg-[#00B207] dark:bg-state-success-solid text-white dark:text-noir-950 rounded-3xl text-xs 
            font-bold tracking-wide shadow-xs">
              <span>-{discountPercent}%</span>
            </div>
          )}

          <div className="h-7 px-3 flex items-center justify-center bg-white dark:bg-noir-900/85 dark:backdrop-blur-sm text-[#1E1E1E] dark:text-fg dark:ring-1 dark:ring-white/10 rounded-3xl uppercase text-xs 
          text-Inter font-semibold tracking-wider shadow-xs max-w-27.5 truncate">
            <span>{product.brand || "BRAND"}</span>
          </div>
        </div>

        <div className="absolute bottom-2 left-2 bg-white dark:bg-noir-750 rounded-xl shadow-xs border border-gray-100/80 dark:border-line w-12.5 h-12.5 
        flex flex-col items-center justify-center pointer-events-none z-30">
          <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B] dark:fill-star dark:text-star" />
          <span className="text-xs font-bold text-[#1E1E1E] dark:text-fg mt-1 leading-none">
            {rating}
          </span>
        </div>

        <div className="absolute bottom-0 right-0 grid h-fit w-fit grid-cols-2 gap-2 z-30">
          <button
            type="button"
            onClick={handleWishlistClick}
            disabled={isWishLoading}
            aria-label="Wishlist"
            className={`flex h-13.5 w-13.5 items-center justify-center rounded-xl transition-all cursor-pointer 
            ${isWish
                ? "bg-[#FEE2E2] text-[#DC2626] dark:bg-state-danger/15 dark:text-state-danger"
                : "bg-gray-200 text-black hover:bg-gray-300 hover:text-[#DC2626] dark:bg-noir-700 dark:text-fg dark:hover:bg-noir-650 dark:hover:text-state-danger"
              } disabled:cursor-not-allowed`}
          >
            {isWishLoading ? (
              <Loader2 className="h-6 w-6 animate-spin text-current" />
            ) : (
              <Heart className={`h-6 w-6 ${isWish ? "fill-current" : ""}`} />
            )}
          </button>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={addingToCart || isOutOfStock}
            aria-label="Add to cart"
            className={`flex h-13.5 w-13.5 items-center justify-center rounded-xl transition-all 
            ${isOutOfStock
                ? "bg-gray-100 text-gray-400 dark:bg-noir-750 dark:text-fg-disabled cursor-not-allowed"
                : "bg-gray-200 text-black hover:bg-gray-300 hover:text-[#8E4726] dark:bg-noir-700 dark:text-fg dark:hover:bg-noir-650 dark:hover:text-copper-300 cursor-pointer"
              } disabled:cursor-not-allowed`}
          >
            {addingToCart ? (
              <Loader2 className="h-6 w-6 animate-spin text-current" />
            ) : (
              <ShoppingBag className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      <div className="text-center mt-5 mb-3 max-w-82.5">
        <Link
          to={`/products/${product._id}`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="block"
        >
          <p className="font-Instrument text-2xl text-[#1E1E1E] dark:text-fg mb-2 hover:text-[#8E4726] dark:hover:text-copper-300 transition-colors line-clamp-1">
            {product.name}
          </p>
        </Link>
        <span className="text-xl text-[#8E4726] dark:text-copper-400 font-Inter font-semibold">
          ${currentPrice.toFixed(2)}
        </span>
        {hasDiscount && (
          <span className="text-md text-[#7B7B7B] dark:text-fg-tertiary font-Inter font-medium ml-2 line-through">
            ${price.toFixed(2)}
          </span>
        )}
      </div>
    </div>
  );
}