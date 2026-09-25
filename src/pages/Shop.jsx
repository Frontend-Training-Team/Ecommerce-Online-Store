import { useState, useEffect, useRef, useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import ProductFilterSidebar from '../components/ui/searchinput/FilterSidebar'
import { useDebounce } from '../hooks/useDebounce'
import { Search, X, SlidersHorizontal } from 'lucide-react'
import { getAllProducts } from '../api/products.api'
import ProductGrid from '../components/ui/productDetails/ProductGrid'
import { motion } from 'framer-motion'

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const searchInputRef = useRef(null)

  // URL is the single source of truth for Category, Search, and Page
  const categoryFromUrl = searchParams.get('category') || 'All'
  const searchFromUrl = searchParams.get('search') || searchParams.get('keyword') || ''
  const pageFromUrl = Math.max(1, parseInt(searchParams.get('page') || '1', 10))

  // In-page search input state (allows typing before debounce updates URL)
  const [searchTerm, setSearchTerm] = useState(searchFromUrl)
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [sortBy, setSortBy] = useState('default')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const [allProducts, setAllProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const debouncedMinPrice = useDebounce(minPrice, 350)
  const debouncedMaxPrice = useDebounce(maxPrice, 350)

  // Adjust search term when URL search param changes (e.g. from Navbar or Category clicks)
  const [prevSearchFromUrl, setPrevSearchFromUrl] = useState(searchFromUrl)
  if (prevSearchFromUrl !== searchFromUrl) {
    setPrevSearchFromUrl(searchFromUrl)
    setSearchTerm(searchFromUrl)
  }

  // Debounced URL search updater — called ONLY when typing in the in-page input
  const debounceTimerRef = useRef(null)
  const updateUrlSearch = (val) => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current)
    debounceTimerRef.current = setTimeout(() => {
      const trimmed = val.trim()
      setSearchParams(
        (prevParams) => {
          const current = prevParams.get('search') || prevParams.get('keyword') || ''
          if (trimmed === current) return prevParams
          const next = new URLSearchParams(prevParams)
          if (trimmed) {
            next.set('search', trimmed)
            next.delete('keyword')
          } else {
            next.delete('search')
            next.delete('keyword')
          }
          next.delete('page')
          return next
        },
        { replace: true }
      )
    }, 350)
  }

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current)
    }
  }, [])

  // Fetch all products once on component mount
  useEffect(() => {
    let isMounted = true
    const fetchAllProducts = async () => {
      setIsLoading(true)
      try {
        const response = await getAllProducts({ limit: 100 })
        const data = response.data
        const list = data.products || (Array.isArray(data) ? data : [])
        if (isMounted) {
          setAllProducts(list)
        }
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }
    fetchAllProducts()
    return () => {
      isMounted = false
    }
  }, [])

  // Synchronous, instant filtering with useMemo (Eliminates flashes and race conditions!)
  const activeSearch = searchTerm.trim() || searchFromUrl.trim()
  const activeCategory = categoryFromUrl

  const filteredProducts = useMemo(() => {
    if (!allProducts || allProducts.length === 0) return []

    let result = allProducts

    // 1. Search Query Filter
    if (activeSearch) {
      const query = activeSearch.toLowerCase()
      result = result.filter((item) => {
        const name = String(item.name || '').toLowerCase()
        const desc = String(item.description || item.shortDescription || '').toLowerCase()
        const brand = String(item.brand || '').toLowerCase()
        return name.includes(query) || desc.includes(query) || brand.includes(query)
      })
    }

    // 2. Category Filter
    if (activeCategory && activeCategory !== 'All') {
      const cat = activeCategory.toLowerCase()
      result = result.filter((item) => {
        const itemCat = String(item.category || item.categoryName || '').toLowerCase()
        const itemSubCat = String(item.subcategory || '').toLowerCase()
        return itemCat === cat || itemSubCat === cat || itemCat.includes(cat)
      })
    }

    // 3. Price Filters
    if (debouncedMinPrice !== '') {
      const min = Number(debouncedMinPrice)
      result = result.filter((item) => (item.discountPrice || item.price || 0) >= min)
    }

    if (debouncedMaxPrice !== '') {
      const max = Number(debouncedMaxPrice)
      result = result.filter((item) => (item.discountPrice || item.price || 0) <= max)
    }

    // 4. Sorting
    if (sortBy !== 'default') {
      result = [...result].sort((a, b) => {
        const stockA = Number(a.stock ?? a.quantity ?? 0)
        const stockB = Number(b.stock ?? b.quantity ?? 0)
        const stockPriority = (stockB > 0 ? 1 : 0) - (stockA > 0 ? 1 : 0)

        if (stockPriority !== 0) return stockPriority

        if (sortBy === 'lowToHigh') {
          return (a.discountPrice || a.price || 0) - (b.discountPrice || b.price || 0)
        }
        if (sortBy === 'highToLow') {
          return (b.discountPrice || b.price || 0) - (a.discountPrice || a.price || 0)
        }
        if (sortBy === 'newest') {
          return new Date(b.createdAt) - new Date(a.createdAt)
        }

        return 0
      })
    }

    return result
  }, [allProducts, activeSearch, activeCategory, debouncedMinPrice, debouncedMaxPrice, sortBy])

  const ITEMS_PER_PAGE = 12
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE))
  const currentPage = Math.min(pageFromUrl, totalPages)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const displayedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handleCategoryChange = (nextCategory) => {
    const params = new URLSearchParams(searchParams)
    if (nextCategory && nextCategory !== 'All') {
      params.set('category', nextCategory)
    } else {
      params.delete('category')
    }
    params.delete('page')
    setSearchParams(params, { replace: true })
  }

  const handleClearFilters = () => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current)
    const params = new URLSearchParams()
    setSearchParams(params, { replace: true })
    setSearchTerm('')
    setMinPrice('')
    setMaxPrice('')
    setSortBy('default')
  }

  const handleClearSearch = (e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current)
    setSearchTerm('')
    const params = new URLSearchParams(searchParams)
    params.delete('search')
    params.delete('keyword')
    params.delete('page')
    setSearchParams(params, { replace: true })
    searchInputRef.current?.focus()
  }

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return
    const params = new URLSearchParams(searchParams)
    if (newPage === 1) {
      params.delete('page')
    } else {
      params.set('page', String(newPage))
    }
    setSearchParams(params, { replace: true })

    const target = document.getElementById('shop-products-top')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem('guestCart') || '[]')
    const productId = product?.id || product?._id
    const existingIndex = existingCart.findIndex((item) => item.productId === productId)

    if (existingIndex > -1) {
      existingCart[existingIndex].quantity += 1
    } else {
      existingCart.push({ productId, quantity: 1 })
    }
    localStorage.setItem('guestCart', JSON.stringify(existingCart))
  }

  return (
    <div className="mt-16 xl:mt-17 min-h-screen bg-white dark:bg-noir-900 transition-colors duration-200 relative">
      <main className="w-full max-w-7xl 2xl:max-w-370 mx-auto px-4 mt-3 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-between gap-4 border-b border-[#EAE1DB] pb-5 dark:border-line">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium font-Instrument text-[#2D241E] dark:text-fg">
              Shop
            </h1>
            <p className="text-xs sm:text-sm font-medium text-[#8C7A6E] dark:text-fg-tertiary mt-1">
              Find everything you need in one place
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="rounded-full border border-[#DFC9BA] dark:border-copper-800 bg-[#F3E8DF] 
            dark:bg-copper-900 px-3.5 sm:px-4 py-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider 
            text-[#7B542B] dark:text-copper-300 shadow-2xs">
              {categoryFromUrl === 'All' ? 'All Categories' : categoryFromUrl}
            </span>
          </div>
        </motion.div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[300px_1fr] gap-8 items-start">
          <motion.aside
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="w-full h-full border-r lg:border-gray-200 dark:border-line lg:pr-8">
            <div>
              <ProductFilterSidebar
                selectedCategory={categoryFromUrl}
                setSelectedCategory={handleCategoryChange}
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                sortBy={sortBy}
                setSortBy={setSortBy}
                onClearFilters={handleClearFilters}
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
              />
            </div>
          </motion.aside>

          <section id="shop-products-top" className="w-full min-w-0 flex flex-col scroll-mt-24">
            <div className="w-full">
              {/* Search Bar Container */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                className="w-full mt-5 mb-6 sm:mb-8">
                <div className="flex items-center gap-3 w-full">
                  <div className="relative flex-1 w-full flex items-center">
                    <span className="absolute left-4 z-10 pointer-events-none text-slate-400 dark:text-fg-tertiary 
                    flex items-center justify-center">
                      <Search className="w-4.5 h-4.5" />
                    </span>
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search for products, brands and more..."
                      value={searchTerm}
                      onChange={(e) => {
                        const val = e.target.value
                        setSearchTerm(val)
                        updateUrlSearch(val)
                      }}
                      className="w-full h-12 pl-11 pr-11 bg-gray-50 dark:bg-noir-800 border border-gray-200 
                      dark:border-line-control dark:hover:border-line-hover rounded-2xl text-sm focus:outline-none 
                      focus:border-amber-900/50 dark:focus:border-copper-400 transition-colors shadow-none text-slate-800 
                      dark:text-fg placeholder:text-slate-400 dark:placeholder:text-fg-placeholder"
                    />
                    {searchTerm && (
                      <button
                        type="button"
                        onClick={handleClearSearch}
                        onMouseDown={(e) => e.preventDefault()}
                        aria-label="Clear search"
                        className="absolute right-3.5 z-10 w-7 h-7 flex items-center justify-center rounded-full 
                        text-slate-400 dark:text-fg-tertiary hover:text-slate-700 dark:hover:text-fg 
                        hover:bg-gray-200/60 dark:hover:bg-noir-650 transition-colors cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Mobile Filter Toggle */}
                  <button
                    onClick={() => setIsFilterOpen(true)}
                    className="lg:hidden h-12 px-4 bg-gray-50 dark:bg-noir-800 border border-gray-200 
                    dark:border-line-strong rounded-2xl flex items-center gap-2 text-sm font-medium text-slate-700 
                    dark:text-fg-secondary shadow-none cursor-pointer"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    <span>Filter</span>
                  </button>
                </div>
              </motion.div>

              {/* Search Results Heading & Breadcrumbs */}
              {activeSearch && (
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 dark:border-line-subtle pb-5">
                  <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                    <h2 className="font-Serif italic text-2xl sm:text-3xl text-[#1E1915] dark:text-fg font-medium tracking-tight">
                      “{activeSearch}”
                    </h2>
                    <span className="w-10 sm:w-16 h-px bg-gray-300 dark:bg-line-strong inline-block" />
                    <span className="text-sm font-semibold tracking-wide text-[#706861] dark:text-fg-secondary uppercase">
                      {filteredProducts.length} {filteredProducts.length === 1 ? 'Result' : 'Results'}
                    </span>
                  </div>

                  <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-fg-tertiary">
                    <Link to="/" className="hover:text-amber-900 dark:hover:text-copper-300 transition-colors">
                      Home
                    </Link>
                    <span className="text-gray-300 dark:text-fg-disabled">/</span>
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      className="hover:text-amber-900 dark:hover:text-copper-300 transition-colors cursor-pointer"
                    >
                      Search
                    </button>
                    <span className="text-gray-300 dark:text-fg-disabled">/</span>
                    <span className="text-[#222222] dark:text-fg font-medium truncate max-w-35 sm:max-w-xs">
                      {activeSearch}
                    </span>
                  </nav>
                </div>
              )}

              {/* Product Grid */}
              <div className="w-full">
                <ProductGrid
                  products={displayedProducts}
                  isLoading={isLoading}
                  onAddToCart={handleAddToCart}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
