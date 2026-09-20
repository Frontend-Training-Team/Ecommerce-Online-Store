import React, { useState, useEffect } from 'react';
import { LuArrowUp, LuArrowDown, LuSparkles, LuStar, LuX } from 'react-icons/lu';

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
    lowToHigh: { label: 'Price', icon: <LuArrowUp className="w-3.5 h-3.5" /> },
    highToLow: { label: 'Price', icon: <LuArrowDown className="w-3.5 h-3.5" /> },
    newest: { label: 'Newest', icon: <LuSparkles className="w-3.5 h-3.5" /> },
    topRated: { label: 'Top Rated', icon: <LuStar className="w-3.5 h-3.5" /> },
  };

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoadingCategories(true);
      try {
        const response = await fetch('https://e-commerce-api-3wara.vercel.app/products/search');
        const data = await response.json();
        const fetchedProducts = data.products || (Array.isArray(data) ? data : []);

        const uniqueCategories = [
          ...new Set(
            fetchedProducts
              .map((p) => p.category)
              .filter((cat) => Boolean(cat))
          ),
        ];

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
      {isOpen && (
        <div onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 w-80 bg-white p-4 overflow-y-auto transition-transform 
          duration-300 ease-in-out lg:static lg:w-full lg:p-0 lg:bg-transparent lg:overflow-visible lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-4">
          
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {selectedCategory !== 'All' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F7F4EF] text-copper-600 rounded-full text-sm font-medium capitalize">
                  {selectedCategory}
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className="hover:text-copper-800 transition"
                  >
                    <LuX className="w-3 h-3" />
                  </button>
                </span>
              )}

              {sortBy !== 'default' && sortBadges[sortBy] && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#F7F4EF] text-copper-600 rounded-full text-sm font-semibold">
                  {sortBadges[sortBy].icon}
                  <span>{sortBadges[sortBy].label}</span>
                  <button
                    onClick={() => setSortBy('default')}
                    className="hover:text-amber-900 transition ml-0.5"
                  >
                    <LuX className="w-3 h-3" />
                  </button>
                </span>
              )}

              <button
                onClick={onClearFilters}
                className="text-red-500 text-sm font-medium hover:underline cursor-pointer ml-auto"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Main Sidebar Box */}
          <div className="w-full bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6 relative">
            
            {onClose && (
              <button
                onClick={onClose}
                className="lg:hidden absolute top-4 right-4 p-1 text-gray-500 hover:text-gray-800 transition rounded-lg"
                aria-label="Close filters"
              >
                <LuX className="w-5 h-5" />
              </button>
            )}

            {/* Category */}
            <div>
              <h3 className="font-bold text-gray-800 mb-3 text-sm">Category</h3>

              {isLoadingCategories ? (
                <div className="space-y-3 animate-pulse">
                  <div className="h-4 bg-gray-100 rounded w-2/3"></div>
                  <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                </div>
              ) : (
                <div className="space-y-2.5 text-sm text-gray-600">
                  {categories.map((cat) => (
                    <label
                      key={cat.value}
                      className="flex items-center gap-3 cursor-pointer select-none"
                    >
                      <input
                        type="radio"
                        name="category"
                        value={cat.value}
                        checked={selectedCategory === cat.value}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="text-indigo-600 focus:ring-copper-400 w-4 h-4"
                      />
                      <span className="capitalize">{cat.label}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-bold text-gray-800 mb-3 text-sm">Price Range</h3>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full p-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-copper-400 min-w-0"
                />
                <span className="text-gray-400 text-xs">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full p-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-copper-400 min-w-0"
                />
              </div>
            </div>

            {/* Sort By */}
            <div>
              <h3 className="font-bold text-gray-800 mb-3 text-sm">Sort By</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2.5 border border-gray-200 rounded-xl text-sm 
                focus:outline-none focus:ring-2 focus:ring-copper-400 bg-white text-gray-700 cursor-pointer"
              >
                <option value="default">Default</option>
                <option value="newest">Newest</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
                <option value="topRated">Top Rated</option>
              </select>
            </div>

            {/* Clear All Filters Button */}
            <button
              onClick={onClearFilters}
              className="w-full py-2.5 border border-[#D99B70] text-copper-700 rounded-xl text-sm
               font-medium hover:bg-indigo-50 transition active:scale-95 cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
}