import { Heart, ShoppingCartPlus } from "lucide-react";
import lamp2 from "../assets/images/lamp2.webp";

function ProductCard() {
  const customPath = ['path("M 12 0 L 318 0 A 12 12 0 0 1 330 12 L 330 258 A 12 12 0 0 1 318 270 L 217 270 A 12 12 0 0 0 205 282 L 205 318 A 12 12 0 0 1 193 330 L 12 330 A 12 12 0 0 1 0 318 L 0 12 A 12 12 0 0 1 12 0 Z")'];
  const productImage = lamp2;

  return (
    <div className="h-fit w-fit bg-white border-2 border-gray-200 rounded-xl p-2.5">
      <div className="relative h-[330px] w-[330px]">
        <div className="relative h-[330px] w-[330px] bg-amber-600" style={{ clipPath: customPath, backgroundImage: `url(${productImage})`, backgroundSize: "cover" }}>
        </div>

        <div className="w-28 h-7 grid place-items-center bg-amber-950 rounded-3xl uppercase text-sm text-white  text-Inter font-semibold tracking-wider absolute top-4 left-4">
          <span className="">Category</span>
        </div>

        <div className="w-20 h-7 grid place-items-center bg-gray-100 rounded-3xl uppercase text-sm text-black text-Inter font-semibold tracking-wider absolute top-4 right-4">
          <span>BRAND</span>
        </div>

        <div className="absolute bottom-0 right-0 grid h-fit w-fit grid-cols-2 gap-2">
          <button className="flex h-[54px] w-[54px] items-center justify-center rounded-xl bg-gray-200 text-black">
            <Heart className="h-6 w-6"/>
          </button>

          <button className="flex h-[54px] w-[54px] items-center justify-center rounded-xl bg-gray-200 text-black">
            <ShoppingCartPlus className="h-6 w-6"/>
          </button>
        </div>
      </div>

      <div className="text-center mt-5 mb-3">
        <p className="font-Instrument text-2xl text-[1E1E1E] mb-2">Apple AirPods Pro 2 (USB-C)</p>
        <span className="text-xl text-[#8E4726]  font-Inter font-semibold">$999.00</span>
        <span className="text-md text-[#7B7B7B] font-Inter font-medium ml-2 line-through">$999.00</span>
      </div>
    </div>
  );
}

export default ProductCard; 