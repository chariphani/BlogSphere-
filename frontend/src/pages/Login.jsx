import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BookOpen, Mail, Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [busy, setBusy] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await login(form);
      toast.success("Welcome back!");
      navigate(location.state?.from?.pathname || "/dashboard", {
        replace: true,
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to log in");
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="relative mx-auto grid min-h-[75vh] w-full max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:px-8">
      <div className="pointer-events-none absolute -left-24 top-10 -z-10 h-72 w-72 animate-pulse rounded-full bg-violet-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 -z-10 h-72 w-72 animate-pulse rounded-full bg-cyan-300/30 blur-3xl [animation-delay:1.5s]" />
      <div className="group relative hidden overflow-hidden rounded-[2rem] bg-slate-950 p-12 text-white shadow-2xl shadow-violet-300/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-fuchsia-300/50 md:block">
        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.35)_1px,transparent_0)] [background-size:26px_26px]" />
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 animate-pulse rounded-full bg-violet-600/50 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 animate-pulse rounded-full bg-cyan-500/40 blur-3xl [animation-delay:1.2s]" />
        <div className="relative">
          <BookOpen
            className="animate-bounce text-cyan-300 [animation-duration:3s]"
            size={34}
          />
          <p className="mt-16 text-xs font-bold uppercase tracking-[.25em] text-cyan-300">
            Your next chapter
          </p>
          <h1 className="mt-4 text-5xl font-extrabold leading-tight">
            Good stories begin with{" "}
            <i className="bg-gradient-to-r from-cyan-300 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              you.
            </i>
          </h1>
          <p className="mt-6 max-w-sm leading-7 text-slate-300">
            Sign in to continue reading, writing and sharing the ideas that
            matter.
          </p>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto w-full max-w-md"
      >
        <p className="text-xs font-bold uppercase tracking-[.2em] text-violet-600">
          Welcome back
        </p>
        <h2 className="mt-3 bg-gradient-to-r from-slate-900 via-violet-900 to-fuchsia-700 bg-clip-text text-4xl font-extrabold text-transparent">
          Log in to BlogSphere
        </h2>
        <p className="mt-3 text-sm text-slate-500">
          Pick up where your curiosity left off.
        </p>
        <form onSubmit={submit} className="mt-9 space-y-5">
          <label className="block text-sm font-semibold text-slate-700 transition-colors duration-300 focus-within:text-violet-600">
            Email address
            <div className="group mt-2 flex items-center rounded-xl border border-slate-200 bg-white px-4 shadow-sm transition-all duration-300 hover:border-violet-300 focus-within:scale-[1.02] focus-within:border-violet-500 focus-within:shadow-lg focus-within:shadow-violet-200 focus-within:ring-4 focus-within:ring-violet-100">
              <Mail
                size={18}
                className="text-slate-400 transition-colors duration-300 group-focus-within:text-violet-500"
              />
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={change}
                placeholder="you@example.com"
                className="w-full bg-transparent px-3 py-3.5 text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />
            </div>
          </label>
          <label className="block text-sm font-semibold text-slate-700 transition-colors duration-300 focus-within:text-violet-600">
            Password
            <div className="group mt-2 flex items-center rounded-xl border border-slate-200 bg-white px-4 shadow-sm transition-all duration-300 hover:border-violet-300 focus-within:scale-[1.02] focus-within:border-violet-500 focus-within:shadow-lg focus-within:shadow-violet-200 focus-within:ring-4 focus-within:ring-violet-100">
              <Lock
                size={18}
                className="text-slate-400 transition-colors duration-300 group-focus-within:text-violet-500"
              />
              <input
                required
                type="password"
                name="password"
                value={form.password}
                onChange={change}
                placeholder="Your password"
                className="w-full bg-transparent px-3 py-3.5 text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />
            </div>
          </label>
          <button
            disabled={busy}
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 py-4 text-sm font-bold text-white shadow-lg shadow-violet-300 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl hover:shadow-fuchsia-300 active:scale-95 disabled:pointer-events-none disabled:opacity-60"
          >
            {busy ? "Logging in..." : "Log in"}{" "}
            <ArrowRight
              size={17}
              className={
                busy
                  ? "animate-pulse"
                  : "transition-transform duration-300 group-hover:translate-x-1.5"
              }
            />
          </button>
        </form>
        <p className="mt-7 text-center text-sm text-slate-500">
          New to BlogSphere?{" "}
          <Link
            to="/register"
            className="font-bold text-violet-600 transition-colors duration-300 hover:text-fuchsia-500 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </motion.div>
    </div>
  );
}