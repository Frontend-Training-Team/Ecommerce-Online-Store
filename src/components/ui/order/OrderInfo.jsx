import { MapPin, CreditCard } from "lucide-react";

export function ShippingCard({ shippingAddress = {} }) {
  const { fullName, phone, country, city, address, postalCode } = shippingAddress;

  return (
    <div className="flex h-full min-h-[9rem] flex-col rounded-2xl border border-[#E8DDD4] bg-[#FAF7F3] p-5 shadow-sm dark:border-[#2e2724] dark:bg-[#1c1816] dark:shadow-lg dark:shadow-black/20">
      <div className="mb-2.5 flex items-center gap-2 border-b border-[#EBE1D7] pb-2.5 text-xs font-bold uppercase tracking-wider text-[#2D241E] dark:border-[#2e2724] dark:text-[#c5b6a3]">
        <MapPin className="h-4 w-4 text-[#8C7A6E] dark:text-[#cca474]" />
        Shipping Address
      </div>

      <div className="flex flex-1 flex-col justify-center gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold text-[#2D241E] dark:text-[#f3ede6]">{fullName}</p>
          <p className="text-sm text-[#5C4A3E] dark:text-[#c5b6a3]">
            {[address, city, country, postalCode].filter(Boolean).join(", ")}
          </p>
        </div>
        {phone && (
          <span className="w-fit rounded-md border border-transparent bg-[#EFE6DC] px-2.5 py-1 font-mono text-xs font-semibold text-[#8C7A6E] dark:border-[#3a322d] dark:bg-[#25201c] dark:text-[#a38f7d]">
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
    <div className="rounded-2xl border border-[#E8DDD4] bg-[#FAF7F3] p-5 shadow-sm dark:border-[#2e2724] dark:bg-[#1c1816] dark:shadow-lg dark:shadow-black/20">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2D241E] dark:text-[#c5b6a3]">
          <CreditCard className="h-4 w-4 text-[#8C7A6E] dark:text-[#cca474]" />
          Payment
        </div>
        <span className="flex items-center gap-1.5 text-xs text-[#8C7A6E] dark:text-[#a38f7d]">
          Method:
          <span className="rounded border border-[#DFC9BA] bg-[#EFE6DC] px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#6F4723] dark:border-[#43362c] dark:bg-[#29221d] dark:text-[#f3ede6]">
            {paymentMethod}
          </span>
        </span>
      </div>

      <dl className="mb-4 space-y-1.5 text-sm">
        <div className="flex justify-between text-[#8C7A6E] dark:text-[#a38f7d]">
          <dt>Subtotal</dt>
          <dd>EGP {Number(subtotal).toFixed(2)}</dd>
        </div>
        {shippingFee > 0 && (
          <div className="flex justify-between text-[#8C7A6E] dark:text-[#a38f7d]">
            <dt>Shipping</dt>
            <dd>EGP {Number(shippingFee).toFixed(2)}</dd>
          </div>
        )}
        {tax > 0 && (
          <div className="flex justify-between text-[#8C7A6E] dark:text-[#a38f7d]">
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

      <div className="flex flex-wrap items-end justify-between gap-2 border-t border-[#EBE1D7] pt-4 dark:border-[#2e2724]">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#8C7A6E] dark:text-[#a38f7d]">
            Total
          </p>
          <p className="text-xs text-[#A3968F] dark:text-[#8f7e71]">
            Placed on {formatDate(createdAt)} · {paymentStatus}
          </p>
        </div>
        <p className="bg-gradient-to-r from-[#8A4C1E] to-[#A76434] bg-clip-text text-2xl font-extrabold tracking-tight text-transparent dark:bg-none dark:text-[#fcba69]">
          EGP {Number(totalPrice).toFixed(2)}
        </p>
      </div>
    </div>
  );
}