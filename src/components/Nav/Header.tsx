"use client";
import React, { useState, useEffect } from "react";
import { Menu, X, Wallet } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

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

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const nav = document.querySelector("nav");
      if (mobileMenuOpen && nav && !nav.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

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
    <nav className="fixed w-full z-50 duration-300 bg-[#12121280] backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-[18px] font-semibold flex items-center text-white"
          >
            <Image src="/images/hasa.png" alt="HASA Logo" width={40} height={40} />
            HASA
          </Link>

          <div className="hidden md:flex items-center space-x-3">
            <Link
              href="/#features"
              onClick={(e) => handleNavClick(e, "features")}
              className="text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/5"
            >
              Features
            </Link>
            <Link
              href="/#use-cases"
              onClick={(e) => handleNavClick(e, "use-cases")}
              className="text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/5"
            >
              Use Cases
            </Link>
            <Link
              href="/docs"
              className="text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/5"
            >
              Documentation
            </Link>
            <button className="px-5 py-2 bg-[#007acc70] text-white rounded-lg font-medium transition-all hover:bg-[#007acc90]">
              Get started
            </button>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="py-4 space-y-1">
              <Link
                href="/#features"
                onClick={(e) => handleNavClick(e, "features")}
                className="block text-gray-300 hover:text-white py-1 rounded-lg hover:bg-white/5 transition-colors"
              >
                Features
              </Link>
              <Link
                href="/#use-cases"
                onClick={(e) => handleNavClick(e, "use-cases")}
                className="block text-gray-300 hover:text-white py-1 rounded-lg hover:bg-white/5 transition-colors"
              >
                Use Cases
              </Link>
              <Link
                href="/docs"
                className="block text-gray-300 hover:text-white py-1 rounded-lg hover:bg-white/5 transition-colors"
              >
                Documentation
              </Link>
              <div className="pt-3">
                <button className="w-full px-4 py-3 bg-[#007acc70] text-white text-sm rounded-lg font-medium transition-all hover:bg-[#007acc90]">
                  Get started
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}