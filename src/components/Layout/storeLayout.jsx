import { Outlet } from "react-router-dom";

function StoreLayout() {

  return (
    <div className="min-h-screen flex flex-col  text-slate-100 font-sans selection:text-white">
      {/* <Navbar /> */}

      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* <Footer /> */}
    </div>
  );
}

export default StoreLayout;