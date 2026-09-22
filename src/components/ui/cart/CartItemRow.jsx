import { useState } from "react";
import { Minus, Plus, Trash2, Package } from "lucide-react";
import toast from "react-hot-toast";

export default function CartItemRow({ item, onQuantityChange, onRemove }) {
  const [busy, setBusy] = useState(false);

  const handleDecrement = async () => {
    if (busy || item.quantity <= 1) return;
    setBusy(true);
    try {
      await onQuantityChange(item.product, item.quantity - 1);
    } catch {
      toast.error("Couldn't update quantity");
    } finally {
      setBusy(false);
    }
  };

  const handleIncrement = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await onQuantityChange(item.product, item.quantity + 1);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Couldn't update quantity");
    } finally {
      setBusy(false);
    }
  };

  const handleRemove = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await onRemove(item.product);
    } catch {
      toast.error("Couldn't remove item");
      setBusy(false);
    }
  };

  return (
    <li
      className={`flex shrink-0 flex-col gap-4 p-4 transition-colors sm:flex-row sm:items-center sm:justify-between sm:p-5 hover:bg-white/60 dark:hover:bg-white/[0.03] ${
        busy ? "opacity-60" : ""
      }`}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3.5">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#E8DDD4] bg-[#FAF5F0] dark:border-[#3e352f] dark:bg-[#2a2420]">
          {item.image ? (
            <img src={item.image} alt="" className="h-full w-full object-cover" />
          ) : (
            <Package className="h-5 w-5 text-[#8C7A6E] dark:text-[#cca474]" />
          )}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-[#2D241E] dark:text-[#f3ede6]">{item.name}</p>
          <p className="mt-0.5 text-xs font-medium text-[#8C7A6E] dark:text-[#a38f7d]">
            EGP {Number(item.price).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-6 sm:gap-7">
        <div className="flex items-center rounded-lg border border-[#D8C2B6] bg-[#F5EFEA] p-0.5 dark:border-[#3a322d] dark:bg-[#26201d]">
          <button
            type="button"
            onClick={handleDecrement}
            disabled={busy || item.quantity <= 1}
            aria-label="Decrease quantity"
            className="flex h-7 w-7 items-center justify-center rounded text-[#5C4A3E] transition-colors hover:bg-white disabled:opacity-40 disabled:hover:bg-transparent dark:text-[#c5b6a3] dark:hover:bg-[#342823]"
          >
            <Minus className="h-3.5 w-3.5" strokeWidth={2.5} />
          </button>
          <span className="w-7 text-center text-xs font-semibold text-[#2D241E] dark:text-[#f3ede6]">
            {item.quantity}
          </span>
          <button
            type="button"
            onClick={handleIncrement}
            disabled={busy}
            aria-label="Increase quantity"
            className="flex h-7 w-7 items-center justify-center rounded text-[#5C4A3E] transition-colors hover:bg-white disabled:opacity-40 dark:text-[#c5b6a3] dark:hover:bg-[#342823]"
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
          </button>
        </div>

        <div className="w-24 text-right">
          <span className="block text-sm font-bold text-[#2D241E] dark:text-[#f3ede6]">
            EGP {Number(item.price * item.quantity).toFixed(2)}
          </span>
          <button
            type="button"
            onClick={handleRemove}
            disabled={busy}
            aria-label={`Remove ${item.name}`}
            className="mt-1 inline-flex items-center text-[#A3968F] transition-colors hover:text-red-500 disabled:opacity-40 dark:text-[#8f7e71] dark:hover:text-red-400"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </li>
  );
}