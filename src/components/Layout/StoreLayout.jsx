import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function StoreLayout() {

  return (
    <div className="min-h-screen flex flex-col bg-[#ffffff] dark:bg-noir-900 
    text-[#222222] dark:text-fg font-sans transition-colors duration-200">
      <Navbar />

      <main className="flex-1 w-full">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default StoreLayout;