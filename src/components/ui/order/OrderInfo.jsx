import { MapPin, CreditCard } from "lucide-react";

export function ShippingCard({ shippingAddress = {} }) {
  const { fullName, phone, country, city, address, postalCode } = shippingAddress;

  return (
    <div className="flex h-full min-h-[9rem] flex-col rounded-2xl border border-[#E8DDD4] bg-[#FAF7F3] p-5 shadow-sm dark:border-line dark:bg-noir-800 dark:shadow-none">
      <div className="mb-2.5 flex items-center gap-2 border-b border-[#EBE1D7] pb-2.5 text-xs font-bold uppercase tracking-wider text-[#2D241E] dark:border-line-subtle dark:text-fg-secondary">
        <MapPin className="h-4 w-4 text-[#8C7A6E] dark:text-fg-tertiary" />
        Shipping Address
      </div>

      <div className="flex flex-1 flex-col justify-center gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold text-[#2D241E] dark:text-fg">{fullName}</p>
          <p className="text-sm text-[#5C4A3E] dark:text-fg-secondary">
            {[address, city, country, postalCode].filter(Boolean).join(", ")}
          </p>
        </div>
        {phone && (
          <span className="w-fit rounded-md border border-transparent bg-[#EFE6DC] px-2.5 py-1 font-mono text-xs font-semibold text-[#8C7A6E] dark:border-line-strong dark:bg-noir-700 dark:text-fg-tertiary">
            {phone}
          </span>
        )}
      </div>
    </div>
  );
}

const formatDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : null;

export function PaymentCard({ order }) {
  const { paymentMethod, paymentStatus, subtotal, shippingFee, tax, discount, totalPrice, createdAt } = order;

  return (
    <div className="rounded-2xl border border-[#E8DDD4] bg-[#FAF7F3] p-5 shadow-sm dark:border-line dark:bg-noir-800 dark:shadow-none">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2D241E] dark:text-fg-secondary">
          <CreditCard className="h-4 w-4 text-[#8C7A6E] dark:text-fg-tertiary" />
          Payment
        </div>
        <span className="flex items-center gap-1.5 text-xs text-[#8C7A6E] dark:text-fg-tertiary">
          Method:
          <span className="rounded border border-[#DFC9BA] bg-[#EFE6DC] px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#6F4723] dark:border-line-strong dark:bg-noir-700 dark:text-copper-400">
            {paymentMethod}
          </span>
        </span>
      </div>

      <dl className="mb-4 space-y-1.5 text-sm">
        <div className="flex justify-between text-[#8C7A6E] dark:text-fg-secondary">
          <dt>Subtotal</dt>
          <dd>EGP {Number(subtotal).toFixed(2)}</dd>
        </div>
        {shippingFee > 0 && (
          <div className="flex justify-between text-[#8C7A6E] dark:text-fg-secondary">
            <dt>Shipping</dt>
            <dd>EGP {Number(shippingFee).toFixed(2)}</dd>
          </div>
        )}
        {tax > 0 && (
          <div className="flex justify-between text-[#8C7A6E] dark:text-fg-secondary">
            <dt>Tax</dt>
            <dd>EGP {Number(tax).toFixed(2)}</dd>
          </div>
        )}
        {discount > 0 && (
          <div className="flex justify-between text-emerald-600 dark:text-state-success">
            <dt>Discount</dt>
            <dd>-EGP {Number(discount).toFixed(2)}</dd>
          </div>
        )}
      </dl>

      <div className="flex flex-wrap items-end justify-between gap-2 border-t border-[#EBE1D7] pt-4 dark:border-line-subtle">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#8C7A6E] dark:text-fg-tertiary">
            Total
          </p>
          <p className="text-xs text-[#A3968F] dark:text-fg-tertiary">
            Placed on {formatDate(createdAt)} · {paymentStatus}
          </p>
        </div>
        <p className="bg-gradient-to-r from-[#8A4C1E] to-[#A76434] bg-clip-text text-2xl font-extrabold tracking-tight text-transparent dark:bg-none dark:text-copper-400">
          EGP {Number(totalPrice).toFixed(2)}
        </p>
      </div>
    </div>
  );
}