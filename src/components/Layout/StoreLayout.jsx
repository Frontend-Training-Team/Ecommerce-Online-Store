import { Outlet } from "react-router-dom";
import Header from "../ui/store/Header";
import Footer from "../ui/store/Footer";

function StoreLayout() {
  return (
    <div
      className="min-h-screen flex flex-col bg-[#080d1a] text-slate-100 font-sans
      selection:bg-blue-600 selection:text-white"
    >
      <Header />

      <main className="flex-1 w-full">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default StoreLayout;