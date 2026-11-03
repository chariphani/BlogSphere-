import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ImagePlus, Send } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { createBlog } from "../services/blogService";
const initial = {
  title: "",
  description: "",
  content: "",
  imageUrl: "",
  category: "Technology",
  tags: "",
};
export default function CreateBlog() {
  const [form, setForm] = useState(initial);
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const data = await createBlog({
        ...form,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      });
      toast.success("Your story is published");
      navigate(`/blogs/${data.blog._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not publish story");
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="relative mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -left-24 top-10 -z-10 h-72 w-72 animate-pulse rounded-full bg-violet-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-96 -z-10 h-72 w-72 animate-pulse rounded-full bg-cyan-300/30 blur-3xl [animation-delay:1.5s]" />
      <Link
        to="/dashboard"
        className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-all duration-300 hover:text-violet-600"
      >
        <ArrowLeft
          size={16}
          className="transition-transform duration-300 group-hover:-translate-x-1"
        />{" "}
        Back to dashboard
      </Link>
      <p className="mt-8 text-xs font-bold uppercase tracking-[.2em] text-violet-600">
        Your voice matters
      </p>
      <h1 className="mt-2 bg-gradient-to-r from-slate-900 via-violet-900 to-fuchsia-700 bg-clip-text text-4xl font-extrabold text-transparent">
        Write a new story
      </h1>
      <p className="mt-3 text-sm text-slate-500">
        Take your time. The best stories are worth telling well.
      </p>
      <form
        onSubmit={submit}
        className="mt-9 space-y-6 rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-violet-100 transition-all duration-500 hover:shadow-2xl hover:shadow-violet-200 sm:p-9"
      >
        <Field label="Story title">
          <input
            required
            maxLength="140"
            name="title"
            value={form.title}
            onChange={change}
            placeholder="Give your story a memorable title"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-violet-300 focus:border-violet-500 focus:shadow-lg focus:shadow-violet-200 focus:ring-4 focus:ring-violet-100"
          />
        </Field>
        <Field label="Short description">
          <textarea
            required
            maxLength="300"
            rows="2"
            name="description"
            value={form.description}
            onChange={change}
            placeholder="What is this story about?"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-violet-300 focus:border-violet-500 focus:shadow-lg focus:shadow-violet-200 focus:ring-4 focus:ring-violet-100"
          />
        </Field>
        <Field label="Cover image URL">
          <div className="group relative">
            <ImagePlus
              className="absolute left-4 top-3.5 text-slate-400 transition-colors duration-300 group-focus-within:text-violet-500"
              size={18}
            />
            <input
              name="imageUrl"
              value={form.imageUrl}
              onChange={change}
              placeholder="https://example.com/image.jpg"
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-800 shadow-sm outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-violet-300 focus:border-violet-500 focus:shadow-lg focus:shadow-violet-200 focus:ring-4 focus:ring-violet-100"
            />
          </div>
          {form.imageUrl && (
            <img
              src={form.imageUrl}
              alt="Cover preview"
              className="mt-3 max-h-52 w-full rounded-xl object-cover shadow-lg shadow-violet-200 ring-1 ring-violet-100 transition-all duration-500 hover:scale-[1.02]"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          )}
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Category">
            <select
              name="category"
              value={form.category}
              onChange={change}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition-all duration-300 hover:border-violet-300 focus:border-violet-500 focus:shadow-lg focus:shadow-violet-200 focus:ring-4 focus:ring-violet-100"
            >
              {[
                "Technology",
                "Lifestyle",
                "Travel",
                "Design",
                "Business",
                "Culture",
                "Health",
                "General",
              ].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </Field>
          <Field label="Tags (comma separated)">
            <input
              name="tags"
              value={form.tags}
              onChange={change}
              placeholder="react, creativity, ideas"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-violet-300 focus:border-violet-500 focus:shadow-lg focus:shadow-violet-200 focus:ring-4 focus:ring-violet-100"
            />
          </Field>
        </div>
        <Field label="Your story">
          <textarea
            required
            rows="12"
            name="content"
            value={form.content}
            onChange={change}
            placeholder="Start writing here..."
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-7 text-slate-800 shadow-sm outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-violet-300 focus:border-violet-500 focus:shadow-lg focus:shadow-violet-200 focus:ring-4 focus:ring-violet-100"
          />
        </Field>
        <button
          disabled={busy}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-300 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-xl hover:shadow-fuchsia-300 active:scale-95 disabled:pointer-events-none disabled:opacity-60"
        >
          <Send
            size={16}
            className={busy ? "animate-pulse" : "transition-transform duration-300 group-hover:translate-x-1"}
          />
          {busy ? "Publishing..." : "Publish story"}
        </button>
      </form>
    </div>
  );
}
function Field({ label, children }) {
  return (
    <label className="block text-sm font-semibold text-slate-700 transition-colors duration-300 focus-within:text-violet-600">
      {label}
      <div className="mt-2">{children}</div>
    </label>
  );
}