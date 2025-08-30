import React from "react";
import { Menu } from "lucide-react";

function Header({ Sideberopen, setSideberOpen }) {
  return (
    <div className="w-full flex items-center justify-between p-4 border-b bg-white sticky top-0 z-30">
      <h1 className="text-xl font-bold">My App</h1>

      {/* Hamburger button (only mobile) */}
      <button
        onClick={() => setSideberOpen(!Sideberopen)}
        className="sm:hidden p-2 rounded-md hover:bg-gray-200"
      >
        <Menu className="w-6 h-6" />
      </button>
    </div>
  );
}

export default Header;
