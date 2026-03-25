import Navbar from "../components/Navbar";
import BlogInfo from "../components/BlogInfo";
import Footer from "../components/Footer";
import LoadingPage from "../components/loading/LoadingPage";
import { Suspense } from "react";
export default function BlogPage() {
  return (
    <main className="w-full h-screen overflow-y-auto bg-slate-200">
      <Navbar />
      <Suspense fallback={<LoadingPage />}>
        <BlogInfo />
      </Suspense>
      <Footer />
    </main>
  );
}
