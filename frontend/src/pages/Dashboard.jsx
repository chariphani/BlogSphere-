import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, BookOpen, Heart, ArrowUpRight, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import { getMyBlogs, deleteBlog } from "../services";
import formatDate from "../utils/formatDate";
import Loader from "../components/Loader";
export default function Dashboard() {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const load = () =>
    getMyBlogs()
      .then((d) => setBlogs(d.blogs))
      .catch(() => toast.error("Could not load your stories"))
      .finally(() => setLoading(false));
  useEffect(() => {
    load();
  }, []);
  const remove = async (id) => {
    if (!confirm("Delete this story?")) return;
    try {
      await deleteBlog(id);
      setBlogs(blogs.filter((b) => b._id !== id));
      toast.success("Story deleted");
    } catch (e) {
      toast.error("Could not delete story");
    }
  };
  return (
    <div className="relative mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -left-24 top-0 -z-10 h-80 w-80 animate-pulse rounded-full bg-violet-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-64 -z-10 h-80 w-80 animate-pulse rounded-full bg-cyan-300/30 blur-3xl [animation-delay:1.5s]" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 -z-10 h-72 w-72 animate-pulse rounded-full bg-fuchsia-300/20 blur-3xl [animation-delay:3s]" />
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.2em] text-violet-600">
            Your workspace
          </p>
          <h1 className="mt-2 bg-gradient-to-r from-slate-900 via-violet-900 to-fuchsia-700 bg-clip-text text-4xl font-extrabold text-transparent">
            Hello, {user?.name?.split(" ")[0]}.
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Keep creating. Your stories deserve to be read.
          </p>
        </div>
        <Link
          to="/create"
          className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-violet-300 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-xl hover:shadow-fuchsia-300 active:scale-95"
        >
          <Plus
            size={17}
            className="transition-transform duration-500 group-hover:rotate-180"
          />{" "}
          Write a story
        </Link>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <Stat
          icon={<BookOpen />}
          label="Stories published"
          value={blogs.length}
        />
        <Stat
          icon={<Heart />}
          label="Total appreciations"
          value={blogs.reduce((n, b) => n + (b.likes?.length || 0), 0)}
        />
        <Stat
          icon={<ArrowUpRight />}
          label="Your profile"
          value="Ready to grow"
        />
      </div>
      <div className="mt-12 flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-slate-900">
          Your{" "}
          <span className="bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">
            stories
          </span>
        </h2>
        <span className="rounded-full bg-gradient-to-r from-violet-100 to-cyan-100 px-3 py-1 text-xs font-semibold text-violet-700 ring-1 ring-violet-200">
          {blogs.length} total
        </span>
      </div>
      {loading ? (
        <Loader />
      ) : blogs.length === 0 ? (
        <div className="group mt-6 rounded-3xl border-2 border-dashed border-violet-200 bg-white/60 py-16 text-center backdrop-blur transition-all duration-500 hover:border-fuchsia-300 hover:bg-white hover:shadow-xl hover:shadow-violet-100">
          <BookOpen className="mx-auto animate-bounce text-violet-500 [animation-duration:2.5s]" />
          <p className="mt-4 text-xl font-extrabold text-slate-900">
            Your first story starts here
          </p>
          <Link
            to="/create"
            className="mt-4 inline-block text-sm font-bold text-violet-600 transition-all duration-300 hover:translate-x-1 hover:text-fuchsia-500"
          >
            Create your first blog →
          </Link>
        </div>
      ) : (
        <div className="mt-6 divide-y divide-slate-100 overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl shadow-violet-100 transition-shadow duration-500 hover:shadow-2xl hover:shadow-violet-200">
          {blogs.map((b) => (
            <div
              key={b._id}
              className="group flex flex-wrap items-center justify-between gap-4 p-5 transition-all duration-300 hover:bg-gradient-to-r hover:from-violet-50 hover:via-white hover:to-cyan-50"
            >
              <div className="flex min-w-0 items-center gap-4">
                <div className="h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-violet-200 via-fuchsia-200 to-cyan-200 shadow-md shadow-violet-200 ring-1 ring-violet-100 transition-all duration-500 group-hover:rotate-2 group-hover:scale-105">
                  {b.imageUrl && (
                    <img
                      src={b.imageUrl}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                </div>
                <div className="min-w-0">
                  <Link
                    to={`/blogs/${b._id}`}
                    className="line-clamp-1 text-lg font-extrabold text-slate-900 transition-colors duration-300 hover:text-violet-600"
                  >
                    {b.title}
                  </Link>
                  <p className="mt-1 text-xs text-slate-400">
                    {formatDate(b.createdAt)} · {b.likes?.length || 0} likes
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Link
                  to={`/blogs/${b._id}/edit`}
                  className="rounded-full border border-cyan-300 px-4 py-2 text-xs font-bold text-cyan-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-50 hover:shadow-md hover:shadow-cyan-200 active:scale-95"
                >
                  Edit
                </Link>
                <button
                  onClick={() => remove(b._id)}
                  className="rounded-full border border-rose-200 p-2 text-rose-500 transition-all duration-300 hover:-translate-y-0.5 hover:rotate-6 hover:bg-rose-50 hover:text-rose-700 hover:shadow-md hover:shadow-rose-200 active:scale-95"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
function Stat({ icon, label, value }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-5 shadow-lg shadow-violet-100 transition-all duration-500 hover:-translate-y-2 hover:border-violet-200 hover:shadow-2xl hover:shadow-violet-200">
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-violet-400/30 to-cyan-400/30 blur-2xl transition-all duration-500 group-hover:scale-150" />
      <div className="relative grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-300 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
        {icon}
      </div>
      <p className="relative mt-4 bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-2xl font-extrabold text-transparent">
        {value}
      </p>
      <p className="relative mt-1 text-xs text-slate-500">{label}</p>
    </div>
  );
}