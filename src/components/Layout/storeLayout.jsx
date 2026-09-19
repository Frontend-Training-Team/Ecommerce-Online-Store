import { Outlet } from 'react-router-dom';

function StoreLayout() {


  return (
    <div className="h-screen overflow-hidden bg-surface-light font-Inter">

      <div className="">

        <main className="flex-1 p-8 overflow-y-scroll">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default StoreLayout;