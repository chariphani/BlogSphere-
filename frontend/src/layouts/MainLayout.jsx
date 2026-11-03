import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export default function MainLayout() {
  return (
    <>
      <Navbar />
      <main className="relative isolate min-h-[65vh] overflow-hidden bg-gradient-to-b from-slate-50 via-white to-violet-50/60">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
