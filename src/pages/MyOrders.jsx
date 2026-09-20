function MyOrdersPage() {
    return (<>
        <div className="max-w-7xl mx-auto px-4 py-8 text-2xl bg-amber-200">
            <h2 className="text-4xl font-Instrument">My Orders Page</h2>
            <div className="max-w-7xl bg-[#DFDFDF]">
                {/* left side */}
                <div className="">
                    <span>Delivered</span>
                    <span>#12345678</span>
                    <span>sep 3,2026</span>
                </div>
                {/* right side */}
                <div className="">
                    <span>$1,500.1</span>
                    <span>4 item(s)</span>
                </div>
            </div>
        </div>
    </>);
}

export default MyOrdersPage;