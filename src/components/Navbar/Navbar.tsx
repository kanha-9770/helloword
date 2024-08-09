"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import AboutLayout from "../Layout/AboutLayout";
import SupportLayout from "../Layout/SupportLayout";
import { supporItem } from "@/components/Constants/Navbar/support-data";
import { DataBankItem } from "../Constants/Navbar/resources-data";
import ProductLayout from "../Layout/ProductLayout";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../public/assets/Logo.png";
import RightNavbar from "./RightNavbar";
import ApplicationPage from "../Layout/ApplicationLayout";
import SolutionLayout from "../Layout/Solution";
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
        "fixed flex w-full max-w-screen-2xl items-center inset-x-0 mx-auto z-50 transition-transform duration-300",
        "translate-y-0",
        className,
        "transition-all duration-500 ease-in-out", //  transition
        scrolling
          ? "bg-[#f2f2f2]/70 backdrop-blur-xl"
          : "bg-[#f2f2f2]/70 backdrop-blur-xl" // Adjust blur and background color on scroll
      )}
    >
      <div className="w-1/5 ml-8 flex justify-start items-center">
        <Link
          href="/"
          className="h-6 rounded-2xl lg:ml-2 flex justify-center items-center"
        >
          <Image
            src={Logo}
            alt="Logo"
            width={50}
            height={50}
            className="h-[1.4rem] w-full"
          />
        </Link>
      </div>
      <div className="w-3/5 flex items-center justify-center">
        <Menu>
          <MenuItem
            setActive={setActive}
            active={active}
            item="About"
            setPosition={() => {}}
          >
            <AboutLayout />
          </MenuItem>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Products"
            setPosition={() => {}}
          >
            <ProductLayout
              setHoveredItem={() => {}}
              setHeading={() => {}}
              setIsVisible={() => {}}
            />
          </MenuItem>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Application"
            setPosition={() => {}}
          >
            <ApplicationPage />
          </MenuItem>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Solution"
            setPosition={() => {}}
          >
            <SolutionLayout />
          </MenuItem>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Support"
            setPosition={() => {}}
          >
            <SupportLayout
              setHoveredItem={() => {}}
              supporItem={supporItem}
              type=""
            />
          </MenuItem>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Resources"
            setPosition={() => {}}
          >
            <SupportLayout
              setHoveredItem={() => {}}
              supporItem={DataBankItem}
              type="Resources"
            />
          </MenuItem>
        </Menu>
      </div>
      <div className="w-1/5 mr-8 flex items-center justify-end">
        <RightNavbar />
      </div>
    </div>
  );
}
