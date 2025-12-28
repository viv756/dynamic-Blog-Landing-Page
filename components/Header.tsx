"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border border-gray-200">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex gap-1 items-center">
          <Image src="/campusify-icon.png" alt="Campusify logo" width={40} height={40} priority />
          <span className="uppercase font-bold text-2xl sm:text-3xl">campusify</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-10 text-[16px]">
          <li>
            <Link href="#">Home</Link>
          </li>
          <li>
            <Link href="#">Features</Link>
          </li>
          <li>
            <Link href="#">About Us</Link>
          </li>
          <li>
            <Link href="#">Resources</Link>
          </li>
          <li>
            <Link href="#">Careers</Link>
          </li>
          <li>
            <Link href="#">Contact</Link>
          </li>
        </ul>

        {/* Desktop CTA */}
        <Link
          href="#"
          className="hidden lg:inline-block rounded-xl px-7 py-4 text-sm font-medium text-white bg-[#323309]">
          Request Demo
        </Link>

        {/* Mobile Menu Button */}
        <button onClick={() => setOpen(!open)} className="lg:hidden p-2" aria-label="Toggle menu">
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden border-t border-gray-200">
          <ul className="flex flex-col gap-4 px-4 py-6 text-[16px]">
            <li>
              <Link href="#">Home</Link>
            </li>
            <li>
              <Link href="#">Features</Link>
            </li>
            <li>
              <Link href="#">About Us</Link>
            </li>
            <li>
              <Link href="#">Resources</Link>
            </li>
            <li>
              <Link href="#">Careers</Link>
            </li>
            <li>
              <Link href="#">Contact</Link>
            </li>
            <li>
              <Link
                href="#"
                className="block w-full text-center rounded-xl px-6 py-3 text-sm font-medium text-white bg-[#323309]">
                Request Demo
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
