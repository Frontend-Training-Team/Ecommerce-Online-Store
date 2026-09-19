import { Package } from "lucide-react";

export default function OrderItems({ items = [] }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5 dark:border-white/10 dark:bg-[#181B22]">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-m font-semibold text-stone-500 dark:text-neutral-400">
          <Package className="h-5 w-5" />
          Items
        </div>
        <span className="rounded-full bg-stone-100 px-3 py-1 text-sm font-semibold text-stone-600 dark:bg-white/5 dark:text-neutral-300">
          {items.length} {items.length === 1 ? "Product" : "Products"}
        </span>
      </div>

      {/* fixed height, scrolls internally if there are more items */}
      <ul className="order-items-scroll h-[15rem] divide-y divide-stone-100 overflow-y-auto pr-1 dark:divide-white/5">
        {items.map((item, idx) => (
          <li key={item.product ?? idx} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-stone-100 dark:bg-white/5">
              {item.image ? (
                <img src={item.image} alt="" className="h-full w-full object-cover" />
              ) : (
                <Package className="h-5 w-5 text-stone-400 dark:text-neutral-500" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-stone-900 dark:text-neutral-100">
                {item.name}
              </p>
              <p className="text-sm text-stone-400 dark:text-neutral-500">
                Qty {item.quantity} × EGP {Number(item.price).toFixed(2)}
              </p>
            </div>

            <span className="shrink-0 text-m font-bold text-stone-900 dark:text-neutral-100">
              EGP {Number(item.quantity * item.price).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}