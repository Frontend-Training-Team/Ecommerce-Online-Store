/* eslint-disable react-hooks/set-state-in-effect */
import toast from "react-hot-toast";
import OrderItem from "../components/ui/myOrders/OrderItem";
import { getMyOrders } from "../api/orders.api";
import { useEffect, useState } from "react";
import { ArrowLeft, Package } from "lucide-react";
import { Link } from "react-router-dom";
import OrderItemSkeleton from "../components/ui/skeleton/OrderItemSkeleton";
import Pagination from "../components/ui/productDetails/Pagination";

function MyOrdersPage() {
    const [loading, setLoading] = useState(true);
    const [ordersArray, setOrdersArray] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const ORDERS_PER_PAGE = 5;

    const fetchOrders = async () => {
        try {
            const res = await getMyOrders();
            const response = res.data || {};
            setOrdersArray(Array.isArray(response.orders) ? response.orders : []);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
            setOrdersArray([]);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const hasNoOrders = !ordersArray || ordersArray.length === 0;
    const totalPages = Math.max(1, Math.ceil(ordersArray.length / ORDERS_PER_PAGE));
    const startIndex = (currentPage - 1) * ORDERS_PER_PAGE;
    const displayedOrders = ordersArray.slice(startIndex, startIndex + ORDERS_PER_PAGE);

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="mt-16 xl:mt-17 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header matching Order Detail styling */}
            <div className="mb-8 sm:mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-[#EAE1DB] pb-5 dark:border-[#2e2724]">
                <div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium font-Instrument text-[#2D241E] dark:text-[#f3ede6]">
                        My Orders
                    </h1>
                    <p className="text-xs sm:text-sm font-medium text-[#8C7A6E] dark:text-[#a38f7d] mt-1">
                        Manage and track your recent orders
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <span className="rounded-full border border-[#DFC9BA] dark:border-[#4a3a2a] bg-[#F3E8DF] dark:bg-[#2a221a] px-3.5 sm:px-4 py-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#7B542B] dark:text-[#fcba69] shadow-2xs">
                        {loading ? "..." : `${ordersArray.length} ${ordersArray.length === 1 ? "Order" : "Orders"}`}
                    </span>
                </div>
            </div>

            {loading ? (
                <OrderItemSkeleton />
            ) : hasNoOrders ? (
                <div className="w-full bg-white dark:bg-slate-900 min-h-[50vh] flex flex-col items-center justify-center p-6 text-center rounded-2xl border border-gray-100 dark:border-slate-800">
                    <div className="w-16 h-16 rounded-full bg-[#FAF5F0] dark:bg-slate-800 text-[#7E4A2D] flex items-center justify-center mb-4">
                        <Package className="w-8 h-8" />
                    </div>
                    <h2 className="font-Serif text-2xl sm:text-3xl text-[#1E1915] dark:text-white font-medium mb-2">
                        No orders yet
                    </h2>
                    <p className="text-sm text-[#706861] dark:text-slate-400 max-w-md mb-6">
                        You haven't placed any orders yet. Start shopping to see your orders here.
                    </p>
                    <Link
                        to="/shop"
                        className="h-11 px-7 rounded-xl bg-[#7E4A2D] hover:bg-[#683C23] text-white text-sm font-medium 
                        flex items-center gap-2 transition-colors cursor-pointer"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Products</span>
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col space-y-4">
                    {displayedOrders.map((order, index) => (
                        <OrderItem key={order._id || index} Myorder={order} />
                    ))}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="pt-6 pb-4">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default MyOrdersPage;