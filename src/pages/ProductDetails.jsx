import { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";
import { getSingleproduct, getAllProducts } from "../api/products.api";
import { getProductReviews, postAddAReview } from "../api/reviews.api";

import ProductGallery from "../components/productDetails/ProductGallery";
import ProductInfo from "../components/productDetails/ProductInfo";
import ProductTabs from "../components/productDetails/ProductTabs";
import SimilarProducts from "../components/productDetails/SimilarProducts";
import ProductDetailsSkeleton from "../components/skeleton/ProductDetailsSkeleton";
import { ArrowLeft, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const {
    isInWishlist,
    toggleWishlist,
    isItemLoading,
    actionLoading,
    wishlistIds,
  } = useWishlist();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [numReviews, setNumReviews] = useState(0);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("details");

  const [loading, setLoading] = useState(true);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [error, setError] = useState(null);

  const loadProduct = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      setError(null);

      const [productRes, reviewsRes] = await Promise.allSettled([
        getSingleproduct(id),
        getProductReviews(id),
      ]);

      if (productRes.status === "rejected") {
        throw new Error("Product not found");
      }

      const prodData = productRes.value.data?.product || productRes.value.data;
      if (!prodData || !prodData._id) {
        throw new Error("Product data unavailable");
      }

      setProduct(prodData);

      const rData = reviewsRes.status === "fulfilled" ? reviewsRes.value.data : null;
      const revList = rData?.reviews || prodData.reviews || [];
      setReviews(Array.isArray(revList) ? revList : []);
      setAverageRating(rData?.averageRating ?? prodData.averageRating ?? 0);
      setNumReviews(rData?.numReviews ?? prodData.numReviews ?? (Array.isArray(revList) ? revList.length : 0));

      if (prodData.category) {
        try {
          const simRes = await getAllProducts({ category: prodData.category, limit: 8 });
          const list = simRes.data?.products;
          setSimilarProducts(list.filter((p) => p._id !== prodData._id).slice(0, 4));
        } catch {
          setSimilarProducts([]);
        }
      }
    } catch (err) {
      console.error("Failed to load product details:", err);
      setError(err.message || "Failed to load product");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  const handleAddReview = async ({ rating, comment }) => {
    if (!id) return;
    if (!user) {
      return toast.error("Please log in to submit a review");
    }

    try {
      setSubmittingReview(true);
      await postAddAReview(id, { rating, comment });
      toast.success("Review submitted successfully!");

      const freshReviewsRes = await getProductReviews(id);
      if (freshReviewsRes.data) {
        setReviews(freshReviewsRes.data.reviews || []);
        setAverageRating(freshReviewsRes.data.averageRating || rating);
        setNumReviews(freshReviewsRes.data.numReviews || reviews.length + 1);
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to post review";
      toast.error(msg);
      throw err;
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleScrollToReviews = () => {
    setActiveTab("reviews");
    const elem = document.getElementById("product-tabs");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (loading) {
    return <ProductDetailsSkeleton />;
  }

  if (error || !product) {
    return (
      <div className="w-full bg-white min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-[#FAF5F0] text-[#7E4A2D] flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="font-Serif text-2xl sm:text-3xl text-[#1E1915] font-medium mb-2">
          Product Not Found
        </h2>
        <p className="text-sm text-[#706861] max-w-md mb-6">
          The product you are looking for may have been removed or the link might be invalid.
        </p>
        <Link
          to="/products"
          className="h-11 px-7 rounded-xl bg-[#7E4A2D] hover:bg-[#683C23] text-white text-sm font-medium 
          flex items-center gap-2 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-white min-h-screen py-8 sm:py-12">
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-14">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 lg:gap-x-14 gap-y-4 items-stretch">
          <ProductGallery
            images={product.images || []}
            productName={product.name}
          />

          <div className="order-3 lg:order-none lg:col-start-2 lg:row-start-1 w-full h-full flex flex-col justify-between">
            <ProductInfo
              product={product}
              onScrollToReviews={handleScrollToReviews}
              isInWishlist={isInWishlist(product?._id)}
              onToggleWishlist={() => toggleWishlist(product._id)}
              wishlistLoading={isItemLoading(product?._id) || actionLoading}
            />
          </div>
        </div>

        <ProductTabs
          description={product.description}
          reviews={reviews}
          averageRating={averageRating}
          numReviews={numReviews}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onAddReview={handleAddReview}
          submittingReview={submittingReview}
          isLoggedIn={Boolean(user)}
        />

        <SimilarProducts
          products={similarProducts}
          wishlistIds={wishlistIds}
          onToggleWishlist={toggleWishlist}
        />

      </div>
    </div>
  );
}