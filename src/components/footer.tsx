// import Image from "next/image"
// import { cn } from "@/lib/utils";

// export function Footer() {
//   return (
//     <footer className="border-t border-border pt-12 mt-12">
//       <div className="max-w-7xl mx-auto px-6">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
//           {/* Left: Logo + Description */}
//           <div className="col-span-1 md:col-span-2">
//             <div className="flex items-center gap-2 mb-4">
//               <Image
//                 src="/booknook-logo.svg"
//                 alt="BookNook"
//                 width={40}
//                 height={40}
//                 className="object-contain"
//               />
//               <span className="text-xl font-bold tracking-tighter">BookNook</span>
//             </div>
//             <p className="text-muted-foreground text-sm leading-relaxed">
//               Your personal book tracking and borrowing companion. Organize your
//               collection, discover new reads, and manage your book exchanges with
//               friends and community members.
//             </p>
//           </div>

//           {/* Center: Links */}
//           <div>
//             <h4 className="font-semibold text-foreground mb-3">Quick Links</h4>
//             <ul className="space-y-2 text-sm">
//               <li>
//                 <a href="#"
//                   className={cn("hover:text-primary transition-colors")}
//                 >
//                   Home
//                 </a>
//               </li>
//               <li>
//                 <a href="#"
//                   className={cn("hover:text-primary transition-colors")}
//                 >
//                   All Books
//                 </a>
//               </li>
//               <li>
//                 <a href="#"
//                   className={cn("hover:text-primary transition-colors")}
//                 >
//                   My Books
//                 </a>
//               </li>
//               <li>
//                 <a href="#"
//                   className={cn("hover:text-primary transition-colors")}
//                 >
//                   My Borrows
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* Right: Contact + Social */}
//           <div>
//             <h4 className="font-semibold text-foreground mb-3">Contact</h4>
//             <ul className="space-y-2 text-sm">
//               <li>
//                 <a href="mailto:support@booknook.example"
//                   className={cn("hover:text-primary transition-colors")}
//                 >
//                   support@booknook.example
//                 </a>
//               </li>
//               <li>
//                 <a href="#"
//                   className={cn("hover:text-primary transition-colors")}
//                 >
//                   /help
//                 </a>
//               </li>
//             </ul>

//             <h4 className="font-semibold text-foreground mb-3 mt-4">Social</h4>
//             <div className="flex gap-3">
//               <a
//                 href="#"
//                 className={cn("size-5 rounded-full bg-muted p-1 hover:bg-foreground/20 transition-colors")}
//                 aria-label="Twitter"
//               >
//                 <svg
//                   className="h-4 w-4"
//                   viewBox="0 0 24 24"
//                   fill="currentColor"
//                 >
//                   <path d="M18.224 8.95a8.81 8.81 0 0 0-2.72-1.566 5.496 5.496 0 0 0-3.163.816 9.592 9.592 0 0 0-6.846.507 8.82 8.82 0 1 0-4.294-1.888 5.51 5.51 0 0 0-5.023 1.574 9.6 9.6 0 0 0-2.173.65 8.835 8.835 0 0 0-2.643.387 5.486 5.486 0 0 0-1.685.917 9.63 9.63 0 0 0-1.087 2.318 8.807 8.807 0 0 0 .652 3.173 5.493 5.493 0 0 0 .97 2.06 9.637 9.637 0 0 0 2.318 1.095 8.823 8.823 0 0 0 3.088-.31 5.49 5.49 0 0 0 1.888-2.032 5.491 5.491 0 0 0 .648-3.471 9.596 9.596 0 0 0-.518-3.655A8.805 8.805 0 0 0 2.72 4.268a5.49 5.49 0 0 0 .816-3.163 8.815 8.815 0 0 0-1.566-2.722zM9.15 12.618a1.162 1.162 0 1 1 0-2.324 1.162 1.162 0 0 1 0 2.324zm1.6 2.05a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zm5.485 0a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zM12 .75a.75.75 0 0 0 0 1.5.75.75 0 0 0 0-1.5zm4.083 1.735a.75.75 0 0 0-1.09-.533.75.75 0 0 0-.534-.306 7.247 7.247 0 0 0-1.379.198 7.27 7.27 0 0 0-.085 1.818 7.247 7.247 0 0 0 .193 1.557.75.75 0 0 0 .36.643 7.234 7.234 0 0 0 1.065.06 7.262 7.262 0 0 0 1.247-.141 7.236 7.236 0 0 0 .337-.738A7.25 7.25 0 0 0 16.16 9.06z" />
//                 </svg>
//               </a>
//               <a
//                 href="#"
//                 className={cn("size-5 rounded-full bg-muted p-1 hover:bg-foreground/20 transition-colors")}
//                 aria-label="Instagram"
//               >
//                 <svg
//                   className="h-4 w-4"
//                   viewBox="0 0 24 24"
//                   fill="currentColor"
//                 >
//                   <path
//                     d="M12 2.163c2.781 0 5.051.022 7.311.064.51.026.771.132.953.293.357.413.562.76.58.95.58.909 0 1.636-.05 2.313-.16.907-.155 1.515-.35 2.095-.58a7.789 7.789 0 0 0 1.22-1.217 7.796 7.796 0 0 0-.878-1.25 7.73 7.73 0 0 0-1.888-.555 3.148 3.148 0 0 1-1.997-.21 2.892 2.892 0 0 1-1.914-.016A11.817 11.817 0 0 0 12 2.163zm0-2.163A9.985 9.985 0 0 1 12 0C5.379 0 0 5.337 0 11.994c0 3.796.896 7.285 2.53 10.35.648 1.171 1.365 2.284 2.163 3.142.557.597.993 1.157 1.258 1.563.13.232.233.417.293.575.14.3.213.573.178.773a5.49 5.49 0 0 1-.708.163 5.507 5.507 0 0 0-.068.054c-.155.037-.323.03-.448.027-1.577-.28-2.868-.975-3.947-2.067-.63-.6-1.097-1.367-1.48-2.183-.234-.521-.352-.986-.397-1.258-.06-.368-.088-.695-.06-1.058a4.964 4.964 0 0 0 1.405-1.077 4.976 4.976 0 0 1 1.488-.637 4.95 4.95 0 0 1 1.537.387 4.97 4.97 0 0 1 .336 1.378 4.952 4.952 0 0 1-.79 1.826 4.983 4.983 0 0 1-1.487.278 4.957 4.957 0 0 1-1.421-.118 3.072 3.072 0 0 1-.825-.517 2.891 2.891 0 0 1-.586-.719 2.619 2.619 0 0 1-.118-1.078 2.404 2.404 0 0 1 .165-1.118c.055-.177.083-.31.083-.448 0-.261-.164-.506-.393-.656-.15-.088-.287-.16-.405-.196-.148-.043-.315-.055-.448-.055zm0 5.838a6.363 6.363 0 1 0 0 12.726 6.363 6.363 0 0 0 0-12.726zM12 5.838a3.363 3.363 0 1 1 0 6.726 3.363 3.363 0 0 1 0-6.726z"
//                   />
//                 </svg>
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* Bottom: Copyright */}
//         <div className="pt-8 border-t border-border text-center text-muted-foreground">
//           <p className="text-sm">
//             &copy; {new Date().getFullYear()} BookNook. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//   )
// }
import Link from "next/link";

import {
  BookOpen,
  Mail,
  Phone,
  MapPin,
  Globe,
  MessageCircle,
  Camera,
} from "lucide-react";

import { FaFacebookF, FaTwitter } from "react-icons/fa";


import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Logo */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-5">
              <BookOpen className="w-8 h-8 text-green-500" />
              <h2 className="text-2xl font-bold text-white">
                Book<span className="text-green-500">Nook</span>
              </h2>
            </Link>

            <p className="text-sm leading-7 text-gray-400">
              Discover your next favorite book with BookNook.
              Explore, borrow, and share knowledge with our
              growing community of book lovers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm">
              {[
                ["Home", "/"],
                ["All Books", "/books"],
                ["Add Book", "/add-book"],
                ["My Books", "/my-books"],
                ["My Borrows", "/my-borrows"],
              ].map(([name, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="hover:text-green-500 transition-colors"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-5">
              Contact Us
            </h3>

            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-green-500" />
                <a href="mailto:hello@booknook.com">
                  hello@booknook.com
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-green-500" />
                <a href="tel:+8801700000000">
                  +880 1700-000000
                </a>
              </li>

              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-green-500" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
       {/* Social Links */}
<div>
  <h3 className="text-lg font-semibold text-white mb-5">
    Follow Us
  </h3>

  <div className="flex gap-3">
    <a
      href="https://facebook.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Facebook"
      className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-white transition hover:bg-green-600"
    >
      <FaFacebookF />
    </a>

    <a
      href="https://instagram.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram"
      className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-white transition hover:bg-green-600"
    >
      <Camera size={18} />
    </a>

    <a
      href="https://twitter.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Twitter"
      className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-white transition hover:bg-green-600"
    >
      <FaTwitter />
    </a>
  </div>
</div>

        </div>

        <Separator className="my-10 bg-gray-700" />

        <p className="text-sm text-gray-400 text-center">
          © 2026 BookNook. All rights reserved.
        </p>

      </div>
    </footer>
  );
}