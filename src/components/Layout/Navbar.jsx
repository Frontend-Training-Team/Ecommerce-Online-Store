import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Search, Sun, Moon, Heart, ShoppingBag, User, Menu, X } from "lucide-react";
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
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  const navLinkClass = ({ isActive }) =>
    `transition-colors duration-200 ${
      isActive
        ? "text-[#9A4D2C] dark:text-white font-semibold"
        : "text-[#2E2E2E] dark:text-[#A0A4AB] hover:text-[#9A4D2C] dark:hover:text-white font-medium"
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `block px-4 py-2.5 rounded-lg text-sm transition-colors ${
      isActive
        ? "bg-white/80 dark:bg-[#202328] text-[#9A4D2C] dark:text-white font-semibold"
        : "text-[#2E2E2E] dark:text-[#A0A4AB] hover:bg-white/50 dark:hover:bg-[#202328] hover:text-[#9A4D2C] dark:hover:text-white font-medium"
    }`;

  return (
    <header className="w-full bg-[#E2E2E4] dark:bg-[#16181D] border-b border-[#D0D2D7] dark:border-[#2F333B] sticky top-0 z-50 transition-colors duration-200">
      <div className="w-full px-4 sm:px-8 lg:px-14 py-3 sm:py-3.5 flex items-center justify-between gap-4">
        
        {/* Left: Logo */}
        <Link to="/" className="flex items-center flex-shrink-0">
          <img
            src={logoImg}
            alt="LAMSA Home Furniture"
            className="h-8 sm:h-9 md:h-10 object-contain dark:brightness-110"
          />
        </Link>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-10 text-[14px]">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/products" className={navLinkClass}>
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
        <div className="flex items-center gap-2 sm:gap-2.5">
          
          {/* Smooth Expanding Search Pill (Shorter, fluid width transition) */}
          <div
            ref={searchContainerRef}
            className={`relative flex items-center h-9 rounded-full transition-all duration-300 ease-in-out overflow-hidden ${
              isSearchOpen
                ? "w-40 sm:w-48 md:w-52 border border-[#9DA1AA] dark:border-[#2F333B] bg-white/70 dark:bg-[#202327] shadow-xs"
                : "w-9 border border-[#9DA1AA] dark:border-[#2F333B] bg-transparent dark:bg-[#202327]"
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
                }
              }}
              className="w-9 h-9 flex items-center justify-center text-[#222222] dark:text-[#A0A5AE] hover:text-[#9A4D2C] dark:hover:text-white transition-colors cursor-pointer shrink-0"
              title="Search"
              aria-label="Search"
            >
              <Search className="w-4 h-4" strokeWidth={1.6} />
            </button>

            {/* Input & Clear Action (smooth fade in/out) */}
            <form
              onSubmit={handleSearchSubmit}
              className={`flex-1 h-full flex items-center pr-2.5 min-w-0 transition-opacity duration-200 ${
                isSearchOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none w-0"
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
                className="w-full h-full bg-transparent text-[13px] text-[#222222] dark:text-[#F5F1EA] placeholder-[#7A7E85] dark:placeholder-[#7E8590] outline-none"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSearchQuery("");
                  setIsSearchOpen(false);
                }}
                className="p-1 text-[#7A7E85] hover:text-[#222222] dark:hover:text-white transition-colors cursor-pointer shrink-0"
                title="Close search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Dark Mode Switch - matching exact Figma Design for both Light & Dark modes */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="relative w-[64px] h-[34px] rounded-full bg-[#D4D6DA] dark:bg-[#202327] border border-[#9DA1AA] dark:border-[#2F333B] p-[3px] flex items-center cursor-pointer select-none transition-colors duration-200 shrink-0"
          >
            {/* Left Slot: Dot in dark mode */}
            <div className="w-7 h-7 flex items-center justify-center">
              <span
                className={`w-2.5 h-2.5 rounded-full bg-[#727883] dark:bg-[#8A96A8] transition-all duration-300 ${
                  isDark ? "opacity-100 scale-100" : "opacity-0 scale-50"
                }`}
              />
            </div>

            {/* Right Slot: Dot in light mode */}
            <div className="w-7 h-7 flex items-center justify-center ml-auto">
              <span
                className={`w-2.5 h-2.5 rounded-full bg-[#727883] dark:bg-[#8A96A8] transition-all duration-300 ${
                  !isDark ? "opacity-100 scale-100" : "opacity-0 scale-50"
                }`}
              />
            </div>

            {/* Sliding White Knob with Sun / Moon Icon */}
            <div
              className={`absolute top-[3px] left-[3px] w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center transition-transform duration-300 ease-in-out ${
                isDark ? "translate-x-[30px]" : "translate-x-0"
              }`}
            >
              {isDark ? (
                <Moon className="w-3.5 h-3.5 text-[#1A1C20] transition-transform duration-200" strokeWidth={2.2} />
              ) : (
                <Sun className="w-3.5 h-3.5 text-[#1A1C20] transition-transform duration-200" strokeWidth={2.2} />
              )}
            </div>
          </button>

          {/* Wishlist Button */}
          <Link
            to="/wishlist"
            className="w-9 h-9 rounded-full border border-[#9DA1AA] dark:border-[#2F333B] bg-transparent dark:bg-[#202327] flex items-center justify-center text-[#222222] dark:text-[#A0A5AE] hover:border-[#9A4D2C] dark:hover:border-white/30 hover:text-[#9A4D2C] dark:hover:text-white transition-all relative shrink-0"
            title="Wishlist"
          >
            <Heart className="w-4 h-4" strokeWidth={1.5} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs border border-[#C5C8CD] dark:border-transparent">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart Button with Figma White Badge */}
          <Link
            to="/cart"
            className="w-9 h-9 rounded-full border border-[#9DA1AA] dark:border-[#2F333B] bg-transparent dark:bg-[#202327] flex items-center justify-center text-[#222222] dark:text-[#A0A5AE] hover:border-[#9A4D2C] dark:hover:border-white/30 hover:text-[#9A4D2C] dark:hover:text-white transition-all relative shrink-0"
            title="Cart"
          >
            <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs border border-[#C5C8CD] dark:border-transparent">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Desktop Divider */}
          <div className="hidden md:block h-5 w-[1px] bg-[#9DA1AA] dark:bg-[#2F333B] mx-1"></div>

          {/* User Button (Desktop) */}
          <Link
            to={user ? "/profile" : "/login"}
            className="hidden md:flex h-9 px-3.5 rounded-full border border-[#9DA1AA] dark:border-[#2F333B] bg-transparent dark:bg-[#202327] items-center gap-2 text-[#222222] dark:text-white hover:border-[#9A4D2C] dark:hover:border-white/30 hover:text-[#9A4D2C] transition-all text-[13px] font-medium shrink-0"
          >
            <User className="w-4 h-4 text-[#222222] dark:text-[#A0A5AE]" strokeWidth={1.5} />
            <span>{user?.username ? user.username.split(" ")[0] : "Username"}</span>
          </Link>

          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-full border border-[#9DA1AA] dark:border-[#2F333B] bg-transparent dark:bg-[#202327] flex items-center justify-center text-[#222222] dark:text-[#A0A5AE] hover:border-[#9A4D2C] hover:text-[#9A4D2C] dark:hover:text-white transition-all cursor-pointer"
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

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#E2E2E4] dark:bg-[#16181D] border-t border-[#D0D2D7] dark:border-[#2F333B] px-4 py-3 space-y-1 shadow-md">
          {/* Mobile Search Bar */}
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
              className="w-full h-9 pl-9 pr-4 rounded-full border border-[#9DA1AA] dark:border-[#2F333B] bg-white/80 dark:bg-[#202328] text-sm text-[#222] dark:text-[#F5F1EA] placeholder-[#7A7E85] dark:placeholder-[#7E8590] outline-none focus:border-[#9A4D2C]"
            />
            <Search className="w-4 h-4 text-[#7A7E85] absolute left-3 top-1/2 -translate-y-1/2 pt-0.5" strokeWidth={1.5} />
          </form>

          <NavLink
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className={mobileNavLinkClass}
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
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
            Wishlist
          </NavLink>
          
          <hr className="border-[#D0D2D7] dark:border-[#2F333B] my-2" />

          <NavLink
            to={user ? "/profile" : "/login"}
            onClick={() => setIsMobileMenuOpen(false)}
            className={mobileNavLinkClass}
          >
            {user ? `My Profile (${user.username})` : "Login / Register"}
          </NavLink>
        </div>
      )}
    </header>
  );
}