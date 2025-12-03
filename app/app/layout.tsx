"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { School, Plus, LayoutGrid, LogOut, Menu, X, Info } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const handleLinkClick = () => setIsMobileMenuOpen(false);

  const menuItems = [
    {
      name: "Add School",
      href: "/app/addSchool",
      icon: Plus,
    },
    {
      name: "View Schools",
      href: "/app/showSchools",
      icon: LayoutGrid,
    },

    {
      name: "About",
      href: "/app/about",
      icon: Info,
    },
  ];
  const SidebarContent = ({ current }: { current: string }) => (
    <div className="flex flex-col h-full justify-between bg-zinc-950">
      <div>
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl tracking-tight text-white"
          >
            <School className="text-white" size={24} />
            <span>SchoolDB</span>
          </Link>
          {/* Mobile View Icon To Close Menu */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* Links */}
        <nav className="p-4 space-y-5">
          <p className="px-4 text-sm font-semibold text-gray-300 uppercase tracking-wider mb-8">
            Menu
          </p>
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-white text-black shadow-md"
                    : "text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <item.icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Area */}
      <div className="p-4 border-t border-gray-800">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut size={18} />
          Exit Dashboard
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      {/* Normal Sidebar */}
      <aside className="w-64 border-r border-gray-800 bg-black hidden md:block">
        <SidebarContent />
      </aside>

      {/* Mobile Only Navbar */}
      <div className="md:hidden fixed top-0 w-full z-40 backdrop-blur-md bg-zinc-950 border-b border-gray-800 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-lg">
          <School size={20} />
          SchoolDB
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="text-white"
        >
          <Menu size={24} />
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>

          {/* Sidebar Panel */}
          <div className="absolute left-0 top-0 w-3/4 max-w-xs h-full bg-black border-r border-gray-800 shadow-2xl">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Main Area  */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden pt-16 md:pt-0">
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-10">
          <div className="max-w-5xl mx-auto">{children}</div>
        </div>
      </main>
    </div>
  );
}
