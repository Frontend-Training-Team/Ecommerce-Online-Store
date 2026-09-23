import { useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, Star, Trash2, ShoppingBag } from "lucide-react";
import { useWishlist } from "../../../context/WishlistContext";
import { useCart } from "../../../context/CartContext";
import toast from "react-hot-toast";

export default function WishlistCard({
  product,
  onRemove,
}) {
  const { isItemLoading } = useWishlist();
  const { addToCart } = useCart();
  const [addingToCart, setAddingToCart] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  if (!product) return null;

  const isWishLoading = isItemLoading(product._id);

  const price = Number(product.price) || 0;
  const discountPrice = Number(product.discountPrice) || 0;
  const hasDiscount = discountPrice > 0 && discountPrice < price;
  const currentPrice = hasDiscount ? discountPrice : price;
  const discountPercent = hasDiscount
    ? Math.round(((price - discountPrice) / price) * 100)
    : 0;

  const rating = Number(
    product.averageRating || product.ratings || product.rating || 4.9
  ).toFixed(1);

  const imageUrl =
    (Array.isArray(product.images) &&
      (product.images[0]?.url || product.images[0])) ||
    product.image ||
    "";

  const customPath =
    'path("M 12 0 L 318 0 A 12 12 0 0 1 330 12 L 330 258 A 12 12 0 0 1 318 270 L 217 270 A 12 12 0 0 0 205 282 L 205 318 A 12 12 0 0 1 193 330 L 12 330 A 12 12 0 0 1 0 318 L 0 12 A 12 12 0 0 1 12 0 Z")';

  const handleRemove = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isRemoving) return;
    try {
      setIsRemoving(true);
      if (onRemove) {
        await onRemove(product._id);
      }
    } finally {
      setIsRemoving(false);
    }
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
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
    <div className="h-fit w-fit bg-white border-2 border-gray-200 rounded-xl p-2.5 group">
      <div className="relative h-82.5 w-82.5">
        <Link
          to={`/products/${product._id}`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="block h-82.5 w-82.5"
        >
          <div
            className="relative h-82.5 w-82.5 transition-transform duration-300 group-hover:scale-[1.01]"
            style={{
              clipPath: customPath,
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </Link>

        <div className="h-7 px-3.5 flex items-center justify-center bg-amber-950 rounded-3xl uppercase text-xs text-white text-Inter font-semibold tracking-wider absolute top-4 left-4 pointer-events-none max-w-32.5 truncate shadow-xs">
          <span>{product.category || "Category"}</span>
        </div>

        <div className="absolute top-4 right-4 flex items-center gap-1.5 pointer-events-none z-10">
          {hasDiscount && (
            <div className="h-7 px-2.5 flex items-center justify-center bg-[#00B207] text-white rounded-3xl text-xs font-bold tracking-wide shadow-xs">
              <span>-{discountPercent}%</span>
            </div>
          )}

          <div className="h-7 px-3 flex items-center justify-center bg-white text-[#1E1E1E] rounded-3xl uppercase text-xs text-Inter font-semibold tracking-wider shadow-xs max-w-27.5 truncate">
            <span>{product.brand || "BRAND"}</span>
          </div>
        </div>

        <div className="absolute bottom-2 left-2 bg-white rounded-xl shadow-xs border border-gray-100/80 w-12.5 h-12.5 flex flex-col items-center justify-center pointer-events-none z-10">
          <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
          <span className="text-xs font-bold text-[#1E1E1E] mt-1 leading-none">
            {rating}
          </span>
        </div>

        <div className="absolute bottom-0 right-0 grid h-fit w-fit grid-cols-2 gap-2 z-10">
          <button
            type="button"
            onClick={handleRemove}
            disabled={isRemoving || isWishLoading}
            aria-label="Remove from wishlist"
            className="flex h-13.5 w-13.5 items-center justify-center rounded-xl bg-gray-200 text-red-500 hover:bg-red-100 hover:text-red-600 transition-all cursor-pointer disabled:cursor-not-allowed"
          >
            {isRemoving || isWishLoading ? (
              <Loader2 className="h-6 w-6 animate-spin text-current" />
            ) : (
              <Trash2 className="h-6 w-6" />
            )}
          </button>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={addingToCart}
            aria-label="Add to cart"
            className="flex h-13.5 w-13.5 items-center justify-center rounded-xl bg-gray-200 text-black hover:bg-gray-300 hover:text-[#8E4726] transition-all cursor-pointer disabled:cursor-not-allowed"
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
          <p className="font-Instrument text-2xl text-[#1E1E1E] mb-2 hover:text-[#8E4726] transition-colors line-clamp-1">
            {product.name}
          </p>
        </Link>

        <span className="text-xl text-[#8E4726] font-Inter font-semibold">
          ${currentPrice.toFixed(2)}
        </span>

        {hasDiscount && (
          <span className="text-md text-[#7B7B7B] font-Inter font-medium ml-2 line-through">
            ${price.toFixed(2)}
          </span>
        )}
      </div>
    </div>
  );
}