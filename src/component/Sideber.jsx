import React from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import MenuItems from "./MenuItems";
import { CirclePlus, LogOut, X } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

function Sidebar({ Sideberopen, setSideberOpen }) {
  const navigate = useNavigate();
  const { signOut } = useClerk();
  const { user } = useUser();

  return (
    <>
      {/* Overlay (black background) */}
      {Sideberopen && (
        <div
          onClick={() => setSideberOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-10 sm:hidden"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed sm:static top-0 left-0 h-full w-64 xl:w-72 bg-white border-r border-gray-200 flex flex-col justify-between items-center z-20 transform
        ${Sideberopen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}
        transition-transform duration-300 ease-out`}
      >
        {/* Top Part */}
        <div className="w-full relative">
          {/* Close button (only mobile) */}
          <button
            onClick={() => setSideberOpen(false)}
            className="absolute top-3 right-3 sm:hidden p-1 rounded-full hover:bg-gray-200"
          >
            <X className="w-6 h-6 text-gray-700" />
          </button>

          <img
            onClick={() => navigate("/")}
            src={assets.logo}
            className="w-28 ml-6 my-4 cursor-pointer"
            alt="logo"
          />
          <hr className="border-gray-300 mb-6" />

          <MenuItems setSideberOpen={setSideberOpen} />

          <Link
            to="/create-post"
            className="flex items-center justify-center gap-2 py-2.5 mt-6 mx-6 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-700 hover:to-purple-800 active:scale-95 transition text-white cursor-pointer"
          >
            <CirclePlus className="w-5 h-5" />
            Create Post
          </Link>
        </div>

        {/* Bottom User + Logout */}
        <div className="w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between">
          <div className="flex gap-2 items-center cursor-pointer">
            <UserButton afterSignOutUrl="/" />
            <div>
              <h1 className="text-sm font-medium">{user?.fullName}</h1>
              <p className="text-xs text-gray-500">@{user?.username}</p>
            </div>
          </div>
          <LogOut
            onClick={() => signOut()}
            className="w-5 text-gray-400 hover:text-gray-700 transition cursor-pointer"
          />
        </div>
      </div>
    </>
  );
}

export default Sidebar;
