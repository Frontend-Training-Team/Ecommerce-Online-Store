import { Outlet } from 'react-router-dom';

function StoreLayout() {


  return (
    <div className="h-screen bg-surface-light font-Inter">

      <div className="flex h-screen flex-col overflow-hidden">

        <main className="flex-1 overflow-y-auto lg:overflow-hidden">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default StoreLayout;