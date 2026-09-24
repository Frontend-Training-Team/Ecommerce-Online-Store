import { Edit3, Plus, Lock, Package, Check, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProfileOverview({ user, setActiveTab, orders = [], wishlistCount = 0 }) {
  const addresses = user?.addresses || [];
  const recentOrders = orders.slice(0, 2);

  return (
    <div className="flex-1 flex flex-col gap-6">
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <div className="p-5 border border-[#E3DEDA] dark:border-line rounded-2xl bg-[#FAF8F6] dark:bg-noir-800 flex flex-col gap-1">
          <span className="text-xs font-semibold text-[#6F655D] dark:text-fg-secondary tracking-wider uppercase">Total Orders</span>
          <span className="font-Serif text-3xl text-[#211C18] dark:text-fg">{orders.length}</span>
          <span className="text-xs text-[#6F655D] dark:text-fg-tertiary">
            {orders.length > 0 ? "View your past orders" : "No orders yet"}
          </span>
        </div>

        <div className="p-5 border border-[#E3DEDA] dark:border-line rounded-2xl bg-[#FAF8F6] dark:bg-noir-800 flex flex-col gap-1">
          <span className="text-xs font-semibold text-[#6F655D] dark:text-fg-secondary tracking-wider uppercase">Wishlist</span>
          <span className="font-Serif text-3xl text-[#211C18] dark:text-fg">{wishlistCount}</span>
          <span className="text-xs text-[#6F655D] dark:text-fg-tertiary">Saved items for later</span>
        </div>

        <div className="p-5 border border-[#E3DEDA] dark:border-line rounded-2xl bg-[#FAF8F6] dark:bg-noir-800 flex flex-col gap-1">
          <span className="text-xs font-semibold text-[#6F655D] dark:text-fg-secondary tracking-wider uppercase">Saved Addresses</span>
          <span className="font-Serif text-3xl text-[#211C18] dark:text-fg">{addresses.length}</span>
          <span className="text-xs text-[#6F655D] dark:text-fg-tertiary">
            {addresses.some(a => a.defaultAddress) ? "Default address set" : "Ready for checkout"}
          </span>
        </div>
      </div>

      <section className="bg-white dark:bg-noir-800 border border-[#E3DEDA] dark:border-line rounded-2xl p-6 sm:p-7 flex flex-col gap-5 shadow-sm dark:shadow-none">
        <div className="flex items-center justify-between">
          <h2 className="font-Serif text-2xl font-medium text-[#211C18] dark:text-fg">Personal information</h2>
          <button
            onClick={() => setActiveTab("edit-profile")}
            className="h-10 px-4 rounded-lg border border-[#D6D0CA] dark:border-line-strong bg-white dark:bg-noir-800 text-sm font-medium text-[#3A332D] dark:text-fg-secondary 
            hover:border-[#8A4526] dark:hover:border-copper-500 hover:text-[#8A4526] dark:hover:text-copper-300 flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-[#EDE8E3] dark:border-line-subtle">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-[#6F655D] dark:text-fg-secondary tracking-wider uppercase">Username</span>
            <span className="text-[15px] font-medium text-[#211C18] dark:text-fg">{user?.username || "—"}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-[#6F655D] dark:text-fg-secondary tracking-wider uppercase">Email address</span>
            <div className="flex items-center gap-2">
              <span className="text-[15px] font-medium text-[#211C18] dark:text-fg">{user?.email}</span>
              <span className="px-2 py-0.5 rounded-full bg-[#E8F0EA] dark:bg-state-success/10 text-[#2F6B4F] dark:text-state-success text-[11px] font-medium flex 
              items-center gap-1">
                <Check className="w-3 h-3" /> Verified
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-[#6F655D] dark:text-fg-secondary tracking-wider uppercase">Phone number</span>
            <span className="text-[15px] font-medium text-[#211C18] dark:text-fg">{user?.phone || "Not provided"}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-[#6F655D] dark:text-fg-secondary tracking-wider uppercase">Account role</span>
            <span className="text-[15px] font-medium text-[#211C18] dark:text-fg capitalize">{user?.role || "Customer"}</span>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-noir-800 border border-[#E3DEDA] dark:border-line rounded-2xl p-6 sm:p-7 flex flex-col gap-5 shadow-sm dark:shadow-none">
        <div className="flex items-center justify-between">
          <h2 className="font-Serif text-2xl font-medium text-[#211C18] dark:text-fg">Delivery addresses</h2>
          <button
            onClick={() => setActiveTab("addresses")}
            className="h-10 px-4 rounded-lg border border-[#D6D0CA] dark:border-line-strong bg-white dark:bg-noir-800 text-sm font-medium text-[#3A332D] dark:text-fg-secondary 
            hover:border-[#8A4526] dark:hover:border-copper-500 hover:text-[#8A4526] dark:hover:text-copper-300 flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Manage addresses</span>
          </button>
        </div>

        {addresses.length === 0 ? (
          <div className="p-6 border border-dashed border-[#D6D0CA] dark:border-line-strong rounded-xl text-center text-sm text-[#6F655D] dark:text-fg-tertiary">
            No delivery addresses saved yet. Click "Manage addresses" to add one.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#EDE8E3] dark:border-line-subtle">
            {addresses.slice(0, 2).map((addr, idx) => (
              <div 
                key={idx}
                className={`p-4 rounded-xl border flex flex-col gap-2 ${
                  addr.defaultAddress ? "bg-[#FAF6F2] dark:bg-copper-900/40 border-[#E0D3C6] dark:border-copper-600" : "bg-white dark:bg-noir-750 border-[#E3DEDA] dark:border-line"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-[15px] text-[#211C18] dark:text-fg flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#8A4526] dark:text-copper-400" />
                    {addr.city}, {addr.country}
                  </span>
                  {addr.defaultAddress && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#8A4526] dark:bg-copper-500 text-white dark:text-fg-on-accent text-[11px] font-medium">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-[#4A423C] dark:text-fg-secondary leading-relaxed">
                  {addr.street}{addr.building ? `, Building ${addr.building}` : ""}
                  {addr.postalCode ? ` · ${addr.postalCode}` : ""}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

        <section className="bg-white dark:bg-noir-800 border border-[#E3DEDA] dark:border-line rounded-2xl p-6 flex flex-col justify-between gap-4 shadow-sm dark:shadow-none">
          <div className="space-y-2">
            <h3 className="font-Serif text-xl font-medium text-[#211C18] dark:text-fg">Security</h3>
            <p className="text-sm text-[#4A423C] dark:text-fg-secondary leading-relaxed">
              Keep your account secure. Every password update is verified with a one-time code sent to your email.
            </p>
          </div>
          <button
            onClick={() => setActiveTab("security")}
            className="self-start h-10 px-5 rounded-lg border border-[#8A4526] dark:border-copper-600 text-[#8A4526] dark:text-copper-400 hover:bg-[#FAF8F6] dark:hover:bg-noir-750 text-sm 
            font-medium flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Change password</span>
          </button>
        </section>

        <section className="bg-white dark:bg-noir-800 border border-[#E3DEDA] dark:border-line rounded-2xl p-6 flex flex-col justify-between gap-4 shadow-sm dark:shadow-none">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-Serif text-xl font-medium text-[#211C18] dark:text-fg">Recent orders</h3>
              <Link to="/orders" className="text-xs text-[#8A4526] dark:text-copper-400 dark:hover:text-copper-300 hover:underline font-medium">View all</Link>
            </div>

            {recentOrders.length === 0 ? (
              <p className="text-sm text-[#6F655D] dark:text-fg-tertiary py-2">No orders placed yet.</p>
            ) : (
              <div className="space-y-2.5">
                {recentOrders.map((order, idx) => (
                  <div key={order._id || idx} className="flex items-center justify-between pb-2 border-b border-[#EDE8E3] dark:border-line-subtle last:border-b-0">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#F2F0EE] dark:bg-noir-750 flex items-center justify-center text-[#8A4526] dark:text-copper-400">
                        <Package className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-[#211C18] dark:text-fg">Order #{order._id?.slice(-8) || idx + 1}</p>
                        <p className="text-[11px] text-[#6F655D] dark:text-fg-tertiary">{order.items?.length || 1} items</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-[11px] px-2 py-0.5 rounded-full bg-[#FAF1E4] text-[#7A4E14] font-medium capitalize ${({
                        pending: "dark:bg-state-warning/10 dark:text-state-warning dark:border-state-warning/25",
                        confirmed: "dark:bg-state-confirmed/10 dark:text-state-confirmed dark:border-state-confirmed/25",
                        processing: "dark:bg-state-info/10 dark:text-state-info dark:border-state-info/25",
                        shipped: "dark:bg-state-shipped/10 dark:text-state-shipped dark:border-state-shipped/25",
                        delivered: "dark:bg-state-success/10 dark:text-state-success dark:border-state-success/25",
                        cancelled: "dark:bg-state-danger/10 dark:text-state-danger dark:border-state-danger/25",
                      })[(order.status || "pending").toLowerCase()] || "dark:bg-state-neutral/10 dark:text-state-neutral dark:border-state-neutral/25"}`}>
                        {order.status || "Pending"}
                      </span>
                      <p className="text-xs font-semibold text-[#211C18] dark:text-fg mt-0.5">EGP {order.total || 0}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

    </div>
  );
}