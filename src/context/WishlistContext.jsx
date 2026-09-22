import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import {
  getMyWishlist,
  postAddProductToWishlist,
  deleteProductfromWishlist,
} from "../api/wishlist.api";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const { user } = useAuth();
  const [wishlistIds, setWishlistIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const fetchWishlist = useCallback(async () => {
    if (!user) {
      setWishlistIds([]);
      return;
    }
    try {
      setLoading(true);
      const res = await getMyWishlist();
      const list = res.data?.wishlist?.products || res.data?.wishlist || res.data?.products || [];
      const ids = list.map((item) => (typeof item === "string" ? item : item?._id || item?.productId)).filter(Boolean);
      setWishlistIds(ids);
    } catch {
      setWishlistIds([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const isInWishlist = useCallback(
    (productId) => wishlistIds.includes(productId),
    [wishlistIds]
  );

  const isItemLoading = useCallback(
    (productId) => actionLoadingId === productId,
    [actionLoadingId]
  );

  const toggleWishlist = useCallback(
    async (productId) => {
      if (!productId) return;
      if (!user) {
        toast.error("Please log in to save items to your wishlist");
        return;
      }

      const isFav = wishlistIds.includes(productId);
      setActionLoadingId(productId);

      try {
        if (isFav) {
          await deleteProductfromWishlist(productId);
          setWishlistIds((prev) => prev.filter((id) => id !== productId));
          toast.success("Removed from wishlist");
        } else {
          await postAddProductToWishlist(productId);
          setWishlistIds((prev) => [...prev, productId]);
          toast.success("Added to wishlist!");
        }
      } catch (err) {
        toast.error(err.response?.data?.message || err.userMessage || "Failed to update wishlist");
      } finally {
        setActionLoadingId(null);
      }
    },
    [user, wishlistIds]
  );

  const wishlistCount = useMemo(() => wishlistIds.length, [wishlistIds]);
  const actionLoading = Boolean(actionLoadingId);

  const value = useMemo(() => ({
      wishlistIds,
      wishlistCount,
      loading,
      actionLoading,
      actionLoadingId,
      isItemLoading,
      isInWishlist,
      toggleWishlist,
      fetchWishlist,
    }),
    [
      wishlistIds,
      wishlistCount,
      loading,
      actionLoading,
      actionLoadingId,
      isItemLoading,
      isInWishlist,
      toggleWishlist,
      fetchWishlist,
    ]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
