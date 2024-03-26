"use client"; // for pathName()

import React from "react";
import Link from "next/link";
import Image from 'next/image';
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { navLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

const Sidebar = () => {
  const pathname = usePathname(); // Get URL

  return (
    <aside className="sidebar">
      <div className="flex size-full flex-col gap-4">
        <Link href="/" className="sidebar-logo">
          <Image src="/assets/images/logo-text.svg" alt="logo" width={180} height={28} /> {/* Add logo to top left */}
        </Link>

        <nav className="sidebar-nav">
          <SignedIn>
            <ul className="sidebar-nav_elements">
              {navLinks.slice(0, 6).map((link) => { // First 6 options on top left
                const isActive = link.route === pathname // if page = URL

                return (
                  <li key={link.route} className={`sidebar-nav_element group ${isActive ? "bg-purple-gradient text-white" : "text-gray-700"}`}> {/* Change color once clicked */}
                    <Link className="sidebar-link" href={link.route}>
                      <Image src={link.icon} alt="logo" width={24} height={24} className={`${isActive && "brightness-200"}`} /> {/* All logos brighten when clicked */}
                      {link.label} {/* Adds words for sidebar */}
                    </Link>
                  </li>
                )
              })}
            </ul>

            <ul className="sidebar-nav_elements">
              {navLinks.slice(6).map((link) => { // Last 3 options on bottom left
                const isActive = link.route === pathname // if page = URL

                return (
                  <li key={link.route} className={`sidebar-nav_element group ${isActive ? "bg-purple-gradient text-white" : "text-gray-700"}`}> {/* Change color once clicked */}
                    <Link className="sidebar-link" href={link.route}>
                      <Image src={link.icon} alt="logo" width={24} height={24} className={`${isActive && "brightness-200"}`} /> {/* All logos brighten when clicked */}
                      {link.label} {/* Adds words for sidebar */}
                    </Link>
                  </li>
                )
              })}

              <li className="flex-center cursor-pointer gap-2 p-4">
                <UserButton afterSignOutUrl="/" showName /> {/* Profile button Bottom Left */}
              </li>

            </ul>
          </SignedIn>

          <SignedOut>
            <Button asChild className="button bg-purple-gradient bg-cover">
              <Link href="/sign-in">
                Login
              </Link>
            </Button>
          </SignedOut>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
