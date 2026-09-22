import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Star } from "lucide-react";
import ProductCardSkeleton from "../skeletons/ProductCardSkeleton";
import chair from "../../../assets/images/categories/chair.jpg";

function FeaturedProducts({ products, loading }) {
  const featuredProducts = products.slice(0, 4).map((product) => ({
    ...product,
    image: chair,
    name: "Modern Chair",
    category: "Furniture",
    brand: "Home",
    price: 88,
    originalPrice: 100,
    rating: 4.9,
  }));

  return (
    <section className="bg-white py-16 dark:bg-[#171411]">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">

        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl text-[#8E4726] dark:text-[#F5F1EA]">
              Featured Products
            </h2>

            <p className="mt-2 text-sm text-[#7B7B7B] dark:text-[#A99A8F]">
              Handpicked just for you
            </p>
          </div>

          <Link
            to="/products"
            className="hidden rounded-xl border border-[#C9B09D] px-5 py-2.5 text-sm font-semibold text-[#6B4935] transition hover:bg-[#E9DDD2] sm:block"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          ) : (
            featuredProducts.map((product) => {

              const discount = Math.round(
                ((product.originalPrice - product.price) /
                  product.originalPrice) *
                  100
              );

              return (
                <div
                  key={product._id}
                  className="
                    group overflow-hidden rounded-[18px]
                    border border-[#E1DDD9]
                    bg-white
                    shadow-sm
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:shadow-xl
                  "
                >
                  <div
                    className="
                      relative h-[330px]
                      overflow-hidden
                      bg-[#E9E9E9]
                    "
                  >
                    <div className="absolute left-4 right-4 top-4 z-10 flex items-center justify-between">

                      <span className="rounded-full bg-[#6e5647] px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                        {product.category}
                      </span>
                      <span className="rounded-full bg-[#08B84F] px-4 py-1.5 text-[8px] font-bold text-white">
                        -{discount}%
                      </span>
                      
                      <span className="rounded-full bg-white px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-black">
                        {product.brand}
                      </span>

                    </div>
                    <Link to={`/products/${product._id}`}>
                      <img
                        src={chair}
                        alt={product.name}
                        className="
                          h-full w-full
                          object-contain p-6
                          transition-transform duration-500
                          group-hover:scale-105
                        "
                      />
                    </Link>
                    <div className="absolute bottom-2 left-0 right-0 flex items-end justify-between">
{/* ratel */}
                      <div
                        className="
                          flex h-11 w-11
                          items-center justify-center gap-1
                          rounded-[12px]
                          bg-white shadow-sm
                        "
                      >
                        <Star
                          size={12}
                          fill="#F7C948"
                          stroke="#F7C948"
                        />

                        <span className="text-sm font-medium text-[#333]">
                          {product.rating}
                        </span>
                      </div>
                      <div className="flex gap-2 pr-3">

                        <button
                          type="button"
                          aria-label="Add to wishlist"
                          className="
                            flex h-11 w-11
                            items-center justify-center
                            rounded-[14px]
                            bg-white
                            text-[#111]
                            shadow-sm
                            transition
                            hover:bg-[#F5F5F5]
                            active:scale-95
                          "
                        >
                          <Heart size={25} strokeWidth={1.8} />
                        </button>

                        <button
                          type="button"
                          aria-label="Add to cart"
                          className="
                            flex h-11 w-11
                            items-center justify-center
                            rounded-[14px]
                            bg-white
                            text-[#111]
                            shadow-sm
                            transition
                            hover:bg-[#F5F5F5]
                            active:scale-95
                          "
                        >
                          <ShoppingBag size={24} strokeWidth={1.8} />
                        </button>

                      </div>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-4 ">

                    <Link to={`/products/${product._id}`}>
                      <h3
                        className="
                          min-h-[48px]
                          line-clamp-2
                          text-[20px]
                          font-medium
                          leading-6
                          text-[#27211D]
                          transition
                          hover:text-[#8B5E3C]
                        "
                      >
                        {product.name}
                      </h3>
                    </Link>
                    <div className="mt-3 flex items-center gap-3">

                      <span className="text-[20px] font-bold text-[#974C29]">
                        ${product.price}
                      </span>

                      <span className="text-sm text-[#888] line-through">
                        ${product.originalPrice}
                      </span>

                    </div>

                  </div>
                </div>
              );
            })
          )}

        </div>

        <div className="mt-8 flex justify-center sm:hidden">
          <Link
            to="/products"
            className="
              rounded-xl
              bg-[#8B5E3C]
              px-6 py-3
              text-sm font-semibold
              text-white
              transition
              hover:bg-[#70482F]
            "
          >
            View All Products
          </Link>
        </div>

      </div>
    </section>
  );
}

export default FeaturedProducts;