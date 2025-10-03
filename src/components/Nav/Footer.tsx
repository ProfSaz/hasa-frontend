import React from "react";
import { Wallet } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-[#007acc]/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="text-2xl flex font-bold bg-gradient-to-r from-[#66a3ff] to-[#007acc] bg-clip-text text-transparent mb-4">
              <Wallet className="text-blue-600 mt-1 mr-1.5" /> HASA
            </div>
            <p className="text-gray-400">
              Stablecoin wallet infrastructure for the Aptos economy
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-[#66a3ff]">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#66a3ff]">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#66a3ff]">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#66a3ff]">
                  API Reference
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-[#66a3ff]">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#66a3ff]">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#66a3ff]">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#66a3ff]">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-[#66a3ff]">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#66a3ff]">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#66a3ff]">
                  Security
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#007acc]/20 pt-8 text-center text-gray-400">
          © 2025 HASA. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
