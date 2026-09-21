function OrderItem(Myorder) {
    let order = {
        _id: Myorder._id,
        item: Myorder.item,
        totalPrice: Myorder.totalPrice,
        status: Myorder.status,
        createdAt: Myorder.createdAt
    } = Myorder

    const date = new Date(order.createdAt);

    const formattedDate = date.toLocaleDateString('en-US', {
        month: 'short', // بيعرض الشهر كاختصار (Sep)
        day: 'numeric', // بيعرض اليوم (21)
        year: 'numeric' // بيعرض السنة (2026)
    });

    console.log(formattedDate); // Sep 21, 2026

    return (<>
        <div className="max-w-7xl bg-[#FAFAFA] border-[1.5px] border-[#DFDFDF] flex justify-between
        items-center py-5 px-[30px] rounded-2xl mb-7">
            {/* left side */}
            <div className="flex flex-col space-y-1">
                <span className="text-[16px] flex items-center gap-[10px] text-[#34A353]">
                    <span className="w-2 h-2 bg-[#34A353] rounded-full"></span>
                    {order.status}
                </span>
                <span className="text-2xl text-black font-Inter font-semibold">#{order._id?.slice(-8)}</span>
                <span className="text-[16px] text-[#666666] font-Inter font-medium">{formattedDate}</span>
            </div>
            {/* right side */}
            <div className="flex flex-col items-end space-y-[10px]">
                <span className="text-2xl text-[#7E4A2D] font-Inter font-bold">${order.totalPrice}</span>
                <span className="text-xl text-[#A6A6A6] font-Inter">{order.item} item(s)</span>
            </div>
        </div>
    </>);
}

export default OrderItem;