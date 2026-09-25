import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import category1 from "../../../assets/images/categories/category1.png";
import category2 from "../../../assets/images/categories/category2.jpg";
import category3 from "../../../assets/images/categories/category3.png";
import category4 from "../../../assets/images/categories/category4.png";

const categoryImages = [category1, category2, category3, category4];

function ShopByCategory() {
  
  const categoryList = ["Fashion", "Sports", "Home", "Electronics"];

  return (
    <section className="bg-white dark:bg-noir-900 py-10">
      <div className="mx-auto max-w-fit">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 text-center">
          <h2 className="text-4xl font-Instrument text-[#9c4f2c] dark:text-fg">
            Shop by Category
          </h2>

          <p className="mt-2 text-gray-500 dark:text-fg-tertiary">
            Browse our wide range of categories
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 gap-5">
          {categoryList.map((category, index) => (
            <motion.div
              key={`${category}-${index}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            >
            <Link
              to={`/shop?category=${categoryList[index]}`}
              className="block w-87.5 transition-transform duration-300 hover:scale-105 overflow-hidden"
            >
              <div
                className="flex h-87.5 items-center justify-center rounded-xl bg-cover bg-center bg-no-repeat dark:brightness-[.92]"
                style={{
                  backgroundImage: `url(${categoryImages[index % categoryImages.length]})`,
                }}
              />

              <p className="mt-4 text-[21px] font-serif text-gray-700 dark:text-fg-secondary">
                {category}
              </p>
            </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ShopByCategory;