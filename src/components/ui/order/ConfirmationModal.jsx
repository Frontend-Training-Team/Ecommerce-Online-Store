import { AlertTriangle } from "lucide-react";

/**
 * Generic, reusable confirmation modal — swap this for your existing shared
 * modal component if you already have one elsewhere in the project.
 */
export default function ConfirmationModal({
  open,
  title = "Are you sure?",
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Go Back",
  isLoading = false,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm rounded-2xl border border-stone-200 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-[#181B22]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-500/10">
          <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
        </div>

        <h2 className="mb-2 text-lg font-bold text-stone-900 dark:text-neutral-100">{title}</h2>
        {description && (
          <p className="mb-6 text-sm text-stone-500 dark:text-neutral-400">{description}</p>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 rounded-xl border border-stone-300 px-4 py-2.5 text-sm font-semibold text-stone-700 transition-colors hover:bg-stone-50 disabled:opacity-50 dark:border-white/10 dark:text-neutral-200 dark:hover:bg-white/5"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-50"
          >
            {isLoading ? "Cancelling…" : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}