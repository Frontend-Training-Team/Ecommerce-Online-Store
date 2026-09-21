import React, { useState, useEffect } from 'react';
import Navbar from '../components/NavBar/NavBar';
import ProductFilterSidebar from '../components/Ui/searchinput/FilterSidebar';
import ProductGrid from '../components/Ui/Products/ProductGrid';
import { useDebounce } from '../hooks/useDebounce';
import { Search, X, CheckCircle, SlidersHorizontal } from 'lucide-react';

export default function ShopPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [cartCount, setCartCount] = useState(() => {
    const savedCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
    return savedCart.reduce((acc, item) => acc + (Number(item.quantity) || 1), 0);
  });

  const [showToast, setShowToast] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 400);
  const debouncedMinPrice = useDebounce(minPrice, 400);
  const debouncedMaxPrice = useDebounce(maxPrice, 400);

  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
    const productId = product?.id || product?._id;
    const existingIndex = existingCart.findIndex((item) => item.productId === productId);

    if (existingIndex > -1) {
      existingCart[existingIndex].quantity += 1;
    } else {
      existingCart.push({ productId, quantity: 1 });
    }
    localStorage.setItem('guestCart', JSON.stringify(existingCart));

    setCartCount((prevCount) => prevCount + 1);

    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2100);
  };

  const handleClearFilters = () => {
    setIsLoading(true);
    setSearchTerm('');
    setSelectedCategory('All');
    setMinPrice('');
    setMaxPrice('');
    setSortBy('default');
  };

  const handleClearSearch = () => {
    setIsLoading(true);
    setSearchTerm('');
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 12);
      setIsLoadingMore(false);
    }, 500);
  };

  useEffect(() => {
    const fetchAllProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://e-commerce-api-3wara.vercel.app/products?limit=100');
        const data = await response.json();
        const list = data.products || (Array.isArray(data) ? data : []);
        setAllProducts(list);
        setFilteredProducts(list);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (allProducts.length === 0) return;

    setIsLoading(true);

    const filterTimer = setTimeout(() => {
      let result = [...allProducts];

      if (debouncedSearchTerm.trim()) {
        const query = debouncedSearchTerm.toLowerCase().trim();
        result = result.filter((item) => {
          const name = String(item.name || '').toLowerCase();
          const desc = String(item.description || item.shortDescription || '').toLowerCase();
          const brand = String(item.brand || '').toLowerCase();
          return name.includes(query) || desc.includes(query) || brand.includes(query);
        });
      }

      if (selectedCategory !== 'All') {
        const cat = selectedCategory.toLowerCase();
        result = result.filter((item) => {
          const itemCat = String(item.category || '').toLowerCase();
          const itemSubCat = String(item.subcategory || '').toLowerCase();
          return itemCat === cat || itemSubCat === cat || itemCat.includes(cat);
        });
      }

      if (debouncedMinPrice !== '') {
        const min = Number(debouncedMinPrice);
        result = result.filter((item) => (item.discountPrice || item.price || 0) >= min);
      }

      if (debouncedMaxPrice !== '') {
        const max = Number(debouncedMaxPrice);
        result = result.filter((item) => (item.discountPrice || item.price || 0) <= max);
      }

      if (sortBy === 'lowToHigh') {
        result.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
      } else if (sortBy === 'highToLow') {
        result.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
      } else if (sortBy === 'newest') {
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }

      setFilteredProducts(result);
      setVisibleCount(12);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(filterTimer);
  }, [debouncedSearchTerm, selectedCategory, debouncedMinPrice, debouncedMaxPrice, sortBy, allProducts]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-200 relative">
      {showToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-3 bg-[#7A6E67] backdrop-blur-xl 
        text-white text-sm font-medium px-5 py-3 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10 pointer-events-none transition-all 
        animate-in slide-in-from-top-3 ease-out">
          <div className="w-6 h-6 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0">
            <CheckCircle className="w-[16px] h-[16px] text-emerald-400" />
          </div>
          <span className="text-gray-100 font-sans tracking-wide">
            Success Adding to Cart
          </span>
        </div>
      )}

      <Navbar cartCount={cartCount} />

      <main className="max-w-[1400px] mx-auto px-4 mt-3 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[300px_1fr] gap-8 items-stretch">
          <aside className="w-full lg:border-r lg:border-gray-200 dark:lg:border-slate-800 lg:pr-8">
            <div>
              <ProductFilterSidebar
                selectedCategory={selectedCategory}
                setSelectedCategory={(cat) => {
                  setIsLoading(true);
                  setSelectedCategory(cat);
                }}
                minPrice={minPrice}
                setMinPrice={(val) => {
                  setIsLoading(true);
                  setMinPrice(val);
                }}
                maxPrice={maxPrice}
                setMaxPrice={(val) => {
                  setIsLoading(true);
                  setMaxPrice(val);
                }}
                sortBy={sortBy}
                setSortBy={(sort) => {
                  setIsLoading(true);
                  setSortBy(sort);
                }}
                onClearFilters={handleClearFilters}
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
              />
            </div>
          </aside>

          <section className="w-full min-w-0 flex flex-col items-center">
            <div className="w-full max-w-[1244px] mx-auto">
              {/* Search Bar Container */}
              <div className="w-full mb-10">
                <div className="flex items-center gap-3 w-full">
                  <div className="relative flex-1 w-full flex items-center">
                    <span className="absolute left-4 z-10 pointer-events-none text-slate-400 dark:text-slate-500 flex items-center justify-center">
                      <Search className="w-[16px] h-[16px]" />
                    </span>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => {
                        setIsLoading(true);
                        setSearchTerm(e.target.value);
                      }}
                      placeholder="Search products..."
                      className="w-full pl-11 pr-10 py-3 bg-[#ECEFF1] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg font-inter
        focus:outline-none focus:ring-2 focus:ring-slate-400 text-sm shadow-xs transition text-slate-900 dark:text-slate-100
        placeholder:text-[#5B5B5B] font-medium leading-none"
                    />
                    {searchTerm && (
                      <button
                        onClick={handleClearSearch}
                        className="absolute right-3.5 z-10 flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
                        aria-label="Clear search"
                      > <X className="w-[14px] h-[14px]" />
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => setIsFilterOpen(true)}
                    className="lg:hidden p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-xs transition shrink-0 active:scale-95 flex items-center justify-center"
                    aria-label="Open Filters"
                  >
                    <SlidersHorizontal className="w-[16px] h-[16px]" />
                  </button>
                </div>
              </div>

              {/* Product Grid */}
              <div className="w-full">
                <ProductGrid
                  products={displayedProducts}
                  isLoading={isLoading}
                  isLoadingMore={isLoadingMore}
                  hasMore={hasMore}
                  onLoadMore={handleLoadMore}
                  onAddToCart={handleAddToCart}
                />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}