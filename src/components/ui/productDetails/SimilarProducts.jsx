import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";

export default function SimilarProducts({
  products = [],
  wishlistIds = [],
  onToggleWishlist,
}) {
  const scrollRef = useRef(null);

  if (!products || products.length === 0) return null;

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 360;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full flex flex-col gap-6 pt-10 border-t border-[#EDE8E3] dark:border-line">
      <div className="flex items-center justify-between">
        <h2 className="font-Serif text-2xl sm:text-3xl text-[#1E1915] dark:text-fg font-normal tracking-tight">
          Similar items you might also like
        </h2>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleScroll("left")}
            aria-label="Previous products"
            className="w-10 h-10 rounded-full border border-gray-200 dark:border-line-strong bg-white dark:bg-noir-800 hover:bg-gray-100 dark:hover:bg-noir-750 text-[#1E1915] dark:text-fg flex 
            items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => handleScroll("right")}
            aria-label="Next products"
            className="w-10 h-10 rounded-full border border-gray-200 dark:border-line-strong bg-white dark:bg-noir-800 hover:bg-gray-100 dark:hover:bg-noir-750 text-[#1E1915] dark:text-fg flex 
            items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth py-2 px-1 scrollbar-none [-ms-overflow-style:none] 
        [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product) => {
          const isWish = wishlistIds.includes(product._id);
          return (
            <div key={product._id} className="shrink-0">
              <ProductCard
                product={product}
                isInWishlist={isWish}
                onToggleWishlist={onToggleWishlist}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
