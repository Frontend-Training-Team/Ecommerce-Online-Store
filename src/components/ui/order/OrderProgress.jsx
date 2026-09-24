import { Check, X, TrendingUp } from "lucide-react";

const STEPS = [
  { key: "pending", label: "Pending" },
  { key: "confirmed", label: "Confirmed" },
  { key: "processing", label: "Processing" },
  { key: "shipped", label: "Shipped" },
  { key: "delivered", label: "Delivered" },
];

export default function OrderProgress({ order, estimatedArrival = "2-4 Business Days" }) {
  const { status } = order;
  const isCancelled = status === "cancelled";
  const isDelivered = status === "delivered";

  const currentIndex = isCancelled ? 0 : STEPS.findIndex((s) => s.key === status);
  const completeCount = currentIndex + 1;

  const displaySteps = isCancelled
    ? [STEPS[0], { key: "cancelled", label: "Order Cancelled", isCancelPoint: true }]
    : STEPS;

  return (
    <div className="flex h-full min-h-0 flex-col rounded-2xl border border-[#E8DDD4] bg-[#FAF7F3] p-5 shadow-sm dark:border-line dark:bg-noir-800 dark:shadow-none">
      <div className="mb-4 flex shrink-0 items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2D241E] dark:text-fg-secondary">
          <TrendingUp className="h-4 w-4 text-[#8C7A6E] dark:text-fg-tertiary" />
          Order Progress
        </div>
        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold ${isCancelled
              ? "border-red-200 bg-red-100 text-red-700 dark:border-state-danger/25 dark:bg-state-danger/10 dark:text-state-danger"
              : "border-transparent bg-[#EFE6DC] text-[#8C7A6E] dark:border-copper-800 dark:bg-copper-900 dark:text-copper-300"
            }`}
        >
          {isCancelled ? "Cancelled" : `${completeCount} of ${STEPS.length} Complete`}
        </span>
      </div>

      <div className="flex flex-col lg:flex-1 lg:min-h-0">
        <div className="lg:h-[60%] lg:min-h-0">
          <ol className="flex flex-col lg:h-full">
            {displaySteps.map((step, i) => {
              const isLast = i === displaySteps.length - 1;
              const isDone = !step.isCancelPoint && i < completeCount;

              return (
                <li
                  key={step.key}
                  className={`relative flex min-h-12 items-start gap-3 ${isLast ? "" : "flex-1"}`}
                >
                  {!isLast && (
                    <span
                      className={`absolute left-3.25 top-7 bottom-0 w-0.5 ${isDone ? "bg-[#8A4C1E] dark:bg-copper-500" : "bg-[#E2D4C7] dark:bg-noir-650"
                        }`}
                      aria-hidden="true"
                    />
                  )}

                  <span
                    className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 ring-4 ${step.isCancelPoint
                        ? "border-red-500 bg-red-500 text-white ring-[#FAF7F3] dark:border-state-danger-solid dark:bg-state-danger-solid dark:ring-noir-800"
                        : isDone
                          ? "border-[#8A4C1E] bg-[#8A4C1E] text-white ring-[#FAF7F3] dark:border-copper-500 dark:bg-copper-500 dark:text-fg-on-accent dark:ring-noir-800"
                          : "border-[#C5B3A5] bg-white text-[#C5B3A5] ring-[#FAF7F3] dark:border-line-strong dark:bg-noir-800 dark:text-fg-disabled dark:ring-noir-800"
                      }`}
                  >
                    {step.isCancelPoint ? (
                      <X className="h-3.5 w-3.5" strokeWidth={3} />
                    ) : isDone ? (
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    )}
                  </span>

                  <div className="flex flex-1 flex-col justify-center pt-1">
                    <span
                      className={`text-sm font-semibold ${step.isCancelPoint
                          ? "text-red-600 dark:text-state-danger"
                          : isDone
                            ? "text-[#2D241E] dark:text-fg"
                            : "text-[#A3968F] dark:text-fg-tertiary"
                        }`}
                    >
                      {step.label}
                    </span>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {!isCancelled && !isDelivered && (
          <div className="mt-4 lg:mt-auto flex items-center justify-between border-t border-[#EBE1D7] pt-3 dark:border-line-subtle">
            <span className="text-s text-[#8C7A6E] dark:text-fg-tertiary">Estimated arrival</span>
            <span className="text-xs font-bold text-[#2D241E] dark:text-fg">{estimatedArrival}</span>
          </div>
        )}
      </div>
    </div>
  );
}