import WishlistCard from "../components/WishlistCard";

function WishlistPage() {
    return (
        <div className="min-h-screen w-full px-4 py-6">
            <div className="mx-auto w-fit max-w-full">
                <h1 className="mb-6 text-2xl font-semibold">My Wishlist</h1>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    <WishlistCard />
                    <WishlistCard />
                    <WishlistCard />
                    <WishlistCard />
                </div>
            </div>
        </div>
    );
}

export default WishlistPage;