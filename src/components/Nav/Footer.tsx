import React from "react";
import { Wallet } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-[#007acc]/20 py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-16">
        <div className="grid md:grid-cols-5 gap-8 mb-8">
          <div className="col-span-2">
            <div className="text-2xl flex items-center font-bold text-[#F9F9F9] mb-4">
              <Image src="/images/hasa.png" alt="HASA Logo" width={45} height={45} /> HASA
            </div>
            <p className="text-[#FFFFFF80] text-sm">
              Stablecoin wallet infrastructure for the Aptos economy
            </p>
          </div>

          <div className="flex md:justify-around justify-between w-full col-span-3">
            <div>
              <h4 className="font-bold mb-2 md:mb-3 text-[#F9F9F9]">Product</h4>
              <ul className="space-y-2 text-[#FFFFFF80] text-sm">
                <li>
                  <Link href="#" className="hover:text-[#66a3ff]">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#66a3ff]">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#66a3ff]">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#66a3ff]">
                    API Reference
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-2 md:mb-3 text-[#F9F9F9]">Company</h4>
              <ul className="space-y-2 text-[#FFFFFF80] text-sm">
                <li>
                  <Link href="#" className="hover:text-[#66a3ff]">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#66a3ff]">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#66a3ff]">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#66a3ff]">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-2 md:mb-3 text-[#F9F9F9]">Legal</h4>
              <ul className="space-y-2 text-[#FFFFFF80] text-sm">
                <li>
                  <Link href="#" className="hover:text-[#66a3ff]">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#66a3ff]">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#66a3ff]">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-5 text-center text-[#FFFFFF80] text-[10px]">
          © 2025 HASA. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
