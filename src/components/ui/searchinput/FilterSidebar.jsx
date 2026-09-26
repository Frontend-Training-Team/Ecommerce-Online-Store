import { useState, useEffect } from 'react';
import { ChevronDown, X, ArrowUp, ArrowDown, Sparkles, Star } from 'lucide-react';
import { getAllProducts } from '../../../api/products.api';

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
        const response = await getAllProducts({limit:100});
        const data = response.data;

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
          className="fixed inset-0 bg-black/40 dark:bg-black/70 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-noir-850 p-5 overflow-y-auto transition-transform
          duration-300 ease-in-out lg:static lg:w-full lg:p-0 lg:bg-transparent dark:lg:bg-transparent lg:overflow-visible lg:translate-x-0  
          ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="space-y-5 text-slate-800 dark:text-fg font-sans">

          {/* Main Title with Filter Icon */}
          <div className="flex items-center justify-between pb-1">

            {onClose && (
              <button
                onClick={onClose}
                className="lg:hidden p-1 text-slate-400 dark:text-fg-tertiary hover:text-slate-600 dark:hover:text-fg transition"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* <hr className="border-slate-200 dark:border-line-subtle" /> */}

          {/* Applied Filters Section */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[16px] font-semibold text-inter dark:text-fg">Applied Filters</span>
              {hasActiveFilters && (
                <button
                  onClick={onClearFilters}
                  className="text-[14px] text-inter hover:text-slate-800 dark:text-fg-tertiary dark:hover:text-fg underline transition cursor-pointer"
                >
                  Clear all
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-1.5 min-h-8">
              {selectedCategory !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 dark:bg-noir-700 text-slate-700 dark:text-fg-secondary rounded text-xs font-medium capitalize">
                  {selectedCategory}
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className="hover:text-red-500 dark:hover:text-state-danger transition ml-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {sortBy !== 'default' && sortBadges[sortBy] && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 dark:bg-noir-700 text-slate-700 dark:text-fg-secondary rounded text-xs font-medium">
                  {sortBadges[sortBy].icon}
                  <span>{sortBadges[sortBy].label}</span>
                  <button
                    onClick={() => setSortBy('default')}
                    className="hover:text-red-500 dark:hover:text-state-danger transition ml-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {!hasActiveFilters && (
                <span className="text-[12px] text-inter dark:text-fg-tertiary italic">No filters applied</span>
              )}
            </div>
          </div>

          <hr className="border-slate-200 dark:border-line-subtle" />

          {/* Categories Section */}
          <div>
            <h3 className="text-[16px] font-semibold text-inter dark:text-fg mb-3">Category</h3>

            {isLoadingCategories ? (
              <div className="space-y-2.5 animate-pulse">
                <div className="h-4 bg-slate-100 dark:bg-noir-700 rounded w-3/4"></div>
                <div className="h-4 bg-slate-100 dark:bg-noir-700 rounded w-1/2"></div>
                <div className="h-4 bg-slate-100 dark:bg-noir-700 rounded w-2/3"></div>
              </div>
            ) : (
              <div className="space-y-2.5 text-sm text-slate-700 dark:text-fg-secondary">
                {categories.map((cat) => {
                  const isChecked = selectedCategory.toLowerCase() === cat.value.toLowerCase();
                  return (
                    <label
                      key={cat.value}
                      className="flex items-center gap-2.5 cursor-pointer select-none text-slate-700 dark:text-fg-secondary hover:text-slate-900 dark:hover:text-fg transition"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {
                          setSelectedCategory(isChecked ? 'All' : cat.value);
                        }}
                        className="w-4 h-4 rounded border-slate-300 dark:border-line-control text-slate-900 dark:text-copper-400 dark:accent-copper-400 focus:ring-slate-500 dark:focus:ring-copper-400 dark:bg-noir-750 dark:checked:bg-copper-400 cursor-pointer"
                      />
                      <span className="capitalize">{cat.label}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          <hr className="border-slate-200 dark:border-line-subtle" />

          {/* Price Range Section */}
          <div>
            <h3 className="text-[16px] font-semibold text-inter dark:text-fg mb-3">Price Range</h3>
            <div className="flex items-center gap-3">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full px-3 py-2  dark:bg-noir-750 border border-[#9F9F9F] dark:border-line-control dark:hover:border-line-hover text-slate-900 dark:text-fg placeholder-slate-400 dark:placeholder-fg-placeholder rounded-lg text-sm focus:outline-none focus:border-slate-400 dark:focus:border-copper-400 min-w-0 shadow-xs"
              />
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full px-3 py-2  dark:bg-noir-750 border border-[#9F9F9F] dark:border-line-control dark:hover:border-line-hover text-slate-900 dark:text-fg placeholder-slate-400 dark:placeholder-fg-placeholder rounded-lg text-sm focus:outline-none focus:border-slate-400 dark:focus:border-copper-400 min-w-0 shadow-xs"
              />
            </div>
          </div>

          <hr className="border-slate-200 dark:border-line-subtle" />

          {/* Sort By Section */}
          <div>
            <h3 className="text-[16px] font-semibold text-inter dark:text-fg mb-3">Sort By</h3>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2  dark:bg-noir-750 border border-[#9F9F9F] dark:border-line-control dark:hover:border-line-hover rounded-lg text-sm appearance-none
                focus:outline-none focus:border-slate-400 dark:focus:border-copper-400 text-slate-500 dark:text-fg-tertiary cursor-pointer shadow-xs pr-8"
              >
                <option value="newest">Newest</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
                <option value="topRated">Top Rated</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 dark:text-fg-tertiary absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
