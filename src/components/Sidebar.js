// src/components/Sidebar.tsx
import { useState } from "react";
import { Home, Users, LogOut, Menu } from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`h-screen bg-gray-900 text-white flex flex-col transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Toggle Button */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!collapsed && <h1 className="text-xl font-bold">Admin Panel</h1>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded hover:bg-gray-700"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1">
        <ul className="space-y-2 mt-4">
          <li>
            <Link
              to="/dashboard"
              className={`flex items-center px-4 py-2 hover:bg-gray-700 rounded-md no-underline text-white ${
                collapsed ? "justify-center" : "gap-3"
              }`}
            >
              <Home size={20} />
              {!collapsed && <span>Dashboard</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/users"
              className={`flex items-center px-4 py-2 hover:bg-gray-700 rounded-md no-underline text-white ${
                collapsed ? "justify-center" : "gap-3"
              }`}
            >
              <Users size={20} />
              {!collapsed && <span>Defaulters</span>}
            </Link>
          </li>
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-700">
        <button
          className={`flex items-center w-full hover:bg-gray-700 rounded-md ${
            collapsed ? "justify-center p-2" : "gap-3 px-4 py-2"
          }`}
        >
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}
