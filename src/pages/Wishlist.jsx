/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { getMyWishlist, deleteProductfromWishlist } from "../api/wishlist.api";
import { Heart, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import WishlistCard from "../components/ui/productDetails/WishlistCard";
import { useWishlist } from "../context/WishlistContext";
import { ProductGridSkeleton } from "../components/ui/skeleton/ProductSkeleton";
import { motion } from "framer-motion";

function WishlistPage() {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const { fetchWishlist: refreshContextWishlist } = useWishlist();

    const fetchWishlist = async () => {
        try {
            setLoading(true);
            const res = await getMyWishlist();
            const wishlist = res.data?.wishlist ?? res.data?.data ?? {};
            const products = Array.isArray(wishlist.products) ? wishlist.products : Array.isArray(res.data) ? res.data : [];
            setWishlistItems(products);
        } catch {
            toast.error("Failed to load wishlist items");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, []);

    const handleRemove = async (productId) => {
        try {
            await deleteProductfromWishlist(productId);
            setWishlistItems((prev) =>
                prev.filter((item) => (item._id || item.id || item) !== productId)
            );
            refreshContextWishlist();
            toast.success("Removed from wishlist");
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to remove item");
        }
    };

    return (
        <div className="mt-16 xl:mt-17 min-h-screen w-full max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header matching Order Detail styling */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-8 sm:mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-[#EAE1DB] pb-5 
              dark:border-line">
                <div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium font-Instrument text-[#2D241E] dark:text-fg">
                        My Wishlist
                    </h1>
                    <p className="text-xs sm:text-sm font-medium text-[#8C7A6E] dark:text-fg-tertiary mt-1">
                        Your saved favorite items
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <span className="rounded-full border border-[#DFC9BA] dark:border-copper-800 bg-[#F3E8DF] 
                    dark:bg-copper-900 px-3.5 sm:px-4 py-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider 
                    text-[#7B542B] dark:text-copper-300 shadow-2xs">
                        {loading ? "..." : `${wishlistItems.length} ${wishlistItems.length === 1 ? "Item" : "Items"}`}
                    </span>
                </div>
            </motion.div>

            {loading ? (
                <ProductGridSkeleton count={8} className="grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4" />
            ) : wishlistItems.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                  className="w-full bg-white dark:bg-noir-800 min-h-[50vh] flex flex-col items-center justify-center p-6 
                  text-center rounded-2xl border border-gray-100 dark:border-line">
                    <div className="w-16 h-16 rounded-full bg-[#FAF5F0] dark:bg-noir-750 text-[#7E4A2D] 
                    dark:text-copper-400 flex items-center justify-center mb-4">
                        <Heart className="w-8 h-8" />
                    </div>
                    <h2 className="font-Serif text-2xl sm:text-3xl text-[#1E1915] dark:text-fg font-medium mb-2">
                        Your wishlist is empty
                    </h2>
                    <p className="text-sm text-[#706861] dark:text-fg-secondary max-w-md mb-6">
                        Explore our curated catalog and save your favorite items here.
                    </p>
                    <Link
                        to="/shop"
                        className="h-11 px-7 rounded-xl bg-[#7E4A2D] dark:bg-copper-500 hover:bg-[#683C23] 
                        dark:hover:bg-copper-400 text-white dark:text-fg-on-accent text-sm font-medium 
                        flex items-center gap-2 transition-colors cursor-pointer"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Explore Products</span>
                    </Link>
                </motion.div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 justify-items-center">
                    {wishlistItems.map((product, index) => (
                        <motion.div
                            key={product._id || product.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, delay: (index % 4) * 0.1, ease: "easeOut" }}
                        >
                            <WishlistCard
                                product={product}
                                onRemove={handleRemove}
                            />
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default WishlistPage;
