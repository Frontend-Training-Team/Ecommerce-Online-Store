import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import CartItemRow from "../components/ui/cart/CartItemRow";
import OrderSummaryCard from "../components/ui/cart/OrderSummaryCard";
import EmptyCart from "../components/ui/cart/EmptyCart";
import ConfirmationModal from "../components/ui/cart/ConfirmationModal";
import CartSkeleton from "../components/ui/skeleton/CartSkeleton";
import { motion } from "framer-motion";

export default function Cart() {
  const navigate = useNavigate();
  const {
    cart,
    cartItems,
    cartCount,
    loading,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  const handleClearCart = async () => {
    setIsClearing(true);
    try {
      await clearCart();
      setIsModalOpen(false);
      toast.success("Cart cleared");
    } catch {
      toast.error("Couldn't clear cart. Please try again.");
    } finally {
      setIsClearing(false);
    }
  };

  const isInitialLoad = loading && (!cart || cartItems?.length === 0);

  const isCartEmpty = !cartItems || cartItems.length === 0;

  if (isInitialLoad) {
    return <CartSkeleton />;
  }

  return (
    <div className="mt-16 xl:mt-17 flex flex-col min-h-screen w-full px-4 py-10 dark:bg-noir-900 md:px-8 lg:px-12">
      <div className="mx-auto h-fit flex w-full max-w-6xl flex-col">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#EAE1DB] pb-5 dark:border-line">
          <div className="flex items-center gap-3.5">
            <button
              type="button"
              onClick={() => navigate("/")}
              aria-label="Go back"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D8C2B6] bg-white 
              text-[#5C4A3E] transition-all hover:bg-[#F5EFEA] hover:text-[#2D241E] active:scale-95 dark:border-line-strong 
              dark:bg-noir-800 dark:text-fg-secondary dark:hover:bg-noir-750 dark:hover:border-line-hover dark:hover:text-fg"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            <div>
              <h1 className="font-Instrument text-2xl sm:text-3xl lg:text-4xl tracking-tight text-[#2D241E] dark:text-fg">
                Shopping Cart
              </h1>
              <p className="mt-1 text-xs font-medium text-[#8C7A6E] dark:text-fg-tertiary sm:text-sm">
                Review your selected items before proceeding to checkout
              </p>
            </div>
          </div>

          <span className="ml-auto rounded-full border border-[#DFC9BA] bg-[#F3E8DF] px-3.5 py-1.5 text-xs font-bold uppercase 
          tracking-wider text-[#7B542B] shadow-2xs dark:border-line-strong dark:bg-noir-700 dark:text-copper-400 sm:text-sm">
            {cartCount} {cartCount === 1 ? "Item" : "Items"}
          </span>
        </motion.div>


        {isCartEmpty ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="flex">
            <EmptyCart />
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 h-[65%] gap-6 lg:grid-cols-12 lg:items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              className="flex h-full flex-col gap-4 lg:col-span-8">
              <div className="flex h-full flex-col rounded-2xl border border-[#f0eae1] bg-white shadow-sm dark:border-line 
              dark:bg-noir-800 dark:shadow-none">
                <ul className="cart-scroll flex max-h-[60vh] flex-1 flex-col divide-y divide-[#f5efe6] overflow-y-auto 
                dark:divide-line-subtle">
                  {cartItems.map((item) => (
                    <CartItemRow
                      key={item._id}
                      item={item}
                      onQuantityChange={updateQuantity}
                      onRemove={removeFromCart}
                    />
                  ))}
                </ul>

                <div className="mt-auto flex items-center justify-between gap-4 border-t border-[#EAE1DB] px-4 py-3 
                dark:border-line-subtle">
                  <p className="font-serif text-md font-medium text-[#8C7A6E] dark:text-fg-tertiary">
                    Reviewing <span className="font-serif font-semibold text-[#2D241E] dark:text-fg">{cartCount} items</span> in your cart
                  </p>

                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="flex shrink-0 items-center gap-1.5 rounded-lg border border-[#D8C2B6] bg-white px-3 py-1.5 
                    text-xs font-semibold text-[#5C4A3E] transition-colors hover:border-red-200 hover:bg-red-50 
                    hover:text-red-600 dark:border-line-strong dark:bg-noir-800 dark:text-fg-secondary 
                    dark:hover:border-state-danger/25 dark:hover:bg-state-danger/10 dark:hover:text-state-danger"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Empty Cart
                  </button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="lg:col-span-4">
              <OrderSummaryCard
                cart={cart}
                onApplyCoupon={applyCoupon}
                onRemoveCoupon={removeCoupon}
                onEmptyCart={() => setIsModalOpen(true)}
              />
            </motion.div>
          </div>
        )}
      </div>

      <ConfirmationModal
        open={isModalOpen}
        title="Empty your cart?"
        description="This will remove all items from your cart. This can't be undone."
        confirmLabel="Empty Cart"
        cancelLabel="Go Back"
        isLoading={isClearing}
        onConfirm={handleClearCart}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
}