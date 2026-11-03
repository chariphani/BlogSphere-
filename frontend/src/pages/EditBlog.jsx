import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import toast from "react-hot-toast";
import { getBlog, updateBlog } from "../services/blogService";
export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    getBlog(id)
      .then(({ blog }) =>
        setForm({ ...blog, tags: (blog.tags || []).join(", ") }),
      )
      .catch(() => toast.error("Could not load this blog"));
  }, [id]);
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await updateBlog(id, {
        ...form,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      });
      toast.success("Story updated");
      navigate(`/blogs/${id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not update story");
    } finally {
      setBusy(false);
    }
  };
  if (!form)
    return (
      <div className="mx-auto w-full max-w-7xl animate-pulse px-4 py-20 text-center font-semibold text-violet-600 sm:px-6 lg:px-8">
        Loading story...
      </div>
    );
  return (
    <div className="relative mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -left-24 top-10 -z-10 h-72 w-72 animate-pulse rounded-full bg-violet-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-96 -z-10 h-72 w-72 animate-pulse rounded-full bg-cyan-300/30 blur-3xl [animation-delay:1.5s]" />
      <Link
        to={`/blogs/${id}`}
        className="group inline-flex items-center gap-2 text-sm text-slate-500 transition-all duration-300 hover:text-violet-600"
      >
        <ArrowLeft
          size={16}
          className="transition-transform duration-300 group-hover:-translate-x-1"
        />{" "}
        Back to story
      </Link>
      <h1 className="mt-8 bg-gradient-to-r from-slate-900 via-violet-900 to-fuchsia-700 bg-clip-text text-4xl font-extrabold text-transparent">
        Edit your story
      </h1>
      <form
        onSubmit={submit}
        className="mt-8 space-y-5 rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-violet-100 transition-all duration-500 hover:shadow-2xl hover:shadow-violet-200 sm:p-9"
      >
        {[
          ["title", "Title"],
          ["description", "Description"],
          ["imageUrl", "Cover image URL"],
          ["category", "Category"],
          ["tags", "Tags (comma separated)"],
          ["content", "Content"],
        ].map(([name, label]) => (
          <label
            key={name}
            className="block text-sm font-semibold text-slate-700 transition-colors duration-300 focus-within:text-violet-600"
          >
            {label}
            {name === "content" ? (
              <textarea
                required
                rows="12"
                name={name}
                value={form[name] || ""}
                onChange={change}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-7 text-slate-800 shadow-sm outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-violet-300 focus:border-violet-500 focus:shadow-lg focus:shadow-violet-200 focus:ring-4 focus:ring-violet-100"
              />
            ) : (
              <input
                required={["title", "description"].includes(name)}
                name={name}
                value={form[name] || ""}
                onChange={change}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-violet-300 focus:border-violet-500 focus:shadow-lg focus:shadow-violet-200 focus:ring-4 focus:ring-violet-100"
              />
            )}
          </label>
        ))}
        <button
          disabled={busy}
          className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-violet-300 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-xl hover:shadow-fuchsia-300 active:scale-95 disabled:pointer-events-none disabled:opacity-60"
        >
          <Save
            size={16}
            className={
              busy
                ? "animate-pulse"
                : "transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
            }
          />
          {busy ? "Saving..." : "Save changes"}
        </button>
      </form>
    </div>
  );
}