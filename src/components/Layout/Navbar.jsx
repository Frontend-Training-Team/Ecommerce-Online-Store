import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Search, Sun, Moon, Heart, ShoppingBag, User, Menu, X, ArrowUp } from "lucide-react";
import logoImg from "../../assets/images/4.png";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useDarkMode } from "../../hooks/useDarkMode";

export default function Navbar() {
  const { user } = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { isDark, toggleTheme } = useDarkMode();
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchContainerRef = useRef(null);
  const searchInputRef = useRef(null);

  // Focus input automatically when search is opened
  useEffect(() => {
    if (isSearchOpen) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isSearchOpen]);

  // Click outside to collapse search smoothly
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  const handleSearchSubmit = (e) => {
    if (e?.preventDefault) e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      navigate(`/shop?search=${encodeURIComponent(query)}`);
      setIsSearchOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  const navLinkClass = ({ isActive }) =>
    `transition-colors duration-200 whitespace-nowrap shrink-0 ${isActive
      ? isHomePage
        ? "text-white font-semibold drop-shadow-sm"
        : "text-[#9A4D2C] dark:text-copper-300 font-semibold"
      : isHomePage
        ? "text-white/90 hover:text-white font-medium drop-shadow-xs"
        : "text-[#2E2E2E] dark:text-fg-secondary hover:text-[#9A4D2C] dark:hover:text-fg font-medium"
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `block px-4 py-2.5 rounded-lg text-sm transition-colors ${isActive
      ? isHomePage
        ? "bg-white/15 text-white font-semibold"
        : "bg-white/80 dark:bg-noir-750 text-[#9A4D2C] dark:text-copper-300 font-semibold"
      : isHomePage
        ? "text-white/80 hover:bg-white/10 hover:text-white font-medium"
        : "text-[#2E2E2E] dark:text-fg-secondary hover:bg-white/50 dark:hover:bg-noir-750 hover:text-[#9A4D2C] dark:hover:text-fg font-medium"
    }`;

  const showScrollToTop = !location.pathname.includes("404") && !location.pathname.startsWith("/error");

  return (
    <>
      <header className={`w-full absolute z-40 transition-colors duration-200 ${isHomePage
        ? "bg-transparent"
        : "bg-[#E2E2E4] dark:bg-noir-900/85 dark:backdrop-blur-md border-b border-[#D0D2D7] dark:border-line-subtle"
        }`}>
        <div className="w-full px-3.5 sm:px-6 md:px-4 lg:px-8 xl:px-14 py-2.5 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-4">

          {/* Left: Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src={logoImg}
              alt="LAMSA Home Furniture"
              className="h-7 sm:h-8 md:h-9 lg:h-10 object-contain"
            />
          </Link>

          {/* Center: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-3 lg:gap-6 xl:gap-8 2xl:gap-10 text-[13.5px] lg:text-[14px]">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/shop" className={navLinkClass}>
              Shop
            </NavLink>
            <NavLink to="/orders" className={navLinkClass}>
              My Orders
            </NavLink>
            <NavLink to="/wishlist" className={navLinkClass}>
              Wishlist
            </NavLink>
          </nav>

          {/* Right: Actions & Tools */}
          <div className="flex items-center gap-1.5 md:gap-2 lg:gap-2.5 flex-nowrap shrink-0">

            {/* Desktop Expanding Search  */}
            <div
              ref={searchContainerRef}
              className={`hidden md:flex relative items-center h-9 rounded-full transition-all duration-300 ease-in-out overflow-hidden shrink-0 hover:scale-x-105
                ${isHomePage
                  ? isSearchOpen
                    ? "w-36 lg:w-48 xl:w-52 border border-white/60 bg-black/40 backdrop-blur-md shadow-lg"
                    : "w-9 border border-white/40 bg-white/10 hover:border-white hover:bg-white/20"
                  : isSearchOpen
                    ? "w-36 lg:w-48 xl:w-52 border border-[#5B5B5B] dark:border-line-control bg-white/70 dark:bg-noir-750 shadow-xs"
                    : "w-9 border border-[#5B5B5B] dark:border-line-strong dark:hover:border-line-hover bg-transparent dark:bg-noir-800"
                }`}
            >
              {/* Search Icon button */}
              <button
                type="button"
                onClick={() => {
                  if (!isSearchOpen) {
                    setIsSearchOpen(true);
                  } else if (searchQuery.trim()) {
                    handleSearchSubmit();
                  } else {
                    searchInputRef.current?.focus();
                  }
                }}
                className={`w-9 h-9 flex items-center justify-center transition-colors cursor-pointer shrink-0 ${isHomePage
                  ? "text-white hover:text-white"
                  : "text-[#5B5B5B] bg-white/10 dark:bg-transparent dark:text-fg-secondary dark:hover:text-fg"
                  }`}
                title="Search"
                aria-label="Search"
              >
                <Search className="w-5 h-5 pr-0.5" strokeWidth={1.6} />
              </button>

              {/* Input & Clear Action (smooth fade in/out) */}
              <form
                onSubmit={handleSearchSubmit}
                className={`flex-1 h-full flex items-center pr-2.5 min-w-0 transition-opacity duration-200 ${isSearchOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none w-0"
                  }`}
              >
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") setIsSearchOpen(false);
                  }}
                  placeholder="Search..."
                  className={`w-full h-full bg-transparent text-[13px] outline-none ${isHomePage
                    ? "text-white placeholder-white/60"
                    : "text-[#222222] dark:text-fg placeholder-[#7A7E85] dark:placeholder-fg-placeholder"
                    }`}
                />
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (searchQuery) {
                      setSearchQuery("");
                      searchInputRef.current?.focus();
                    } else {
                      setIsSearchOpen(false);
                    }
                  }}
                  className={`p-1 transition-colors cursor-pointer shrink-0 rounded-full ${isHomePage
                    ? "text-white/80 hover:text-white hover:bg-white/20"
                    : "text-[#5B5B5B] hover:text-black dark:text-fg-tertiary dark:hover:text-fg hover:bg-gray-200/50 dark:hover:bg-noir-650"
                    }`}
                  title={searchQuery ? "Clear search" : "Close search"}
                  aria-label={searchQuery ? "Clear search" : "Close search"}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

            {/* Dark Mode Switch */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className={`relative w-14.5 sm:w-16 h-full sm:h-8-5 rounded-full p-0.75 flex items-center cursor-pointer select-none transition-colors duration-200 shrink-0 ${isHomePage
                ? "bg-white/15 border border-white/40 hover:border-white/80 backdrop-blur-xs"
                : "bg-white/10 dark:bg-noir-800 border border-[#5B5B5B] dark:border-line-strong"
                }`}
            >
              {/* Left Slot: Dot in dark mode */}
              <div className="w-6 sm:w-7 h-6 sm:h-7 flex items-center justify-center">
                <span
                  className={`w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full transition-all duration-300 ${isHomePage ? "bg-white/70" : "bg-[#727883] dark:bg-fg-disabled"
                    } ${isDark ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
                />
              </div>

              {/* Right Slot: Dot in light mode */}
              <div className="w-6 sm:w-7 h-6 sm:h-7 flex items-center justify-center ml-auto">
                <span
                  className={`w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full transition-all duration-300 ${isHomePage ? "bg-white/70" : "bg-[#727883] dark:bg-fg-disabled"
                    } ${!isDark ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
                />
              </div>

              {/* Sliding White Knob with Sun / Moon Icon */}
              <div
                className={`absolute top-0.6 left-0.75 w-6.5 sm:w-7 h-6.5 sm:h-7 rounded-full bg-white dark:bg-fg shadow-sm flex items-center justify-center transition-transform duration-300 ease-in-out ${isDark ? "translate-x-6.5 sm:translate-x-7" : "translate-x-0"
                  }`}
              >
                {isDark ? (
                  <Moon className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#1A1C20] dark:text-noir-900 transition-transform duration-200" strokeWidth={2.2} />
                ) : (
                  <Sun className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#1A1C20] dark:text-noir-900 transition-transform duration-200" strokeWidth={2.2} />
                )}
              </div>
            </button>

            {/* Wishlist Button */}
            <Link
              to="/wishlist"
              className={`hidden md:flex w-8 h-8 sm:w-9 sm:h-9 rounded-full items-center justify-center transition-all relative shrink-0 ${isHomePage
                ? "border border-white/40 text-white bg-white/10 hover:border-white hover:bg-white/20"
                : "border border-[#5B5B5B] dark:border-line-strong dark:bg-noir-800 text-[#5B5B5B] bg-white/10 dark:text-fg-secondary hover:bg-white/20 dark:hover:bg-noir-750 dark:hover:border-line-hover dark:hover:text-fg hover:scale-x-105"
                }`}
              title="Wishlist"
            >
              <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={1.5} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white dark:bg-copper-400 text-black dark:text-fg-on-accent text-[9px] sm:text-[10px] font-bold w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center shadow-xs border border-[#C5C8CD] dark:border-transparent">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Button */}
            <Link
              to="/cart"
              className={`hidden md:flex w-8 h-8 sm:w-9 sm:h-9 rounded-full items-center justify-center transition-all relative shrink-0 ${isHomePage
                ? "border border-white/40 text-white bg-white/10 hover:border-white hover:bg-white/20"
                : "border border-[#5B5B5B] dark:border-line-strong dark:bg-noir-800 text-[#5B5B5B] bg-white/10 dark:text-fg-secondary hover:bg-white/20 dark:hover:bg-noir-750 dark:hover:border-line-hover dark:hover:text-fg hover:scale-x-105"
                }`}
              title="Cart"
            >
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white dark:bg-copper-400 text-black dark:text-fg-on-accent text-[9px] sm:text-[10px] font-bold w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center shadow-xs border border-[#C5C8CD] dark:border-transparent">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Desktop Divider */}
            <div className={`hidden md:block h-5 w-px mx-0.5 lg:mx-1 shrink-0 ${isHomePage ? "bg-white/40" : "bg-[#5B5B5B] dark:bg-line-strong"
              }`}></div>

            {/* Profile Button */}
            <Link
              to={user ? "/profile" : "/Login"}
              className={`hidden md:flex h-9 px-3.5 rounded-full items-center gap-2 transition-all text-[13px] font-medium shrink-0 ${isHomePage
                ? "border border-white/40 text-white bg-white/10 hover:border-white hover:bg-white/20"
                : "border border-[#5B5B5B] dark:border-line-strong dark:bg-noir-800 text-[#5B5B5B] bg-white/10 dark:text-fg hover:bg-white/20 dark:hover:bg-noir-750 dark:hover:border-copper-600 dark:hover:text-copper-300 hover:scale-x-105"
                }`}
            >
              <User className={`w-4 h-4 ${isHomePage ? "text-white" : "text-[#5B5B5B] dark:text-fg-secondary"}`} strokeWidth={1.5} />
              <span>{user?.username ? user.username.split(" ")[0] : "Login"}</span>
            </Link>

            {/* Mobile Menu Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all cursor-pointer shrink-0 ${isHomePage
                ? "border border-white/40 text-white bg-white/10 hover:border-white"
                : "border border-[#5B5B5B] dark:border-line-strong bg-transparent dark:bg-noir-800 text-[#222222] dark:text-fg-secondary hover:border-[#9A4D2C] dark:hover:border-line-hover hover:text-[#9A4D2C] dark:hover:text-fg"
                }`}
              title="Toggle Menu"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>

          </div>

        </div>

        {/* Mobile Menu Dropdown (Search is cleanly placed here for mobile users) */}
        {isMobileMenuOpen && (
          <div className={`md:hidden px-4 py-3 space-y-1.5 shadow-md border-t ${isHomePage
            ? "bg-[#161413]/95 backdrop-blur-md border-white/15 text-white"
            : "bg-[#E2E2E4] dark:bg-noir-850 border-[#D0D2D7] dark:border-line-subtle"
            }`}>
            {/* Mobile Search Bar inside Menu */}
            <form
              onSubmit={(e) => {
                handleSearchSubmit(e);
                setIsMobileMenuOpen(false);
              }}
              className="relative mb-3 pt-1"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className={`w-full h-9 pl-9 pr-9 rounded-full border text-sm outline-none transition-colors ${isHomePage
                  ? "border-white/30 bg-white/10 text-white placeholder-white/50 focus:border-white/60"
                  : "border-[#5B5B5B] dark:border-line-control bg-white/90 dark:bg-noir-750 text-[#222] dark:text-fg placeholder-[#7A7E85] dark:placeholder-fg-placeholder focus:border-[#9A4D2C] dark:focus:border-copper-400"
                  }`}
              />
              <Search className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 pt-0.5 ${isHomePage ? "text-white/60" : "text-[#7A7E85] dark:text-fg-tertiary"
                }`} strokeWidth={1.5} />
              {searchQuery && (
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSearchQuery("");
                  }}
                  className={`absolute right-2.5 top-1/2 -translate-y-1/2 p-1 cursor-pointer ${isHomePage ? "text-white/70 hover:text-white" : "text-slate-400 dark:text-fg-tertiary hover:text-slate-600 dark:hover:text-fg"
                    }`}
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>

            <NavLink
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={mobileNavLinkClass}
            >
              Home
            </NavLink>
            <NavLink
              to="/shop"
              onClick={() => setIsMobileMenuOpen(false)}
              className={mobileNavLinkClass}
            >
              Shop
            </NavLink>
            <NavLink
              to="/orders"
              onClick={() => setIsMobileMenuOpen(false)}
              className={mobileNavLinkClass}
            >
              My Orders
            </NavLink>
            <NavLink
              to="/wishlist"
              onClick={() => setIsMobileMenuOpen(false)}
              className={mobileNavLinkClass}
            >
              <div className="flex items-center justify-between">
                <span>Wishlist</span>
                {wishlistCount > 0 && (
                  <span className="bg-[#9A4D2C] dark:bg-copper-500 text-white dark:text-fg-on-accent text-[11px] font-bold px-2 py-0.5 rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </div>
            </NavLink>
            <NavLink
              to="/cart"
              onClick={() => setIsMobileMenuOpen(false)}
              className={mobileNavLinkClass}
            >
              <div className="flex items-center justify-between">
                <span>Cart</span>
                {cartCount > 0 && (
                  <span className="bg-[#9A4D2C] dark:bg-copper-500 text-white dark:text-fg-on-accent text-[11px] font-bold px-2 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </div>
            </NavLink>

            <hr className={`my-2 ${isHomePage ? "border-white/15" : "border-[#D0D2D7] dark:border-line-subtle"
              }`} />

            <NavLink
              to={user ? "/profile" : "/Login"}
              onClick={() => setIsMobileMenuOpen(false)}
              className={mobileNavLinkClass}
            >
              {user ? `My Profile (${user.username})` : "Login / Register"}
            </NavLink>
          </div>
        )}
      </header>

      {showScrollToTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="fixed bottom-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-[#9A4D2C] dark:bg-copper-500 text-white dark:text-fg-on-accent dark:hover:bg-copper-400 shadow-lg dark:shadow-noir-md transition-transform hover:scale-105 active:scale-95"
        >
          <ArrowUp className="h-4 w-4" strokeWidth={2.5} />
        </button>
      )}
    </>
  );
}