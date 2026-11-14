
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  Image as ImageIcon,
  Plus,
  Sparkles,
  Library,
  UserRound,
  CheckCircle2,
  Link as LinkIcon,
  X,
} from "lucide-react";
import { toast } from "react-toastify";

import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const categories = [
  "Fiction",
  "Science",
  "History",
  "Kids",
  "Others",
];

type FormDataType = {
  title: string;
  author: string;
  category: string;
  description: string;
  totalCopies: string;
  imageUrl: string;
};

export default function AddBookPage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    author: "",
    category: "",
    description: "",
    totalCopies: "1",
    imageUrl: "",
  });

  const [customCategory, setCustomCategory] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image URL and preview
  const handleImageUrlChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const url = e.target.value;

    setFormData((prev) => ({
      ...prev,
      imageUrl: url,
    }));

    setPreviewUrl(url.trim());
    setImageError(false);
  };

  // Remove image URL
  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      imageUrl: "",
    }));

    setPreviewUrl("");
    setImageError(false);
  };

  // Submit book
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!user?.email) {
      toast.error("Please login first.");
      router.push("/login");
      return;
    }

    if (
      !formData.title.trim() ||
      !formData.author.trim() ||
      !formData.category ||
      !formData.description.trim() ||
      !formData.imageUrl.trim()
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Validate custom category
    if (
      formData.category === "Others" &&
      !customCategory.trim()
    ) {
      toast.error("Please enter your category.");
      return;
    }

    // Validate image URL
    if (!/^https?:\/\/.+/i.test(formData.imageUrl.trim())) {
      toast.error("Please enter a valid image URL.");
      return;
    }

    const copies = Number(formData.totalCopies);

    if (!Number.isInteger(copies) || copies < 1) {
      toast.error("Total copies must be at least 1.");
      return;
    }

    if (imageError) {
      toast.error("Please provide a working book cover image URL.");
      return;
    }

    setLoading(true);

    try {
      // Use custom category when Others is selected
      const finalCategory =
        formData.category === "Others"
          ? customCategory.trim()
          : formData.category;

      const bookData = {
        title: formData.title.trim(),
        author: formData.author.trim(),
        category: finalCategory,
        coverImage: formData.imageUrl.trim(),
        description: formData.description.trim(),

        // Available Copies Challenge
        totalCopies: copies,
        availableCopies: copies,

        userName: user.name || "",
        email: user.email,
        createdAt: new Date().toISOString(),
      };

      // Get JWT token
      const token = await getTokenFromClient();

      if (!token) {
        toast.error("Authentication token not found.");
        return;
      }

      const response = await fetch(`${API_URL}/add-books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookData),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.message || "Failed to add book."
        );
      }

      toast.success("Book added successfully!");

      // Reset form
      setFormData({
        title: "",
        author: "",
        category: "",
        description: "",
        totalCopies: "1",
        imageUrl: "",
      });

      setCustomCategory("");
      setPreviewUrl("");
      setImageError(false);

      router.push("/my-books");
      router.refresh();
    } catch (error) {
      console.error("Add book error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  // Loading
  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F7F0]">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#153D35] border-t-transparent" />
          <p className="mt-4 text-sm text-gray-500">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  // Login required
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F7F0] px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
          <BookOpen className="mx-auto h-12 w-12 text-[#153D35]" />

          <h2 className="mt-5 text-2xl font-bold text-[#153D35]">
            Login Required
          </h2>

          <p className="mt-2 text-gray-500">
            Please login to add a new book to BookNook.
          </p>

          <Link
            href="/login?callbackUrl=/add-book"
            className="mt-6 inline-flex rounded-xl bg-[#153D35] px-6 py-3 font-semibold text-white transition hover:bg-[#B18A4A]"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F7F0] px-4 py-10 md:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Back navigation */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#153D35]"
        >
          <ArrowLeft size={17} />
          Back to Home
        </Link>

        {/* Heading */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#A58B54]">
            <Sparkles size={16} />
            YOUR DIGITAL LIBRARY
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-[#153D35] md:text-4xl">
            Add a New Book
          </h1>

          <p className="mt-3 max-w-xl text-gray-500">
            Share your favorite books with the BookNook community.
            Add the details and grow your library.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.5fr]">

          {/* Information Panel */}
          <aside className="relative overflow-hidden rounded-3xl bg-[#153D35] p-8 text-white">
            <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-white/5" />
            <div className="absolute -bottom-20 -left-12 h-64 w-64 rounded-full bg-white/5" />

            <div className="relative z-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                <Library size={29} />
              </div>

              <h2 className="mt-8 text-2xl font-bold leading-snug">
                Every book has a story.
                <br />
                Share yours.
              </h2>

              <p className="mt-4 leading-7 text-white/65">
                Add books to your collection and help other readers
                discover their next favorite story.
              </p>

              <div className="mt-10 space-y-5">
                {[
                  "Add your book details",
                  "Provide a book cover URL",
                  "Share with other readers",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2
                      size={19}
                      className="shrink-0 text-[#C5A66B]"
                    />
                    <span className="text-sm text-white/85">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-5">
                <BookOpen size={25} className="text-[#C5A66B]" />

                <p className="mt-3 text-sm leading-6 text-white/70">
                  "A reader lives a thousand lives before he dies."
                </p>

                <p className="mt-2 text-xs text-white/40">
                  — George R. R. Martin
                </p>
              </div>
            </div>
          </aside>

          {/* Form */}
          <section className="rounded-3xl border border-[#E8E5DA] bg-white p-6 shadow-sm md:p-9">
            <div className="mb-7 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E5EDE8] text-[#153D35]">
                <Plus size={23} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#153D35]">
                  Book Information
                </h2>
                <p className="text-sm text-gray-400">
                  Enter the details below
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Title and Author */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Book Title *
                  </label>

                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter book title"
                    className="w-full rounded-xl border border-[#E8E5DA] bg-[#F7F7F0] px-4 py-3 text-sm outline-none transition focus:border-[#153D35] focus:bg-white focus:ring-2 focus:ring-[#E5EDE8]"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Author Name *
                  </label>

                  <input
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    placeholder="Enter author name"
                    className="w-full rounded-xl border border-[#E8E5DA] bg-[#F7F7F0] px-4 py-3 text-sm outline-none transition focus:border-[#153D35] focus:bg-white focus:ring-2 focus:ring-[#E5EDE8]"
                    required
                  />
                </div>
              </div>

              {/* Category and Copies */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Category *
                  </label>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#E8E5DA] bg-[#F7F7F0] px-4 py-3 text-sm outline-none transition focus:border-[#153D35] focus:ring-2 focus:ring-[#E5EDE8]"
                    required
                  >
                    <option value="">Select category</option>

                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>

                  {/* Custom Category Input */}
                  {formData.category === "Others" && (
                    <input
                      type="text"
                      value={customCategory}
                      onChange={(e) =>
                        setCustomCategory(e.target.value)
                      }
                      placeholder="Enter your category"
                      className="mt-3 w-full rounded-xl border border-[#E8E5DA] bg-[#F7F7F0] px-4 py-3 text-sm outline-none transition focus:border-[#153D35] focus:bg-white focus:ring-2 focus:ring-[#E5EDE8]"
                      required
                    />
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Total Copies *
                  </label>

                  <input
                    type="number"
                    name="totalCopies"
                    min="1"
                    step="1"
                    value={formData.totalCopies}
                    onChange={handleChange}
                    placeholder="Enter copies"
                    className="w-full rounded-xl border border-[#E8E5DA] bg-[#F7F7F0] px-4 py-3 text-sm outline-none transition focus:border-[#153D35] focus:ring-2 focus:ring-[#E5EDE8]"
                    required
                  />

                  <p className="mt-2 text-xs text-gray-400">
                    Available copies will initially match total copies.
                  </p>
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Book Cover Image URL *
                </label>

                <div className="relative">
                  <LinkIcon
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="url"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleImageUrlChange}
                    placeholder="Paste your book image URL here..."
                    className="w-full rounded-xl border border-[#E8E5DA] bg-[#F7F7F0] py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#153D35] focus:bg-white focus:ring-2 focus:ring-[#E5EDE8]"
                    required
                  />
                </div>

                <p className="mt-2 text-xs text-gray-400">
                  Paste an image URL to see the cover preview.
                </p>
              </div>

              {/* Image Preview */}
              {previewUrl && (
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-700">
                      Book Cover Preview
                    </p>

                    <button
                      type="button"
                      onClick={removeImage}
                      className="flex items-center gap-1 text-xs font-medium text-red-500 hover:text-red-700"
                    >
                      <X size={15} />
                      Remove
                    </button>
                  </div>

                  <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-2xl border border-[#E8E5DA] bg-[#F7F7F0] p-4">
                    {imageError ? (
                      <div className="text-center text-sm text-red-500">
                        <ImageIcon className="mx-auto mb-2" size={30} />
                        Image could not be loaded. Check the URL.
                      </div>
                    ) : (
                      <img
                        src={previewUrl}
                        alt="Book cover preview"
                        className="h-full max-w-full object-contain"
                        onLoad={() => setImageError(false)}
                        onError={() => setImageError(true)}
                      />
                    )}
                  </div>
                </div>
              )}

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Book Description *
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Write a short description about this book..."
                  className="w-full resize-none rounded-xl border border-[#E8E5DA] bg-[#F7F7F0] px-4 py-3 text-sm outline-none transition focus:border-[#153D35] focus:bg-white focus:ring-2 focus:ring-[#E5EDE8]"
                  required
                />
              </div>

              {/* User Information */}
              <div className="rounded-2xl border border-[#E5EDE8] bg-[#F7F7F0] p-5">
                <div className="mb-4 flex items-center gap-2">
                  <UserRound size={18} className="text-[#153D35]" />
                  <h3 className="text-sm font-bold text-gray-800">
                    Added By
                  </h3>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-medium text-gray-500">
                      Your Name
                    </label>

                    <input
                      value={user.name || ""}
                      readOnly
                      className="w-full rounded-lg border border-[#E8E5DA] bg-white px-3 py-2.5 text-sm text-gray-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-medium text-gray-500">
                      Your Email
                    </label>

                    <input
                      value={user.email || ""}
                      readOnly
                      className="w-full rounded-lg border border-[#E8E5DA] bg-white px-3 py-2.5 text-sm text-gray-600 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#153D35] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#B18A4A] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Adding Book...
                  </>
                ) : (
                  <>
                    <Plus size={19} />
                    Add Book to Library
                  </>
                )}
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
