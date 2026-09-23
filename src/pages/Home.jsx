import { useEffect, useMemo, useRef, useState } from "react";
import { getAllProducts } from "../api/products.api";
import FeaturedProducts from "../components/ui/Home/FeaturedProducts";
import HeroSection from "../components/ui/Home/HeroSection";
import QuoteSection from "../components/ui/Home/QuoteSection";
import toast from "react-hot-toast";
import HowItWorks from "../components/ui/Home/HowItWorks";
import ShopByCategory from "../components/ui/Home/ShopByCategory";

function Home() {
  const categorySectionRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();

        console.log("PRODUCTS:", response.data);

        setProducts(response.data.products || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    return [...new  Set(products.map((product) => product.category))];
  }, [products]);

  console.log(categories)

  const handleViewCategories = () => {
    categorySectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      <HeroSection onViewCategories={handleViewCategories} />
      <div ref={categorySectionRef}>
        <ShopByCategory categories={categories} />
      </div>
      <FeaturedProducts products={products} loading={loading} />
      <QuoteSection />
      <HowItWorks />
    </>
  );
}

export default Home;