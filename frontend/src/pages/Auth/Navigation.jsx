import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
  AiOutlineClose,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";

const MarketBaseLogo = ({ isExpanded, mobile }) => (
  <div
    className={`flex items-center ${mobile ? "justify-start" : isExpanded ? "justify-start px-3" : "justify-center"}`}
  >
    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-pink-600 font-black text-white shadow-lg shadow-indigo-600/20">
      <span className="text-sm">X</span>
    </div>
    {(isExpanded || mobile) && (
      <div className="ml-2 flex flex-col leading-none">
        <span className="font-black text-sm text-white uppercase tracking-tighter">
          Market<span className="text-indigo-500">Base</span>
          <span className="text-pink-500 italic ml-0.5">X</span>
        </span>
      </div>
    )}
  </div>
);

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
      setShowMobileMenu(false);
    } catch (error) {
      console.error(error);
    }
  };

  const NavItem = ({
    to,
    icon: Icon,
    label,
    badgeCount,
    BadgeComponent,
    mobile,
  }) => (
    <Link
      to={to}
      onClick={() => mobile && setShowMobileMenu(false)}
      className={`group relative flex items-center transition-all ${mobile ? "flex-col justify-center py-1" : "p-3 my-2 rounded-xl hover:bg-indigo-600/10"}`}
    >
      <div className="relative flex items-center justify-center">
        <Icon
          size={mobile ? 22 : 24}
          className="text-slate-400 group-hover:text-indigo-500 transition-colors"
        />
        {BadgeComponent && <BadgeComponent />}
        {!BadgeComponent && badgeCount > 0 && (
          <div className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[8px] font-bold text-white">
            {badgeCount}
          </div>
        )}
      </div>
      <span
        className={`${mobile ? "text-[10px] mt-1 text-slate-500" : `ml-4 text-sm font-medium transition-all duration-300 ${isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"}`}`}
      >
        {label}
      </span>
    </Link>
  );

  return (
    <>
      {/* --- DESKTOP SIDEBAR --- */}
      <nav
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        className={`hidden md:flex fixed left-0 top-0 h-screen z-[999] flex-col justify-between border-r border-slate-800 bg-[#0a0a0c]/95 backdrop-blur-xl transition-all duration-300 ${isExpanded ? "w-64 px-4 shadow-2xl" : "w-20 px-2"}`}
      >
        <div className="flex flex-col mt-8">
          <MarketBaseLogo isExpanded={isExpanded} />
          <div className="mt-10 space-y-1">
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
                className={`flex items-center w-full p-3 rounded-xl hover:bg-slate-800/50 ${!isExpanded && "justify-center"}`}
              >
                <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-xs uppercase">
                  {userInfo.username.charAt(0)}
                </div>
                {isExpanded && (
                  <div className="ml-3 text-left">
                    <p className="text-sm font-bold text-white truncate w-32">
                      {userInfo.username}
                    </p>
                  </div>
                )}
              </button>

              <div className="absolute bottom-full left-0 w-64 mb-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all bg-slate-900 border border-slate-800 rounded-xl p-2 shadow-2xl z-[1001]">
                {userInfo.isAdmin && (
                  <div className="border-b border-slate-800 mb-2 pb-2">
                    <p className="px-4 py-2 text-[10px] font-black text-indigo-500 uppercase tracking-widest">
                      Store Mgmt
                    </p>
                    <Link
                      to="/admin/dashboard"
                      className="block px-4 py-2 text-xs text-slate-300 hover:bg-indigo-600 rounded-lg"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/admin/productlist"
                      className="block px-4 py-2 text-xs text-slate-300 hover:bg-indigo-600 rounded-lg"
                    >
                      Products
                    </Link>
                    <Link
                      to="/admin/categorylist"
                      className="block px-4 py-2 text-xs text-slate-300 hover:bg-indigo-600 rounded-lg"
                    >
                      Categories
                    </Link>
                    <Link
                      to="/admin/orderlist"
                      className="block px-4 py-2 text-xs text-slate-300 hover:bg-indigo-600 rounded-lg"
                    >
                      Orders
                    </Link>
                    <Link
                      to="/admin/userlist"
                      className="block px-4 py-2 text-xs text-slate-300 hover:bg-indigo-600 rounded-lg"
                    >
                      Users
                    </Link>
                  </div>
                )}
                <p className="px-4 py-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  Account
                </p>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-xs text-slate-300 hover:bg-indigo-600 rounded-lg"
                >
                  Profile
                </Link>
                <button
                  onClick={logoutHandler}
                  className="w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-red-500/10 rounded-lg"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              <NavItem to="/login" icon={AiOutlineLogin} label="Login" />
              <NavItem
                to="/register"
                icon={AiOutlineUserAdd}
                label="Register"
              />
            </div>
          )}
        </div>
      </nav>

      {/* --- MOBILE BOTTOM BAR --- */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-[#0a0a0c] border-t border-slate-800 flex items-center justify-around px-2 z-[999]">
        <NavItem to="/" icon={AiOutlineHome} label="Home" mobile />
        <NavItem to="/shop" icon={AiOutlineShopping} label="Shop" mobile />
        <NavItem
          to="/cart"
          icon={AiOutlineShoppingCart}
          label="Cart"
          badgeCount={cartItems?.reduce((a, c) => a + c.qty, 0) || 0}
          mobile
        />
        <NavItem
          to="/favorite"
          icon={FaHeart}
          label="Likes"
          BadgeComponent={FavoritesCount}
          mobile
        />
        {userInfo ? (
          <button
            onClick={() => setShowMobileMenu(true)}
            className="flex flex-col items-center justify-center py-1"
          >
            <div className="h-6 w-6 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] font-bold text-white uppercase">
              {userInfo.username.charAt(0)}
            </div>
            <span className="text-[10px] mt-1 text-slate-500">Menu</span>
          </button>
        ) : (
          <NavItem to="/login" icon={AiOutlineLogin} label="Login" mobile />
        )}
      </nav>

      {/* --- MOBILE FULLSCREEN MENU --- */}
      {showMobileMenu && (
        <div className="md:hidden fixed inset-0 bg-[#0a0a0c] z-[1000] p-6 flex flex-col animate-in fade-in slide-in-from-bottom duration-300 overflow-y-auto">
          <div className="flex justify-between items-center mb-10">
            <MarketBaseLogo mobile />
            <button
              onClick={() => setShowMobileMenu(false)}
              className="text-white text-2xl p-2 bg-slate-800 rounded-full"
            >
              <AiOutlineClose />
            </button>
          </div>
          <div className="flex-1 space-y-8">
            {userInfo?.isAdmin && (
              <div className="space-y-4 border-b border-slate-800 pb-8">
                <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[4px]">
                  Admin Control
                </p>
                <div className="grid grid-cols-1 gap-6">
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setShowMobileMenu(false)}
                    className="text-2xl font-bold text-white"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/admin/productlist"
                    onClick={() => setShowMobileMenu(false)}
                    className="text-2xl font-bold text-white"
                  >
                    Products
                  </Link>
                  <Link
                    to="/admin/categorylist"
                    onClick={() => setShowMobileMenu(false)}
                    className="text-2xl font-bold text-white"
                  >
                    Categories
                  </Link>
                  <Link
                    to="/admin/orderlist"
                    onClick={() => setShowMobileMenu(false)}
                    className="text-2xl font-bold text-white"
                  >
                    Orders
                  </Link>
                  <Link
                    to="/admin/userlist"
                    onClick={() => setShowMobileMenu(false)}
                    className="text-2xl font-bold text-white"
                  >
                    User List
                  </Link>
                </div>
              </div>
            )}
            <div className="space-y-6">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[4px]">
                Personal
              </p>
              <Link
                to="/profile"
                onClick={() => setShowMobileMenu(false)}
                className="block text-2xl font-bold text-white"
              >
                My Profile
              </Link>
              <button
                onClick={logoutHandler}
                className="block text-2xl text-red-500 font-bold pt-4"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
