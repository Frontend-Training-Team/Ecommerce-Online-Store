import { Heart, ShoppingCartPlus } from "lucide-react";
import lamp2 from "../assets/images/lamp2.webp";

function ProductCard() {
  const customPath = ['path("M 16 0 L 364 0 A 16 16 0 0 1 380 16 L 380 294 A 16 16 0 0 1 364 310 L 254 310 A 16 16 0 0 0 238 326 L 238 364 A 16 16 0 0 1 222 380 L 16 380 A 16 16 0 0 1 0 364 L 0 16 A 16 16 0 0 1 16 0 Z")'];
  const productImage = lamp2;

  return (
    <div className="h-fit w-fit bg-white border-2 border-gray-200 rounded-2xl p-2.5">
      <div className="relative h-[380px] w-[380px]">
        <div className="absolute bottom-0 right-0 grid h-[60px] w-[130px] grid-cols-2 gap-2.5">
          <button className="flex h-[60px] w-[60px] items-center justify-center rounded-2xl bg-gray-300 text-black">
            <Heart className="h-6 w-6" />
          </button>

          <button className="flex h-[60px] w-[60px] items-center justify-center rounded-2xl bg-gray-300 text-black">
            <ShoppingCartPlus className="h-6 w-6" />
          </button>
        </div>

        <div className="relative h-[380px] w-[380px] bg-amber-600" style={{ clipPath: customPath, backgroundImage: `url(${productImage})`, backgroundSize: "cover" }}>
        </div>
      </div>

      <div className="text-center mt-5 mb-5">
        <span className="font-[\'Instrument_Serif\',serif] text-2xl">Apple AirPods Pro 2 (USB-C)</span>
        <p>$999.00</p>
      </div>
    </div>


  );
}

export default ProductCard; 