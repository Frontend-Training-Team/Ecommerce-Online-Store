import { Link } from "react-router-dom";

function OrderItem({ Myorder }) {
    const statusConfig = {
        pending: {
            label: "Pending",
            badgeClass: "bg-amber-50 text-amber-700 border-amber-200/60 dark:bg-state-warning/10 dark:text-state-warning dark:border-state-warning/25",
            dotClass: "bg-amber-500 dark:bg-state-warning",
        },
        confirmed: {
            label: "Confirmed",
            badgeClass: "bg-blue-50 text-blue-700 border-blue-200/60 dark:bg-state-confirmed/10 dark:text-state-confirmed dark:border-state-confirmed/25",
            dotClass: "bg-blue-500 dark:bg-state-confirmed",
        },
        processing: {
            label: "Processing",
            badgeClass: "bg-purple-50 text-purple-700 border-purple-200/60 dark:bg-state-info/10 dark:text-state-info dark:border-state-info/25",
            dotClass: "bg-purple-500 dark:bg-state-info",
        },
        shipped: {
            label: "Shipped",
            badgeClass: "bg-cyan-50 text-cyan-700 border-cyan-200/60 dark:bg-state-shipped/10 dark:text-state-shipped dark:border-state-shipped/25",
            dotClass: "bg-cyan-500 dark:bg-state-shipped",
        },
        delivered: {
            label: "Delivered",
            badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-state-success/10 dark:text-state-success dark:border-state-success/25",
            dotClass: "bg-emerald-500 dark:bg-state-success",
        },
        cancelled: {
            label: "Cancelled",
            badgeClass: "bg-rose-50 text-rose-700 border-rose-200/60 dark:bg-state-danger/10 dark:text-state-danger dark:border-state-danger/25",
            dotClass: "bg-rose-500 dark:bg-state-danger",
        },
        returned: {
            label: "Returned",
            badgeClass: "bg-gray-100 text-gray-700 border-gray-200 dark:bg-state-neutral/10 dark:text-state-neutral dark:border-state-neutral/25",
            dotClass: "bg-gray-400 dark:bg-state-neutral",
        },
    };

    let order = {
        ...Myorder,
        _id: Myorder?._id || "N/a",
        item: Myorder?.items || [],
        totalPrice: Myorder?.totalPrice || "N/a",
        status: Myorder?.status || "N/a",
        createdAt: Myorder?.createdAt || new Date().toISOString()
    };

    const statusKey = (order.status || "").toLowerCase();
    const currentConfig = statusConfig[statusKey] || {
        label: order.status || "Unknown",
        badgeClass: "bg-gray-100 text-gray-700 border-gray-200 dark:bg-state-neutral/10 dark:text-state-neutral dark:border-state-neutral/25",
        dotClass: "bg-gray-400 dark:bg-state-neutral",
    };

    const date = new Date(order.createdAt);
    const formattedDate = !isNaN(date.getTime())
        ? date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
        : "N/A";

    const itemsCount = Array.isArray(order.item) ? order.item.length : 0;

    return (
        <Link
            to={`/orders/${order._id}`}
            className="max-w-7xl bg-[#FAFAFA] dark:bg-noir-800 border-[1.5px] border-[#DFDFDF] dark:border-line flex justify-between items-center 
            py-5 px-6 sm:px-8 rounded-2xl mb-7 hover:border-[#7E4A2D]/40 dark:hover:border-copper-600/60 transition-all hover:shadow-xs group"
        >
            {/* left side */}
            <div className="flex flex-col space-y-2">
                <span className={`w-fit inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs sm:text-sm font-medium border ${currentConfig.badgeClass}`}>
                    <span className={`w-2 h-2 rounded-full shrink-0 ${currentConfig.dotClass}`}></span>
                    <span>{currentConfig.label}</span>
                </span>
                <span className="text-xl sm:text-2xl text-black dark:text-fg font-Inter font-semibold uppercase 
                group-hover:text-[#7E4A2D] dark:group-hover:text-copper-300 transition-colors">
                    #{order._id?.slice(-8)}
                </span>
                <span className="text-sm sm:text-[16px] text-[#666666] dark:text-fg-tertiary font-Inter font-medium">
                    {formattedDate}
                </span>
            </div>

            {/* right side */}
            <div className="flex flex-col items-end space-y-2 sm:space-y-2.5">
                <span className="text-xl sm:text-2xl text-[#7E4A2D] dark:text-copper-400 font-Inter font-bold">
                    EGP {order.totalPrice}
                </span>
                <span className="text-base sm:text-xl text-[#A6A6A6] dark:text-fg-tertiary font-Inter">
                    {itemsCount} item(s)
                </span>
            </div>
        </Link>
    );
}

export default OrderItem;