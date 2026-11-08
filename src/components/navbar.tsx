
"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, Menu, X, User } from "lucide-react"

type NavbarProps = {
  user?: {
    name: string | null
    email: string | null
    image: string | null
  }
  isLoggedIn: boolean
}

export function Navbar({ user, isLoggedIn }: NavbarProps) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { name: "Home", href: "/" },
    { name: "All Books", href: "/all-books" },

     { name: "Add Book", href: "/add-book" },
          { name: "My Books", href: "/my-books" },
        { name: "My Borrows", href: "/my-borrows" }
  //   ...(isLoggedIn
  //     ? [
  //         { name: "Add Book", href: "/add-book" },
  //         { name: "My Books", href: "/my-books" },
  //         { name: "My Borrows", href: "/my-borrows" },
  //       ]
  //     : []),
  ]

  return (
<header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white shadow-sm">
      <nav className="mx-auto flex h-[100px] max-w-[1560px] items-center justify-between px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <BookOpen
            size={39}
            strokeWidth={2.8}
            fill="#00A63E"
            className="text-[#00A63E]"
          />
          <span className="text-[29px] font-bold tracking-tight text-[#111827]">
            Book<span className="text-[#00A63E]">Nook</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`border-b-2 py-2 text-[18px] font-semibold transition-colors ${
                pathname === link.href
                  ? "border-[#00A63E] text-[#00A63E]"
                  : "border-transparent text-gray-700 hover:text-[#00A63E]"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="hidden items-center gap-4 md:flex">
          {!isLoggedIn ? (
            <>
              <Link
                href="/login"
                className="rounded-xl border border-[#00A63E] px-6 py-3 text-[17px] font-semibold text-[#00A63E] transition hover:bg-green-50"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-xl bg-[#00A63E] px-6 py-3 text-[17px] font-semibold text-white transition hover:bg-green-700"
              >
                Register
              </Link>
            </>
          ) : (
            <Link
              href="/profile"
              className="flex items-center gap-2 rounded-xl bg-green-50 px-5 py-3 font-semibold text-[#00A63E]"
            >
              <User size={20} />
              {user?.name || "My Profile"}
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gray-800 md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-gray-100 bg-white px-6 py-5 shadow-lg md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`font-semibold ${
                  pathname === link.href
                    ? "text-[#00A63E]"
                    : "text-gray-700"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {!isLoggedIn && (
              <div className="flex gap-3 pt-2">
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 rounded-lg border border-[#00A63E] py-2 text-center font-semibold text-[#00A63E]"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 rounded-lg bg-[#00A63E] py-2 text-center font-semibold text-white"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
