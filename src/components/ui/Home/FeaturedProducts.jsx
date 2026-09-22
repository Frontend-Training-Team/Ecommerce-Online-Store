import { Link } from "react-router-dom";
import ProductGrid from "../../productDetails/ProductGrid";

function FeaturedProducts({ products = [], loading = false }) {
  const featuredProducts = products.slice(0, 4);

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
            to="/shop"
            className="hidden rounded-xl border border-[#C9B09D] px-5 py-2.5 text-sm font-semibold text-[#6B4935] transition hover:bg-[#E9DDD2] sm:block"
          >
            View All
          </Link>
        </div>


        <div className="w-full">
          <ProductGrid
            products={featuredProducts}
            isLoading={loading}
            columns="grid grid-cols-1 md-grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4"
          />
        </div>


        <div className="mt-8 flex justify-center sm:hidden">
          <Link
            to="/shop"
            className="rounded-xl bg-[#8B5E3C] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#70482F]"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;