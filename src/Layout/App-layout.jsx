import Header from "@/Components/Header";
import React from "react";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <>
      <div className="relative min-h-screen">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div
            className="relative h-full w-full bg-black 
      [&>div]:absolute 
      [&>div]:inset-0 
      [&>div]:bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] 
      [&>div]:bg-[size:14px_24px]"
          >
            <div className="relative z-10 flex flex-col min-h-screen text-white">
              <Header />

              {/* Main content (Outlet) */}
              <main className="flex-grow px-4 py-8">
                <Outlet />
              </main>

              {/* Footer */}
              <footer className="p-10 text-center border-t  border-gray-950">
                Made with ❤️ by Anirudha :)
              </footer>
            </div>
          </div>
        </div>
      </div>

      {/* <div>
        <Header />
        <main className=" min-h-screen container">
          <Outlet />
        </main>

        <div className=" p-10 mt-10 text-center bg-gray-900">
          Made with ❤️ by Anirudha :)
        </div>
      </div> */}
    </>
  );
}

export default AppLayout;
