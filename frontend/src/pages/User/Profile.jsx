import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaUserEdit,
  FaHistory,
} from "react-icons/fa";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
        setPassword("");
        setConfirmPassword("");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    }
  };

  return (
    <div className="bg-[#0a0a0c] min-h-screen text-white pb-20">
      <div className="container mx-auto px-4 flex justify-center items-center pt-20">
        <div className="w-full max-w-2xl bg-slate-900/40 border border-slate-800 p-8 md:p-12 rounded-3xl backdrop-blur-xl shadow-2xl">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-600/20 rounded-2xl text-indigo-400">
                <FaUserEdit size={24} />
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight">
                Account Settings
              </h2>
            </div>

            <Link
              to="/user-orders"
              className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-indigo-400 transition-colors"
            >
              <FaHistory /> My Orders
            </Link>
          </div>

          <form onSubmit={submitHandler} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Username */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
                  Full Name
                </label>
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                  <input
                    type="text"
                    placeholder="Enter name"
                    className="w-full bg-slate-800/50 border border-slate-700 p-3 pl-12 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
                  Email Address
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                  <input
                    type="email"
                    placeholder="Enter email"
                    className="w-full bg-slate-800/50 border border-slate-700 p-3 pl-12 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
                  New Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                  <input
                    type="password"
                    placeholder="Leave blank to keep current"
                    className="w-full bg-slate-800/50 border border-slate-700 p-3 pl-12 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-600 text-sm"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full bg-slate-800/50 border border-slate-700 p-3 pl-12 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-600 text-sm"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={loadingUpdateProfile}
                className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-sm shadow-xl shadow-indigo-600/20 transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {loadingUpdateProfile ? "Updating..." : "Update Profile"}
              </button>

              <Link
                to="/user-orders"
                className="sm:hidden text-center py-4 text-slate-400 font-bold uppercase tracking-widest text-xs"
              >
                View Order History
              </Link>
            </div>
          </form>

          {loadingUpdateProfile && (
            <div className="mt-4 flex justify-center">
              <Loader size="sm" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
