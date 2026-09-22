import { Link } from "react-router-dom";
import logoImg from "../../assets/images/4.png";

export default function Footer() {
    return (
        <footer className="relative isolate w-full overflow-hidden pt-8 sm:pt-14 md:pt-20 pb-8">

            <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
                viewBox="0 0 1024 288"
                preserveAspectRatio="none"
            >
                <rect width="1024" height="288" fill="#FFFFFF" />
                <path
                    d="M 0,90 Q 512,152 1024,90 L 1024,288 L 0,288 Z"
                    fill="#E4E4E4"
                />
            </svg>

            <div className="w-full max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col relative z-10">

                <div className="w-full bg-[#7E4A2D] rounded-xl sm:rounded-2xl p-6 sm:p-8 md:px-12 md:py-11 flex flex-col 
                md:flex-row items-center justify-between gap-6 md:gap-8 shadow-[0_12px_28px_rgba(0,0,0,0.12)]">

                    <div className="w-full md:w-1/2 text-center md:text-left">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-Serif text-white leading-snug tracking-wide">
                            Stay updated with the <br className="hidden sm:block" /> latest from Lamsa!
                        </h2>
                    </div>

                    <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="w-full max-w-[390px] bg-white rounded-md sm:rounded-lg p-1.5 flex items-center 
                            shadow-sm"
                        >
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 min-w-0 px-3 sm:px-4 py-2 text-xs sm:text-sm text-[#222222] bg-transparent 
                                focus:outline-none placeholder-[#888888]"
                                required
                            />
                            <button
                                type="submit"
                                className="flex-shrink-0 bg-[#8E4726] hover:bg-[#7D3E21] text-white text-xs sm:text-[13px] 
                                font-medium px-4 sm:px-6 py-2 sm:py-2.5 rounded-md transition-colors whitespace-nowrap cursor-pointer"
                            >
                                Subscribe Now
                            </button>
                        </form>
                    </div>

                </div>

                <div className="w-full border-t border-[#D0D0D0] mt-8 mb-6"></div>

                <div className="w-full flex flex-col md:flex-row items-center justify-between gap-5 md:gap-4 text-center 
                md:text-left">

                    <div className="flex items-center justify-center md:justify-start">
                        <Link to="/">
                            <img
                                src={logoImg}
                                alt="LAMSA"
                                className="h-7 sm:h-8 object-contain"
                            />
                        </Link>
                    </div>

                    <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-[13px] 
                    font-medium text-[#4A4744]">
                        <Link to="/" className="hover:text-[#7E4A2D] transition-colors">
                            Home
                        </Link>
                        <Link to="/products" className="hover:text-[#7E4A2D] transition-colors">
                            Shop
                        </Link>
                        <Link to="/orders" className="hover:text-[#7E4A2D] transition-colors">
                            My Orders
                        </Link>
                        <Link to="/wishlist" className="hover:text-[#7E4A2D] transition-colors">
                            Wishlist
                        </Link>
                    </nav>

                    <div className="text-[11px] sm:text-[12px] text-[#7A7570] text-center md:text-right">
                        © 2026 Lamsa. All rights reserved.
                    </div>

                </div>

            </div>
        </footer>
    );
}