function OrderItem({ Myorder }) {
    let order = {
        ...Myorder,
        _id: Myorder._id || "N/a",
        item: Myorder.items || "N/a",
        totalPrice: Myorder.totalPrice || "N/a",
        status: Myorder.status || "N/a",
        createdAt: Myorder.createdAt || "Na"
    }

    const date = new Date(order.createdAt);

    const formattedDate = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    })

    return (<>
        <aw href={`orders/${order._id}`} className="max-w-7xl bg-[#FAFAFA] border-[1.5px] border-[#DFDFDF] flex justify-between
        items-center py-5 px-8 rounded-2xl mb-7">
            {/* left side */}
            <div className="flex flex-col space-y-1">
                <span className="text-[16px] flex items-center gap-2.5 text-[#34A353]">
                    <span className="w-2 h-2 bg-[#34A353] rounded-full"></span>
                    {order.status}
                </span>
                <span className="text-2xl text-black font-Inter font-semibold">#{order._id?.slice(-8)}</span>
                <span className="text-[16px] text-[#666666] font-Inter font-medium">{formattedDate}</span>
            </div>
            {/* right side */}
            <div className="flex flex-col items-end space-y-2.5">
                <span className="text-2xl text-[#7E4A2D] font-Inter font-bold">EGP {order.totalPrice}</span>
                <span className="text-xl text-[#A6A6A6] font-Inter">{order.item.length} item(s)</span>
            </div>
        </aw>
    </>);
}

export default OrderItem;