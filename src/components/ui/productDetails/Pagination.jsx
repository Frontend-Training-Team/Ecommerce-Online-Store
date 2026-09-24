import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  className = "",
}) {
  if (totalPages <= 0) return null;

  const formattedCurrent = String(currentPage).padStart(2, "0");
  const formattedTotal = String(totalPages).padStart(2, "0");

  const handlePrev = () => {
    if (currentPage > 1 && onPageChange) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages && onPageChange) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div
      className={`flex items-center justify-end gap-2.5 sm:gap-3 select-none ${className}`}
      aria-label="Pagination Navigation"
    >
      {/* Current Page Box */}
      <div
        className="h-10 min-w-10 px-3.5 bg-[#F1ECE6] dark:bg-noir-750 text-[#1E1E1E] dark:text-fg rounded-lg flex items-center justify-center font-Inter font-semibold text-sm shadow-2xs border border-gray-200/40 dark:border-line"
        aria-current="page"
      >
        <span>{formattedCurrent}</span>
      </div>

      {/* Total Pages Count */}
      <span className="text-xs sm:text-sm font-medium text-[#706861] dark:text-fg-tertiary font-Inter">
        of {formattedTotal}
      </span>

      {/* Prev Arrow Button */}
      <button
        type="button"
        onClick={handlePrev}
        disabled={currentPage <= 1}
        aria-label="Previous Page"
        className="w-10 h-10 rounded-lg bg-[#F1ECE6] dark:bg-noir-750 text-[#1E1E1E] dark:text-fg hover:bg-[#E4DDD4] dark:hover:bg-noir-650 disabled:opacity-40 disabled:hover:bg-[#F1ECE6] dark:disabled:hover:bg-noir-750 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer border border-gray-200/40 dark:border-line active:scale-95"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Next Arrow Button */}
      <button
        type="button"
        onClick={handleNext}
        disabled={currentPage >= totalPages}
        aria-label="Next Page"
        className="w-10 h-10 rounded-lg bg-[#F1ECE6] dark:bg-noir-750 text-[#1E1E1E] dark:text-fg hover:bg-[#E4DDD4] dark:hover:bg-noir-650 disabled:opacity-40 disabled:hover:bg-[#F1ECE6] dark:disabled:hover:bg-noir-750 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer border border-gray-200/40 dark:border-line active:scale-95"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
