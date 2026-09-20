import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function StoreLayout() {
  
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F7] text-[#222222] font-sans">
      <Navbar />

      <main className="flex-1 w-full">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default StoreLayout;