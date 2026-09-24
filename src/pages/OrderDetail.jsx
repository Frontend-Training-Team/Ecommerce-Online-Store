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
  pending: "bg-[#EFE6DC] text-[#7B542B] border-[#DFC9BA] dark:bg-state-warning/10 dark:text-state-warning dark:border-state-warning/25",
  confirmed: "bg-[#F3E8DF] text-[#7B542B] border-[#DFC9BA] dark:bg-state-confirmed/10 dark:text-state-confirmed dark:border-state-confirmed/25",
  processing: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-state-info/10 dark:text-state-info dark:border-state-info/25",
  shipped: "bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-state-shipped/10 dark:text-state-shipped dark:border-state-shipped/25",
  delivered: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-state-success/10 dark:text-state-success dark:border-state-success/25",
  cancelled: "bg-red-100 text-red-700 border-red-200 dark:bg-state-danger/10 dark:text-state-danger dark:border-state-danger/25",
  returned: "bg-[#EFE6DC] text-[#7B542B] border-[#DFC9BA] dark:bg-state-neutral/10 dark:text-state-neutral dark:border-state-neutral/25",
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
      <div className="mt-16 xl:mt-17 flex min-h-[60vh] w-full items-center justify-center bg-[#FAFAF8] dark:bg-noir-900">
        <OrderSkeleton />
      </div>
    );
  }

  const canCancel = CANCELLABLE_STATUSES.includes(order.status);
  const isCancelled = order.status === "cancelled";

  return (
    <div className="mt-16 xl:mt-17 min-h-screen w-full bg-[#FAFAF8] px-4 py-15 dark:bg-noir-900 md:px-8 lg:px-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col">
        <div className="mb-12 flex flex-wrap items-center justify-between gap-4 border-b border-[#EAE1DB] pb-5 dark:border-line">
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => navigate("/orders")}
              aria-label="Back to orders"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D8C2B6] bg-white text-[#5C4A3E] transition-all hover:bg-[#F5EFEA] hover:text-[#2D241E] active:scale-95 dark:border-line-strong dark:bg-noir-800 dark:text-fg-secondary dark:hover:bg-noir-750 dark:hover:border-line-hover dark:hover:text-fg"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium font-Instrument text-[#2D241E] dark:text-fg mb-2">Order Detail</h1>
              <p className="text-xs font-medium text-[#8C7A6E] dark:text-fg-tertiary">
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
                className="flex items-center gap-1.5 rounded-xl border border-[#C5A893] bg-[#FAF5F0] px-4 py-2 text-xs font-semibold text-[#6F4723] transition-all hover:bg-[#F2E8DF] active:scale-[0.98] dark:border-copper-800 dark:bg-copper-900 dark:text-copper-300 dark:hover:bg-copper-800"
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
