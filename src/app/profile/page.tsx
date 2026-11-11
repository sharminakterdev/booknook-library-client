
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import {
  User,
  Mail,
  BookOpen,
  Bookmark,
  ArrowRight,
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    if (!isPending && !user) {
      router.replace("/login");
    }
  }, [isPending, user, router]);

  if (isPending || !user) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#F0F7F3]">
        <p className="text-[#237A61] font-medium">Loading profile...</p>
      </div>
    );
  }

  return (
    <main className="min-h-[80vh] bg-[#EAF3ED] px-4 py-14 md:py-20">
      <div className="mx-auto max-w-3xl">

        {/* Page Heading */}
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[3px] text-[#237A61]">
            BookNook Account
          </p>
          <h1 className="text-3xl font-bold text-[#183F35] md:text-4xl">
            My Profile
          </h1>
          <p className="mt-3 text-gray-500">
            Manage your personal information and reading space.
          </p>
        </div>

        {/* Profile Card */}
        <div className="overflow-hidden rounded-3xl border border-[#DCE9DF] bg-white shadow-[0_15px_50px_rgba(35,122,97,0.10)]">

          {/* Green Header */}
          <div className="relative h-40 overflow-hidden bg-gradient-to-r from-[#174E3D] via-[#237A61] to-[#4B9B78]">
            <div className="absolute -right-10 -top-20 h-56 w-56 rounded-full border-[30px] border-white/10" />
            <div className="absolute -bottom-20 left-16 h-48 w-48 rounded-full bg-white/10" />

            <div className="relative flex h-full items-center justify-center">
              <p className="text-xl font-semibold tracking-wide text-white/90">
                Welcome to BookNook
              </p>
            </div>
          </div>

          {/* Avatar */}
          <div className="relative -mt-16 flex flex-col items-center px-6">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name || "Profile"}
                className="h-32 w-32 rounded-full border-[6px] border-white bg-white object-cover shadow-lg"
              />
            ) : (
              <div className="flex h-32 w-32 items-center justify-center rounded-full border-[6px] border-white bg-[#E4F2E9] text-[#237A61] shadow-lg">
                <User size={52} />
              </div>
            )}

            <h2 className="mt-4 text-2xl font-bold text-[#183F35]">
              {user.name || "BookNook Reader"}
            </h2>
            <p className="mt-1 text-sm text-[#6B8A7B]">
              BookNook Member
            </p>
          </div>

          {/* User Information */}
          <div className="px-6 pb-7 pt-8 md:px-10">
            <h3 className="mb-5 text-lg font-bold text-[#183F35]">
              Personal Information
            </h3>

            <div className="space-y-4">
              <div className="flex items-center gap-4 rounded-2xl border border-[#E4EEE7] bg-[#F7FAF7] p-4">
                <div className="rounded-xl bg-[#E3F1E8] p-3 text-[#237A61]">
                  <User size={21} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-gray-400">Full Name</p>
                  <p className="mt-1 font-semibold text-[#183F35]">
                    {user.name || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-[#E4EEE7] bg-[#F7FAF7] p-4">
                <div className="rounded-xl bg-[#E3F1E8] p-3 text-[#237A61]">
                  <Mail size={21} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-gray-400">
                    Email Address
                  </p>
                  <p className="mt-1 break-all font-semibold text-[#183F35]">
                    {user.email || "Not provided"}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <h3 className="mb-4 mt-8 text-lg font-bold text-[#183F35]">
              My Library
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                href="/my-books"
                className="group flex items-center justify-between rounded-2xl border border-[#DCE9DF] p-5 transition hover:border-[#237A61] hover:bg-[#F3F9F5]"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-[#E3F1E8] p-3 text-[#237A61]">
                    <BookOpen size={22} />
                  </div>
                  <span className="font-semibold text-[#183F35]">
                    My Books
                  </span>
                </div>
                <ArrowRight
                  size={19}
                  className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-[#237A61]"
                />
              </Link>

              <Link
                href="/my-borrows"
                className="group flex items-center justify-between rounded-2xl border border-[#DCE9DF] p-5 transition hover:border-[#237A61] hover:bg-[#F3F9F5]"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-[#E3F1E8] p-3 text-[#237A61]">
                    <Bookmark size={22} />
                  </div>
                  <span className="font-semibold text-[#183F35]">
                    My Borrows
                  </span>
                </div>
                <ArrowRight
                  size={19}
                  className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-[#237A61]"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

