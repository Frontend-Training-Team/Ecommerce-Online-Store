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
        className="h-10 min-w-10 px-3.5 bg-[#F1ECE6] dark:bg-slate-800 text-[#1E1E1E] dark:text-white rounded-lg flex items-center justify-center font-Inter font-semibold text-sm shadow-2xs border border-gray-200/40 dark:border-slate-700"
        aria-current="page"
      >
        <span>{formattedCurrent}</span>
      </div>

      {/* Total Pages Count */}
      <span className="text-xs sm:text-sm font-medium text-[#706861] dark:text-slate-400 font-Inter">
        of {formattedTotal}
      </span>

      {/* Prev Arrow Button */}
      <button
        type="button"
        onClick={handlePrev}
        disabled={currentPage <= 1}
        aria-label="Previous Page"
        className="w-10 h-10 rounded-lg bg-[#F1ECE6] dark:bg-slate-800 text-[#1E1E1E] dark:text-white hover:bg-[#E4DDD4] dark:hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-[#F1ECE6] dark:disabled:hover:bg-slate-800 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer border border-gray-200/40 dark:border-slate-700 active:scale-95"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Next Arrow Button */}
      <button
        type="button"
        onClick={handleNext}
        disabled={currentPage >= totalPages}
        aria-label="Next Page"
        className="w-10 h-10 rounded-lg bg-[#F1ECE6] dark:bg-slate-800 text-[#1E1E1E] dark:text-white hover:bg-[#E4DDD4] dark:hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-[#F1ECE6] dark:disabled:hover:bg-slate-800 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer border border-gray-200/40 dark:border-slate-700 active:scale-95"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
