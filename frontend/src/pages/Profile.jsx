import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Camera, Save } from "lucide-react";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import { updateProfile } from "../services/userService";
export default function Profile() {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({ name: "", bio: "", avatar: "" });
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    if (user)
      setForm({
        name: user.name || "",
        bio: user.bio || "",
        avatar: user.avatar || "",
      });
  }, [user]);
  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const data = await updateProfile(form);
      setUser(data.user);
      toast.success("Profile updated");
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not update profile");
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="relative mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -left-24 top-10 -z-10 h-72 w-72 animate-pulse rounded-full bg-violet-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-96 -z-10 h-72 w-72 animate-pulse rounded-full bg-cyan-300/30 blur-3xl [animation-delay:1.5s]" />
      <p className="text-xs font-bold uppercase tracking-[.2em] text-violet-600">
        Your presence
      </p>
      <h1 className="mt-2 bg-gradient-to-r from-slate-900 via-violet-900 to-fuchsia-700 bg-clip-text text-4xl font-extrabold text-transparent">
        Edit profile
      </h1>
      <form
        onSubmit={submit}
        className="mt-8 space-y-5 rounded-3xl border border-slate-100 bg-white p-7 shadow-xl shadow-violet-100 transition-all duration-500 hover:shadow-2xl hover:shadow-violet-200"
      >
        <div className="group flex items-center gap-4">
          <div className="grid h-16 w-16 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 text-white shadow-lg shadow-violet-300 ring-4 ring-white transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
            {form.avatar ? (
              <img
                src={form.avatar}
                alt="Profile preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <Camera className="animate-pulse" />
            )}
          </div>
          <p className="text-xs text-slate-500">
            Use a public image URL for your profile photo.
          </p>
        </div>
        <label className="block text-sm font-semibold text-slate-700 transition-colors duration-300 focus-within:text-violet-600">
          Name
          <input
            required
            maxLength="60"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-violet-300 focus:border-violet-500 focus:shadow-lg focus:shadow-violet-200 focus:ring-4 focus:ring-violet-100"
          />
        </label>
        <label className="block text-sm font-semibold text-slate-700 transition-colors duration-300 focus-within:text-violet-600">
          Profile image URL
          <input
            value={form.avatar}
            onChange={(e) => setForm({ ...form, avatar: e.target.value })}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-violet-300 focus:border-violet-500 focus:shadow-lg focus:shadow-violet-200 focus:ring-4 focus:ring-violet-100"
            placeholder="https://..."
          />
        </label>
        <label className="block text-sm font-semibold text-slate-700 transition-colors duration-300 focus-within:text-violet-600">
          Bio
          <textarea
            rows="4"
            maxLength="240"
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-7 text-slate-800 shadow-sm outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-violet-300 focus:border-violet-500 focus:shadow-lg focus:shadow-violet-200 focus:ring-4 focus:ring-violet-100"
            placeholder="A little about you"
          />
        </label>
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
          {busy ? "Saving..." : "Save profile"}
        </button>
      </form>
      <Link
        to="/dashboard"
        className="mt-5 inline-block text-sm font-semibold text-violet-600 transition-all duration-300 hover:translate-x-1 hover:text-fuchsia-500"
      >
        Back to dashboard
      </Link>
    </div>
  );
}