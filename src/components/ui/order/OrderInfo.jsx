import { MapPin, CreditCard } from "lucide-react";

export function ShippingCard({ shippingAddress = {} }) {
  const { fullName, phone, country, city, address, postalCode } = shippingAddress;

  return (
    <div className="flex h-full min-h-[9rem] flex-col rounded-2xl border border-stone-200 bg-white p-6 dark:border-white/10 dark:bg-[#181B22]">
      <div className="mb-4 flex items-center gap-2 text-m font-semibold text-stone-500 dark:text-neutral-400">
        <MapPin className="h-4 w-4" />
        Shipping Address
      </div>

      <div className="flex flex-1 flex-col justify-center">
        <p className="text-m font-semibold text-stone-900 dark:text-neutral-100">{fullName}</p>
        <p className="text-sm text-stone-500 dark:text-neutral-400">
          {[address, city, country, postalCode].filter(Boolean).join(", ")}
        </p>
        <p className="text-xs text-stone-400 dark:text-neutral-500">{phone}</p>
      </div>
    </div>
  );
}

const formatDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : null;

export function PaymentCard({ order }) {
  const { paymentMethod, paymentStatus, subtotal, shippingFee, tax, discount, totalPrice, createdAt } = order;

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 dark:border-white/10 dark:bg-[#181B22]">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-m font-semibold text-stone-500 dark:text-neutral-400">
          <CreditCard className="h-5 w-5" />
          Payment
        </div>
        <span className="flex items-center gap-1.5 text-s text-stone-400 dark:text-neutral-500">
          Method:
          <span className="rounded-lg bg-stone-900 px-2.5 py-1 font-semibold uppercase text-white dark:bg-white dark:text-stone-900">
            {paymentMethod}
          </span>
        </span>
      </div>

      <dl className="mb-4 space-y-1.5 text-m">
        <div className="flex justify-between text-stone-500 dark:text-neutral-400">
          <dt>Subtotal</dt>
          <dd>EGP {Number(subtotal).toFixed(2)}</dd>
        </div>
        {shippingFee > 0 && (
          <div className="flex justify-between text-stone-500 dark:text-neutral-400">
            <dt>Shipping</dt>
            <dd>EGP {Number(shippingFee).toFixed(2)}</dd>
          </div>
        )}
        {tax > 0 && (
          <div className="flex justify-between text-stone-500 dark:text-neutral-400">
            <dt>Tax</dt>
            <dd>EGP {Number(tax).toFixed(2)}</dd>
          </div>
        )}
        {discount > 0 && (
          <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
            <dt>Discount</dt>
            <dd>-EGP {Number(discount).toFixed(2)}</dd>
          </div>
        )}
      </dl>

      <div className="flex flex-wrap items-end justify-between gap-2 border-t border-stone-100 pt-4 dark:border-white/5">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-stone-400 dark:text-neutral-500">
            Total
          </p>
          <p className="text-xs text-stone-400 dark:text-neutral-500">
            Placed on {formatDate(createdAt)} · {paymentStatus}
          </p>
        </div>
        <p className="text-2xl font-bold text-[#DE9E48]">EGP {Number(totalPrice).toFixed(2)}</p>
      </div>
    </div>
  );
}