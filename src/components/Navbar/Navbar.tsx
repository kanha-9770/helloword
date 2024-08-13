"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { navbarItems } from "@/components/Constants/Navbar/navbarData";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../public/assets/Logo.png";
import dynamic from "next/dynamic";
const RightNavbar = dynamic(() => import("./RightNavbar"), { ssr: false });
import { Menu, MenuItem } from "./nav-menue";

export default function NavbarDemo() {
  return (
    <div className="relative max-w-screen-2xl flex items-center justify-center">
      <Navbar className="top-0" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [scrolling, setScrolling] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed flex w-full max-w-screen-2xl items-center inset-x-0 mx-auto z-[99999] transition-transform duration-300",
        "translate-y-0",
        className,
        "transition-all duration-500 ease-in-out", 
        scrolling
          ? "bg-[#f2f2f2]/70 backdrop-blur-xl"
          : "bg-[#f2f2f2]/70 backdrop-blur-xl"
      )}
    >
      <div className="w-1/5 ml-[1.4rem] flex justify-start items-center">
        <Link
          href="/"
          className="h-6 rounded-2xl lg:ml-4 flex justify-center items-center"
        >
          <Image
            src={Logo}
            alt="Logo"
            width={400}
            height={400}
            className="h-[1.4rem] w-full"
          />
        </Link>
      </div>
      <div className="w-3/5 hidden xl:flex items-center justify-center">
        <Menu>
          {navbarItems.map((item) => (
            <MenuItem
              key={item.name}
              setActive={setActive}
              active={active}
              item={item.name}
              setPosition={() => {}}
            >
              {item.component}
            </MenuItem>
          ))}
        </Menu>
      </div>
      <div className="w-1/5 hidden xl:flex mr-12 items-center justify-end">
        <RightNavbar />
      </div>
    </div>
  );
}
