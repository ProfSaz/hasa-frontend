"use client";
import React, { useState, useEffect } from "react";
import { Menu, X, Wallet } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    e.preventDefault();

    if (pathname !== "/") {
      router.push("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }

    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-lg border-b border-[#007acc]/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a
              href="/"
              className="text-2xl font-bold flex bg-gradient-to-r from-[#66a3ff] to-[#007acc] bg-clip-text text-transparent"
            >
              <Wallet className="text-blue-600 mt-1 mr-1.5" /> HASA
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/#features"
              onClick={(e) => handleNavClick(e, "features")}
              className="text-gray-300 hover:text-[#66a3ff] transition-colors"
            >
              Features
            </a>
            <a
              href="/#use-cases"
              onClick={(e) => handleNavClick(e, "use-cases")}
              className="text-gray-300 hover:text-[#66a3ff] transition-colors"
            >
              Use Cases
            </a>
            <a
              href="/docs"
              className="text-gray-300 hover:text-[#66a3ff] transition-colors"
            >
              Docs
            </a>
            <button className="px-6 py-2 bg-[#007acc] hover:bg-[#00509e] rounded-lg font-medium transition-all hover:scale-105">
              Get Started
            </button>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-lg border-t border-[#007acc]/20">
          <div className="px-4 py-6 space-y-4">
            <a
              href="/#features"
              onClick={(e) => handleNavClick(e, "features")}
              className="block text-gray-300 hover:text-[#66a3ff]"
            >
              Features
            </a>
            <a
              href="/#use-cases"
              onClick={(e) => handleNavClick(e, "use-cases")}
              className="block text-gray-300 hover:text-[#66a3ff]"
            >
              Use Cases
            </a>
            <a
              href="/docs"
              className="block text-gray-300 hover:text-[#66a3ff]"
            >
              Docs
            </a>
            <a
              href="/#pricing"
              onClick={(e) => handleNavClick(e, "pricing")}
              className="block text-gray-300 hover:text-[#66a3ff]"
            >
              Pricing
            </a>
            <button className="w-full px-6 py-2 bg-[#007acc] hover:bg-[#00509e] rounded-lg font-medium">
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
