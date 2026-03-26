import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart, FaChevronDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";

// --- Logo Component: Cube Icon + Pink/Indigo Gradient + Digital Store Tagline ---
const MarketBaseLogo = ({ isExpanded }) => (
  <div
    className={`flex items-center transition-all duration-300 ${isExpanded ? "justify-start px-3" : "justify-center"}`}
  >
    <div className="relative group shrink-0">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-pink-600 font-black text-white shadow-lg shadow-indigo-600/30 group-hover:scale-110 transition-transform duration-300">
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      </div>
      <div className="absolute inset-0 bg-pink-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
    </div>

    {isExpanded && (
      <div className="ml-3 flex flex-col leading-none overflow-hidden whitespace-nowrap">
        <div className="flex items-center">
          <span className="font-black text-xl text-white tracking-tighter uppercase">
            Market<span className="text-indigo-500">Base</span>
          </span>
          <span className="text-pink-500 font-black text-2xl italic ml-0.5">
            X
          </span>
        </div>
        <span className="text-[8px] font-black text-slate-500 tracking-[3px] uppercase mt-1">
          Digital Store
        </span>
      </div>
    )}
  </div>
);

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const [isExpanded, setIsExpanded] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const NavItem = ({ to, icon: Icon, label, badgeCount, BadgeComponent }) => (
    <Link
      to={to}
      className="group relative flex items-center p-3 my-2 rounded-xl transition-all hover:bg-indigo-600/10"
    >
      <div className="relative flex items-center justify-center">
        <Icon
          size={24}
          className="text-slate-400 group-hover:text-indigo-500 transition-colors"
        />
        {BadgeComponent && <BadgeComponent />}
        {!BadgeComponent && badgeCount > 0 && (
          <div className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
            {badgeCount}
          </div>
        )}
      </div>
      <span
        className={`ml-4 text-sm font-medium transition-all duration-300 ${isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        {label}
      </span>
    </Link>
  );

  return (
    <nav
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className={`fixed left-0 top-0 h-screen z-[999] flex flex-col justify-between border-r border-slate-800 bg-[#0a0a0c]/95 backdrop-blur-xl transition-all duration-300 ${isExpanded ? "w-64 px-4 shadow-[10px_0_30px_rgba(0,0,0,0.5)]" : "w-20 px-2"}`}
    >
      <div className="flex flex-col mt-8">
        <div className="mb-10">
          <MarketBaseLogo isExpanded={isExpanded} />
        </div>
        <div className="space-y-1">
          <NavItem to="/" icon={AiOutlineHome} label="Home" />
          <NavItem to="/shop" icon={AiOutlineShopping} label="Shop" />
          <NavItem
            to="/cart"
            icon={AiOutlineShoppingCart}
            label="Cart"
            badgeCount={cartItems?.reduce((a, c) => a + c.qty, 0) || 0}
          />
          <NavItem
            to="/favorite"
            icon={FaHeart}
            label="Favorites"
            BadgeComponent={FavoritesCount}
          />
        </div>
      </div>

      <div className="mb-8">
        {userInfo ? (
          <div className="group relative">
            <button
              className={`flex items-center w-full p-3 rounded-xl transition-all hover:bg-slate-800/50 ${!isExpanded && "justify-center"}`}
            >
              <div className="h-8 w-8 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-xs uppercase shrink-0">
                {userInfo.username.charAt(0)}
              </div>
              {isExpanded && (
                <div className="ml-3 text-left flex-1">
                  <p className="text-sm font-bold text-white truncate">
                    {userInfo.username}
                  </p>
                  <p className="text-[10px] text-indigo-400 font-bold uppercase flex items-center gap-1">
                    Account <FaChevronDown size={8} />
                  </p>
                </div>
              )}
            </button>

            <div className="absolute bottom-[100%] left-0 w-full min-w-[210px] opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all z-[1001] pb-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2 shadow-2xl backdrop-blur-xl">
                {userInfo.isAdmin && (
                  <div className="pb-2 mb-2 border-b border-slate-800">
                    <p className="px-4 py-2 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                      Admin Control
                    </p>
                    <Link
                      to="/admin/dashboard"
                      className="block px-4 py-2 text-xs font-bold text-slate-300 hover:bg-indigo-600 hover:text-white rounded-lg transition-colors"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/admin/productlist"
                      className="block px-4 py-2 text-xs font-bold text-slate-300 hover:bg-indigo-600 hover:text-white rounded-lg transition-colors"
                    >
                      Products
                    </Link>
                    <Link
                      to="/admin/categorylist"
                      className="block px-4 py-2 text-xs font-bold text-slate-300 hover:bg-indigo-600 hover:text-white rounded-lg transition-colors"
                    >
                      Categories
                    </Link>
                    <Link
                      to="/admin/orderlist"
                      className="block px-4 py-2 text-xs font-bold text-slate-300 hover:bg-indigo-600 hover:text-white rounded-lg transition-colors"
                    >
                      Orders
                    </Link>
                    <Link
                      to="/admin/userlist"
                      className="block px-4 py-2 text-xs font-bold text-slate-300 hover:bg-indigo-600 hover:text-white rounded-lg transition-colors"
                    >
                      Users
                    </Link>
                  </div>
                )}
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-xs font-bold text-slate-300 hover:bg-indigo-600 hover:text-white rounded-lg transition-colors"
                >
                  My Profile
                </Link>
                <button
                  onClick={logoutHandler}
                  className="w-full text-left px-4 py-2 text-xs font-bold text-red-400 hover:bg-red-500/10 rounded-lg transition-colors mt-1"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            <NavItem to="/login" icon={AiOutlineLogin} label="Login" />
            <NavItem to="/register" icon={AiOutlineUserAdd} label="Register" />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
