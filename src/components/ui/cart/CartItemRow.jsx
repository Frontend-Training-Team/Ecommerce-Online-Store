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
      className={`flex shrink-0 flex-col gap-4 p-4 transition-colors sm:flex-row sm:items-center sm:justify-between sm:p-5 hover:bg-white/60 dark:hover:bg-noir-750 ${busy ? "opacity-60" : ""
        }`}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3.5">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#E8DDD4] bg-[#FAF5F0] dark:border-line dark:bg-noir-750">
          {item.image ? (
            <img src={item.image} alt="" className="h-full w-full object-cover dark:brightness-[.92]" />
          ) : (
            <Package className="h-5 w-5 text-[#8C7A6E] dark:text-fg-tertiary" />
          )}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-[#2D241E] dark:text-fg">{item.name}</p>
          <p className="mt-0.5 text-xs font-medium text-[#8C7A6E] dark:text-fg-tertiary">
            EGP {Number(item.price).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="ml-auto flex shrink-0 items-center gap-4 sm:gap-5">
        <div className="flex items-center rounded-lg border border-[#D8C2B6] bg-[#F5EFEA] p-0.5 dark:border-line-strong dark:bg-noir-750">
          <button
            type="button"
            onClick={handleDecrement}
            disabled={busy || item.quantity <= 1}
            aria-label="Decrease quantity"
            className="flex h-7 w-7 items-center justify-center rounded text-[#5C4A3E] transition-colors hover:bg-white disabled:opacity-40 disabled:hover:bg-transparent dark:text-fg-secondary dark:hover:bg-noir-650 dark:disabled:hover:bg-transparent"
          >
            <Minus className="h-3.5 w-3.5" strokeWidth={2.5} />
          </button>
          <span className="w-7 text-center text-xs font-semibold text-[#2D241E] dark:text-fg">
            {item.quantity}
          </span>
          <button
            type="button"
            onClick={handleIncrement}
            disabled={busy}
            aria-label="Increase quantity"
            className="flex h-7 w-7 items-center justify-center rounded text-[#5C4A3E] transition-colors hover:bg-white disabled:opacity-40 dark:text-fg-secondary dark:hover:bg-noir-650 dark:disabled:hover:bg-transparent"
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
          </button>
        </div>

        <div className="w-28 text-right">
          <span className="block text-sm font-bold text-[#2D241E] dark:text-fg">
            EGP {Number(item.price * item.quantity).toFixed(2)}
          </span>
          <button
            type="button"
            onClick={handleRemove}
            disabled={busy}
            aria-label={`Remove ${item.name}`}
            className="mt-1 inline-flex items-center text-[#A3968F] transition-colors hover:text-red-500 disabled:opacity-40 dark:text-fg-tertiary dark:hover:text-state-danger"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </li>
  );
}