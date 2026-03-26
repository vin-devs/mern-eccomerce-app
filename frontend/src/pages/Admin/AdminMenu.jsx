import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaTimes,
  FaBars,
  FaBox,
  FaPlus,
  FaUsers,
  FaClipboardList,
  FaChartPie,
  FaShapes,
} from "react-icons/fa";

const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Helper for NavLink styles to keep the JSX clean
  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
      isActive
        ? "bg-indigo-600/20 text-indigo-400 shadow-[inset_0_0_10px_rgba(79,70,229,0.1)]"
        : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
    }`;

  return (
    <>
      {/* Trigger Button - Floating & Glossy */}
      <button
        className={`fixed top-6 right-6 z-[1001] p-4 rounded-2xl backdrop-blur-md border border-slate-700/50 shadow-2xl transition-all duration-300 active:scale-90 ${
          isMenuOpen
            ? "bg-rose-600/20 border-rose-500/50 text-rose-500"
            : "bg-slate-900/80 text-white hover:border-indigo-500/50"
        }`}
        onClick={toggleMenu}
      >
        {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Dropdown Backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999] transition-opacity"
          onClick={toggleMenu}
        />
      )}

      {/* Menu Content */}
      <section
        className={`fixed right-6 top-24 w-72 bg-slate-900/90 backdrop-blur-xl border border-slate-800 p-4 rounded-[2.5rem] z-[1000] shadow-2xl transition-all duration-300 origin-top-right ${
          isMenuOpen
            ? "scale-100 opacity-100"
            : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        <p className="px-4 mb-4 text-[10px] font-black text-slate-500 uppercase tracking-[3px]">
          Admin Quick Actions
        </p>

        <ul className="space-y-2">
          <li>
            <NavLink to="/admin/dashboard" className={navLinkClasses}>
              <FaChartPie className="text-lg" />
              <span className="text-sm font-bold">Dashboard</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/categorylist" className={navLinkClasses}>
              <FaShapes className="text-lg" />
              <span className="text-sm font-bold">Manage Categories</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/productlist" className={navLinkClasses}>
              <FaPlus className="text-lg" />
              <span className="text-sm font-bold">Add New Product</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/allproductslist" className={navLinkClasses}>
              <FaBox className="text-lg" />
              <span className="text-sm font-bold">Inventory List</span>
            </NavLink>
          </li>

          <div className="my-4 border-t border-slate-800/50 mx-2" />

          <li>
            <NavLink to="/admin/userlist" className={navLinkClasses}>
              <FaUsers className="text-lg" />
              <span className="text-sm font-bold">User Management</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/orderlist" className={navLinkClasses}>
              <FaClipboardList className="text-lg" />
              <span className="text-sm font-bold">Sales & Orders</span>
            </NavLink>
          </li>
        </ul>
      </section>
    </>
  );
};

export default AdminMenu;
