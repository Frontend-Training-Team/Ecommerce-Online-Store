import { Outlet } from "react-router-dom";

function StoreLayout() {
  
  return (
    <div className="min-h-screen flex flex-col bg-[#ffffff] text-[#222222] font-sans">
      {/* <Navbar /> */}

      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* <Footer /> */}
    </div>
  );
}

export default StoreLayout;