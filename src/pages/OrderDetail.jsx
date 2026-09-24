/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleOrder, patchCancelOrder } from "../api/orders.api";
import toast from "react-hot-toast";
import { ArrowLeft, XCircle } from "lucide-react";
import ConfirmationModal from "../components/ui/cart/ConfirmationModal";
import OrderProgress from "../components/ui/order/OrderProgress";
import { PaymentCard, ShippingCard } from "../components/ui/order/OrderInfo";
import OrderItems from "../components/ui/order/OrderItems";
import OrderSkeleton from "../components/ui/skeleton/OrderSkeleton";

const STATUS_BADGE_STYLES = {
  pending: "bg-[#EFE6DC] text-[#7B542B] border-[#DFC9BA] dark:bg-white/5 dark:text-neutral-300 dark:border-white/10",
  confirmed: "bg-[#F3E8DF] text-[#7B542B] border-[#DFC9BA] dark:bg-[#2a221a] dark:text-[#fcba69] dark:border-[#4a3a2a]",
  processing: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20",
  shipped: "bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20",
  delivered: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
  cancelled: "bg-red-100 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20",
};

const CANCELLABLE_STATUSES = ["pending", "confirmed"];

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const fetchOrder = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await getSingleOrder(id);
      setOrder(data.order);
    } catch (err) {
      navigate("/*", { replace: true });
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  const handleCancelOrder = async () => {
    setIsCancelling(true);
    try {
      const { data } = await patchCancelOrder(id);
      setOrder(data.order);
      setIsModalOpen(false);
      toast.success("Order cancelled");
    } catch (err) {
      toast.error("Couldn't cancel order. Please try again.");
    } finally {
      setIsCancelling(false);
    }
  };

  if (loading || !order) {
    return (
      <div className="mt-16 xl:mt-17 flex min-h-[60vh] w-full items-center justify-center bg-[#FAFAF8] dark:bg-[#141110]">
        <OrderSkeleton />
      </div>
    );
  }

  const canCancel = CANCELLABLE_STATUSES.includes(order.status);
  const isCancelled = order.status === "cancelled";

  return (
    <div className="mt-16 xl:mt-17 min-h-screen w-full bg-[#FAFAF8] px-4 py-15 dark:bg-[#141110] md:px-8 lg:px-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col">
        <div className="mb-12 flex flex-wrap items-center justify-between gap-4 border-b border-[#EAE1DB] pb-5 dark:border-[#2e2724]">
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => navigate("/orders")}
              aria-label="Back to orders"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D8C2B6] bg-white text-[#5C4A3E] transition-all hover:bg-[#F5EFEA] hover:text-[#2D241E] active:scale-95 dark:border-[#3a322d] dark:bg-[#221d1a] dark:text-[#c5b6a3] dark:hover:border-[#52443d] dark:hover:text-[#f3ede6]"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium font-Instrument text-[#2D241E] dark:text-[#f3ede6] mb-2">Order Detail</h1>
              <p className="text-xs font-medium text-[#8C7A6E] dark:text-[#a38f7d]">
                Order #{order._id?.slice(-8).toUpperCase()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`rounded-full border px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider ${STATUS_BADGE_STYLES[order.status] ?? STATUS_BADGE_STYLES.pending
                }`}
            >
              {order.status}
            </span>

            {canCancel && (
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-1.5 rounded-xl border border-[#C5A893] bg-[#FAF5F0] px-4 py-2 text-xs font-semibold text-[#6F4723] transition-all hover:bg-[#F2E8DF] active:scale-[0.98] dark:border-[#48342d] dark:bg-[#261e1b] dark:text-[#e2a890] dark:hover:bg-[#342823]"
              >
                <XCircle className="h-4 w-4" />
                Cancel Order
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 ">
          {!isCancelled && (
            <div className="lg:col-span-5">
              <OrderProgress order={order} />
            </div>
          )}

          <div className={`flex flex-col gap-4 ${isCancelled ? "lg:col-span-12" : "lg:col-span-7"}`}>
            <OrderItems items={order.items} />
            <ShippingCard shippingAddress={order.shippingAddress} />
            <PaymentCard order={order} />
          </div>
        </div>
      </div>

      <ConfirmationModal
        open={isModalOpen}
        title="Cancel this order?"
        description="This can't be undone. Your order will be marked as cancelled."
        confirmLabel="Cancel Order"
        cancelLabel="Go Back"
        isLoading={isCancelling}
        onConfirm={handleCancelOrder}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
}
