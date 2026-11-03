export default function Loader({ full = false }) {
  return (
    <div
      className={`flex items-center justify-center ${full ? "min-h-[55vh]" : "py-12"}`}
    >
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 animate-ping rounded-full bg-violet-400/30 [animation-duration:1.8s]" />
        <div className="absolute -inset-2 animate-pulse rounded-full bg-gradient-to-r from-violet-400/30 to-cyan-400/30 blur-xl" />
        <div className="relative h-12 w-12 animate-spin rounded-full border-4 border-violet-100 border-r-fuchsia-500 border-t-violet-600 shadow-lg shadow-violet-300 [animation-duration:0.8s]" />
      </div>
    </div>
  );
}