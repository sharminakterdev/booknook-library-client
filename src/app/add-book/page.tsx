
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BookOpen, Image as ImageIcon, ArrowLeft, Plus } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function AddBookPage() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    coverImage: "",
    description: "",
    totalCopies: "1",
  });

  const [previewUrl, setPreviewUrl] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    if (name === "coverImage") {
      setPreviewUrl(value);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
    }, 1500);
  };

  const categories = [
    "Fiction",
    "Non-Fiction",
    "Science Fiction",
    "Fantasy",
    "Mystery",
    "Biography",
    "History",
    "Children's Books",
    "Young Adult",
    "Poetry",
  ];

  return (
    <div className="min-h-screen bg-[#F5F7F2] px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-3xl">

        {/* Back Link */}
        <Link
          href="/books"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#477365] transition hover:text-[#1D604C]"
        >
          <ArrowLeft size={17} />
          Back to All Books
        </Link>

        {/* Page Heading */}
        <div className="mb-9 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#DCECE2] text-[#237A61]">
            <BookOpen size={27} />
          </div>

          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[#67917C]">
            BookNook Library
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-[#183F35] sm:text-4xl">
            Add a New Book
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#718078] sm:text-base">
            Share a new story with our reading community. Fill in the details
            below to add a book to your collection.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-3xl border border-[#E0E9E1] bg-white p-5 shadow-[0_12px_45px_rgba(31,77,61,0.08)] sm:p-9 lg:p-11">

          <form onSubmit={handleSubmit} className="space-y-7">

            {/* Cover Preview */}
            <div>
              <label className="mb-3 block text-sm font-semibold text-[#315C50]">
                Book Cover Preview
              </label>

              <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#C9DCD0] bg-[#F8FBF8] px-4 py-7">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Book cover preview"
                    className="h-64 w-44 rounded-xl object-cover shadow-lg"
                  />
                ) : (
                  <div className="flex h-64 w-44 flex-col items-center justify-center rounded-xl border border-[#E1EBE3] bg-white text-center shadow-sm">
                    <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#E8F2EA] text-[#6B9A80]">
                      <ImageIcon size={26} />
                    </div>

                    <BookOpen size={30} className="mb-2 text-[#A6BBAE]" />

                    <p className="text-sm font-medium text-[#789083]">
                      Book Cover
                    </p>

                    <p className="mt-1 text-xs text-[#A0AEA5]">
                      Preview will appear here
                    </p>
                  </div>
                )}

                <p className="mt-4 text-xs text-[#8A9A90]">
                  Enter a cover image URL below
                </p>
              </div>
            </div>

            {/* Book Information */}
            <div className="border-b border-[#E8EFE9] pb-3">
              <h2 className="text-lg font-bold text-[#183F35]">
                Book Information
              </h2>
              <p className="mt-1 text-sm text-[#87958C]">
                Provide the basic details of your book.
              </p>
            </div>

            {/* Book Title */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#315C50]">
                Book Title
              </label>

              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter book title"
                required
                className="h-12 rounded-xl border-[#DCE7DF] bg-[#FAFCFA] px-4 text-gray-800"
              />
            </div>

            {/* Author */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#315C50]">
                Author Name
              </label>

              <Input
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Enter author name"
                required
                className="h-12 rounded-xl border-[#DCE7DF] bg-[#FAFCFA] px-4 text-gray-800"
              />
            </div>

            {/* Category */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#315C50]">
                Book Category
              </label>

              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
                required
              >
                <SelectTrigger className="h-12 w-full rounded-xl border-[#DCE7DF] bg-[#FAFCFA] px-4">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>

                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Cover Image URL */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#315C50]">
                Cover Image URL
              </label>

              <Input
                name="coverImage"
                value={formData.coverImage}
                onChange={handleChange}
                placeholder="https://example.com/book-cover.jpg"
                required
                className="h-12 rounded-xl border-[#DCE7DF] bg-[#FAFCFA] px-4 text-gray-800"
              />

              <p className="mt-2 text-xs text-[#91A096]">
                Paste an image URL to preview your book cover.
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#315C50]">
                Short Description
              </label>

              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write a short description about the book..."
                rows={5}
                required
                className="min-h-32 rounded-xl border-[#DCE7DF] bg-[#FAFCFA] px-4 py-3 text-gray-800"
              />
            </div>

            {/* Total Copies */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#315C50]">
                Total Copies
              </label>

              <Input
                type="number"
                name="totalCopies"
                value={formData.totalCopies}
                onChange={handleChange}
                min="1"
                required
                className="h-12 rounded-xl border-[#DCE7DF] bg-[#FAFCFA] px-4 text-gray-800"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3 border-t border-[#E8EFE9] pt-7 sm:flex-row">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-12 flex-1 rounded-xl bg-[#237A61] px-6 text-base font-semibold text-white shadow-md transition hover:bg-[#195E49]"
              >
                {isSubmitting ? (
                  "Adding Book..."
                ) : (
                  <>
                    <Plus size={18} className="mr-2" />
                    Add Book
                  </>
                )}
              </Button>

              <Link
                href="/books"
                className="flex h-12 items-center justify-center rounded-xl border border-[#C9DCD0] px-8 text-base font-semibold text-[#315C50] transition hover:bg-[#F0F7F2]"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-[#91A096]">
          Made with care for every book lover · BookNook
        </p>
      </div>
    </div>
  );
}
