
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Menu, X, User, LogOut, ChevronDown } from "lucide-react";

type NavbarProps = {
  user?: {
    name: string | null;
    email: string | null;
    image: string | null;
  };
  isLoggedIn: boolean;
  onLogout: () => void;
};

export function Navbar({ user, isLoggedIn, onLogout }: NavbarProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "All Books", href: "/all-books" },
    ...(isLoggedIn
      ? [
          { name: "Add Book", href: "/add-book" },
          { name: "My Books", href: "/my-books" },
          { name: "My Borrows", href: "/my-borrows" },
        ]
      : []),
  ];

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
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-3 rounded-xl bg-green-50 px-4 py-2.5 font-semibold text-[#00A63E] transition hover:bg-green-100"
                aria-expanded={dropdownOpen}
              >
                {user?.image ? (
                  <img
                    src={user.image}
                    alt={user.name || "Profile"}
                    className="h-10 w-10 rounded-full border-2 border-green-200 object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                    <User size={22} />
                  </div>
                )}

                <span>{user?.name || "My Profile"}</span>
                <ChevronDown size={18} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-3 w-56 overflow-hidden rounded-xl border border-gray-100 bg-white py-2 shadow-xl">
                  <div className="border-b border-gray-100 px-4 py-3">
                    <p className="font-semibold text-gray-800">
                      {user?.name || "User"}
                    </p>
                    <p className="truncate text-sm text-gray-500">
                      {user?.email}
                    </p>
                  </div>

                  <Link
                    href="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 transition hover:bg-green-50 hover:text-[#00A63E]"
                  >
                    <User size={18} />
                    My Profile
                  </Link>

                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      onLogout();
                    }}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-red-600 transition hover:bg-red-50"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              )}
            </div>
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

            {!isLoggedIn ? (
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
            ) : (
              <>
                <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                  {user?.image ? (
                    <img
                      src={user.image}
                      alt={user.name || "Profile"}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <User size={24} className="text-[#00A63E]" />
                  )}

                  <div>
                    <p className="font-semibold text-gray-800">
                      {user?.name || "User"}
                    </p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                </div>

                <Link
                  href="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="font-semibold text-gray-700 hover:text-[#00A63E]"
                >
                  My Profile
                </Link>

                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onLogout();
                  }}
                  className="flex items-center gap-2 text-left font-semibold text-red-600"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
