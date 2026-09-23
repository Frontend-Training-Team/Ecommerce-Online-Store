/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useRef } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import ProductFilterSidebar from '../components/ui/searchinput/FilterSidebar'
import { useDebounce } from '../hooks/useDebounce'
import { Search, X, SlidersHorizontal } from 'lucide-react'
import { getAllProducts } from '../api/products.api'
import ProductGrid from '../components/ui/productDetails/ProductGrid'

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const searchInputRef = useRef(null)
  const [searchTerm, setSearchTerm] = useState(() => searchParams.get('search') || searchParams.get('keyword') || '')
  const [selectedCategory, setSelectedCategory] = useState(() => searchParams.get('category') || 'All')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [sortBy, setSortBy] = useState('default')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const [allProducts, setAllProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const ITEMS_PER_PAGE = 12
  const [currentPage, setCurrentPage] = useState(() => Math.max(1, parseInt(searchParams.get('page') || '1', 10)))
  const [isLoading, setIsLoading] = useState(true)
  const debouncedSearchTerm = useDebounce(searchTerm, 400)
  const debouncedMinPrice = useDebounce(minPrice, 400)
  const debouncedMaxPrice = useDebounce(maxPrice, 400)

  const syncCategoryParam = (nextCategory) => {
    const params = new URLSearchParams(searchParams)

    if (nextCategory && nextCategory !== 'All') {
      params.set('category', nextCategory)
    } else {
      params.delete('category')
    }
    params.delete('page')

    setSearchParams(params, { replace: true })
    setCurrentPage(1)
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

  const handleClearFilters = () => {
    setIsLoading(true)
    setSelectedCategory('All')
    syncCategoryParam('All')
    setSearchTerm('')
    const params = new URLSearchParams(searchParams)
    params.delete('search')
    params.delete('keyword')
    params.delete('page')
    setSearchParams(params, { replace: true })
    setCurrentPage(1)
    setMinPrice('')
    setMaxPrice('')
    setSortBy('default')
  }

  const handleClearSearch = (e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    setIsLoading(true)
    setSearchTerm('')
    const params = new URLSearchParams(searchParams)
    params.delete('search')
    params.delete('keyword')
    params.delete('page')
    setSearchParams(params, { replace: true })
    setCurrentPage(1)
    searchInputRef.current?.focus()
  }

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE))

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return
    setCurrentPage(newPage)
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

  useEffect(() => {
    const categoryFromUrl = searchParams.get('category')
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl)
    } else {
      setSelectedCategory('All')
    }

    const searchFromUrl = searchParams.get('search') || searchParams.get('keyword') || ''
    setSearchTerm((prev) => (prev !== searchFromUrl ? searchFromUrl : prev))

    const pageFromUrl = parseInt(searchParams.get('page') || '1', 10)
    if (!isNaN(pageFromUrl) && pageFromUrl > 0) {
      setCurrentPage((prev) => (prev !== pageFromUrl ? pageFromUrl : prev))
    }
  }, [searchParams])

  useEffect(() => {
    setSearchParams(
      (prevParams) => {
        const currentSearch = prevParams.get('search') || prevParams.get('keyword') || ''
        const trimmed = debouncedSearchTerm.trim()
        if (trimmed) {
          if (currentSearch !== trimmed) {
            const next = new URLSearchParams(prevParams)
            next.set('search', trimmed)
            next.delete('keyword')
            return next
          }
        } else if (!searchTerm.trim() && currentSearch) {
          const next = new URLSearchParams(prevParams)
          next.delete('search')
          next.delete('keyword')
          return next
        }
        return prevParams
      },
      { replace: true }
    )
  }, [debouncedSearchTerm, searchTerm, setSearchParams])

  useEffect(() => {
    const fetchAllProducts = async () => {
      setIsLoading(true)
      try {
        const response = await getAllProducts({ limit: 100 })
        const data = response.data
        const list = data.products || []
        setAllProducts(list)
        setFilteredProducts(list)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchAllProducts()
  }, [])

  useEffect(() => {
    if (allProducts.length === 0) return

    setIsLoading(true)

    const filterTimer = setTimeout(() => {
      let result = [...allProducts]

      if (debouncedSearchTerm.trim()) {
        const query = debouncedSearchTerm.toLowerCase().trim()
        result = result.filter((item) => {
          const name = String(item.name || '').toLowerCase()
          const desc = String(item.description || item.shortDescription || '').toLowerCase()
          const brand = String(item.brand || '').toLowerCase()
          return name.includes(query) || desc.includes(query) || brand.includes(query)
        })
      }

      if (selectedCategory !== 'All') {
        const cat = selectedCategory.toLowerCase()
        result = result.filter((item) => {
          const itemCat = String(item.category || '').toLowerCase()
          const itemSubCat = String(item.subcategory || '').toLowerCase()
          return itemCat === cat || itemSubCat === cat || itemCat.includes(cat)
        })
      }

      if (debouncedMinPrice !== '') {
        const min = Number(debouncedMinPrice)
        result = result.filter((item) => (item.discountPrice || item.price || 0) >= min)
      }

      if (debouncedMaxPrice !== '') {
        const max = Number(debouncedMaxPrice)
        result = result.filter((item) => (item.discountPrice || item.price || 0) <= max)
      }

      if (sortBy === 'lowToHigh') {
        result.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price))
      } else if (sortBy === 'highToLow') {
        result.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price))
      } else if (sortBy === 'newest') {
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      }

      setFilteredProducts(result)
      setCurrentPage(1)
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(filterTimer)
  }, [debouncedSearchTerm, selectedCategory, debouncedMinPrice, debouncedMaxPrice, sortBy, allProducts])

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const displayedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <div className="mt-16 xl:mt-17 min-h-screen bg-white dark:bg-slate-950 transition-colors duration-200 relative">
      <main className="w-full max-w-7xl 2xl:max-w-[1480px] mx-auto px-4 mt-3 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 sm:mb-5 flex flex-wrap items-center justify-between gap-4 border-b border-[#EAE1DB] pb-5 dark:border-[#2e2724]">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium font-Instrument text-[#2D241E] dark:text-[#f3ede6]">
              Shop
            </h1>
            <p className="text-xs sm:text-sm font-medium text-[#8C7A6E] dark:text-[#a38f7d] mt-1">
              Manage and track your recent orders
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="rounded-full border border-[#DFC9BA] dark:border-[#4a3a2a] bg-[#F3E8DF] dark:bg-[#2a221a] px-3.5 sm:px-4 py-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#7B542B] dark:text-[#fcba69] shadow-2xs">
              55555
            </span>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[300px_1fr] gap-8 items-start">
          <aside className="w-full lg:border-r lg:border-gray-200 dark:lg:border-slate-800 lg:pr-8">
            <div>
              <ProductFilterSidebar
                selectedCategory={selectedCategory}
                setSelectedCategory={(cat) => {
                  setIsLoading(true)
                  setSelectedCategory(cat)
                  syncCategoryParam(cat)
                }}
                minPrice={minPrice}
                setMinPrice={(val) => {
                  setIsLoading(true)
                  setMinPrice(val)
                }}
                maxPrice={maxPrice}
                setMaxPrice={(val) => {
                  setIsLoading(true)
                  setMaxPrice(val)
                }}
                sortBy={sortBy}
                setSortBy={(sort) => {
                  setIsLoading(true)
                  setSortBy(sort)
                }}
                onClearFilters={handleClearFilters}
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
              />
            </div>
          </aside>

          <section id="shop-products-top" className="w-full min-w-0 flex flex-col scroll-mt-24">
            <div className="w-full">
              {/* Search Bar Container */}
              <div className="w-full mb-6 sm:mb-8">
                <div className="flex items-center gap-3 w-full">
                  <div className="relative flex-1 w-full flex items-center">
                    <span className="absolute left-4 z-10 pointer-events-none text-slate-400 dark:text-slate-500 flex items-center justify-center">
                      <Search className="w-4.5 h-4.5" />
                    </span>
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search for products, brands and more..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full h-12 pl-11 pr-11 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl text-sm focus:outline-none focus:border-amber-900/50 dark:focus:border-amber-600 transition-colors shadow-none text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
                    />
                    {searchTerm && (
                      <button
                        type="button"
                        onClick={handleClearSearch}
                        onMouseDown={(e) => e.preventDefault()}
                        aria-label="Clear search"
                        className="absolute right-3.5 z-10 w-7 h-7 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-gray-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Mobile Filter Toggle */}
                  <button
                    onClick={() => setIsFilterOpen(true)}
                    className="lg:hidden h-12 px-4 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200 shadow-none cursor-pointer"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    <span>Filter</span>
                  </button>
                </div>
              </div>

              {/* Search Results Heading & Breadcrumbs */}
              {(debouncedSearchTerm.trim() || searchTerm.trim()) && (
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 dark:border-slate-800 pb-5">
                  <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                    <h2 className="font-Serif italic text-2xl sm:text-3xl text-[#1E1915] dark:text-[#f3ede6] font-medium tracking-tight">
                      “{(debouncedSearchTerm || searchTerm).trim()}”
                    </h2>
                    <span className="w-10 sm:w-16 h-px bg-gray-300 dark:bg-slate-700 inline-block" />
                    <span className="text-sm font-semibold tracking-wide text-[#706861] dark:text-slate-400 uppercase">
                      {filteredProducts.length} {filteredProducts.length === 1 ? 'Result' : 'Results'}
                    </span>
                  </div>

                  <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-slate-400">
                    <Link to="/" className="hover:text-amber-900 dark:hover:text-amber-400 transition-colors">
                      Home
                    </Link>
                    <span className="text-gray-300 dark:text-slate-600">/</span>
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      className="hover:text-amber-900 dark:hover:text-amber-400 transition-colors cursor-pointer"
                    >
                      Search
                    </button>
                    <span className="text-gray-300 dark:text-slate-600">/</span>
                    <span className="text-[#222222] dark:text-slate-200 font-medium truncate max-w-[140px] sm:max-w-xs">
                      {(debouncedSearchTerm || searchTerm).trim()}
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