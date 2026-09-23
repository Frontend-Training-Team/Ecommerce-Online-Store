import { useState, useEffect } from 'react';
import { Filter, ChevronDown, X, ArrowUp, ArrowDown, Sparkles, Star } from 'lucide-react';

export default function ProductFilterSidebar({
  selectedCategory,
  setSelectedCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  sortBy,
  setSortBy,
  onClearFilters,
  isOpen,
  onClose,
}) {
  const [categories, setCategories] = useState([{ label: 'All', value: 'All' }]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);

  const sortBadges = {
    lowToHigh: { label: 'Price', icon: <ArrowUp className="w-3 h-3" /> },
    highToLow: { label: 'Price', icon: <ArrowDown className="w-3 h-3" /> },
    newest: { label: 'Newest', icon: <Sparkles className="w-3 h-3" /> },
    topRated: { label: 'Top Rated', icon: <Star className="w-3 h-3" /> },
  };

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoadingCategories(true);
      try {
        const response = await fetch('https://e-commerce-api-3wara.vercel.app/products?limit=100');
        const data = await response.json();
        const fetchedProducts = data.products || (Array.isArray(data) ? data : []);

        const extractedCategories = fetchedProducts
          .map((p) => (p.category || p.categoryName || '').trim())
          .filter(Boolean);

        const uniqueCategories = [...new Set(extractedCategories)];

        const formattedCategories = uniqueCategories.map((cat) => ({
          label: cat,
          value: cat,
        }));

        setCategories([
          { label: 'All', value: 'All' },
          ...formattedCategories,
        ]);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const hasActiveFilters = selectedCategory !== 'All' || sortBy !== 'default';

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-slate-900 p-5 overflow-y-auto transition-transform 
          duration-300 ease-in-out lg:static lg:w-full lg:p-0 lg:bg-transparent dark:lg:bg-transparent lg:overflow-visible lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="space-y-5 text-slate-800 dark:text-slate-100 font-sans">

          {/* Main Title with Filter Icon */}
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2 text-[24px] font-Inter dark:text-white">
              <Filter className="w-5 h-5 fill-black dark:fill-white" />
              <span>Filters</span>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="lg:hidden p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <hr className="border-slate-200 dark:border-slate-800" />

          {/* Applied Filters Section */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[16px] font-semibold text-inter dark:text-slate-100">Applied Filters</span>
              {hasActiveFilters && (
                <button
                  onClick={onClearFilters}
                  className="text-[14px] text-inter hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 underline transition cursor-pointer"
                >
                  clear all
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-1.5 min-h-[32px]">
              {selectedCategory !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded text-xs font-medium">
                  {selectedCategory}
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className="hover:text-red-500 transition ml-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {sortBy !== 'default' && sortBadges[sortBy] && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded text-xs font-medium">
                  {sortBadges[sortBy].icon}
                  <span>{sortBadges[sortBy].label}</span>
                  <button
                    onClick={() => setSortBy('default')}
                    className="hover:text-red-500 transition ml-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {!hasActiveFilters && (
                <span className="text-[12px] text-inter dark:text-slate-500 italic">No filters applied</span>
              )}
            </div>
          </div>

          <hr className="border-slate-200 dark:border-slate-800" />

          {/* Categories Section */}
          <div>
            <h3 className="text-[16px] font-semibold text-inter dark:text-slate-100 mb-3">Category</h3>

            {isLoadingCategories ? (
              <div className="space-y-2.5 animate-pulse">
                <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-3/4"></div>
                <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-1/2"></div>
                <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-2/3"></div>
              </div>
            ) : (
              <div className="space-y-2.5 text-sm text-slate-700 dark:text-slate-300">
                {categories.map((cat) => {
                  const isChecked = selectedCategory.toLowerCase() === cat.value.toLowerCase();
                  return (
                    <label
                      key={cat.value}
                      className="flex items-center gap-2.5 cursor-pointer select-none text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {
                          setSelectedCategory(isChecked ? 'All' : cat.value);
                        }}
                        className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-slate-900 focus:ring-slate-500 dark:bg-slate-800 dark:checked:bg-slate-100 cursor-pointer"
                      />
                      <span className="capitalize">{cat.label}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          <hr className="border-slate-200 dark:border-slate-800" />

          {/* Price Range Section */}
          <div>
            <h3 className="text-[16px] font-semibold text-inter dark:text-slate-100 mb-3">Price Range</h3>
            <div className="flex items-center gap-3 w-[240px] h-[40px]">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full px-3 py-2  dark:bg-slate-800 border border-[#9F9F9F] dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 rounded-lg text-sm focus:outline-none focus:border-slate-400 min-w-0 shadow-xs"
              />
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full px-3 py-2  dark:bg-slate-800 border border-[#9F9F9F] dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 rounded-lg text-sm focus:outline-none focus:border-slate-400 min-w-0 shadow-xs"
              />
            </div>
          </div>

          <hr className="border-slate-200 dark:border-slate-800" />

          {/* Sort By Section */}
          <div>
            <h3 className="text-[16px] font-semibold text-inter dark:text-slate-100 mb-3">Sort By</h3>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2  dark:bg-slate-800 border border-[#9F9F9F] dark:border-slate-700 rounded-lg text-sm appearance-none
                focus:outline-none focus:border-slate-400 text-slate-500 dark:text-slate-300 cursor-pointer shadow-xs pr-8"
              >
                <option value="default">Default</option>
                <option value="newest">Newest</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
                <option value="topRated">Top Rated</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}