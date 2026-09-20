import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft, XCircle } from "lucide-react";
import { getSingleOrder, patchCancelOrder } from "../api/orders.api";
import OrderProgress from "../components/ui/order/OrderProgress";
import OrderItems from "../components/ui/order/OrderItems";
import { ShippingCard, PaymentCard } from "../components/ui/order/OrderInfo";
import ConfirmationModal from "../components/ui/order/ConfirmationModal";

const STATUS_BADGE_STYLES = {
  pending: "bg-stone-100 text-stone-700 dark:bg-white/5 dark:text-neutral-300",
  confirmed: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  processing: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  shipped: "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400",
  delivered: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  cancelled: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
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
      navigate("/not-found", { replace: true });
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
      <div className="flex min-h-[60vh] w-full items-center justify-center bg-[#FAF7F2] dark:bg-[#0E0F13]">
        <p className="text-sm text-stone-400 dark:text-neutral-500">Loading order…</p>
      </div>
    );
  }

  const canCancel = CANCELLABLE_STATUSES.includes(order.status);
  const isCancelled = order.status === "cancelled";

  return (
    <div className="min-h-full w-full bg-[#FAF7F2] px-4 py-6 dark:bg-[#0E0F13] md:px-8 lg:px-12">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <button
              type="button"
              onClick={() => navigate("/profile/orders")}
              aria-label="Back to orders"
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-stone-200 bg-white text-stone-700 transition-colors hover:bg-stone-50 dark:border-white/10 dark:bg-white/5 dark:text-neutral-200 dark:hover:bg-white/10"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-stone-900 dark:text-neutral-100 md:text-3xl">
                Order Details
              </h1>
              <p className="text-m text-stone-400 dark:text-neutral-500">
                Order #{order._id?.slice(-8).toUpperCase()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`rounded-full px-4 py-2 text-sm font-bold uppercase tracking-wide ${
                STATUS_BADGE_STYLES[order.status] ?? STATUS_BADGE_STYLES.pending
              }`}
            >
              {order.status}
            </span>

            {canCancel && (
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 rounded-full border border-red-200 px-4 py-1.5 text-sm font-bold text-red-600 transition-colors hover:bg-red-50 dark:border-red-500/20 dark:text-red-400 dark:hover:bg-red-500/10"
              >
                <XCircle className="h-5 w-5" />
                Cancel Order
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
            {!isCancelled && (
              <div className="lg:w-7/12">
                <OrderProgress order={order} />
              </div>
            )}

            <div className={`flex flex-col gap-4 ${isCancelled ? "lg:w-full" : "lg:w-5/12"}`}>
              <div>
                <OrderItems items={order.items} />
              </div>
              <div className="lg:flex-1">
                <ShippingCard shippingAddress={order.shippingAddress} />
              </div>
            </div>
          </div>

          <div>
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