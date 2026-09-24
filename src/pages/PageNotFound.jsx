import { Link } from "react-router-dom";
import { Compass, Home } from "lucide-react";
import bgVideo from "../assets/videos/hero.mp4";

export default function PageNotFound() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/55" aria-hidden="true" />

      <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-6 py-16 text-center">
        <span className="font-Instrument Serif text-8xl md:text-[200px] leading-none tracking-tight text-white">
          404
        </span>

        <h1 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-white">
          Page Not Found
        </h1>

        <p className="mt-3 max-w-md text-base md:text-lg text-white/70">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/shop"
            className="inline-flex items-center justify-center gap-2.5 rounded-3xl bg-[#7E4A2D] px-6 py-3 text-md md:text-base font-semibold tracking-wide text-white shadow-md transition-all hover:opacity-90 hover:shadow-lg active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DE9E48] focus-visible:ring-offset-2 focus-visible:ring-offset-black border border-[#7E4A2D]"
          >
            <Compass className="h-6 w-6" aria-hidden="true" />
            Browse Products
          </Link>

          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2.5 rounded-3xl bg-white/95 px-6 py-3 text-md md:text-base font-semibold tracking-wide text-[#20140d] shadow-md transition-all hover:bg-white active:scale-95 border border-transparent hover:border-[#DE9E48] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DE9E48] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            <Home className="h-6 w-6 text-stone-500" aria-hidden="true" />
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}