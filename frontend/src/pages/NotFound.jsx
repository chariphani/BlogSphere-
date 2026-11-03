import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="relative mx-auto grid min-h-[60vh] w-full max-w-7xl place-items-center overflow-hidden px-4 py-20 text-center sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -left-24 top-10 -z-10 h-72 w-72 animate-pulse rounded-full bg-violet-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 -z-10 h-72 w-72 animate-pulse rounded-full bg-cyan-300/30 blur-3xl [animation-delay:1.5s]" />
      <div className="pointer-events-none absolute left-1/3 top-1/2 -z-10 h-64 w-64 animate-pulse rounded-full bg-fuchsia-300/20 blur-3xl [animation-delay:3s]" />
      <div>
        <p className="animate-bounce bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 bg-clip-text text-8xl font-extrabold text-transparent [animation-duration:3s]">
          404
        </p>
        <h1 className="mt-4 bg-gradient-to-r from-slate-900 via-violet-900 to-fuchsia-700 bg-clip-text text-3xl font-extrabold text-transparent">
          This page wandered off.
        </h1>
        <p className="mt-3 text-sm text-slate-500">
          The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="mt-7 inline-block rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-violet-300 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-xl hover:shadow-fuchsia-300 active:scale-95"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}