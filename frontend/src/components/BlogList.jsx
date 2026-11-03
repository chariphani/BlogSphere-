import BlogCard from "./BlogCard";
import Loader from "./Loader";
export default function BlogList({ blogs, loading }) {
  if (loading) return <Loader />;
  if (!blogs.length)
    return (
      <div className="group rounded-3xl border-2 border-dashed border-violet-200 bg-white/60 py-16 text-center backdrop-blur transition-all duration-500 hover:border-fuchsia-300 hover:bg-white hover:shadow-xl hover:shadow-violet-100">
        <p className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-xl font-extrabold text-transparent transition-transform duration-500 group-hover:scale-105">
          No stories found yet
        </p>
        <p className="mt-2 text-sm text-slate-500">
          Try another search or be the first to publish.
        </p>
      </div>
    );
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </div>
  );
}