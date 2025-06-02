import Header from "@/Components/Header";
import React from "react";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <>
      <div>
        <Header />
        <main className=" min-h-screen container">
          <Outlet />
        </main>

        <div className=" p-10 mt-10 text-center bg-gray-900">
          Made with ❤️ by Anirudha :)
        </div>
      </div>
    </>
  );
}

export default AppLayout;
