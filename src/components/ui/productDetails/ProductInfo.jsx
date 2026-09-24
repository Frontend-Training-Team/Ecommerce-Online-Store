import { useState } from "react";
import { Star, MessageSquare, ShoppingBag, Heart, Truck, RotateCcw, Loader2 } from "lucide-react";
import { useCart } from "../../../context/CartContext";
import toast from "react-hot-toast";
import {Link} from "react-router-dom"

export default function ProductInfo({
  product,
  onScrollToReviews,
  isInWishlist = false,
  onToggleWishlist,
  wishlistLoading = false,
}) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  if (!product) return null;

  const price = Number(product.price) || 0;
  const discountPrice = Number(product.discountPrice) || 0;
  const hasDiscount = discountPrice > 0 && discountPrice < price;
  const currentPrice = hasDiscount ? discountPrice : price;

  const discountPercent = hasDiscount
    ? Math.round(((price - discountPrice) / price) * 100)
    : 0;

  const stock = typeof product.stock === "number" ? product.stock : 99;
  const isOutOfStock = stock <= 0;

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleIncrease = () => {
    setQuantity((prev) => (prev < stock ? prev + 1 : prev));
  };

  const handleAddToCart = async () => {
    if (isOutOfStock) return;
    try {
      setAddingToCart(true);
      await addToCart(product._id, quantity);
      toast.success(`Added ${quantity} ${quantity > 1 ? "items" : "item"} to cart!`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add to cart");
    } finally {
      setAddingToCart(false);
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full">

      <div className="flex items-center gap-2.5 flex-wrap">
        <span className="bg-[#D1D5DB] dark:bg-noir-650 text-[#1F2937] dark:text-fg text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full">
          {product.brand || "BRAND"}
        </span>
        <span className="bg-[#70381F] dark:bg-copper-500 text-white dark:text-fg-on-accent text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full">
          {product.category || "CATEGORY"}
        </span>
      </div>

      <h1 className="font-Instrument text-4xl sm:text-[44px] text-[#111827] dark:text-fg font-normal leading-[1.15] tracking-tight">
        {product.name}
      </h1>

      <p className="text-sm sm:text-[15px] text-[#6B7280] dark:text-fg-tertiary leading-relaxed max-w-xl">
        {product.shortDescription}
      </p>

      <div className="flex items-center gap-2.5 pt-0.5">
        <div className="bg-[#FFF7ED] dark:bg-state-warning/10 text-[#C2410C] dark:text-state-warning border border-[#FFEDD5] dark:border-state-warning/25 px-3.5 py-1 rounded-full flex items-center
        gap-1.5 text-xs font-semibold shadow-2xs">
          <Star className="w-3.5 h-3.5 text-[#F59E0B] dark:text-star fill-[#FEF3C7] dark:fill-star/20" />
          <span>{Number(product.averageRating || 0).toFixed(1)}</span>
        </div>

        <button
          type="button"
          onClick={onScrollToReviews}
          className="bg-[#EEF2FF] dark:bg-state-info/10 text-[#4338CA] dark:text-state-info border border-[#E0E7FF] dark:border-state-info/25 px-3.5 py-1 rounded-full flex items-center
          gap-1.5 text-xs font-semibold hover:bg-[#E0E7FF] dark:hover:bg-state-info/15 transition-colors cursor-pointer shadow-2xs"
        >
          <MessageSquare className="w-3.5 h-3.5 text-[#4F46E5] dark:text-state-info" />
          <span>{product.numReviews || 0} Reviews</span>
        </button>

        <div className="bg-[#D1D5DB] dark:bg-noir-650 text-[#1F2937] dark:text-fg px-3.5 py-1 rounded-full flex items-center gap-1.5 text-xs font-semibold 
        shadow-2xs">
          <span>{stock} in stock</span>
        </div>
      </div>

      {/* 5. Pricing Section */}
      <div className="flex items-center gap-3.5 pt-1">
        <span className="text-3xl sm:text-4xl font-bold text-[#8A4526] dark:text-copper-400 tracking-tight">
          ${currentPrice.toFixed(2)}
        </span>

        {hasDiscount && (
          <>
            <span className="text-lg sm:text-xl text-[#9CA3AF] dark:text-fg-tertiary line-through font-normal">
              ${price.toFixed(2)}
            </span>
            <span className="bg-[#D1FADF] dark:bg-state-success/10 text-[#15803D] dark:text-state-success text-xs font-bold px-2.5 py-0.5 rounded-full">
              -{discountPercent}%
            </span>
          </>
        )}
      </div>

      <div className="w-full border-b border-[#E5E7EB] dark:border-line mt-1 mb-2"></div>

      <div className="flex items-center gap-3 w-full flex-wrap sm:flex-nowrap">

        <div className="h-14 px-6 bg-[#F3F4F6] dark:bg-noir-800 rounded-full flex items-center justify-between gap-6 w-36 sm:w-44 shrink-0">
          <button
            type="button"
            onClick={handleDecrease}
            disabled={quantity <= 1 || isOutOfStock}
            className="text-xl font-normal text-[#6B7280] dark:text-fg-secondary hover:text-[#111827] dark:hover:text-fg disabled:opacity-30 disabled:cursor-not-allowed 
            cursor-pointer transition-colors"
          >
            -
          </button>
          <span className="text-lg font-bold text-[#111827] dark:text-fg min-w-6 text-center select-none">
            {quantity}
          </span>
          <button
            type="button"
            onClick={handleIncrease}
            disabled={quantity >= stock || isOutOfStock}
            className="text-xl font-normal text-[#6B7280] dark:text-fg-secondary hover:text-[#111827] dark:hover:text-fg disabled:opacity-30 disabled:cursor-not-allowed 
            cursor-pointer transition-colors"
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={addingToCart || isOutOfStock}
          className="flex-1 h-14 rounded-full bg-[#723D24] dark:bg-copper-500 hover:bg-[#60331E] dark:hover:bg-copper-400 text-white dark:text-fg-on-accent font-semibold 
          text-base flex items-center justify-center gap-3 shadow-xs transition-all cursor-pointer 
          disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.99]"
        >
          {addingToCart ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin text-white dark:text-fg-on-accent" />
              <span>Adding...</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-5 h-5 text-white dark:text-fg-on-accent" />
              <span>{isOutOfStock ? "Out of Stock" : "Add To Cart"}</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={onToggleWishlist}
          disabled={wishlistLoading}
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all cursor-pointer 
            shrink-0 shadow-xs hover:scale-105 active:scale-95 
            ${
            isInWishlist
              ? "bg-[#FEE2E2] dark:bg-state-danger/15 border-[#FCA5A5] dark:border-state-danger/25 text-[#DC2626] dark:text-state-danger"
              : "bg-white dark:bg-noir-800 border-[#E3DDD5] dark:border-line-strong text-[#706861] dark:text-fg-secondary hover:text-[#DC2626] dark:hover:text-state-danger hover:border-[#FCA5A5] dark:hover:border-state-danger/25 hover:bg-[#FFF1F2] dark:hover:bg-state-danger/10"
          }`}
        >
          {wishlistLoading ? (
            <Loader2 className="w-5 h-5 animate-spin text-[#DC2626] dark:text-state-danger" />
          ) : (
            <Heart
              className={`w-6 h-6 transition-colors ${
                isInWishlist ? "fill-current text-[#DC2626] dark:text-state-danger" : "stroke-[1.75]"
              }`}
            />
          )}
        </button>
      </div>

      <div className="border border-[#E3DDD5] dark:border-line rounded-2xl p-4 sm:p-5 flex flex-col gap-3.5 bg-white dark:bg-noir-800 shadow-sm dark:shadow-none mt-2">
        <div className="flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-lg bg-[#FAF6F2] dark:bg-noir-750 border border-[#EADBCE] dark:border-line-strong text-[#7E4A2D] dark:text-copper-400 flex items-center
          justify-center shrink-0">
            <Truck className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-[#1E1915] dark:text-fg">Free Delivery</span>
            <Link to="/profile" className="text-xs text-[#706861] dark:text-fg-secondary mt-0.5 underline cursor-pointer hover:text-[#7E4A2D] dark:hover:text-copper-300">
              Enter your Postal code for Delivery Availability
            </Link>
          </div>
        </div>

        <div className="h-px bg-[#EDE8E3] dark:bg-line-subtle"></div>

        <div className="flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-lg bg-[#FAF6F2] dark:bg-noir-750 border border-[#EADBCE] dark:border-line-strong text-[#7E4A2D] dark:text-copper-400 flex items-center
          justify-center shrink-0">
            <RotateCcw className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-[#1E1915] dark:text-fg">Return Delivery</span>
            <span className="text-xs text-[#706861] dark:text-fg-secondary mt-0.5">
              Free 30 days Delivery Return.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
