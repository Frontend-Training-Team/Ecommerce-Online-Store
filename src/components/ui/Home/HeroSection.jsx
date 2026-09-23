import { Link } from "react-router-dom";
import heroVideo from "../../../assets/video/hero.mp4";
import { Sparkles } from "lucide-react";

function HeroSection({ onViewCategories }) {
  return (
    <section className="relative overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 mx-auto flex min-h-[85vh] sm:min-h-[90vh] lg:min-h-screen max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-14 sm:pt-32 sm:pb-20 lg:py-24 text-center">
        <div className="max-w-4xl w-full">
          <div className="flex mx-auto mb-4 sm:mb-6 w-fit rounded-full items-center bg-white/10 backdrop-blur-xs border border-white/20 px-3.5 py-1.5 sm:px-5 sm:py-2 shadow-xs">
            <Sparkles className="text-white h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2 shrink-0"/>
            <span className="text-white text-xs sm:text-sm font-Inter tracking-wide">
              Premium Shopping Experience
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold sm:font-bold font-Inter text-white leading-tight sm:leading-tight uppercase tracking-tight">
            shop the future, delivered today
          </h1>

          <p className="mx-auto mt-4 sm:mt-5 max-w-sm sm:max-w-xl md:max-w-2xl text-xs sm:text-base md:text-lg font-Inter leading-relaxed sm:leading-6 text-white/90 drop-shadow-xs px-2 sm:px-0">
            Discover premium products at unbeatable prices. Fast delivery, easy returns, and exceptional quality.
          </p>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
            <Link
              to="/shop"
              className="w-full sm:w-auto min-w-36 text-center rounded-3xl bg-white px-7 py-3 sm:py-2.5 text-sm font-semibold text-black transition hover:bg-[#70482F] hover:text-white uppercase active:scale-95 shadow-md"
            >
              Shop Now
            </Link>

            <button
              type="button"
              onClick={onViewCategories}
              className="w-full sm:w-auto min-w-36 text-center rounded-3xl border border-white/50 bg-white/10 sm:bg-transparent backdrop-blur-xs sm:backdrop-blur-none px-7 py-3 sm:py-2.5 text-sm font-semibold text-white transition hover:bg-white/45 uppercase active:scale-95"
            >
              View Categories
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

export default HeroSection;