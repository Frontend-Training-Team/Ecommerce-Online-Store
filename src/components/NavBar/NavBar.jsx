import React from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import { 
  HiOutlineMagnifyingGlass, 
  HiOutlineMoon, 
  HiOutlineHeart, 
  HiOutlineShoppingBag 
} from 'react-icons/hi2';

export default function Navbar({ cartCount = 0 }) {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-indigo-600 text-white p-2 rounded-xl font-bold flex items-center justify-center shadow-md">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <div>
            <span className="font-extrabold text-gray-900 text-lg tracking-tight">Lamsa</span>
            <span className="block text-[10px] text-gray-400 tracking-widest font-semibold uppercase">ONLINE STORE</span>
          </div>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center bg-gray-50/80 p-1.5 rounded-full border border-gray-100 text-sm font-medium text-gray-600">
          <Link to="/" className="px-5 py-2 rounded-full hover:text-indigo-600 transition">Home</Link>
          <Link to="/shop" className="px-5 py-2 rounded-full bg-indigo-600 text-white shadow-sm">Shop</Link>
          <Link to="/orders" className="px-5 py-2 rounded-full hover:text-indigo-600 transition">My Orders</Link>
          <Link to="/wishlist" className="px-5 py-2 rounded-full hover:text-indigo-600 transition">Wishlist</Link>
        </nav>

        {/* Action Icons & User */}
        <div className="flex items-center gap-4 text-gray-600">
          <button className="p-2 hover:bg-gray-100 rounded-full transition text-gray-600 hover:text-gray-900">
            <HiOutlineMagnifyingGlass className="w-5 h-5" />
          </button>
          
          <button className="p-2 hover:bg-gray-100 rounded-full transition text-gray-600 hover:text-gray-900">
            <HiOutlineMoon className="w-5 h-5" />
          </button>
          
          <button className="p-2 hover:bg-gray-100 rounded-full relative transition text-gray-600 hover:text-gray-900">
            <HiOutlineHeart className="w-5 h-5" />
          </button>
          
          <button 
            onClick={() => navigate('/cart')} 
            className="p-2 hover:bg-gray-100 rounded-full relative transition text-gray-600 hover:text-gray-900"
          >
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[11px] min-w-[20px] h-5 px-1 rounded-full flex items-center justify-center font-bold shadow-sm">
                {cartCount}
              </span>
            )}
            <HiOutlineShoppingBag className="w-5 h-5" />
          </button>
          
          <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-gray-200">
            <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-xs">
              C
            </div>
            <span className="text-sm font-semibold text-gray-800">CUSTOMER</span>
          </div>
        </div>

      </div>
    </header>
  );
}