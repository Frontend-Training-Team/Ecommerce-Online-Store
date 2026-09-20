import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Search, Sun, Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import logoImg from "../../assets/images/4.png";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { getMyWishlist } from "../../api/wishlist.api";
import { useDarkMode } from "../../hooks/useDarkMode";

export default function Navbar() {
  const { user } = useAuth();
  const { cartCount } = useCart();
  const { toggleTheme } = useDarkMode();
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // تحديث عداد الـ Wishlist
  useEffect(() => {
    if (!user) {
      setWishlistCount(0);
      return;
    }
    getMyWishlist()
      .then((res) => {
        const count = res.data?.totalProducts ?? res.data?.wishlist?.length ?? 0;
        setWishlistCount(count);
      })
      .catch(() => setWishlistCount(0));
  }, [user]);

  const navLinkClass = ({ isActive }) =>
    `transition-colors duration-200 ${
      isActive
        ? "text-[#9A4D2C] font-semibold"
        : "text-[#4A4744] hover:text-[#9A4D2C] font-medium"
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `block px-4 py-2.5 rounded-lg text-sm transition-colors ${
      isActive
        ? "bg-[#FAF9F7] text-[#9A4D2C] font-semibold"
        : "text-[#4A4744] hover:bg-[#FAF9F7] hover:text-[#9A4D2C] font-medium"
    }`;

  return (
    <header className="w-full bg-[#ECEAE7] border-b border-[#E0DED9] sticky top-0 z-50">
      <div className="w-full px-4 sm:px-8 lg:px-14 py-3 sm:py-3.5 flex items-center justify-between">
        
        {/* 1. اللوجو (على الشمال بمساحة واسعة ومريحة) */}
        <Link to="/" className="flex items-center flex-shrink-0">
          <img
            src={logoImg}
            alt="LAMSA Home Furniture"
            className="h-8 sm:h-9 md:h-10 object-contain"
          />
        </Link>

        {/* 2. الروابط الأساسية في المنتصف (للديسكتوب فقط) */}
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

        {/* 3. عناصر التحكم والأيقونات على اليمين */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          
          {/* زرار البحث (يظهر على الديسكتوب فقط مخفي من الموبايل) */}
          <Link
            to="/products"
            className="hidden md:flex w-9 h-9 rounded-full border border-[#D5D3D0] items-center justify-center text-[#55524E] hover:border-[#9A4D2C] hover:text-[#9A4D2C] transition-colors"
            title="Search"
          >
            <Search className="w-4 h-4" strokeWidth={1.5} />
          </Link>

          {/* زرار الثيم (الـ Pill) */}
          <button
            type="button"
            onClick={toggleTheme}
            className="h-8 sm:h-9 px-2 sm:px-2.5 rounded-full border border-[#D5D3D0] flex items-center gap-1.5 sm:gap-2 text-[#55524E] hover:border-[#9A4D2C] transition-colors cursor-pointer"
            title="Toggle Theme"
          >
            <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={1.5} />
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#6E6B67]"></span>
          </button>

          {/* زرار المفضلة */}
          <Link
            to="/wishlist"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#D5D3D0] flex items-center justify-center text-[#55524E] hover:border-[#9A4D2C] hover:text-[#9A4D2C] transition-colors relative"
            title="Wishlist"
          >
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={1.5} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#222222] text-white text-[9px] sm:text-[10px] font-semibold w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* زرار السلة */}
          <Link
            to="/cart"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#D5D3D0] flex items-center justify-center text-[#55524E] hover:border-[#9A4D2C] hover:text-[#9A4D2C] transition-colors relative"
            title="Cart"
          >
            <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#222222] text-white text-[9px] sm:text-[10px] font-semibold w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* الخط الفاصل (للديسكتوب فقط) */}
          <div className="hidden md:block h-5 w-[1px] bg-[#D5D3D0] mx-1"></div>

          {/* زرار المستخدم (للديسكتوب فقط مخفي من الموبايل لمنع الزحمة) */}
          <Link
            to={user ? "/profile" : "/login"}
            className="hidden md:flex h-9 px-4 rounded-full border border-[#D5D3D0] items-center gap-2 text-[#4A4744] hover:border-[#9A4D2C] hover:text-[#9A4D2C] transition-colors text-[13px] font-medium"
          >
            <User className="w-4 h-4" strokeWidth={1.5} />
            <span>{user?.username ? user.username.split(" ")[0] : "Username"}</span>
          </Link>

          {/* زرار القائمة للموبايل (Hamburger Menu) */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-8 h-8 rounded-full border border-[#D5D3D0] flex items-center justify-center text-[#55524E] hover:border-[#9A4D2C] transition-colors cursor-pointer ml-0.5"
            title="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>

        </div>

      </div>

      {/* 4. القائمة المنسدلة للشاشات الصغيرة */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#ECEAE7] border-t border-[#E0DED9] px-4 py-3 space-y-1 shadow-md">
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
          
          <hr className="border-[#D5D3D0] my-2" />

          {/* رابط الحساب الشخصي من داخل المنيو على الموبايل */}
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