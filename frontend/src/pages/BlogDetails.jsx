import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  CalendarDays,
  Trash2,
  Pencil,
} from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import {
  getBlog,
  toggleLike,
  addComment,
  deleteComment,
  deleteBlog,
} from "../services/blogService";
import formatDate from "../utils/formatDate";
import Loader from "../components/Loader";
export default function BlogDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const load = () =>
    getBlog(id)
      .then((data) => {
        setBlog(data.blog);
        setComments(data.comments);
      })
      .catch(() => toast.error("Story not found"))
      .finally(() => setLoading(false));
  useEffect(() => {
    load();
  }, [id]);
  if (loading) return <Loader full />;
  if (!blog)
    return (
      <div className="mx-auto w-full max-w-7xl px-4 py-24 text-center text-slate-600 sm:px-6 lg:px-8">
        This story could not be found.{" "}
        <Link
          to="/"
          className="font-semibold text-violet-600 transition-colors duration-300 hover:text-fuchsia-500"
        >
          Go home
        </Link>
      </div>
    );
  const owner = user && blog.author?._id === user._id;
  const liked = user && blog.likes?.some((x) => (x._id || x) === user._id);
  const like = async () => {
    if (!user) return navigate("/login");
    try {
      await toggleLike(id);
      await load();
    } catch (e) {
      toast.error("Could not update like");
    }
  };
  const sendComment = async (e) => {
    e.preventDefault();
    try {
      const data = await addComment(id, comment);
      setComments([data.comment, ...comments]);
      setComment("");
    } catch (e) {
      toast.error(e.response?.data?.message || "Could not add comment");
    }
  };
  const remove = async () => {
    if (!confirm("Delete this story permanently?")) return;
    try {
      await deleteBlog(id);
      toast.success("Story deleted");
      navigate("/dashboard");
    } catch (e) {
      toast.error(e.response?.data?.message || "Could not delete story");
    }
  };
  const removeComment = async (cid) => {
    try {
      await deleteComment(id, cid);
      setComments(comments.filter((c) => c._id !== cid));
    } catch (e) {
      toast.error("Could not delete comment");
    }
  };
  return (
    <article className="relative mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -left-20 top-0 -z-10 h-72 w-72 animate-pulse rounded-full bg-violet-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-40 -z-10 h-72 w-72 animate-pulse rounded-full bg-cyan-300/30 blur-3xl [animation-delay:1.5s]" />
      <Link
        to="/"
        className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-all duration-300 hover:text-violet-600"
      >
        <ArrowLeft
          size={16}
          className="transition-transform duration-300 group-hover:-translate-x-1"
        />{" "}
        All stories
      </Link>
      <motion.header
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-10"
      >
        <span className="rounded-full bg-gradient-to-r from-violet-100 to-fuchsia-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-violet-700 ring-1 ring-violet-200 transition-all duration-300 hover:scale-105 hover:shadow-md hover:shadow-violet-200">
          {blog.category}
        </span>
        <h1 className="mt-5 bg-gradient-to-r from-slate-900 via-violet-900 to-fuchsia-700 bg-clip-text text-4xl font-extrabold leading-tight text-transparent sm:text-6xl">
          {blog.title}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-500">
          {blog.description}
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-y border-slate-200 py-5">
          <div className="group flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 font-bold text-white shadow-lg shadow-violet-300 ring-2 ring-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
              {blog.author?.avatar ? (
                <img
                  src={blog.author.avatar}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                blog.author?.name?.[0]
              )}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">
                {blog.author?.name}
              </p>
              <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                <CalendarDays size={12} className="text-cyan-500" />
                {formatDate(blog.createdAt)}
              </p>
            </div>
          </div>
          {owner && (
            <div className="flex gap-2">
              <Link
                to={`/blogs/${id}/edit`}
                className="inline-flex items-center gap-1 rounded-full border border-cyan-300 px-3 py-2 text-xs font-bold text-cyan-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-50 hover:shadow-md hover:shadow-cyan-200 active:scale-95"
              >
                <Pencil size={14} /> Edit
              </Link>
              <button
                onClick={remove}
                className="inline-flex items-center gap-1 rounded-full border border-rose-200 px-3 py-2 text-xs font-bold text-rose-600 transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose-50 hover:shadow-md hover:shadow-rose-200 active:scale-95"
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          )}
        </div>
      </motion.header>
      {blog.imageUrl && (
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="max-h-[520px] w-full rounded-3xl object-cover shadow-2xl shadow-violet-300/50 ring-1 ring-violet-100 transition-all duration-500 hover:scale-[1.01] hover:shadow-fuchsia-300/50"
        />
      )}
      <div className="mx-auto max-w-3xl whitespace-pre-line py-12 text-[16px] leading-8 text-slate-700">
        {blog.content}
      </div>
      <div className="mx-auto max-w-3xl border-y border-slate-200 py-5">
        <button
          onClick={like}
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 active:scale-95 ${liked ? "bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white shadow-lg shadow-rose-300" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:text-rose-500 hover:shadow-md hover:ring-rose-300"}`}
        >
          <Heart
            size={17}
            fill={liked ? "currentColor" : "none"}
            className={liked ? "animate-pulse" : ""}
          />
          {blog.likes?.length || 0} Likes
        </button>
      </div>
      <section className="mx-auto max-w-3xl py-12">
        <h2 className="flex items-center gap-2 text-2xl font-extrabold text-slate-900">
          <MessageCircle className="text-violet-600" /> Conversation (
          {comments.length})
        </h2>
        {user ? (
          <form onSubmit={sendComment} className="mt-6">
            <textarea
              required
              rows="3"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add something thoughtful..."
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-violet-300 focus:border-violet-500 focus:shadow-lg focus:shadow-violet-200 focus:ring-4 focus:ring-violet-100"
            />
            <button className="mt-3 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-violet-300 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-xl hover:shadow-fuchsia-300 active:scale-95">
              Post comment
            </button>
          </form>
        ) : (
          <p className="mt-5 text-sm text-slate-500">
            <Link
              to="/login"
              className="font-bold text-violet-600 transition-colors duration-300 hover:text-fuchsia-500"
            >
              Log in
            </Link>{" "}
            to join the conversation.
          </p>
        )}
        <div className="mt-8 space-y-5">
          {comments.map((c) => (
            <div
              key={c._id}
              className="flex gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-100"
            >
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 text-xs font-bold text-white">
                {c.author?.name?.[0]}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap justify-between gap-2">
                  <p className="text-sm font-bold text-slate-900">
                    {c.author?.name}{" "}
                    <span className="ml-2 text-xs font-normal text-slate-400">
                      {formatDate(c.createdAt)}
                    </span>
                  </p>
                  {user && c.author?._id === user._id && (
                    <button
                      onClick={() => removeComment(c._id)}
                      className="text-xs text-rose-500 transition-all duration-300 hover:scale-110 hover:text-rose-700"
                    >
                      Delete
                    </button>
                  )}
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {c.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}