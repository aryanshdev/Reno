import Link from "next/link";
import { ArrowRight, Plus, List, School } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-gray-800 flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-white/10 backdrop-blur-sm bg-black/50 sticky top-0 z-50">
        <div className="font-bold text-lg tracking-tight flex items-center gap-2">
          <School size={24} className="text-white" />
          SchoolDB
        </div>
        <a
          href="https://github.com/aryanshdev/Reno"
          target="_blank"
          className="text-sm text-gray-400 hover:text-white transition-colors"
        >
          GitHub Repo
        </a>
      </nav>

      {/* Main Home Page */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        {/* Hero Section */}
        <div className="text-center space-y-8 py-12">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
              Manage schools <br />
              <span className="text-gray-600">with Precision.</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-xl mx-auto font-light leading-relaxed">
              Task Submission Project for Web Development Internship at Reno
            </p>
          </div>

          {/* Links For Actual Functionality */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 w-full max-w-md mx-auto">
            <Link href="/app/addSchool" className="w-full sm:w-auto group">
              <button className="w-full flex items-center justify-center gap-2 bg-white text-black px-8 py-3.5 rounded-lg font-medium transition-all hover:bg-gray-200 hover:shadow-lg active:scale-95">
                <Plus size={18} />
                <span>Add School</span>
              </button>
            </Link>

            <Link href="/app/showSchools" className="w-full sm:w-auto group">
              <button className="w-full flex items-center justify-center gap-2 bg-black text-white border border-gray-800 px-8 py-3.5 rounded-lg font-medium transition-all hover:border-gray-600 hover:bg-gray-900 active:scale-95">
                <List size={18} />
                <span>View Directory</span>
              </button>
            </Link>
          </div>
        </div>
        {/* Footer */}
        <footer className="absolute bottom-6 text-gray-500 text-base">
          Web Development Assignment By Aryansh Gupta{" "}
          <a
            href="https://aryanshdev.in"
            target="_blank"
            className="hover:text-white transition-colors"
          >
            (aryanshdev.in)
          </a>
        </footer>
      </main>
    </div>
  );
}
