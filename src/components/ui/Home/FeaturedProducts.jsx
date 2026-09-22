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
      <div className="mx-auto max-w-fit px-4 sm:px-8">

        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-4xl font-Instrument text-[#8E4726] dark:text-[#F5F1EA]">
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
                <div>
                  <h1>Alo</h1>
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