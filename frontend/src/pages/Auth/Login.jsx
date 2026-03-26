import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
      toast.success("Welcome back!");
    } catch (err) {
      toast.error(err?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0a0a0c] text-slate-200">
      {/* Left Side: Visual Image */}
      <div className="relative hidden flex-1 lg:flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0c] via-transparent to-[#0a0a0c]/60 z-20" />

        <img
          className="absolute inset-0 h-full w-full object-cover brightness-[0.4] transition-transform duration-[10s] hover:scale-105"
          src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=2070"
          alt="Tech Background"
        />

        <div className="relative z-30 px-12 pl-28">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[2px] w-10 bg-indigo-500" />
            <span className="text-[10px] font-bold uppercase tracking-[4px] text-indigo-400">
              Welcome Back
            </span>
          </div>

          <h1 className="text-6xl font-black text-white tracking-tighter leading-none mb-6">
            SMART <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-500 italic">
              SHOPPING.
            </span>
          </h1>

          <p className="text-lg text-slate-400 max-w-sm leading-relaxed">
            Access your premium gadgets and account details in one place.
          </p>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex w-full flex-col justify-center px-8 py-12 lg:w-[500px] bg-[#0a0a0c] border-l border-slate-800/50">
        <div className="mx-auto w-full max-w-sm">
          {/* MarketBaseX Logo */}
          <div className="mb-12 flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-pink-600 shadow-lg shadow-indigo-600/20">
              <svg
                className="w-6 h-6 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-2xl font-black text-white tracking-tighter uppercase">
                Market<span className="text-indigo-500">Base</span>
                <span className="text-pink-500 italic">X</span>
              </span>
              <span className="text-[9px] font-bold text-slate-600 tracking-[3px] uppercase">
                Digital Store
              </span>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">Login</h2>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Enter your details below
            </p>
          </div>

          <form onSubmit={submitHandler} className="space-y-5">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 ml-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-slate-800 bg-slate-900/40 px-5 py-4 text-white outline-none focus:border-indigo-500 transition-all"
                placeholder="name@example.com"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 ml-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-slate-800 bg-slate-900/40 px-5 py-4 text-white outline-none focus:border-indigo-500 transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 transition-all active:scale-[0.98]"
            >
              {isLoading ? "Logging in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-800 text-center">
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
              New customer?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-indigo-400 hover:text-white ml-1"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
