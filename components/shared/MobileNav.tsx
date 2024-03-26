"use client" // for usePathname()

import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from 'next/link'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { navLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'

const MobileNav = () => {
    const pathname = usePathname(); // get URL

    return (
        <header className="header">
            <Link href="/" className="flex items-center gap-2 md:py-2">
                <Image src="assets/images/logo-text.svg" alt="logo" width={180} height={28} /> {/* Add logo to top left */}
            </Link>
            <nav className="flex gap-2">
                <SignedIn>
                    <UserButton afterSignOutUrl='/' /> {/* Add profile button to top right*/}
                    <Sheet>
                        <SheetTrigger>
                            <Image src="assets/icons/menu.svg" alt="menu" width={32} height={32} className="cursor-pointer" /> {/* Add logo to top right */}
                        </SheetTrigger>
                        <SheetContent className="sheet-content sm:w-64"> {/* Sheet inside menu */}
                            <>
                                <Image src="assets/images/logo-text.svg" alt="logo" width={152} height={23} /> {/* Imaginify logo on top of sheet */}
                                <ul className="header-nav_elements">
                                    {navLinks.slice(0, 6).map((link) => {
                                        const isActive = link.route === pathname // if page = URL

                                        return (
                                            <li key={link.route} className={`${isActive && "gradient-text"} p-18 flex whitespace-nowrap text-dark-700`}> {/* Change color once clicked */}
                                                <Link className="sidebar-link cursor-pointer" href={link.route}>
                                                    <Image src={link.icon} alt="logo" width={24} height={24} /> {/* All logos inside sheet */}
                                                    {link.label}
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </>
                        </SheetContent>
                    </Sheet>
                </SignedIn>

                <SignedOut>
                    <Button asChild className="button bg-purple-gradient bg-cover"> {/* Profile button */}
                        <Link href="/sign-in">
                            Login
                        </Link>
                    </Button>
                </SignedOut>

            </nav>
        </header>
    )
}

export default MobileNav