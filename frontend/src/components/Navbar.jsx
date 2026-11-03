import { Link, NavLink, useNavigate } from "react-router-dom";
import { BookOpen, Menu, PenLine, UserRound, LogOut, X } from "lucide-react";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const signOut = async () => {
    await logout();
    toast.success("You have logged out");
    navigate("/");
    setOpen(false);
  };
  const linkClass = ({ isActive }) =>
    `relative text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:text-violet-600 after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:rounded-full after:bg-gradient-to-r after:from-violet-500 after:to-fuchsia-500 after:transition-all after:duration-300 ${isActive ? "text-violet-700 after:w-full" : "text-slate-600 after:w-0 hover:after:w-full"}`;
  const mobileLink =
    "rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition-all duration-300 hover:translate-x-1 hover:bg-gradient-to-r hover:from-violet-50 hover:to-cyan-50 hover:text-violet-600";
  return (
    <header className="sticky top-0 z-40 border-b border-violet-100 bg-white/80 shadow-sm shadow-violet-100/50 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-fuchsia-400/60 to-transparent" />
      <div className="mx-auto flex h-[76px] w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="group flex items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-lg shadow-violet-300 transition-all duration-500 group-hover:-rotate-12 group-hover:scale-110">
            <BookOpen size={21} />
          </span>
          <span className="text-2xl font-extrabold tracking-tight text-slate-900">
            Blog
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
              Sphere.
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <NavLink to="/" className={linkClass}>
            Explore
          </NavLink>
          {user && (
            <NavLink to="/dashboard" className={linkClass}>
              My dashboard
            </NavLink>
          )}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <Link
                to="/create"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-300 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-xl hover:shadow-fuchsia-300 active:scale-95"
              >
                <PenLine
                  size={16}
                  className="transition-transform duration-300 group-hover:rotate-12"
                />{" "}
                Write a story
              </Link>
              <Link
                to="/profile"
                className="grid h-10 w-10 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 text-white shadow-md shadow-violet-300 ring-2 ring-white transition-all duration-300 hover:rotate-6 hover:scale-110 hover:shadow-lg hover:shadow-fuchsia-300"
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserRound size={18} />
                )}
              </Link>
              <button
                onClick={signOut}
                aria-label="Log out"
                className="rounded-full p-2 text-slate-500 transition-all duration-300 hover:rotate-6 hover:bg-rose-50 hover:text-rose-600 hover:shadow-md hover:shadow-rose-100 active:scale-90"
              >
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-semibold text-slate-600 transition-all duration-300 hover:-translate-y-0.5 hover:text-violet-600"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-300 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-xl hover:shadow-fuchsia-300 active:scale-95"
              >
                Get started
              </Link>
            </>
          )}
        </div>
        <button
          className="rounded-lg p-2 text-slate-700 transition-all duration-300 hover:bg-violet-50 hover:text-violet-600 active:scale-90 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="animate-pulse-once border-t border-violet-100 bg-white/95 px-5 py-5 shadow-xl shadow-violet-100 backdrop-blur-xl md:hidden">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-2">
            <Link className={mobileLink} onClick={() => setOpen(false)} to="/">
              Explore
            </Link>
            {user ? (
              <>
                <Link
                  className={mobileLink}
                  onClick={() => setOpen(false)}
                  to="/dashboard"
                >
                  My dashboard
                </Link>
                <Link
                  className={mobileLink}
                  onClick={() => setOpen(false)}
                  to="/create"
                >
                  Write a story
                </Link>
                <button
                  onClick={signOut}
                  className="rounded-xl px-3 py-2 text-left text-sm font-semibold text-rose-600 transition-all duration-300 hover:translate-x-1 hover:bg-rose-50"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link
                  className={mobileLink}
                  onClick={() => setOpen(false)}
                  to="/login"
                >
                  Log in
                </Link>
                <Link
                  className={mobileLink}
                  onClick={() => setOpen(false)}
                  to="/register"
                >
                  Create account
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}