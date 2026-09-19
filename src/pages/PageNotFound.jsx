import { Link } from "react-router-dom";
import { Compass, Home } from "lucide-react";
import Img from "../assets/images/pnf4.png";

export default function PageNotFound() {
  return (
    <div className="min-h-[70vh] w-full flex flex-col justify-center items-center p-6 md:p-12 bg-[#FAF7F2] dark:bg-[#141110] text-neutral-800  transition-colors relative overflow-hidden">
      <main className=" relative w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-24 items-center">
        <div className="lg:col-span-6 flex flex-col items-center text-center lg:items-start lg:text-left lg:pr-4">
          <span className="font-numeric font-bold text-8xl md:text-9xl tracking-tight leading-none mb-4 bg-gradient-to-br from-[#FCE5B2] via-[#DE9E48] to-[#9A6218] bg-clip-text text-transparent">
            404
          </span>

          <h1 className="font-serif text-3xl md:text-4xl lg:text-[42px] text-[#20140d] dark:text-[#F5F1EA] font-normal leading-tight tracking-tight max-w-xl">
            Page Not Found
          </h1>

          <span className="text-base md:text-lg text-stone-500 dark:text-neutral-400 mb-6 max-w-md">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </span>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-3xl bg-[#20140d] hover:bg-[#2b1b11] dark:bg-[#DE9E48] dark:hover:bg-[#c98a37] border border-[#DE9E48]/50 dark:border-transparent text-amber-50 dark:text-[#20140d] text-l font-semibold tracking-wide transition-all shadow-md shadow-stone-900/15 hover:shadow-stone-900/25 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DE9E48] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF7F2] dark:focus-visible:ring-offset-[#15110C]"
            >
              <Compass className="w-6 h-6 text-[#FCE5B2] dark:text-[#20140d]" aria-hidden="true" />
              Explore Products
            </Link>

            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-3xl bg-white/95 hover:bg-white dark:bg-white/5 dark:hover:bg-white/10 border border-stone-300 dark:border-white/10 hover:border-[#DE9E48] text-[#20140d] dark:text-neutral-100 text-l font-semibold tracking-wide transition-all shadow-xs hover:shadow-sm active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DE9E48] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF7F2] dark:focus-visible:ring-offset-[#15110C]"
            >
              <Home className="w-6 h-6 text-stone-500 dark:text-neutral-400" aria-hidden="true" />
              Return to Home
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6 flex items-center justify-center ">
          <div className="w-full max-w-[800px] aspect-[4/3] overflow-hidden">
            <img
              src={Img}
              alt="Illustration of someone lost in a furniture showroom"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </main>
    </div>
  );
}