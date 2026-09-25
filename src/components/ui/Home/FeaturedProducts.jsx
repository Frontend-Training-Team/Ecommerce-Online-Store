import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProductGrid from "../productDetails/ProductGrid";

function FeaturedProducts({ products = [], loading = false }) {
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="bg-white py-16 dark:bg-noir-900">
      <div className="mx-auto max-w-fit px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-4xl font-Instrument text-[#8E4726] dark:text-fg">
              Featured Products
            </h2>

            <p className="mt-2 text-sm text-[#7B7B7B] dark:text-fg-tertiary">
              Handpicked just for you
            </p>
          </div>

          <Link
            to="/shop"
            className="hidden rounded-xl border border-[#C9B09D] dark:border-line-strong px-5 py-2.5 text-sm font-semibold text-[#6B4935] dark:text-copper-400 transition hover:bg-[#E9DDD2] dark:hover:bg-noir-750 dark:hover:border-line-hover dark:hover:text-copper-300 sm:block"
          >
            View All
          </Link>
        </motion.div>


        <div className="w-full">
          <ProductGrid
            products={featuredProducts}
            isLoading={loading}
            columns="sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4"
          />
        </div>


        <div className="mt-8 flex justify-center sm:hidden">
          <Link
            to="/shop"
            className="rounded-xl bg-[#8B5E3C] dark:bg-copper-500 px-6 py-3 text-sm font-semibold text-white dark:text-fg-on-accent transition hover:bg-[#70482F] dark:hover:bg-copper-400"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;