import { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";
import { getMyCart, postAddItemToCart, patchUpdateItemQuantity, deleteItemFromCart, deleteClearCart } from "../api/cart.api";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const { user } = useAuth();
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(false);

    const cartItems = useMemo(() => cart?.items || [], [cart]);

    const cartCount = cart?.itemCount || 0;

    // fetch my items in cart 
    const fetchCart = useCallback(async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setCart(null);
            return;
        }
        try {
            setLoading(true);
            const res = await getMyCart();
            const cartData = res.data
            setCart(cartData);
        } catch (error) {
            console.error("Failed to fetch cart:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (user) {
            fetchCart();
        } else {
            setCart(null);
        }
    }, [user, fetchCart]);

    // increment the cart count 
    const incrementCartCount = useCallback((amount = 1) => {
        setCart((prev) => ({ ...prev, itemCount: (prev?.itemCount || 0) + amount }));
    }, []);

    // add new item in cart
    const addToCart = useCallback(async (productId, quantity = 1) => {
        try {
            const res = await postAddItemToCart({ productId, quantity });
            const updatedCart = res.data?.items ? res.data : null;
            if (updatedCart) {
                setCart(updatedCart);
            } else {
                await fetchCart();
            }
            return res.data;
        } catch (error) {
            console.error("Failed to add to cart:", error);
            throw error;
        }
    }, [fetchCart]);

    // update the quantity for cart
    const updateQuantity = useCallback(async (productId, quantity) => {
        try {
            const res = await patchUpdateItemQuantity({ productId, quantity });
            const updatedCart = res.data?.items ? res.data : null;
            if (updatedCart) {
                setCart(updatedCart);
            } else {
                await fetchCart();
            }
            return res.data;
        } catch (error) {
            console.error("Failed to update item quantity:", error);
            throw error;
        }
    }, [fetchCart]);

    // remove one item from cart
    const removeFromCart = useCallback(async (productId) => {
        try {
            const res = await deleteItemFromCart(productId);
            const updatedCart = res.data?.items ? res.data : null;
            if (updatedCart) {
                setCart(updatedCart);
            } else {
                await fetchCart();
            }
            return res.data;
        } catch (error) {
            console.error("Failed to remove item from cart:", error);
            throw error;
        }
    }, [fetchCart]);

    // for clear all item from cart
    const clearCart = useCallback(async () => {
        try {
            await deleteClearCart();
        } catch (error) {
            console.error("Failed to clear cart:", error);
        } finally {
            setCart(null);
        }
    }, []);

    const value = useMemo(() => ({
        cart,
        cartItems,
        cartCount,
        loading,
        fetchCart,
        incrementCartCount,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        setCart,
    }),
        [cart, cartItems, cartCount, loading, fetchCart, incrementCartCount, addToCart, updateQuantity, removeFromCart, clearCart]
    );

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}