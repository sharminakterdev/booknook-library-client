import React, { useState } from "react";
import { BookOpen, Image as LucideImage } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectLabel } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="flex-1 bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto w-full">
        {/* Book Cover Preview Area */}
        <div className="mb-8 text-center">
          <label className="block text-sm font-medium text-foreground/80 mb-2">
            Book Cover Preview
          </label>
          <div className="relative">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Book cover preview"
                width={200}
                height={300}
                className="rounded-xl object-cover border border-border"
              />
            ) : (
              <div
                className="flex items-center justify-center h-64 w-full rounded-xl border-2 border-border border-gray-200 bg-gradient-to-br from-background/50 to-muted/50 cursor-pointer hover:border-teal-400/50 transition-colors"
                onClick={() => {}}
              >
                <BookOpen
                  className="w-16 h-16 text-teal-400/50"
                  style={{ rotate: '45deg' }}
                />
                <span className="text-sm text-teal-400/60">
                  Add a book cover image to preview here
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Form Card */}
        <form
          className="bg-card rounded-2xl shadow-lg border border-border p-6 sm:p-8 lg:p-10"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold text-foreground mb-1">
            Add a New Book
          </h2>
          <p className="text-sm text-foreground/60 mb-8">
            Expand your library with another great read.
          </p>

          {/* Book Title */}
          <div className="mb-4">
            <label htmlFor="bookTitle" className="block text-sm font-medium text-foreground/80 mb-1.5">
              Book Title
            </label>
            <Input
              id="bookTitle"
              name="title"
              type="text"
              placeholder="Enter book title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Author Name */}
          <div className="mb-4">
            <label htmlFor="authorName" className="block text-sm font-medium text-foreground/80 mb-1.5">
              Author Name
            </label>
            <Input
              id="authorName"
              name="author"
              type="text"
              placeholder="Enter author name"
              value={formData.author}
              onChange={handleChange}
              required
            />
          </div>

          {/* Category Select */}
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-foreground/80 mb-1.5">
              Category
            </label>
            <Select
              id="category"
              name="category"
              value={formData.category ?? ""}
              onValueChange={value => setFormData({ ...formData, category: value === null ? "" : value })}
            >
              <SelectTrigger>
                <SelectValue />
                <svg
                  className="h-4 w-4 text-muted-foreground pointer-events-none"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9 13l3 3 3-3m-4.5 3.5l4.5-4.5L9.5 3 3 9.5l4.5 4.5M5 9v5h5l-5 5-5-5-5 5z" />
                </svg>
              </SelectTrigger>
              <SelectContent>
                <SelectLabel>Choose a category</SelectLabel>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Book Cover Image URL */}
          <div className="mb-4">
            <label htmlFor="coverImage" className="block text-sm font-medium text-foreground/80 mb-1.5">
              Book Cover Image URL
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                id="coverImage"
                name="coverImage"
                type="text"
                placeholder="Enter image URL"
                value={formData.coverImage}
                onChange={handleChange}
              />
              <Button
                variant="outline"
                size="icon"
                className="p-2 rounded-md hover:bg-teal-50 hover:text-teal-600 transition-colors"
                onClick={() => {
                  // Open URL input focus
                  const input = document.getElementById("coverImage") as HTMLInputElement;
                  input?.focus();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.224 8.95a8.81 8.81 0 0 0-2.72-1.566 5.496 5.496 0 0 0-3.163 .816 9.592 9.592 0 0 0-6.846 .507 8.82 8.82 0 1 0-4.294-1.888 5.51 5.51 0 0 0-5.023 1.574 9.6 9.6 0 0 0-2.173 .65 8.835 8.835 0 0 0-2.643 .387 5.486 5.486 0 0 0-1.685 .917 9.63 9.63 0 0 0-1.087 2.318 8.807 8.807 0 0 0 .652 3.173 5.493 5.493 0 0 0 .97 2.06 9.637 9.637 0 0 0 2.318 1.095 8.823 8.823 0 0 0 3.088-.31 5.49 5.49 0 0 0 1.888-2.032 5.491 5.491 0 0 0 .648-3.471 9.596 9.596 0 0 0-.518-3.655A8.805 8.805 0 0 0 2.72 4.268a5.49 5.49 0 0 0 .816-3.163 8.815 8.815 0 0 0-1.566-2.722zM9.15 12.618a1.162 1.162 0 1 1 0-2.324 1.162 1.162 0 0 1 0 2.324zm1.6 2.05a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zm5.485 0a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zM12 .75a.75.75 0 0 0 0 1.5.75.75 0 0 0 0-1.5zm4.083 1.735a.75.75 0 0 0-1.09-.533.75.75 0 0 0-.534-.306 7.247 7.247 0 0 0-1.379 .198 7.27 7.27 0 0 0-.085 1.818 7.247 7.247 0 0 0 .193 1.557.75.75 0 0 0 .36 .643 7.234 7.234 0 0 0 1.065 .06 7.262 7.262 0 0 0 1.247-.141 7.236 7.236 0 0 0 .337-.738A7.25 7.25 0 0 0 16.16 9.06z" />
                </svg>
              </Button>
            </div>
            {formData.coverImage && (
              <p className="mt-2 text-xs text-teal-400">
                Preview: {formData.coverImage.substring(0, 50)}${formData.coverImage.length > 50 ? "..." : ""}
              </p>
            )}
          </div>

          {/* Short Description */}
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-foreground/80 mb-1.5">
              Short Description
            </label>
            <Textarea
              id="description"
              name="description"
              rows={3}
              placeholder="Enter a short description of the book..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {/* Total Copies */}
          <div className="mb-8 grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="totalCopies" className="block text-sm font-medium text-foreground/80 mb-1.5">
                Total Copies
              </label>
              <Input
                id="totalCopies"
                name="totalCopies"
                type="number"
                min="1"
                value={formData.totalCopies}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-8 border-t border-border">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-lg bg-teal-600 px-6 py-3 text-lg font-medium text-teal-50 hover:bg-teal-500 transition-colors shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm12-2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7 9h2v2h-2v-2zm-2-6h2v6H7v-6zm-2 4h2v2H7v-2zm12-4h-2v2h2v-2zm-6 8h-2v2h2v-2zm2-4h-2v6h2v-6z" />
              </svg>
              Add Book
            </Button>
            {isSubmitting ? (
              <span className="flex-1 h-8 rounded-lg bg-teal-50 text-teal-400 text-sm font-medium animate-pulse">Adding...</span>
            ) : (
              <Link
                href="/books"
                className="flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-lg font-medium text-foreground hover:bg-muted transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M15 19l-5-5 5-5M5 10l5 5 5-5M10 5l-5 5 5 5" />
                </svg>
                Cancel
              </Link>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}