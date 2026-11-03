import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Sparkles, PenLine, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import useBlogs from "../hooks/useBlogs";
import useAuth from "../hooks/useAuth";
import BlogList from "../components/BlogList";
const categories = [
  "All",
  "Technology",
  "Lifestyle",
  "Travel",
  "Design",
  "Business",
  "Culture",
];
export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const { blogs, loading, error } = useBlogs({ search, category });
  const { user } = useAuth();
  const featured = useMemo(() => blogs[0], [blogs]);
  return (
    <>
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.35)_1px,transparent_0)] [background-size:26px_26px]" />
        <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 animate-pulse rounded-full bg-violet-600/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 right-0 h-[28rem] w-[28rem] animate-pulse rounded-full bg-cyan-500/30 blur-3xl [animation-delay:1.2s]" />
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 animate-pulse rounded-full bg-fuchsia-500/20 blur-3xl [animation-delay:2.4s]" />
        <div className="relative mx-auto grid min-h-[510px] w-full max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_.9fr] lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-semibold tracking-wide text-cyan-300 backdrop-blur transition-all duration-300 hover:scale-105 hover:border-cyan-300/60 hover:bg-cyan-300/20">
              <Sparkles size={14} className="animate-pulse" /> A little space for big ideas
            </div>
            <h1 className="max-w-2xl text-5xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              Stories that{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-violet-400 to-fuchsia-400 bg-clip-text italic text-transparent">
                stay
              </span>{" "}
              with you.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-8 text-slate-300">
              Discover fresh perspectives, explore thoughtful writing and share
              the ideas that make you, you.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#stories"
                className="group rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-violet-500/30 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-xl hover:shadow-fuchsia-500/40 active:scale-95"
              >
                Explore stories{" "}
                <ArrowDown
                  className="ml-2 inline animate-bounce"
                  size={16}
                />
              </a>
              {user ? (
                <Link
                  to="/create"
                  className="rounded-full border border-cyan-300/40 px-6 py-3 text-sm font-semibold text-cyan-200 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:bg-cyan-300/10 hover:shadow-lg hover:shadow-cyan-400/20 active:scale-95"
                >
                  <PenLine className="mr-2 inline" size={15} />
                  Write a story
                </Link>
              ) : (
                <Link
                  to="/register"
                  className="rounded-full border border-cyan-300/40 px-6 py-3 text-sm font-semibold text-cyan-200 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:bg-cyan-300/10 hover:shadow-lg hover:shadow-cyan-400/20 active:scale-95"
                >
                  Join the community
                </Link>
              )}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="group relative mx-auto w-full max-w-md"
          >
            <div className="absolute -inset-5 rotate-3 rounded-[2rem] border border-violet-400/30 transition-all duration-500 group-hover:rotate-6 group-hover:border-fuchsia-400/60" />
            <div className="relative overflow-hidden rounded-[1.7rem] bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 p-3 shadow-2xl shadow-violet-900/50 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-fuchsia-700/50">
              <div className="aspect-[4/4.4] overflow-hidden rounded-[1.2rem] bg-gradient-to-br from-slate-900 via-indigo-950 to-violet-900">
                {featured?.imageUrl ? (
                  <img
                    src={featured.imageUrl}
                    alt="Featured story"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full flex-col justify-end p-8 text-white">
                    <span className="text-xs font-bold uppercase tracking-[.25em] text-cyan-300">
                      The art of
                    </span>
                    <span className="mt-2 text-5xl font-extrabold leading-none">
                      Seeing
                      <br />
                      things
                      <br />
                      <i className="bg-gradient-to-r from-cyan-300 to-fuchsia-400 bg-clip-text text-transparent">
                        differently.
                      </i>
                    </span>
                    <span className="mt-6 text-xs font-semibold tracking-widest text-slate-300">
                      BLOGSPHERE JOURNAL
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="absolute -bottom-5 -left-8 animate-bounce rounded-2xl bg-white px-5 py-4 text-slate-900 shadow-xl shadow-violet-900/30 ring-1 ring-violet-200 [animation-duration:3s]">
              <p className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-2xl font-extrabold text-transparent">
                {blogs.length}+
              </p>
              <p className="text-xs text-slate-500">Stories to explore</p>
            </div>
          </motion.div>
        </div>
      </section>
      <section
        id="stories"
        className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.22em] text-violet-600">
              The journal
            </p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900">
              Ideas worth your{" "}
              <span className="bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">
                time.
              </span>
            </h2>
            <p className="mt-3 text-sm text-slate-500">
              A collection of stories from curious people.
            </p>
          </div>
          <div className="group relative w-full md:max-w-xs">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors duration-300 group-focus-within:text-violet-500"
              size={18}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search stories..."
              className="w-full rounded-full border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm shadow-sm outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-violet-300 focus:scale-[1.02] focus:border-violet-500 focus:shadow-lg focus:shadow-violet-200 focus:ring-4 focus:ring-violet-100"
            />
          </div>
        </div>
        <div className="my-8 flex gap-2 overflow-x-auto pb-2">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-all duration-300 active:scale-95 ${category === item ? "scale-105 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-lg shadow-violet-300" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:-translate-y-0.5 hover:text-violet-600 hover:shadow-md hover:ring-violet-400"}`}
            >
              {item}
            </button>
          ))}
        </div>
        {error && (
          <p className="mb-5 animate-pulse rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
            {error}. Check that the backend is running.
          </p>
        )}
        <BlogList blogs={blogs} loading={loading} />
      </section>
    </>
  );
}