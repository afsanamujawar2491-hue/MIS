import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { logout } from "../utils/logout";
import { Link } from "react-router-dom";
import logo from "../assets/code_b_logo.jpeg";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* Logo */}
       <div className="flex items-center">
  <Link to="/">
    <img
      src={logo}
      alt="Logo"
      className="h-16 w-auto cursor-pointer"
    />
  </Link>
</div>

      {/* Navigation Menu */}
      <div className="flex items-center gap-4">
       <Link to="/">Home</Link>
<Link to="/dashboard">Dashboard</Link>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;