import { AlertTriangle } from "lucide-react";

export default function ConfirmationModal({
  open,
  title = "Are you sure?",
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  isLoading = false,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirmation-modal-title"
      aria-describedby={description ? "confirmation-modal-description" : undefined}
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm rounded-2xl border border-[#E8DDD4] bg-[#FAF7F3] p-6 shadow-xl dark:border-line dark:bg-noir-700 dark:shadow-noir-lg"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="mb-2 flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-state-danger/10">
            <AlertTriangle className="h-5 w-5 text-red-600 dark:text-state-danger" />
          </div>
          <h2 id="confirmation-modal-title" className="text-lg font-bold text-[#2D241E] dark:text-fg">
            {title}
          </h2>
        </div>

        {description && (
          <p
            id="confirmation-modal-description"
            className="mb-6 text-sm text-[#8C7A6E] dark:text-fg-tertiary"
          >
            {description}
          </p>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 rounded-xl border border-[#D8C2B6] bg-white px-4 py-2.5 text-sm font-semibold text-[#5C4A3E] transition-colors hover:bg-[#F5EFEA] disabled:opacity-50 dark:border-line-strong dark:bg-noir-750 dark:text-fg-secondary dark:hover:bg-noir-650 dark:hover:text-fg"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 rounded-xl border border-[#C5A893] bg-[#FAF5F0] px-4 py-2.5 text-sm font-semibold text-[#6F4723] transition-colors hover:bg-[#F2E8DF] disabled:opacity-50 dark:border-copper-800 dark:bg-copper-900 dark:text-copper-300 dark:hover:bg-copper-800"
          >
            {isLoading ? "Cancelling…" : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}