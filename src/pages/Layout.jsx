import React, { useState } from "react";
import Sideber from "../component/Sideber";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { dummyUserData } from "../assets/assets";
import Loading from "../component/Loading";

function Layout() {
  const user = dummyUserData;
  const [sideberOpen, setSideberOpen] = useState(false);

  return user ? (
    <div className="full flex h-screen">
      <Sideber />
      <div className="flex-1 bg-sa">
        <Outlet />
      </div>

      {sideberOpen ? (
        <X
          className=" absolute top-3 right-3 p-2 z-100 bg-white rounded-md shadow w-10 h-10 text-gray-600 sm:hidden"
          onClick={() => setSideberOpen(false)}
        />
      ) : (
        <Menu
          className="absolute top-3 right-3 p-2 z-100 bg-white rounded-md shadow w-10 h-10 text-gray-600 sm:hidden"
          onClick={() => setSideberOpen(false)}
        />
      )}
    </div>
  ) : (
    <Loading />
  );
}

export default Layout;
