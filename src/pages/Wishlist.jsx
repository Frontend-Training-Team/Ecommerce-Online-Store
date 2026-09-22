import { useEffect, useState } from "react";
import { getMyWishlist, deleteProductfromWishlist } from "../api/wishlist.api";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import WishlistCard from "../components/productDetails/WishlistCard";

function WishlistPage() {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchWishlist = async () => {
        try {
            setLoading(true);
            const res = await getMyWishlist();
            const wishlist = res.data?.wishlist ?? res.data?.data ?? {};
            const products = Array.isArray(wishlist.products) ? wishlist.products : Array.isArray(res.data) ? res.data : [];
            setWishlistItems(products);
        } catch (err) {
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
            toast.success("Removed from wishlist");
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to remove item");
        }
    };

    return (
        <div className="min-h-screen w-full px-4 py-6">
            <div className="mx-auto w-fit max-w-full">
                <h1 className="mb-6 text-2xl font-semibold">My Wishlist</h1>
                {loading ? (
                    <div className="flex h-64 items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-[#8E4726]" />
                    </div>
                ) : wishlistItems.length === 0 ? (
                    <p className="text-center text-gray-500 py-12">Your wishlist is empty.</p>
                ) : (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                        {wishlistItems.map((product) => (
                            <WishlistCard 
                                key={product._id} 
                                product={product} 
                                onRemove={handleRemove} 
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default WishlistPage;