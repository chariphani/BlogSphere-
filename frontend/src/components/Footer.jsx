import { Link } from "react-router-dom";
import { BookOpen, ArrowUpRight } from "lucide-react";
export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.35)_1px,transparent_0)] [background-size:26px_26px]" />
      <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 animate-pulse rounded-full bg-violet-600/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-0 h-80 w-80 animate-pulse rounded-full bg-cyan-500/30 blur-3xl [animation-delay:1.5s]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-full -translate-x-1/2 bg-gradient-to-r from-transparent via-fuchsia-400/70 to-transparent" />
      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:px-8">
        <div>
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-2xl font-extrabold"
          >
            <BookOpen className="text-cyan-300 transition-all duration-500 group-hover:-rotate-12 group-hover:scale-125 group-hover:text-fuchsia-400" />
            <span className="bg-gradient-to-r from-cyan-300 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              BlogSphere.
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-7 text-slate-300">
            A home for curious minds, thoughtful stories and ideas worth
            sharing.
          </p>
        </div>
        <div className="sm:text-right">
          <p className="text-sm font-semibold text-cyan-300">
            Have a story to tell?
          </p>
          <Link
            to="/create"
            className="group mt-3 inline-flex items-center gap-2 rounded-full border border-violet-400/40 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:border-fuchsia-400 hover:bg-gradient-to-r hover:from-violet-600 hover:to-fuchsia-500 hover:shadow-lg hover:shadow-fuchsia-500/30 active:scale-95"
          >
            Start writing{" "}
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
      <div className="relative border-t border-white/10 py-5 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} BlogSphere. Built for curious minds.
      </div>
    </footer>
  );
}