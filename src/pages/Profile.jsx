import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getMyOrders } from "../api/orders.api";
import { getMyWishlist } from "../api/wishlist.api";

import ProfileSkeleton from "../components/ui/skeleton/ProfileSkeleton";
import ProfileSidebar from "../components/ui/profile/ProfileSidebar";
import ProfileOverview from "../components/ui/profile/ProfileOverview";
import EditProfile from "../components/ui/profile/EditProfile";
import AddressBook from "../components/ui/profile/AddressBook";
import SecurityTab from "../components/ui/profile/SecurityTab";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const { user, loading: authLoading, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const [orders, setOrders] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    if (!user) return;

    const loadData = async () => {
      setLoadingData(true);
      try {
        const [ordersRes, wishlistRes] = await Promise.allSettled([
          getMyOrders({ limit: 10 }),
          getMyWishlist(),
        ]);

        if (ordersRes.status === "fulfilled") {
          setOrders(ordersRes.value.data?.orders || []);
        }
        if (wishlistRes.status === "fulfilled") {
          const count = wishlistRes.value.data?.totalProducts ?? wishlistRes.value.data?.wishlist?.length ?? 0;
          setWishlistCount(count);
        }
      } catch (err) {
        console.error("Error loading profile data:", err);
      } finally {
        setLoadingData(false);
      }
    };

    loadData();
  }, [user]);

  if (authLoading || loadingData) {
    return <ProfileSkeleton />;
  }

  if (!user) return null;

  return (
    <div className="mt-16 xl:mt-17 w-full bg-[#ffffff] dark:bg-noir-900 min-h-screen py-10 sm:py-12">
      <div className="w-full max-w-310 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-7">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col gap-2">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#6F655D] dark:text-fg-secondary">
            <Link to="/" className="hover:text-[#8A4526] dark:hover:text-copper-300">Home</Link>
            <span>/</span>
            <span>My Account</span>
            <span>/</span>
            <span className="text-[#8A4526] dark:text-copper-400 font-medium capitalize">{activeTab.replace("-", " ")}</span>
          </nav>

          <h1 className="font-Serif text-3xl sm:text-4xl lg:text-[42px] font-medium text-[#211C18] dark:text-fg">
            {activeTab === "overview" && "My Profile"}
            {activeTab === "edit-profile" && "Edit Profile"}
            {activeTab === "addresses" && "Address Book"}
            {activeTab === "security" && "Change Password"}
          </h1>
          <p className="text-xs sm:text-sm text-[#6F655D] dark:text-fg-secondary">
            Manage your personal details, delivery addresses and account security.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="flex flex-col md:flex-row gap-7 lg:gap-8 items-start">

          <ProfileSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            ordersCount={orders.length}
            wishlistCount={wishlistCount}
          />

          {activeTab === "overview" && (
            <ProfileOverview
              user={user}
              setActiveTab={setActiveTab}
              orders={orders}
              wishlistCount={wishlistCount}
            />
          )}

          {activeTab === "edit-profile" && (
            <EditProfile
              user={user}
              updateUser={updateUser}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === "addresses" && (
            <AddressBook
              user={user}
              updateUser={updateUser}
            />
          )}

          {activeTab === "security" && (
            <SecurityTab
              user={user}
              setActiveTab={setActiveTab}
            />
          )}

        </motion.div>

      </div>
    </div>
  )
}