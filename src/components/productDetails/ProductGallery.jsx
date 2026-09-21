import { useState } from "react";
import { ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";

export default function ProductGallery({
  images = [],
  productName = "Product",
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const normalizedImages = images.map((img) => (typeof img === "string" ? img : img?.url)).filter(Boolean);

  const activeImage = normalizedImages[selectedIndex] || "";

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? normalizedImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === normalizedImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className="order-1 lg:order-none lg:col-start-1 lg:row-start-1 w-full h-full min-h-0 relative">
        <div className="relative lg:absolute lg:inset-0 w-full aspect-square lg:aspect-auto bg-[#F7F5F2] rounded-3xl 
        overflow-hidden border border-[#EDE8E3] flex items-center justify-center group">
          {activeImage ? (
            <img
              src={activeImage}
              alt={`${productName} - view ${selectedIndex + 1}`}
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-[#A69B91] gap-2">
              <ImageIcon className="w-16 h-16 stroke-1" />
              <span className="text-sm font-medium">No image available</span>
            </div>
          )}
        </div>
      </div>

      {normalizedImages.length > 1 && (
        <div className="order-2 lg:order-none lg:col-start-1 lg:row-start-2 relative flex items-center justify-center gap-3 pt-1">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous image"
            className="w-8 h-8 rounded-full bg-white border border-[#D6CFC7] text-[#4A423C] hover:bg-[#FAF8F5] 
            hover:text-[#7E4A2D] flex items-center justify-center shadow-sm transition-colors cursor-pointer flex-shrink-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3 overflow-x-auto py-1 scrollbar-none max-w-[425px]">
            {normalizedImages.map((imgUrl, index) => {
              const isSelected = selectedIndex === index;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl overflow-hidden 
                  border-2 transition-all cursor-pointer flex-shrink-0 bg-[#F7F5F2] ${isSelected
                      ? "border-[#7E4A2D] shadow-md scale-105 ring-2 ring-[#7E4A2D]/20"
                      : "border-transparent hover:border-[#D6CFC7] opacity-75 hover:opacity-100"
                    }`}
                >
                  <img
                    src={imgUrl}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next image"
            className="w-8 h-8 rounded-full bg-white border border-[#D6CFC7] text-[#4A423C] hover:bg-[#FAF8F5] 
            hover:text-[#7E4A2D] flex items-center justify-center shadow-sm transition-colors cursor-pointer flex-shrink-0"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </>
  );
}
