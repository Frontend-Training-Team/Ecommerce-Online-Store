import { Link } from "react-router-dom";
import heroVideo from "../../../assets/images/aaa.mp4";
function HeroSection() {
  return (
  <section className="relative min-h-[400px] overflow-hidden">
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

 <div className="relative z-10 mx-auto flex min-h-[480px] max-w-7xl items-center justify-center px-6 py-16 text-center">
  <div className="max-w-4xl">

    <p className="mx-auto mb-4 w-fit rounded-full border border-white/50 px-5 py-2 text-sm font-semibold uppercase tracking-[0.1em] text-[#C99A78]">
      Premium Shopping Experience
    </p>
<h1 className="text-3xl leading-tight text-white sm:text-3xl lg:text-3xl uppercase">
  shop the future,
  <br />
  delivered TODAY
</h1>

<p className="mx-auto mt-4 max-w-none whitespace-nowrap text-[10px] leading-6 text-[#E5DCD5] sm:text-base">
  Discover premium products at unbeatable prices. Fast delivery, easy returns, and exceptional quality.
</p>
    <div className="mt-8 flex items-center justify-center gap-4">
      <Link
        to="/products"
        className="rounded-3xl bg-white px-6 py-2.5 text-sm font-semibold text-black transition hover:bg-[#70482F] active:scale-95"
      >
        Shop Now
      </Link>

      <Link
        to="/products"
        className="rounded-3xl border border-white/50 bg-transparent px-7 py-2.5 text-sm font-semibold text-white transition hover:bg-white/45 active:scale-95"
      >
        VIEW CATEGORIES
      </Link>
    </div>

  </div>
</div>
</section>
  );
}

export default HeroSection;