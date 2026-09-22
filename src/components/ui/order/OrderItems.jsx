import { Package } from "lucide-react";

export default function OrderItems({ items = [] }) {
  return (
    <div className="rounded-2xl border border-[#E8DDD4] bg-[#FAF7F3] p-5 shadow-sm dark:border-[#2e2724] dark:bg-[#1c1816] dark:shadow-lg dark:shadow-black/20">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2D241E] dark:text-[#c5b6a3]">
          <Package className="h-4 w-4 text-[#8C7A6E] dark:text-[#cca474]" />
          Items
        </div>
        <span className="rounded-full border border-transparent bg-[#EFE6DC] px-2.5 py-0.5 text-xs font-semibold text-[#7B542B] dark:border-[#3a322d] dark:bg-[#25201c] dark:text-[#c5b6a3]">
          {items.length} {items.length === 1 ? "Product" : "Products"}
        </span>
      </div>

      {/* fixed height, scrolls internally if there are more items */}
      <ul className="order-items-scroll h-[15rem] divide-y divide-[#EAE1DB] overflow-y-auto pr-1 dark:divide-[#2e2724]">
        {items.map((item, idx) => (
          <li
            key={item.product ?? idx}
            className="flex items-center gap-3.5 rounded-xl border border-[#EAE1DB] bg-white p-3 my-1.5 first:mt-0 last:mb-0 transition-colors hover:border-[#D8C2B6] dark:border-[#332b26] dark:bg-[#221d1a] dark:hover:border-[#4d4038]"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#E8DDD4] bg-[#FAF5F0] dark:border-[#3e352f] dark:bg-[#2a2420]">
              {item.image ? (
                <img src={item.image} alt="" className="h-full w-full object-cover" />
              ) : (
                <Package className="h-4 w-4 text-[#8C7A6E] dark:text-[#cca474]" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-[#2D241E] dark:text-[#f3ede6]">
                {item.name}
              </p>
              <p className="text-xs text-[#8C7A6E] dark:text-[#a38f7d]">
                Qty {item.quantity} × EGP {Number(item.price).toFixed(2)}
              </p>
            </div>

            <span className="shrink-0 text-sm font-bold text-[#2D241E] dark:text-[#f3ede6]">
              EGP {Number(item.quantity * item.price).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}