/* eslint-disable react-hooks/set-state-in-effect */
import toast from "react-hot-toast";
import OrderItem from "../components/myOrders/OrderItem";
import { getMyOrders } from "../api/orders.api";
import { useEffect, useState } from "react";
import { ArrowLeft, Package } from "lucide-react";
import { Link } from "react-router-dom";
import OrderItemSkeleton from "../components/Skeleton/OrderItemSkeleton";

function MyOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ordersArray, setOrdersArray] = useState([]);

    const fetchOrders = async () => {
        try {
            const res = await getMyOrders();
            const response = res.data;
            setOrders(response)
            setOrdersArray(response.orders)
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
        finally {
            setLoading(false)
        }
    };
    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="mt-16 xl:mt-17 max-w-7xl mx-auto  py-8 text-2xl">
            <h2 className="text-3xl font-medium font-Instrument text-[#2D241E] dark:text-[#f3ede6] lg:text-5xl mb-9">My Orders</h2>
            {loading ? (
                <OrderItemSkeleton />
            ) : orders.orders.length === 0 ? (
                <div className="w-full bg-white min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-[#FAF5F0] text-[#7E4A2D] flex items-center justify-center mb-4">
                        <Package className="w-8 h-8" />
                    </div>
                    <h2 className="font-Serif text-2xl sm:text-3xl text-[#1E1915] font-medium mb-2">
                        No orders yet
                    </h2>
                    <p className="text-sm text-[#706861] max-w-md mb-6">
                        You haven't placed any orders yet. Start shopping to see your orders here.
                    </p>
                    <Link
                        to="/products"
                        className="h-11 px-7 rounded-xl bg-[#7E4A2D] hover:bg-[#683C23] text-white text-sm font-medium 
                        flex items-center gap-2 transition-colors cursor-pointer"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Products</span>
                    </Link>
                </div>
            ) : (<>
                <div className="flex flex-col">
                    {ordersArray.map((order, index) => (
                        <OrderItem key={order._id || index} Myorder={order} />
                    ))}
                </div>
            </>
            )}
        </div>
    );
}

export default MyOrdersPage;