import { Link } from "react-router-dom";
import { ArrowUpRight, Heart, Clock3 } from "lucide-react";
import formatDate from "../utils/formatDate";
export default function BlogCard({ blog }) {
  const author = blog.author || {};
  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-lg shadow-violet-100 transition-all duration-500 hover:-translate-y-2 hover:border-violet-200 hover:shadow-2xl hover:shadow-violet-200">
      <Link
        to={`/blogs/${blog._id}`}
        className="relative block aspect-[16/10] overflow-hidden bg-gradient-to-br from-violet-100 via-fuchsia-100 to-cyan-100"
      >
        {blog.imageUrl ? (
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
          />
        ) : (
          <div className="grid h-full place-items-center bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 text-4xl font-extrabold text-white transition-all duration-700 group-hover:scale-110">
            B.
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-violet-900/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </Link>
      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-gradient-to-r from-violet-100 to-fuchsia-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-violet-700 ring-1 ring-violet-200 transition-all duration-300 group-hover:shadow-md group-hover:shadow-violet-200">
            {blog.category || "General"}
          </span>
          <span className="flex items-center gap-1 text-xs text-slate-400 transition-colors duration-300 group-hover:text-rose-500">
            <Heart
              size={13}
              className="transition-transform duration-300 group-hover:scale-125 group-hover:fill-rose-500"
            />
            {blog.likes?.length || 0}
          </span>
        </div>
        <Link to={`/blogs/${blog._id}`}>
          <h3 className="mt-4 line-clamp-2 text-xl font-extrabold leading-snug text-slate-900 transition-colors duration-300 group-hover:text-violet-600">
            {blog.title}
          </h3>
        </Link>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
          {blog.description}
        </p>
        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
          <div className="flex min-w-0 items-center gap-2">
            <div className="grid h-8 w-8 shrink-0 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-xs font-bold text-white shadow-md shadow-violet-300 ring-2 ring-white transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
              {author.avatar ? (
                <img
                  src={author.avatar}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                author.name?.[0] || "B"
              )}
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-slate-700">
                {author.name || "BlogSphere author"}
              </p>
              <p className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-400">
                <Clock3 size={11} className="text-cyan-500" />
                {formatDate(blog.createdAt)}
              </p>
            </div>
          </div>
          <ArrowUpRight
            size={18}
            className="text-slate-400 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:scale-125 group-hover:text-fuchsia-500"
          />
        </div>
      </div>
    </article>
  );
}