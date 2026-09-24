import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import { User, MapPin, Lock, LogOut, ShoppingBag, Heart } from "lucide-react";

export default function ProfileSidebar({ activeTab, setActiveTab, ordersCount = 0, wishlistCount = 0 }) {
  const { user, logout } = useAuth();
  const [imgError, setImgError] = useState(false);
  const [prevAvatar, setPrevAvatar] = useState(user?.avatar);

  if (user?.avatar !== prevAvatar) {
    setPrevAvatar(user?.avatar);
    setImgError(false);
  }

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : "Member";

  const initials = user?.username
    ? user.username.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
    : "U";

  const navItems = [
    { id: "overview", label: "Profile overview", icon: User },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "security", label: "Security", icon: Lock },
  ];

  return (
    <aside className="w-full md:w-70 lg:w-77.5 shrink-0 flex flex-col gap-5">

      <div className="bg-white dark:bg-noir-800 border border-[#E3DEDA] dark:border-line rounded-2xl p-6 flex flex-col items-center text-center shadow-sm dark:shadow-none">

        <div className="w-24 h-24 rounded-full bg-[#F2EBE5] dark:bg-copper-900 border border-[#E0D3C6] dark:border-copper-800 text-[#8A4526] dark:text-copper-300 font-Serif 
        text-3xl flex items-center justify-center overflow-hidden mb-3">
          {user?.avatar && !imgError ? (
            <img
              key={user.avatar}
              src={user.avatar}
              alt={user?.username || "User avatar"}
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <span>{initials}</span>
          )}
        </div>

        <h3 className="font-Serif text-xl font-medium text-[#211C18] dark:text-fg mb-1">
          {user?.username || "Valued Customer"}
        </h3>
        <p className="text-sm text-[#6F655D] dark:text-fg-tertiary mb-3 break-all">
          {user?.email}
        </p>

        <span className="px-3.5 py-1 rounded-full bg-[#F2EBE5] dark:bg-copper-900 text-[#8A4526] dark:text-copper-300 text-xs font-semibold 
        tracking-wider uppercase mb-2">
          {user?.role || "CUSTOMER"}
        </span>

        <span className="text-xs text-[#8C837B] dark:text-fg-tertiary">
          Member since {memberSince}
        </span>
      </div>

      <nav className="bg-white dark:bg-noir-800 border border-[#E3DEDA] dark:border-line rounded-2xl p-2.5 flex flex-col gap-1 shadow-sm dark:shadow-none">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === (activeTab === "edit-profile" ? "overview" : activeTab);
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full h-12 px-4 rounded-xl flex items-center gap-3 text-[14px] font-medium 
                transition-colors cursor-pointer text-left ${isActive
                  ? "bg-[#8A4526] dark:bg-copper-500 text-white dark:text-fg-on-accent shadow-sm"
                  : "text-[#3A332D] dark:text-fg-secondary hover:bg-[#FAF8F6] dark:hover:bg-noir-750 hover:text-[#8A4526] dark:hover:text-copper-300"
                }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-white dark:text-fg-on-accent" : "text-[#6F655D] dark:text-fg-tertiary"}`} strokeWidth={1.8} />
              <span>{item.label}</span>
            </button>
          );
        })}

        <Link
          to="/orders"
          className="w-full h-12 px-4 rounded-xl flex items-center justify-between text-[14px] font-medium text-[#3A332D] dark:text-fg-secondary 
          hover:bg-[#FAF8F6] dark:hover:bg-noir-750 hover:text-[#8A4526] dark:hover:text-copper-300 transition-colors"
        >
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-4 h-4 text-[#6F655D] dark:text-fg-tertiary" strokeWidth={1.8} />
            <span>My orders</span>
          </div>
          {ordersCount > 0 && (
            <span className="text-xs bg-[#F2EBE5] dark:bg-copper-900 text-[#8A4526] dark:text-copper-300 px-2 py-0.5 rounded-full font-semibold">
              {ordersCount}
            </span>
          )}
        </Link>

        <Link
          to="/wishlist"
          className="w-full h-12 px-4 rounded-xl flex items-center justify-between text-[14px] font-medium text-[#3A332D] dark:text-fg-secondary 
          hover:bg-[#FAF8F6] dark:hover:bg-noir-750 hover:text-[#8A4526] dark:hover:text-copper-300 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Heart className="w-4 h-4 text-[#6F655D] dark:text-fg-tertiary" strokeWidth={1.8} />
            <span>Wishlist</span>
          </div>
          {wishlistCount > 0 && (
            <span className="text-xs bg-[#F2EBE5] dark:bg-copper-900 text-[#8A4526] dark:text-copper-300 px-2 py-0.5 rounded-full font-semibold">
              {wishlistCount}
            </span>
          )}
        </Link>

        <div className="h-px bg-[#EDE8E3] dark:bg-line-subtle my-1.5 mx-2"></div>

        <button
          onClick={logout}
          className="w-full h-12 px-4 rounded-xl flex items-center gap-3 text-[14px] font-medium 
          text-[#A83A2C] dark:text-state-danger hover:bg-red-50 dark:hover:bg-state-danger/10 transition-colors cursor-pointer text-left border 
          hover:border-red-200 dark:hover:border-state-danger/25"
        >
          <LogOut className="w-4 h-4 text-[#A83A2C] dark:text-state-danger" strokeWidth={1.8} />
          <span>Log out</span>
        </button>
      </nav>
    </aside>
  );
}