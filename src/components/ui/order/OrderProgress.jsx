import { Check, X, TrendingUp } from "lucide-react";

const STEPS = [
  { key: "pending", label: "Pending" },
  { key: "confirmed", label: "Confirmed" },
  { key: "processing", label: "Processing" },
  { key: "shipped", label: "Shipped" },
  { key: "delivered", label: "Delivered" },
];

export default function OrderProgress({ order }) {
  const { status } = order;
  const isCancelled = status === "cancelled";

  const currentIndex = isCancelled ? 0 : STEPS.findIndex((s) => s.key === status);
  const completeCount = currentIndex + 1;

  const displaySteps = isCancelled
    ? [STEPS[0], { key: "cancelled", label: "Order Cancelled", isCancelPoint: true }]
    : STEPS;

  return (
    <div className="flex h-full min-h-0 flex-col rounded-2xl border border-stone-200 bg-white p-5 dark:border-white/10 dark:bg-[#181B22]">
      <div className="mb-5 flex shrink-0 items-center justify-between ">
        <div className="flex items-center gap-2 text-m font-semibold text-stone-500 dark:text-neutral-400">
          <TrendingUp className="h-5 w-5" />
          Order Progress
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            isCancelled
              ? "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
              : "bg-stone-100 text-stone-600 dark:bg-white/5 dark:text-neutral-300"
          }`}
        >
          {isCancelled ? "Cancelled" : `${completeCount} of ${STEPS.length} Complete`}
        </span>
      </div>

      <ol className="flex flex-1 min-h-0 flex-col">
        {displaySteps.map((step, i) => {
          const isLast = i === displaySteps.length - 1;
          const isDone = !step.isCancelPoint && i < completeCount;

          return (
            <li key={step.key} className={`relative flex min-h-0 items-start gap-4 ${isLast ? "" : "flex-1 pb-3"}`}>
              {!isLast && (
                <span
                  className={`absolute left-[15px] top-8 bottom-0 w-[2px] ${
                    isDone ? "bg-[#DE9E48]" : "bg-stone-200 dark:bg-white/10"
                  }`}
                  aria-hidden="true"
                />
              )}

              <span
                className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 ${
                  step.isCancelPoint
                    ? "border-red-500 bg-red-500 text-white"
                    : isDone
                    ? "border-[#DE9E48] bg-[#DE9E48] text-white"
                    : "border-stone-300 bg-white text-stone-300 dark:border-white/15 dark:bg-[#181B22] dark:text-white/20"
                }`}
              >
                {step.isCancelPoint ? (
                  <X className="h-4 w-4" strokeWidth={3} />
                ) : isDone ? (
                  <Check className="h-4 w-4" strokeWidth={3} />
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                )}
              </span>

              <div className="flex flex-1 flex-col justify-center pt-1">
                <span
                  className={`text-base font-semibold ${
                    step.isCancelPoint
                      ? "text-red-600 dark:text-red-400"
                      : isDone
                      ? "text-stone-900 dark:text-neutral-100"
                      : "text-stone-400 dark:text-neutral-500"
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
  );
}