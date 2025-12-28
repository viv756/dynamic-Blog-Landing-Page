import Image from "next/image";
import React from "react";

export default function Header() {
  return (
    <header className="border border-gray-200 h-20">
      <div className="max-w-7xl mx-auto px-4 flex items-center h-full justify-between">
        <div className="flex gap-1 items-center">
          <Image src="/campusify-icon.png" alt="Campusify logo" width={40} height={40} priority />
          <span className="uppercase font-bold text-3xl">campusify</span>
        </div>
        <ul className="flex gap-10 text-[16px]  ">
          <li>Home</li>
          <li>Features</li>
          <li>About Us</li>
          <li>Resources</li>
          <li>Careers</li>
          <li>Contact</li>
        </ul>
        <a className="rounded-xl  px-7 py-4 text-center text-sm font-medium text-white  bg-[#323309]">
          Request Demo
        </a>
      </div>
    </header>
  );
}
