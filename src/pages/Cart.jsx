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

  if (isInitialLoad) {
    return <CartSkeleton />;
  }

  const isCartEmpty = !cartItems || cartItems.length === 0;

  return (
    <div className="mt-16 xl:mt-17 flex flex-col min-h-screen w-full bg-[#FAFAF8] px-4 py-10 dark:bg-[#141110] md:px-8 lg:px-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#EAE1DB] pb-5 dark:border-[#2e2724]">
          <div className="flex items-center gap-3.5">
            <button
              type="button"
              onClick={() => navigate("/")}
              aria-label="Go back"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D8C2B6] bg-white text-[#5C4A3E] transition-all hover:bg-[#F5EFEA] hover:text-[#2D241E] active:scale-95 dark:border-[#3a322d] dark:bg-[#221d1a] dark:text-[#c5b6a3] dark:hover:border-[#52443d] dark:hover:text-[#f3ede6]"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-3">
              <h1 className=" font-serif text-2xl font-abold tracking-tight text-[#2D241E] dark:text-[#f3ede6] lg:text-3xl">
                Shopping Cart
              </h1>
              <span className="rounded-full border border-[#DFC9BA] bg-[#EFE6DC] px-2.5 py-0.5 text-xs font-bold text-[#7B542B] dark:border-[#4a3a2a] dark:bg-[#29211c] dark:text-[#fcba69]">
                {cartCount} {cartCount === 1 ? "Item" : "Items"}
              </span>
            </div>
          </div>
        </div>


        {isCartEmpty ? (
          <div className="flex flex-1 items-center justify-center">
            <EmptyCart />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
            <div className="flex flex-col gap-4 lg:col-span-8">
              <div className="flex items-center justify-between gap-4 px-1">
                <p className=" font-serif text-lg font-medium text-[#8C7A6E] dark:text-[#a38f7d]">
                  Reviewing <span className="font-serif font-semibold text-[#2D241E] dark:text-[#f3ede6]">{cartCount} items</span> in your cart
                </p>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="flex w-fit shrink-0 items-center gap-1.5 rounded-lg border border-[#D8C2B6] bg-white px-3 py-1.5 text-xs font-semibold text-[#5C4A3E] transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-[#3a322d] dark:bg-[#221d1a] dark:text-[#c5b6a3] dark:hover:border-red-500/30 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Empty Cart
                </button>
              </div>

              <div className="rounded-2xl border border-[#E8DDD4] bg-[#FAF7F3] shadow-sm dark:border-[#2e2724] dark:bg-[#1c1816] dark:shadow-lg dark:shadow-black/20">
                <ul className="cart-scroll flex max-h-[70vh] flex-col divide-y divide-[#EAE1DB] overflow-y-auto lg:h-168 lg:max-h-168 dark:divide-[#2e2724]">
                  {cartItems.map((item) => (
                    <CartItemRow
                      key={item._id}
                      item={item}
                      onQuantityChange={updateQuantity}
                      onRemove={removeFromCart}
                    />
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-4">
              <OrderSummaryCard cart={cart} onApplyCoupon={applyCoupon} onRemoveCoupon={removeCoupon} />
            </div>
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